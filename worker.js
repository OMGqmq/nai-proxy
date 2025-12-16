export default {
  async fetch(request, env) {
    const targetUrl = "https://image.novelai.net/ai/generate-image";

    // 只允许 POST 请求
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // 复制原始请求 (保留 Token 和 Body)
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });

    try {
      // 转发给官方
      const response = await fetch(newRequest);
      
      // 返回官方的数据
      return new Response(response.body, {
        status: response.status,
        headers: response.headers
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};
