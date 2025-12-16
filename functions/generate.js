// Cloudflare Pages Functions 透明转发代码
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  // 1. 目标地址：NovelAI 官方画图接口
  const targetUrl = "https://image.novelai.net/ai/generate-image";

  // 2. 只允许 POST 请求
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 3. 复制原始请求 (保留 AstrBot 发来的 Body 和 Token)
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  try {
    // 4. 转发给官方
    const response = await fetch(newRequest);

    // 5. 把官方返回的 ZIP 包原样吐回去
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}
