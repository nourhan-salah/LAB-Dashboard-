// Cloudflare Worker: وسيط آمن بين الصفحة و Gemini (المفتاح يبقى سرياً هنا)
// المتغيرات المطلوبة في إعدادات الـ Worker:
//   GEMINI_API_KEY  (Secret)  مفتاح Gemini الجديد
//   ALLOWED_ORIGIN  (Text)    مثال: https://nourhan-salah.github.io  (بدون مسار وبدون / في الآخر)

const MODEL = "gemini-3.8-flash";
const MAX_BODY_BYTES = 6 * 1024 * 1024; // 6MB

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

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }
    if (!allowed) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }

    const len = parseInt(request.headers.get("Content-Length") || "0", 10);
    if (len > MAX_BODY_BYTES) {
      return json({ error: "Payload too large" }, 413, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, cors);
    }

    // نمرّر فقط الحقول المسموحة (حماية من إساءة الاستخدام)
    if (!Array.isArray(body.contents) || body.contents.length === 0) {
      return json({ error: "Missing contents" }, 400, cors);
    }
    const payload = {
      contents: body.contents,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
        thinkingConfig: { thinkingBudget: 0 },
      },
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
    try {
      const upstream = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify(payload),
      });
      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    } catch (e) {
      return json({ error: "Upstream error" }, 502, cors);
    }
  },
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
