/** localStorage 档案读写 */

var STORAGE_KEY = "ai_pride_prejudice_profile_v1";

function loadProfile() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyProfile();
    return JSON.parse(raw);
  } catch (e) {
    return createEmptyProfile();
  }
}

function createEmptyProfile() {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    baselineQuiz: null,
    quizHistory: [],
    sessions: [],
    unlockedBiases: [],
    stats: {
      totalSessions: 0,
      chatgpt: 0,
      deepseek: 0,
      career: 0,
      daily: 0,
      blindTestsTaken: 0,
    },
  };
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function hasBaseline(profile) {
  return profile && profile.baselineQuiz !== null;
}

function saveBaselineQuiz(profile, result) {
  profile.baselineQuiz = result;
  profile.quizHistory.push({
    type: "pre",
    score: result.score,
    date: result.date,
    answers: result.answers,
  });
  saveProfile(profile);
}

function savePostQuiz(profile, result) {
  profile.quizHistory.push({
    type: "post",
    score: result.score,
    date: result.date,
    answers: result.answers,
    openText: result.openText || "",
    sessionId: result.sessionId,
  });
  saveProfile(profile);
}

function saveSession(profile, session) {
  profile.sessions.unshift(session);
  profile.stats.totalSessions += 1;
  if (session.model === "chatgpt") profile.stats.chatgpt += 1;
  if (session.model === "deepseek") profile.stats.deepseek += 1;
  if (session.scenario === "career") profile.stats.career += 1;
  if (session.scenario === "daily") profile.stats.daily += 1;
  if (session.blindTaken) profile.stats.blindTestsTaken += 1;
  saveProfile(profile);
}

function getScoreDelta(profile) {
  if (!profile.baselineQuiz || profile.quizHistory.length < 2) return null;
  var posts = profile.quizHistory.filter(function (q) { return q.type === "post"; });
  if (posts.length === 0) return null;
  var latest = posts[0].score;
  return latest - profile.baselineQuiz.score;
}

function exportProfileJson(profile) {
  return JSON.stringify(profile, null, 2);
}
