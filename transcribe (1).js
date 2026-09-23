/* Same endpoint, Netlify flavour. Set DEEPGRAM_API_KEY in site settings. */
export async function handler(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({ error: "POST only" }) };
  const key = process.env.DEEPGRAM_API_KEY;
  if (!key) return { statusCode: 403, body: JSON.stringify({ error: "Transcription isn't set up." }) };

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (e) { /* falls through */ }
  if (!body.audio) return { statusCode: 400, body: JSON.stringify({ error: "No audio sent." }) };

  const bytes = Buffer.from(body.audio, "base64");
  const up = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true", {
    method: "POST",
    headers: { Authorization: "Token " + key, "Content-Type": body.mime || "audio/webm" },
    body: bytes,
  });
  const data = await up.json();
  const text = (((data.results || {}).channels || [])[0] || {}).alternatives?.[0]?.transcript || "";
  return { statusCode: up.ok ? 200 : up.status, body: JSON.stringify(up.ok ? { text } : { error: "Transcription failed." }) };
}
