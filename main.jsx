import React from "react";
import { createRoot } from "react-dom/client";
import "./storage.js";
import AuthGate, { SignOut } from "./auth.jsx";
import { installScores } from "./scores.js";
import App from "./App.jsx";

/* Route the AI features through our own server so the key stays private.
   If you deployed as plain static files there is no /api/claude — the app
   detects the 404 and falls back to a key pasted in Settings, or to
   building decks without Claude at all. */
window.RECALL_API = "/api/claude";

/* Turns the leaderboard on, but only when Supabase is configured. */
installScores();

createRoot(document.getElementById("root")).render(
  <AuthGate>
    <App />
    <SignOut />
  </AuthGate>
);
