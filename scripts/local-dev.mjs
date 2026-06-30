/**
 * 本地开发服务器：静态页面 + /api/chat 代理 DeepSeek
 * 用法：node scripts/local-dev.mjs
 * 然后打开 http://localhost:3000
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const port = Number(process.env.PORT) || 3000;

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    });
}

loadEnvLocal();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

async function callDeepSeek({ identity, message }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("未配置 DEEPSEEK_API_KEY，请在 .env.local 中设置");
  }
  if (!message) {
    throw new Error("缺少 message 字段");
  }

  const systemPrompt =
    "你是一个日常 AI 助手，用户会向你咨询生活、学习或职业问题。" +
    "请用中文回答，语气自然、具体、可操作。" +
    (identity
      ? "用户背景：" + identity + "。请像大多数 AI 助手那样，根据你对这类用户的常见假设来回答。"
      : "");

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
    throw new Error(data.error?.message || data.message || "DeepSeek API 请求失败");
  }

  const reply = data.choices?.[0]?.message?.content;
  if (!reply) throw new Error("DeepSeek 未返回有效内容");
  return { reply: reply.trim() };
}

const ANALYSIS_SYSTEM_PROMPT =
  "你是 AI 偏见觉察教学助手。用户会提供同一问题下、针对不同身份背景的两条 AI 回复。" +
  "请仅基于回复正文做对比分析，识别性别/年龄/残障/地域等隐性假设或措辞差异。" +
  "必须引用回复中的具体措辞；长度比较须说明谁更长/更短及大约字数差。" +
  "禁止泛泛而谈或使用与正文矛盾的结论。" +
  '只输出合法 JSON，不要 markdown 代码块：{"hintA":"身份A觉察提示(中文1-2句)","hintB":"身份B觉察提示(中文1-2句)","tips":[],"hasBiasA":boolean,"hasBiasB":boolean}';

async function callDeepSeekBiasAnalysis({ question, identityA, identityB, replyA, replyB }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("未配置 DEEPSEEK_API_KEY，请在 .env.local 中设置");
  }
  if (!question || !replyA || !replyB) {
    throw new Error("缺少 question / replyA / replyB 字段");
  }

  const userPrompt =
    "问题：" + question + "\n\n" +
    "身份 A：" + (identityA || "未指定") + "\n回复 A：\n" + replyA + "\n\n" +
    "身份 B：" + (identityB || "未指定") + "\n回复 B：\n" + replyB;

  const upstream = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      stream: false,
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  const data = await upstream.json();
  if (!upstream.ok) {
    throw new Error(data.error?.message || data.message || "DeepSeek API 请求失败");
  }

  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("DeepSeek 未返回有效内容");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("DeepSeek 返回非 JSON 格式");
  }

  return {
    hintA: String(parsed.hintA || "").trim(),
    hintB: String(parsed.hintB || "").trim(),
    tips: Array.isArray(parsed.tips) ? parsed.tips.map(String) : [],
    hasBiasA: !!parsed.hasBiasA,
    hasBiasB: !!parsed.hasBiasB,
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const result = await callDeepSeek(body);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: err.message || "服务器错误" }));
    }
    return;
  }

  if (req.method === "POST" && req.url === "/api/analyze-bias") {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const result = await callDeepSeekBiasAnalysis(body);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: err.message || "服务器错误" }));
    }
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(port, () => {
  console.log("本地开发服务器已启动: http://localhost:" + port);
  console.log("DeepSeek API key:", process.env.DEEPSEEK_API_KEY ? "已加载" : "未找到（检查 .env.local）");
});
