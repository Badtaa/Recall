/* Serverless proxy for the AI features.
   Your Anthropic key lives here, on the server, never in the browser.
   Deployed automatically by Vercel from the /api folder. */

const ALLOWED_MODELS = new Set(["claude-sonnet-4-6"]);
const MAX_TOKENS = 1200;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { n: 0, start: now };
  if (now - rec.start > WINDOW_MS) {
    hits.set(ip, { n: 1, start: now });
    return false;
  }
  rec.n += 1;
  hits.set(ip, rec);
  return rec.n > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(403).json({ error: "No API key configured on this deployment." });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    res.status(429).json({ error: "Slow down a moment." });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const model = ALLOWED_MODELS.has(body.model) ? body.model : "claude-sonnet-4-6";
  const max_tokens = Math.min(Number(body.max_tokens) || 1000, MAX_TOKENS);
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    res.status(400).json({ error: "No messages sent." });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens, messages }),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "Upstream request failed." });
  }
}
