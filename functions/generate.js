// Cloudflare Pages Functions 透明转发
export async function onRequest(context) {
  const request = context.request;
  const targetUrl = "https://image.novelai.net/ai/generate-image";

  // 只允许 POST
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 复制请求
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  try {
    const response = await fetch(newRequest);
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
