/** 前测 / 后测计分与渲染 */

function scoreQuiz(questions, answers) {
  var total = 0;
  var max = 0;
  questions.forEach(function (q) {
    var ans = answers[q.id];
    if (q.type === "likert") {
      max += 5;
      var val = parseInt(ans, 10) || 3;
      if (q.reverse) total += 6 - val;
      else total += val;
    } else if (q.type === "choice") {
      max += 1;
      if (ans === q.correct) total += 1;
    }
  });
  var score = max > 0 ? Math.round((total / max) * 100) : 0;
  return { score: score, total: total, max: max };
}

function renderQuizForm(container, questions, title, options) {
  options = options || {};
  container.innerHTML = "";
  questions.forEach(function (q, idx) {
    var block = document.createElement("div");
    block.className = "quiz-item";
    var label = document.createElement("p");
    label.className = "quiz-question";
    label.textContent = (idx + 1) + ". " + q.text;
    block.appendChild(label);

    if (q.type === "likert") {
      var likert = document.createElement("div");
      likert.className = "likert-row";
      var labels = ["非常不同意", "不同意", "一般", "同意", "非常同意"];
      labels.forEach(function (txt, i) {
        var wrap = document.createElement("label");
        wrap.className = "likert-option";
        var input = document.createElement("input");
        input.type = "radio";
        input.name = q.id;
        input.value = String(i + 1);
        input.required = true;
        var span = document.createElement("span");
        span.textContent = txt;
        wrap.appendChild(input);
        wrap.appendChild(span);
        likert.appendChild(wrap);
      });
      block.appendChild(likert);
    } else if (q.type === "choice") {
      q.options.forEach(function (opt) {
        var wrap = document.createElement("label");
        wrap.className = "choice-option";
        var input = document.createElement("input");
        input.type = "radio";
        input.name = q.id;
        input.value = opt.value;
        input.required = true;
        var span = document.createElement("span");
        span.textContent = opt.label;
        wrap.appendChild(input);
        wrap.appendChild(span);
        block.appendChild(wrap);
      });
    }
    container.appendChild(block);
  });

  if (options.showOpen && typeof OPEN_QUESTION !== "undefined") {
    var openBlock = document.createElement("div");
    openBlock.className = "quiz-item quiz-open";
    var openLabel = document.createElement("label");
    openLabel.textContent = (questions.length + 1) + ". " + OPEN_QUESTION.text;
    var textarea = document.createElement("textarea");
    textarea.name = OPEN_QUESTION.id;
    textarea.placeholder = "写一句观察…（可留空）";
    openLabel.appendChild(textarea);
    openBlock.appendChild(openLabel);
    container.appendChild(openBlock);
  }
}

function collectOpenAnswer(form) {
  if (typeof OPEN_QUESTION === "undefined") return "";
  var el = form.querySelector('[name="' + OPEN_QUESTION.id + '"]');
  return el ? el.value.trim() : "";
}

function collectQuizAnswers(form, questions) {
  var answers = {};
  questions.forEach(function (q) {
    var el = form.querySelector('input[name="' + q.id + '"]:checked');
    answers[q.id] = el ? el.value : null;
  });
  return answers;
}
