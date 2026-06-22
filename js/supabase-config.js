/** Supabase 前端配置（anon key 可公开，由 RLS 保护数据） */

var SUPABASE_URL = "https://pmfkjmuivyeoelrlfizb.supabase.co";
var SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZmtqbXVpdnllb2VscmxmaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODg1MDksImV4cCI6MjA5NzU2NDUwOX0.aVr3X2C9bim8kN3wfiIDhk0AWJNkZrZk3nvSg3XgDUU";

(function () {
  if (typeof supabase !== "undefined" && SUPABASE_URL && SUPABASE_ANON_KEY) {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
})();
