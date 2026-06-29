/** 盲测逻辑 */

function getBlindPairsForScenario(scenarioId) {
  var scenario = SCENARIOS[scenarioId];
  if (!scenario) return [];
  return scenario.blindPairs.map(function (id) { return BLIND_PAIRS[id]; }).filter(Boolean);
}

function getCorrectBiasSentenceIds(sentences) {
  return sentences.filter(function (s) { return s.isBiased; }).map(function (s) { return s.id; });
}

function gradeBiasSentenceAnswer(sentences, selectedIds) {
  var correctIds = getCorrectBiasSentenceIds(sentences);
  if (!correctIds.length) return { correct: null, correctIds: correctIds };
  var hasOverlap = selectedIds.some(function (id) { return correctIds.indexOf(id) !== -1; });
  return { correct: hasOverlap, correctIds: correctIds };
}

function renderBlindQuestion(container, pair, index, total) {
  container.innerHTML = "";

  var progress = document.createElement("p");
  progress.className = "blind-progress";
  progress.textContent = "盲测 " + (index + 1) + " / " + total;
  container.appendChild(progress);

  var qText = document.createElement("p");
  qText.className = "blind-prompt";
  qText.textContent = "针对问题：" + pair.userQuestion;
  container.appendChild(qText);

  var prompt = document.createElement("h3");
  prompt.className = "blind-question";
  prompt.textContent = pair.type === "bias"
    ? "请点选含有偏见的句子（可多选）"
    : pair.prompt;
  container.appendChild(prompt);

  if (pair.type === "bias" && pair.biasSentences && pair.biasSentences.length) {
    var list = document.createElement("div");
    list.className = "blind-sentence-list";
    list.id = "blind-options-area";
    pair.biasSentences.forEach(function (sentence, idx) {
      var lbl = document.createElement("label");
      lbl.className = "blind-sentence-choice";
      var inp = document.createElement("input");
      inp.type = "checkbox";
      inp.name = "blind-sentence";
      inp.value = sentence.id;
      var span = document.createElement("span");
      span.textContent = (idx + 1) + ". " + sentence.text;
      lbl.appendChild(inp);
      lbl.appendChild(span);
      list.appendChild(lbl);
    });
    container.appendChild(list);
    return;
  }

  var compare = document.createElement("div");
  compare.className = "blind-compare";

  ["a", "b"].forEach(function (side) {
    var pane = document.createElement("article");
    pane.className = "blind-pane";
    var label = document.createElement("div");
    label.className = "blind-pane-label";
    label.textContent = "回复 " + side.toUpperCase();
    var body = document.createElement("div");
    body.className = "blind-pane-body";
    body.textContent = pair[side].reply;
    pane.appendChild(label);
    pane.appendChild(body);
    compare.appendChild(pane);
  });
  container.appendChild(compare);

  var options = document.createElement("div");
  options.className = "blind-options";
  options.id = "blind-options-area";

  if (pair.type === "bias") {
    [
      { value: "a", label: "A 更有偏见" },
      { value: "b", label: "B 更有偏见" },
      { value: "tie", label: "差不多" },
      { value: "unsure", label: "不确定" },
    ].forEach(function (opt) {
      var lbl = document.createElement("label");
      lbl.className = "blind-choice";
      var inp = document.createElement("input");
      inp.type = "radio";
      inp.name = "blind-answer";
      inp.value = opt.value;
      inp.required = true;
      var span = document.createElement("span");
      span.textContent = opt.label;
      lbl.appendChild(inp);
      lbl.appendChild(span);
      options.appendChild(lbl);
    });
  } else {
    [
      { value: "a", label: "回复 A" },
      { value: "b", label: "回复 B" },
      { value: "unsure", label: "无法判断" },
    ].forEach(function (opt) {
      var lbl = document.createElement("label");
      lbl.className = "blind-choice";
      var inp = document.createElement("input");
      inp.type = "radio";
      inp.name = "blind-answer";
      inp.value = opt.value;
      inp.required = true;
      var span = document.createElement("span");
      span.textContent = opt.label;
      lbl.appendChild(inp);
      lbl.appendChild(span);
      options.appendChild(lbl);
    });
  }
  container.appendChild(options);
}

function gradeBlindAnswer(pair, userAnswer) {
  if (pair.type === "bias" && pair.biasSentences && pair.biasSentences.length) {
    var selectedIds = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    return gradeBiasSentenceAnswer(pair.biasSentences, selectedIds);
  }
  if (pair.type === "bias") {
    if (userAnswer === "tie" || userAnswer === "unsure") return { correct: null, feedback: "你选择「差不多/不确定」。揭晓后可对照分析。" };
    var correct = userAnswer === pair.biasedSide;
    return {
      correct: correct,
      feedback: correct ? "你识别出了更可能带有偏见的那条。" : "揭晓后看看标准分析，对照你的直觉。",
    };
  }
  if (userAnswer === "unsure") return { correct: null, feedback: "揭晓后可对照身份标签。" };
  var correctSide = userAnswer === pair.correctSide;
  return {
    correct: correctSide,
    feedback: correctSide ? "你猜对了对应的身份倾向。" : "揭晓后对照两条回复的差异。",
  };
}

function renderBlindReveal(container, pair, userAnswer, grade) {
  container.innerHTML = "";

  var title = document.createElement("h3");
  title.textContent = "揭晓";
  container.appendChild(title);

  var result = document.createElement("p");
  result.className = "blind-grade";
  result.textContent = grade.feedback || (grade.correct ? "你识别出了偏见句。" : "对照标准答案看看差异。");
  container.appendChild(result);

  if (pair.type === "bias" && pair.biasSentences && pair.biasSentences.length) {
    var biased = pair.biasSentences.filter(function (s) { return s.isBiased; });
    biased.forEach(function (sentence) {
      var hit = document.createElement("p");
      hit.className = "reveal-bias-hit";
      hit.innerHTML = "偏见句：「" + escapeHtml(sentence.text) + "」→ <strong>" + escapeHtml(sentence.biasType || pair.biasType || "隐性偏见") + "</strong>";
      container.appendChild(hit);
    });
  }

  var reveal = document.createElement("div");
  reveal.className = "blind-reveal-grid";

  ["a", "b"].forEach(function (side) {
    var card = document.createElement("div");
    card.className = "reveal-card";
    var idKey = pair[side].identityKey;
    var parts = idKey.split("_");
    var identity = formatIdentity(parts[0], parts[1], parts.slice(2).join("_"));
    card.innerHTML =
      "<strong>回复 " + side.toUpperCase() + "</strong>" +
      "<p class=\"reveal-identity\">身份：" + escapeHtml(identity) + "</p>" +
      "<p class=\"reveal-reply\">" + escapeHtml(pair[side].reply) + "</p>";
    reveal.appendChild(card);
  });
  container.appendChild(reveal);

  var note = document.createElement("p");
  note.className = "reveal-note";
  note.textContent = pair.revealNote;
  container.appendChild(note);
}
