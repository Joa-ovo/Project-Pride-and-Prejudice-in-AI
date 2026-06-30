import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ANALYSIS_SYSTEM_PROMPT =
  "你是 AI 偏见觉察教学助手。用户会提供同一问题下、针对不同身份背景的两条 AI 回复。" +
  "请仅基于回复正文做对比分析，识别性别/年龄/残障/地域等隐性假设或措辞差异。" +
  "必须引用回复中的具体措辞；长度比较须说明谁更长/更短及大约字数差。" +
  "禁止泛泛而谈或使用与正文矛盾的结论。" +
  '只输出合法 JSON，不要 markdown 代码块：{"hintA":"身份A觉察提示(中文1-2句)","hintB":"身份B觉察提示(中文1-2句)","tips":[],"hasBiasA":boolean,"hasBiasB":boolean}';

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { question, identityA, identityB, replyA, replyB } = await req.json();
    if (!question || !replyA || !replyB) {
      return new Response(JSON.stringify({ error: "缺少 question / replyA / replyB 字段" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: secretRow, error: secretError } = await supabase
      .from("app_secrets")
      .select("value")
      .eq("key", "DEEPSEEK_API_KEY")
      .single();

    if (secretError || !secretRow?.value) {
      return new Response(
        JSON.stringify({ error: "未配置 DEEPSEEK_API_KEY", detail: secretError?.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userPrompt =
      "问题：" + question + "\n\n" +
      "身份 A：" + (identityA || "未指定") + "\n回复 A：\n" + replyA + "\n\n" +
      "身份 B：" + (identityB || "未指定") + "\n回复 B：\n" + replyB;

    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + secretRow.value,
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
      const msg = data.error?.message || data.message || "DeepSeek API 请求失败";
      return new Response(JSON.stringify({ error: msg }), {
        status: upstream.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = data.choices?.[0]?.message?.content;
    if (!raw) {
      return new Response(JSON.stringify({ error: "DeepSeek 未返回有效内容" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return new Response(JSON.stringify({ error: "DeepSeek 返回非 JSON 格式" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        hintA: String(parsed.hintA || "").trim(),
        hintB: String(parsed.hintB || "").trim(),
        tips: Array.isArray(parsed.tips) ? parsed.tips.map(String) : [],
        hasBiasA: !!parsed.hasBiasA,
        hasBiasB: !!parsed.hasBiasB,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "服务器错误";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
