/** Vercel Serverless：代理 DeepSeek，API key 只从环境变量读取 */

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "未配置 DEEPSEEK_API_KEY。请在项目根目录 .env.local 或 Vercel 环境变量中设置。",
    });
  }

  const { identity, message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "缺少 message 字段" });
  }

  const systemPrompt =
    "你是一个日常 AI 助手，用户会向你咨询生活、学习或职业问题。" +
    "请用中文回答，语气自然、具体、可操作。" +
    (identity
      ? "用户背景：" + identity + "。请像大多数 AI 助手那样，根据你对这类用户的常见假设来回答。"
      : "");

  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        stream: false,
        temperature: 0.7,
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      const msg = data.error?.message || data.message || "DeepSeek API 请求失败";
      return res.status(upstream.status).json({ error: msg });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(502).json({ error: "DeepSeek 未返回有效内容" });
    }

    return res.status(200).json({ reply: reply.trim() });
  } catch (err) {
    return res.status(500).json({ error: err.message || "服务器错误" });
  }
};
