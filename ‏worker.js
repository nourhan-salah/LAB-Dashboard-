const MODELS = [
  { id: "gemini-3.8-flash", cfg: { responseMimeType: "application/json", thinkingConfig: { thinkingLevel: "low" } } },
  { id: "gemini-3.5-flash-lite", cfg: { responseMimeType: "application/json", thinkingConfig: { thinkingLevel: "minimal" } } }
];
const MAX_BODY_BYTES = 6 * 1024 * 1024;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = origin === env.ALLOWED_ORIGIN;

    const cors = {
      "Access-Control-Allow-Origin": allowed ? origin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
    if (!allowed) return json({ error: "Origin not allowed" }, 403, cors);

    const len = parseInt(request.headers.get("Content-Length") || "0", 10);
    if (len > MAX_BODY_BYTES) return json({ error: "Payload too large" }, 413, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400, cors); }
    if (!Array.isArray(body.contents) || body.contents.length === 0) {
      return json({ error: "Missing contents" }, 400, cors);
    }

    let lastStatus = 502;
    let lastText = JSON.stringify({ error: "Upstream error" });

    for (const m of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent`;
      try {
        const upstream = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify({ contents: body.contents, generationConfig: m.cfg }),
        });
        const text = await upstream.text();
        if (upstream.ok) {
          return new Response(text, { status: 200, headers: { ...cors, "Content-Type": "application/json" } });
        }
        lastStatus = upstream.status;
        lastText = text;
      } catch (e) {}
    }

    return new Response(lastText, { status: lastStatus, headers: { ...cors, "Content-Type": "application/json" } });
  },
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
