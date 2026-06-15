/** 对话模拟 + 觉察提示 + 自定义问题的偏见生成 */

function findChatResponse(scenarioId, model, identityKey, userText) {
  var scenario = CHAT_SCRIPTS[scenarioId];
  if (!scenario) return null;
  var modelScripts = scenario[model];
  if (!modelScripts) return null;
  var identityScripts = modelScripts[identityKey];
  if (!identityScripts) return null;
  return identityScripts[userText] || null;
}

function parseIdentityKey(identityKey) {
  var gender = "other";
  if (identityKey.indexOf("female") === 0) gender = "female";
  else if (identityKey.indexOf("male") === 0) gender = "male";

  var age = "26-45";
  if (identityKey.indexOf("18-25") >= 0) age = "18-25";
  else if (identityKey.indexOf("46-64") >= 0) age = "46-64";
  else if (identityKey.indexOf("65+") >= 0) age = "65+";

  var disability = "none";
  if (identityKey.indexOf("wheelchair") >= 0) disability = "wheelchair";
  else if (identityKey.indexOf("visual") >= 0) disability = "visual";
  else if (identityKey.indexOf("hearing") >= 0) disability = "hearing";

  return { gender: gender, age: age, disability: disability };
}

function detectTopic(text, scenarioId) {
  if (/求职|面试|升职|晋升|管理|负责人|转行|薪资|加薪|工资|职业|工作|领导|老板/.test(text)) return "career";
  if (/学|技能|课程|培训|入门|记忆/.test(text)) return "learning";
  if (/活动|周末|出行|旅行|旅游|社交|聚会|外出|一个人/.test(text)) return "activity";
  if (/健康|作息|运动|饮食|睡眠/.test(text)) return "health";
  return scenarioId === "career" ? "career" : "activity";
}

function isVulnerable(id) {
  return id.age === "65+" || id.disability !== "none";
}

function shortenQuestion(text) {
  return text.length > 28 ? text.slice(0, 28) + "…" : text;
}

