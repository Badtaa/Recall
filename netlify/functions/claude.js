/* Same proxy, Netlify flavour. Set ANTHROPIC_API_KEY in site settings.
   Reachable at /.netlify/functions/claude — see netlify.toml for the
   redirect that makes /api/claude work the same as on Vercel. */

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "POST only" }) };
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return { statusCode: 403, body: JSON.stringify({ error: "No API key configured." }) };
  }

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch (e) { /* falls through */ }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return { statusCode: 400, body: JSON.stringify({ error: "No messages sent." }) };
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: Math.min(Number(body.max_tokens) || 1000, 1200),
      messages,
    }),
  });

  return { statusCode: upstream.status, body: await upstream.text() };
}
