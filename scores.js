import { supabase, cloudEnabled } from "./supabase.js";

/* The leaderboard only exists when Supabase is connected. Without it the
   app simply never shows the tab. Scores are one row per person per mode,
   so it's a personal best table rather than a log of every game. */

export function installScores() {
  if (!cloudEnabled) return;

  window.RECALL_SCORES = {
    async submit(mode, score, name, deck) {
      const { data } = await supabase.auth.getUser();
      const user = data && data.user;
      if (!user || !score) return false;

      const { data: existing } = await supabase
        .from("scores").select("score").eq("user_id", user.id).eq("mode", mode).maybeSingle();
      if (existing && existing.score >= score) return false;

      const { error } = await supabase.from("scores").upsert({
        user_id: user.id, mode, score,
        name: (name || "Anon").slice(0, 20),
        deck: (deck || "").slice(0, 40),
        updated_at: new Date().toISOString(),
      });
      return !error;
    },

    async top(mode, limit = 25) {
      const { data, error } = await supabase
        .from("scores").select("name, score, deck, user_id")
        .eq("mode", mode).order("score", { ascending: false }).limit(limit);
      if (error) return [];
      const me = (await supabase.auth.getUser()).data.user;
      return (data || []).map((r, i) => ({ ...r, rank: i + 1, mine: me && r.user_id === me.id }));
    },
  };
}
