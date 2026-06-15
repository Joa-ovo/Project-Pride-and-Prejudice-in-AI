/** 本轮报告生成 */

function generateReportSummary(session) {
  var parts = [];
  var scenario = SCENARIOS[session.scenario];
  parts.push("场景：" + (scenario ? scenario.title : session.scenario));
  parts.push("模型：" + (session.model === "chatgpt" ? "ChatGPT" : "DeepSeek"));
  parts.push("身份：" + formatIdentity(session.identity.gender, session.identity.age, session.identity.disability));
  parts.push("对话轮次：" + session.chatLog.filter(function (m) { return m.role === "user"; }).length);

  var hints = session.chatLog.filter(function (m) { return m.hint; }).length;
  parts.push("觉察提示：" + hints + " 条");

  if (session.blindTaken) {
    var correct = session.blindResults.filter(function (r) { return r.correct === true; }).length;
    var graded = session.blindResults.filter(function (r) { return r.correct !== null; }).length;
    parts.push("盲测：" + correct + " / " + graded + " 题识别准确");
  } else {
    parts.push("盲测：本轮未进行");
  }

  if (session.postQuiz) {
    parts.push("后测分数：" + session.postQuiz.score + "（前测基线 " + (session.baselineScore || "—") + "）");
  }

  return parts.join("\n");
}

function renderReport(container, session, profile) {
  container.innerHTML = "";

  var header = document.createElement("div");
  header.className = "report-header";
  header.innerHTML = "<h3>本轮体验报告</h3><p class=\"report-date\">" + new Date(session.date).toLocaleString("zh-CN") + "</p>";
  container.appendChild(header);

  var summary = document.createElement("div");
  summary.className = "report-summary card";
  var lines = generateReportSummary(session).split("\n");
  lines.forEach(function (line) {
    var p = document.createElement("p");
    p.textContent = line;
    summary.appendChild(p);
  });
  container.appendChild(summary);

  if (session.chatLog.length > 0) {
    var chatSection = document.createElement("div");
    chatSection.className = "report-section";
    chatSection.innerHTML = "<h4>对话回顾</h4>";
    session.chatLog.forEach(function (entry) {
      if (entry.role === "user") {
        var u = document.createElement("div");
        u.className = "report-chat-user";
        u.textContent = "你：" + entry.text;
        chatSection.appendChild(u);
      } else if (entry.role === "ai") {
        var a = document.createElement("div");
        a.className = "report-chat-ai";
        a.textContent = "AI：" + entry.text;
        chatSection.appendChild(a);
        if (entry.hint) {
          var h = document.createElement("div");
          h.className = "report-hint";
          h.textContent = "觉察：" + entry.hint;
          chatSection.appendChild(h);
        }
      }
    });
    container.appendChild(chatSection);
  }

  if (session.blindTaken && session.blindResults.length > 0) {
    var blindSection = document.createElement("div");
    blindSection.className = "report-section";
    blindSection.innerHTML = "<h4>盲测回顾</h4>";
    session.blindResults.forEach(function (r, i) {
      var item = document.createElement("div");
      item.className = "report-blind-item";
      var status = r.correct === true ? "✓" : r.correct === false ? "✗" : "—";
      item.textContent = "第 " + (i + 1) + " 题 " + status + " · " + r.feedback;
      blindSection.appendChild(item);
    });
    container.appendChild(blindSection);
  }

  var insight = document.createElement("div");
  insight.className = "report-insight card";
  insight.innerHTML =
    "<h4>研究说明</h4>" +
    "<p>本项目作为社会科学研究工具，记录你的选择、对话与前后测分数，用于分析人们对 AI 隐性偏见的觉察能力。所有数据仅保存在本机浏览器（localStorage），不会自动上传。</p>" +
    "<p>隐性偏见不等于模型「故意歧视」，更多来自训练数据与对齐方式中的系统性差异。目标是促进觉察与反思，而非制造对立。</p>";
  container.appendChild(insight);

  var delta = getScoreDelta(profile);
  if (delta !== null) {
    var deltaEl = document.createElement("p");
    deltaEl.className = "report-delta";
    deltaEl.textContent = "相较前测基线，最近一次后测变化：" + (delta >= 0 ? "+" : "") + delta + " 分";
    container.appendChild(deltaEl);
  }
}

function renderDashboard(container, profile) {
  document.getElementById("stat-count").textContent = profile.stats.totalSessions;
  document.getElementById("stat-gpt").textContent = profile.stats.chatgpt;
  document.getElementById("stat-ds").textContent = profile.stats.deepseek;
  document.getElementById("stat-blind").textContent = profile.stats.blindTestsTaken;

  var delta = getScoreDelta(profile);
  document.getElementById("stat-delta").textContent = delta === null ? "—" : (delta >= 0 ? "+" : "") + delta;

  var chart = document.getElementById("chart-scores");
  chart.innerHTML = "";
  if (profile.quizHistory.length === 0) {
    chart.innerHTML = "<p class=\"empty\">完成前测后将显示分数变化</p>";
  } else {
    profile.quizHistory.slice().reverse().forEach(function (q) {
      var bar = document.createElement("div");
      bar.className = "score-bar-item";
      bar.innerHTML =
        "<span class=\"score-label\">" + (q.type === "pre" ? "前测" : "后测") + "</span>" +
        "<div class=\"score-bar-track\"><div class=\"score-bar-fill\" style=\"width:" + q.score + "%\"></div></div>" +
        "<span class=\"score-val\">" + q.score + "</span>";
      chart.appendChild(bar);
    });
  }

  var list = document.getElementById("history-list");
  list.innerHTML = "";
  if (profile.sessions.length === 0) {
    list.innerHTML = "<li class=\"empty\">还没有体验记录，点击「开始体验」</li>";
  } else {
    profile.sessions.slice(0, 10).forEach(function (s) {
      var li = document.createElement("li");
      li.className = "history-item";
      var sc = SCENARIOS[s.scenario];
      li.innerHTML =
        "<span class=\"history-title\">" + (sc ? sc.title : s.scenario) + " · " + (s.model === "chatgpt" ? "ChatGPT" : "DeepSeek") + "</span>" +
        "<span class=\"history-meta\">" + new Date(s.date).toLocaleDateString("zh-CN") + (s.blindTaken ? " · 含盲测" : "") + "</span>";
      list.appendChild(li);
    });
  }
}
