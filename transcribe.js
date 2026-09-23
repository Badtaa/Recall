/* Speech to text for devices whose browser can't do it — iPhones, mainly.
   The app records audio in short segments and posts them here one at a time.

   Needs DEEPGRAM_API_KEY in your hosting environment. Without it the app
   falls back to the browser's own recogniser, or to typing notes by hand.

   Cost is roughly $0.0043 a minute, so an hour-long lecture is about 26 cents. */

const MAX_BYTES = 4_000_000;      /* a little under Vercel's body limit */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { n: 0, start: now };
  if (now - rec.start > WINDOW_MS) { hits.set(ip, { n: 1, start: now }); return false; }
  rec.n += 1;
  hits.set(ip, rec);
  return rec.n > MAX_PER_WINDOW;
}

export const config = { api: { bodyParser: { sizeLimit: "6mb" } } };

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }

  const key = process.env.DEEPGRAM_API_KEY;
  if (!key) { res.status(403).json({ error: "Transcription isn't set up on this deployment." }); return; }

  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) { res.status(429).json({ error: "Too many segments at once." }); return; }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const { audio, mime } = body;
  if (!audio) { res.status(400).json({ error: "No audio sent." }); return; }

  let bytes;
  try { bytes = Buffer.from(audio, "base64"); }
  catch (e) { res.status(400).json({ error: "Audio wouldn't decode." }); return; }
  if (bytes.length > MAX_BYTES) { res.status(413).json({ error: "Segment too long — keep them under four minutes." }); return; }

  try {
    const url = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true";
    const up = await fetch(url, {
      method: "POST",
      headers: { Authorization: "Token " + key, "Content-Type": mime || "audio/webm" },
      body: bytes,
    });
    const data = await up.json();
    if (!up.ok) { res.status(up.status).json({ error: data.err_msg || "Transcription failed." }); return; }

    const text = (((data.results || {}).channels || [])[0] || {}).alternatives?.[0]?.transcript || "";
    res.status(200).json({ text });
  } catch (err) {
    res.status(502).json({ error: "Couldn't reach the transcription service." });
  }
}
