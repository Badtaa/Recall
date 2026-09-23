import { supabase, cloudEnabled } from "./supabase.js";

/* Recall talks to exactly one object: window.storage.
   Local mode  → this browser only.
   Cloud mode  → a Postgres row per key, per signed-in user, so a login
                 on any device pulls the same decks, coins and character.
   Cloud mode also mirrors to localStorage, so the app stays fast and
   keeps working if the network drops mid-session. */

const LK = (k) => "recall_store:" + k;

const local = {
  get(key) {
    const v = localStorage.getItem(LK(key));
    return v === null ? null : { key, value: v };
  },
  set(key, value) {
    try { localStorage.setItem(LK(key), value); } catch (e) { /* quota, ignore */ }
    return { key, value };
  },
  remove(key) { localStorage.removeItem(LK(key)); },
  list(prefix = "") {
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LK(prefix))) out.push(k.slice(LK("").length));
    }
    return out;
  },
};

let userId = null;
export function setStorageUser(id) { userId = id; }

window.storage = {
  async get(key) {
    if (cloudEnabled && userId) {
      const { data, error } = await supabase
        .from("saves").select("value").eq("user_id", userId).eq("key", key).maybeSingle();
      if (!error && data) {
        local.set(key, data.value);
        return { key, value: data.value };
      }
      if (error) return local.get(key);
      return local.get(key);
    }
    return local.get(key);
  },

  async set(key, value) {
    local.set(key, value);
    if (cloudEnabled && userId) {
      const { error } = await supabase
        .from("saves")
        .upsert({ user_id: userId, key, value, updated_at: new Date().toISOString() });
      if (error) throw error;
    }
    return { key, value };
  },

  async delete(key) {
    local.remove(key);
    if (cloudEnabled && userId) {
      await supabase.from("saves").delete().eq("user_id", userId).eq("key", key);
    }
    return { key, deleted: true };
  },

  async list(prefix = "") {
    if (cloudEnabled && userId) {
      const { data } = await supabase.from("saves").select("key").eq("user_id", userId);
      if (data) return { keys: data.map((r) => r.key).filter((k) => k.startsWith(prefix)), prefix };
    }
    return { keys: local.list(prefix), prefix };
  },
};
