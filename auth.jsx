import React, { useState, useEffect } from "react";
import { supabase, cloudEnabled } from "./supabase.js";
import { setStorageUser } from "./storage.js";

const wrap = {
  minHeight: "100vh", background: "#0E1020", color: "#EDEEF9",
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};
const card = {
  width: "100%", maxWidth: 420, background: "#171A31",
  border: "1px solid #2E3459", borderRadius: 20, padding: 24,
};
const field = {
  width: "100%", background: "#0A0C1A", border: "1px solid #2E3459",
  color: "#EDEEF9", borderRadius: 12, padding: "12px 14px", fontSize: 16,
  marginBottom: 12, boxSizing: "border-box",
};
const primary = {
  width: "100%", background: "#25D0C0", color: "#04231F", border: "none",
  borderRadius: 12, padding: "13px 16px", fontWeight: 700, fontSize: 16, cursor: "pointer",
};
const ghost = {
  width: "100%", background: "transparent", color: "#9AA0CC", border: "none",
  padding: "12px 0 0", fontSize: 14, cursor: "pointer",
};

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!cloudEnabled);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (!cloudEnabled) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setStorageUser(data.session ? data.session.user.id : null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setStorageUser(s ? s.user.id : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const send = async () => {
    if (!email.trim()) return;
    setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  if (!ready) {
    return <div style={{ ...wrap, opacity: 0.6 }}>Loading…</div>;
  }

  if (cloudEnabled && !session && !skipped) {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Recall</div>
          <p style={{ color: "#9AA0CC", marginTop: 0, marginBottom: 20, lineHeight: 1.5 }}>
            Sign in and your decks, coins, character and streak follow you to any device.
          </p>

          {sent ? (
            <div>
              <p style={{ lineHeight: 1.5 }}>
                Check <strong>{email}</strong> — there's a link in your inbox. Open it on whichever
                device you want to study on.
              </p>
              <button style={ghost} onClick={() => setSent(false)}>Use a different email</button>
            </div>
          ) : (
            <div>
              <input
                style={field}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="you@school.edu"
                autoComplete="email"
              />
              <button style={{ ...primary, opacity: busy ? 0.5 : 1 }} onClick={send} disabled={busy}>
                {busy ? "Sending…" : "Email me a link"}
              </button>
              {err && <p style={{ color: "#FF5F6D", fontSize: 14 }}>{err}</p>}
              <p style={{ color: "#9AA0CC", fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>
                No password to forget. The link signs you in and keeps you signed in.
              </p>
              <button style={ghost} onClick={() => setSkipped(true)}>
                Just use this device, don't sign in
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return children;
}

export function SignOut() {
  if (!cloudEnabled) return null;
  return (
    <button
      onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
      style={{
        position: "fixed", right: 10, bottom: 10, zIndex: 50, fontSize: 12,
        background: "#1E2240", color: "#9AA0CC", border: "1px solid #2E3459",
        borderRadius: 99, padding: "6px 12px", cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
}
