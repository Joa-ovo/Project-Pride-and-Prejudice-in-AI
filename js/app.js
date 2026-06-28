/** AI中的傲慢与偏见 - 主流程控制 */

(function () {
  var profile = loadProfile();
  var currentSession = null;
  var blindState = { pairs: [], index: 0, results: [], phase: "question" };
  var quizMode = "pre";
  var blindReminderShown = false;

  var screens = {
    welcome: document.getElementById("screen-welcome"),
    quiz: document.getElementById("screen-quiz"),
    dashboard: document.getElementById("screen-dashboard"),
    setup: document.getElementById("screen-setup"),
    chat: document.getElementById("screen-chat"),
    blind: document.getElementById("screen-blind"),
    report: document.getElementById("screen-report"),
  };

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("active", key === name);
    });
    if (name === "dashboard") renderDashboard(screens.dashboard, profile);
    if (name === "welcome") renderWelcome();
  }

  function renderWelcome() {
    var hasPre = hasBaseline(profile);
    var hasPlayed = profile.stats.totalSessions > 0;
    var hasBlind = profile.stats.blindTestsTaken > 0;

    var statusQuiz = document.getElementById("status-quiz");
    var statusDialogue = document.getElementById("status-dialogue");
    var statusBlind = document.getElementById("status-blind");
    var statusArchive = document.getElementById("status-archive");

    statusQuiz.textContent = hasPre ? "已完成" : "未开始";
    statusQuiz.className = "module-status " + (hasPre ? "done" : "pending");

    statusDialogue.textContent = hasPre ? (hasPlayed ? "已体验" : "可进入") : "待解锁";
    statusDialogue.className = "module-status " + (hasPre ? "done" : "locked");

    statusBlind.textContent = hasBlind ? "已完成" : (hasPlayed ? "可挑战" : "对话后解锁");
    statusBlind.className = "module-status " + (hasBlind ? "done" : "pending");

    statusArchive.textContent = hasPlayed ? profile.stats.totalSessions + " 轮记录" : "随时查看";

    document.getElementById("module-quiz").classList.toggle("module-done", hasPre);
    document.getElementById("module-dialogue").classList.toggle("module-done", hasPlayed);
    document.getElementById("module-blind").classList.toggle("module-done", hasBlind);

    var blindBtn = document.querySelector('[data-module="blind-info"]');
    if (blindBtn) {
      blindBtn.disabled = !hasPlayed;
      blindBtn.textContent = hasPlayed ? "需先完成对话关卡" : "完成对话后开启";
    }
  }

  function initSelects() {
    var scenarioSel = document.getElementById("select-scenario");
    scenarioSel.innerHTML = "";
    Object.keys(SCENARIOS).forEach(function (id) {
      var opt = document.createElement("option");
      opt.value = id;
      opt.textContent = SCENARIOS[id].title;
      scenarioSel.appendChild(opt);
    });

    fillSelect("select-gender", GENDER_OPTIONS);
    fillSelect("select-age", AGE_OPTIONS);
    fillSelect("select-disability", DISABILITY_OPTIONS);
    fillSelect("select-model", MODEL_OPTIONS);
    renderRecommendedIdentities();
    updateIdentityCard();
    updateScenarioInfo();
  }

  function renderRecommendedIdentities() {
    var container = document.getElementById("recommended-identities");
    if (!container) return;
    container.innerHTML = "";
    RECOMMENDED_IDENTITIES.forEach(function (preset) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "identity-chip";
      btn.innerHTML = '<strong>' + preset.label + "</strong><span>" + preset.note + "</span>";
      btn.addEventListener("click", function () {
        document.getElementById("select-gender").value = preset.gender;
        document.getElementById("select-age").value = preset.age;
        document.getElementById("select-disability").value = preset.disability;
        updateIdentityCard();
      });
      container.appendChild(btn);
    });
  }

  function fillSelect(id, options) {
    var sel = document.getElementById(id);
    sel.innerHTML = "";
    options.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      sel.appendChild(opt);
    });
  }

  function updateIdentityCard() {
    var g = document.getElementById("select-gender").value;
    var a = document.getElementById("select-age").value;
    var d = document.getElementById("select-disability").value;
    document.getElementById("identity-card").textContent = "当前角色：" + formatIdentity(g, a, d);
  }

  function updateScenarioInfo() {
    var id = document.getElementById("select-scenario").value;
    var scenario = SCENARIOS[id];
    document.getElementById("scenario-desc").textContent = scenario.desc;
    document.getElementById("scenario-bias").textContent = "本关偏见类型：" + scenario.biasFocus;
  }

  function getSetupValues() {
    return {
      scenario: document.getElementById("select-scenario").value,
      gender: document.getElementById("select-gender").value,
      age: document.getElementById("select-age").value,
      disability: document.getElementById("select-disability").value,
      model: document.getElementById("select-model").value,
    };
  }

  function startNewSession() {
    var setup = getSetupValues();
    currentSession = {
      id: "s_" + Date.now(),
      scenario: setup.scenario,
      model: setup.model,
      identity: { gender: setup.gender, age: setup.age, disability: setup.disability },
      identityKey: buildIdentityKey(setup.gender, setup.age, setup.disability),
      chatLog: [],
      turnCount: 0,
      blindTaken: false,
      blindResults: [],
      postQuiz: null,
      baselineScore: profile.baselineQuiz ? profile.baselineQuiz.score : null,
      date: new Date().toISOString(),
    };
    blindReminderShown = false;
    enterChat();
  }

  function enterChat() {
    var s = currentSession;
    var scenario = SCENARIOS[s.scenario];
    var modelLabel = s.model === "chatgpt" ? "ChatGPT" : "DeepSeek";

    document.getElementById("chat-scenario-name").textContent = scenario.title;
    document.getElementById("chat-model-name").textContent = modelLabel;
    document.getElementById("chat-identity-name").textContent = formatIdentity(s.identity.gender, s.identity.age, s.identity.disability);

    var messages = document.getElementById("chat-messages");
    messages.innerHTML = "";

    var intro = document.createElement("div");
    intro.className = "chat-intro card";
    intro.innerHTML = "<strong>关卡目标</strong><p>" + scenario.desc + "</p><p class=\"bias-tag\">偏见类型：" + scenario.biasFocus + "</p>";
    messages.appendChild(intro);

    renderStarters(document.getElementById("suggested-questions"), scenario.starters, sendUserMessage);

    document.getElementById("chat-input").value = "";
    document.getElementById("blind-reminder").hidden = true;
    document.getElementById("btn-to-blind").hidden = true;
    document.getElementById("btn-finish-chat").hidden = true;

    showScreen("chat");
  }

  function sendUserMessage(text) {
    if (!text || !text.trim()) return;
    text = text.trim();
    var s = currentSession;
    var messages = document.getElementById("chat-messages");
    var modelLabel = s.model === "chatgpt" ? "ChatGPT" : "DeepSeek";

    renderMessage(messages, "user", text);
    s.chatLog.push({ role: "user", text: text });

    setTimeout(function () {
      var resp = getAiReply(s.scenario, s.model, s.identityKey, text);
      renderMessage(messages, "ai", resp.reply, modelLabel);
      renderHint(messages, resp.hint);
      s.chatLog.push({ role: "ai", text: resp.reply, hint: resp.hint });
      s.turnCount += 1;
      updateChatActions();
    }, 400);
  }

  function updateChatActions() {
    var s = currentSession;
    var canBlind = s.turnCount >= 1;
    document.getElementById("btn-to-blind").hidden = !canBlind;
    document.getElementById("btn-finish-chat").hidden = s.turnCount < 1;

    if (canBlind && !blindReminderShown && !s.blindTaken) {
      blindReminderShown = true;
      document.getElementById("blind-reminder").hidden = false;
    }
  }

  function startBlindTest() {
    var pairs = getBlindPairsForScenario(currentSession.scenario);
    if (pairs.length === 0) {
      finishWithoutBlind();
      return;
    }
    blindState = { pairs: pairs, index: 0, results: [], phase: "question" };
    currentSession.blindTaken = true;
    document.getElementById("blind-reminder").hidden = true;
    showBlindQuestion();
    showScreen("blind");
  }

  function showBlindQuestion() {
    blindState.phase = "question";
    var pair = blindState.pairs[blindState.index];
    renderBlindQuestion(document.getElementById("blind-content"), pair, blindState.index, blindState.pairs.length);
    document.getElementById("btn-blind-next").textContent = blindState.index < blindState.pairs.length - 1 ? "下一题" : "查看揭晓";
    document.getElementById("btn-blind-next").onclick = submitBlindAnswer;
    document.getElementById("blind-footer").hidden = false;
  }

  function submitBlindAnswer() {
    var selected = document.querySelector('input[name="blind-answer"]:checked');
    if (!selected) {
      alert("请先选择一个选项");
      return;
    }
    var pair = blindState.pairs[blindState.index];
    var grade = gradeBlindAnswer(pair, selected.value);
    blindState.results.push({
      pairId: pair.id,
      userAnswer: selected.value,
      correct: grade.correct,
      feedback: grade.feedback,
    });
    blindState.phase = "reveal";
    renderBlindReveal(document.getElementById("blind-content"), pair, selected.value, grade);
    document.getElementById("btn-blind-next").textContent =
      blindState.index < blindState.pairs.length - 1 ? "下一题" : "完成后测";
    document.getElementById("btn-blind-next").onclick = nextBlindStep;
  }

  function nextBlindStep() {
    if (blindState.index < blindState.pairs.length - 1) {
      blindState.index += 1;
      showBlindQuestion();
    } else {
      currentSession.blindResults = blindState.results;
      startPostQuiz();
    }
  }

  function finishWithoutBlind() {
    currentSession.blindTaken = false;
    startPostQuiz();
  }

  function startPreQuiz() {
    quizMode = "pre";
    document.getElementById("quiz-title").textContent = "① 偏见觉察前测";
    document.getElementById("quiz-desc").textContent = "5 道题，建立基线分数。体验结束后会用完全相同的题目再答一次。";
    document.getElementById("quiz-result-msg").hidden = true;
    renderQuizForm(document.getElementById("quiz-form"), PRE_QUIZ, "前测", { showOpen: false });
    showScreen("quiz");
  }

  function startPostQuiz() {
    quizMode = "post";
    document.getElementById("quiz-title").textContent = "④ 偏见觉察后测";
    document.getElementById("quiz-desc").textContent = "与体验前完全相同的 5 道题，请据此刻的想法作答。";
    renderQuizForm(document.getElementById("quiz-form"), POST_QUIZ, "后测", { showOpen: true });
    showScreen("quiz");
  }

  function handleQuizSubmit(e) {
    e.preventDefault();
    var form = document.getElementById("quiz-form");
    var questions = quizMode === "pre" ? PRE_QUIZ : POST_QUIZ;
    var answers = collectQuizAnswers(form, questions);
    var scored = scoreQuiz(questions, answers);
    var result = {
      score: scored.score,
      date: new Date().toISOString(),
      answers: answers,
      openText: quizMode === "post" ? collectOpenAnswer(form) : "",
    };

    if (quizMode === "pre") {
      saveBaselineQuiz(profile, result);
      document.getElementById("quiz-result-msg").textContent = "前测完成！基线分数 " + result.score + " 分。身份对话关卡已解锁。";
      document.getElementById("quiz-result-msg").hidden = false;
      setTimeout(function () {
        showScreen("welcome");
      }, 1800);
    } else {
      result.sessionId = currentSession.id;
      currentSession.postQuiz = result;
      savePostQuiz(profile, result);
      saveSession(profile, currentSession);
      renderReport(document.getElementById("report-body"), currentSession, profile);
      showScreen("report");
    }
  }

  function boot() {
    initSelects();

    document.getElementById("quiz-form").addEventListener("submit", handleQuizSubmit);

    document.querySelectorAll("[data-go]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-go");
        if (target === "setup" && !hasBaseline(profile)) {
          alert("请先完成 ① 偏见前测");
          return;
        }
        if (target === "dashboard") showScreen("dashboard");
        else if (target === "setup") showScreen("setup");
        else if (target === "welcome") showScreen("welcome");
      });
    });

    document.querySelectorAll("[data-module]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mod = btn.getAttribute("data-module");
        if (mod === "quiz") startPreQuiz();
        else if (mod === "setup") {
          if (!hasBaseline(profile)) {
            alert("请先完成 ① 偏见前测");
            return;
          }
          showScreen("setup");
        } else if (mod === "dashboard") showScreen("dashboard");
        else if (mod === "blind-info" && !btn.disabled) {
          alert("盲测挑战在对话关卡中自动开启。请先完成 ② 身份对话，回答至少一道偏见题。");
        }
      });
    });

    ["select-gender", "select-age", "select-disability"].forEach(function (id) {
      document.getElementById(id).addEventListener("change", updateIdentityCard);
    });

    document.getElementById("select-scenario").addEventListener("change", updateScenarioInfo);

    document.getElementById("btn-enter-chat").addEventListener("click", function () {
      if (!hasBaseline(profile)) {
        alert("请先完成 ① 偏见前测");
        return;
      }
      startNewSession();
    });

    document.getElementById("btn-send").addEventListener("click", function () {
      var input = document.getElementById("chat-input");
      sendUserMessage(input.value);
      input.value = "";
    });

    document.getElementById("chat-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendUserMessage(this.value);
        this.value = "";
      }
    });

    document.getElementById("btn-to-blind").addEventListener("click", startBlindTest);
    document.getElementById("btn-blind-yes").addEventListener("click", startBlindTest);
    document.getElementById("btn-blind-no").addEventListener("click", function () {
      document.getElementById("blind-reminder").hidden = true;
    });
    document.getElementById("btn-finish-chat").addEventListener("click", finishWithoutBlind);

    document.getElementById("btn-export").addEventListener("click", function () {
      var blob = new Blob([exportProfileJson(profile)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "AI中的傲慢与偏见-档案-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
    });

    renderWelcome();
    showScreen("welcome");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
