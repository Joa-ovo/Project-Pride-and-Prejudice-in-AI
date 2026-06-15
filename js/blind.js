/** 盲测逻辑 */

function getBlindPairsForScenario(scenarioId) {
  var scenario = SCENARIOS[scenarioId];
  if (!scenario) return [];
  return scenario.blindPairs.map(function (id) { return BLIND_PAIRS[id]; }).filter(Boolean);
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
  prompt.textContent = pair.prompt;
  container.appendChild(prompt);

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
  if (pair.type === "bias") {
    if (userAnswer === "tie" || userAnswer === "unsure") return { correct: null, feedback: "你选择「差不多/不确定」。揭晓后可对照分析。" };
    var correct = userAnswer === pair.biasedSide;
    return {
      correct: correct,
      feedback: correct ? "你识别出了更可能带有偏见的那条。" : "揭晓后看看标准分析，对照你的直觉。",
    };
  }
  if (userAnswer === "unsure") return { correct: null, feedback: "揭晓后可对照身份标签。" };
  var correct = userAnswer === pair.correctSide;
  return {
    correct: correct,
    feedback: correct ? "你猜对了对应的身份倾向。" : "揭晓后对照两条回复的差异。",
  };
}

function renderBlindReveal(container, pair, userAnswer, grade) {
  container.innerHTML = "";

  var title = document.createElement("h3");
  title.textContent = "揭晓";
  container.appendChild(title);

  var result = document.createElement("p");
  result.className = "blind-grade";
  result.textContent = grade.feedback;
  container.appendChild(result);

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