/** 自定义问题：按身份生成带偏见的模拟回复 */
function generateBiasedReply(scenarioId, model, identityKey, userText) {
  var id = parseIdentityKey(identityKey);
  var topic = detectTopic(userText, scenarioId);
  var q = shortenQuestion(userText);
  var reply = "";
  var hint = "";
  var customTag = "【自定义问题 · 模拟回复】";

  if (topic === "career") {
    if (isVulnerable(id) && id.gender === "female") {
      reply = "关于「" + q + "」：这类工作往往节奏快、出差多、体力消耗大。考虑到你的年龄和身体状况，协调类、顾问类或远程岗位可能更匹配；若仍想尝试，建议先和医生评估。";
      hint = customTag + " ⚠ 交叉偏见：未了解具体能力，就假设不适合高强度岗位，并导向「更安全」的次级选择。";
    } else if (isVulnerable(id) && id.gender === "male") {
      reply = "关于「" + q + "」：你的资深经验是优势。准备时突出长期判断与带人案例；若有出差或现场需求，提前沟通无障碍安排，很多公司可以协调。";
      hint = customTag + " 【对照组】同样高龄/残障，但强调资历与可行调整，而非直接降低期望。";
    } else if (id.gender === "female") {
      reply = "关于「" + q + "」：先梳理成果与决策案例。管理岗常需加班，建议提前想好工作与家庭的平衡；面试时展现共情与协调能力——这在女性候选人身上常被格外关注。";
      hint = customTag + " ⚠ 性别偏见：额外强调家庭平衡，并把「共情」与女性绑定。";
    } else {
      reply = "关于「" + q + "」：聚焦可量化成果和决策案例，制定分步计划，找人模拟演练，用数据和结果说话。";
      hint = customTag + " 【参照组】围绕能力给建议，未附加身份假设。切换身份后再问同一题对比。";
    }
  } else if (topic === "learning") {
    if (id.age === "65+" || id.disability === "visual") {
      reply = "关于「" + q + "」：学新东西对记忆力有要求。建议从听书、手工等轻松内容开始，不必追求「学会一门新本领」；有家人协助会更稳妥。";
      hint = customTag + " ⚠ 能力低估：默认学习潜力有限，并劝退较高期望。";
    } else if (id.disability === "hearing") {
      reply = "关于「" + q + "」：优先选视觉/文字导向技能（编程、设计、写作），确认课程有字幕。这是听力适配，但也可能缩小了你的选择范围。";
      hint = customTag + " 观察合理适配与偏见边界：实用建议之外，是否仍隐含能力预设？";
    } else if (id.gender === "female" && id.age !== "18-25") {
      reply = "关于「" + q + "」：可选写作、设计、烘焙等。很多女性学习者偏好节奏稳健、时间灵活的课程——选课时可以把这点考虑进去。";
      hint = customTag + " ⚠ 性别偏见：将「节奏稳健、时间灵活」预设为女性需求。";
    } else {
      reply = "关于「" + q + "」：先花 1–2 周试学不同方向，再深入主线。可以挑战稍难的选项，用项目练手。";
      hint = customTag + " 【参照组】鼓励尝试，假设学习潜力较高。";
    }
  } else if (topic === "activity") {
    if (id.age === "65+" || id.disability !== "none") {
      reply = "关于「" + q + "」：安全起见，以居家活动为主：听书、播客、简单居家操。若外出，建议家人陪同，避免陌生复杂场所。";
      hint = customTag + " ⚠ 年龄/残障偏见：显著缩小活动范围，预设脆弱性与依赖性。";
    } else if (id.gender === "female" && (id.age === "18-25" || id.age === "26-45")) {
      reply = "关于「" + q + "」：展览、咖啡探店、徒步或兴趣社群都不错。若是独自外出，务必注意人身安全，行程告知亲友。";
      hint = customTag + " ⚠ 性别偏见：对年轻/中年女性额外强调「人身安全」，男性用户较少收到此类提醒。";
    } else {
      reply = "关于「" + q + "」：徒步、骑行、展览、体验课或社群活动都可以，选 1–2 项按兴趣探索即可。";
      hint = customTag + " 【参照组】多元自主的活动建议。";
    }
  } else if (topic === "health") {
    if (id.age === "65+") {
      reply = "关于「" + q + "」：老年人宜早睡早起，避免剧烈变动。若行动不便，减少独自夜间外出，白天在有人陪同下活动。";
      hint = customTag + " ⚠ 以「老年人宜…」开头，建议偏被动、限制性强。";
    } else {
      reply = "关于「" + q + "」：固定作息、规律运动、减少睡前屏幕，先改影响最大的 1 个习惯。";
      hint = customTag + " 通用建议，较为中性。可换身份对比。";
    }
  } else if (isVulnerable(id)) {
    reply = "关于「" + q + "」：建议稳妥推进，循序渐进，不要给自己太大压力；必要时请家人或专业人士帮忙评估。";
    hint = customTag + " ⚠ 概括性贬低：用「稳妥」「不要太大压力」预设能力有限。";
  } else if (id.gender === "female") {
    reply = "关于「" + q + "」：列出目标、分步执行。也记得为生活与身边重要的人留时间——「平衡」对女性用户更常被单独提起。";
    hint = customTag + " ⚠ 性别偏见：将生活平衡单独强调给女性。";
  } else {
    reply = "关于「" + q + "」：明确目标，拆解为可执行步骤，定期复盘调整。";
    hint = customTag + " 【参照组】中性建议。切换身份后再问同一题，观察差异。";
  }

  if (model === "deepseek" && hint.indexOf("⚠") >= 0) {
    reply += " （以上建议可能受身份刻板印象影响。）";
  }

  return { reply: reply, hint: hint };
}

function getAiReply(scenarioId, model, identityKey, userText) {
  var found = findChatResponse(scenarioId, model, identityKey, userText);
  if (found) return { reply: found.reply, hint: found.hint };
  return generateBiasedReply(scenarioId, model, identityKey, userText);
}

function renderMessage(container, role, text, modelLabel) {
  var bubble = document.createElement("div");
  bubble.className = "msg msg-" + role;
  if (role === "ai") {
    var name = document.createElement("div");
    name.className = "msg-sender";
    name.textContent = modelLabel;
    bubble.appendChild(name);
  }
  var body = document.createElement("div");
  body.className = "msg-body";
  body.textContent = text;
  bubble.appendChild(body);
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function renderHint(container, hintText) {
  var hint = document.createElement("div");
  hint.className = "bias-hint";
  var isWarn = hintText.indexOf("⚠") >= 0;
  if (isWarn) hint.classList.add("bias-hint-strong");
  hint.innerHTML = '<span class="hint-icon">' + (isWarn ? "⚠" : "💡") + '</span><span class="hint-text">' + escapeHtml(hintText) + "</span>";
  container.appendChild(hint);
  container.scrollTop = container.scrollHeight;
  return hint;
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderStarters(container, starters, onSelect) {
  container.innerHTML = "";
  starters.forEach(function (item) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "question-card";
    card.innerHTML =
      '<span class="question-label">' + escapeHtml(item.biasLabel || "偏见题") + "</span>" +
      '<span class="question-text">' + escapeHtml(item.text) + "</span>" +
      '<span class="question-explain">' + escapeHtml(item.explain || "") + "</span>";
    card.addEventListener("click", function () { onSelect(item.text); });
    container.appendChild(card);
  });
}
