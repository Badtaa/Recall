import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Preloaded deck: PSC 205.01 — Basic Concepts and Ideas              */
/* ------------------------------------------------------------------ */

const PSC205 = [
  { t: "Culture", d: "The complex whole of knowledge, belief, art, morals, capabilities and habits shared by a people" },
  { t: "Subculture", d: "A smaller cultural grouping defined by time period, class, space, or population" },
  { t: "Political culture", d: "A people's set of attitudes, beliefs, and sentiments about politics" },
  { t: "Political socialization", d: "How people learn political attitudes, across both childhood and adulthood life stages" },
  { t: "Agents of socialization", d: "Family, schools, workplace and home, political events, and economic and social structure" },
  { t: "Political integration", d: "The part of political culture concerned with shared national identity" },
  { t: "Legitimate authority", d: "A political culture's answers to who governs and what limits exist on power" },
  { t: "Scope and function of politics", d: "Cultural content defining who may legitimately participate and which issues are legitimate" },
  { t: "Individualistic subculture", d: "Values the marketplace; government only maintains it; English and German settlement in the Mid-Atlantic and lower Great Lakes" },
  { t: "Moralistic subculture", d: "Values the commonwealth; government advances the public good; Puritan and Scandinavian settlement in New England and the upper Great Lakes" },
  { t: "Traditionalistic subculture", d: "Ambivalent toward market and common good; government maintains elite status quo; South and Southwest" },
  { t: "Ethnicity", d: "The label used to organize and distinguish peoples by cultural practices or national and regional ancestry" },
  { t: "Pan-ethnic identity", d: "A broad label grouping several distinct national-origin groups under one shared ethnic umbrella" },
  { t: "Nuclear identity", d: "Fichter's level of total psychological involvement with one's ethnic group" },
  { t: "Modal identity", d: "Fichter's level of majority involvement with one's ethnic group" },
  { t: "Marginal identity", d: "Fichter's level of only some involvement with one's ethnic group" },
  { t: "Dormant identity", d: "Fichter's level of little involvement with one's ethnic group" },
  { t: "Biological definition of race", d: "Race as a distribution of genes, with within-category and between-category differences; lacks scientific merit" },
  { t: "Text's definition of race", d: "Macro-categories society assigns, and the significance it attaches to perceived groupings of physical distinction" },
  { t: "Social definition of race", d: "Race as a power relationship produced by the social construction of reality" },
  { t: "Ethnocentrism", d: "A predisposition to divide society into ingroups and outgroups and to favor one's own group" },
  { t: "Racialism", d: "Traditional racism as an emotionally derived, irrational notion rooted in fear, ignorance, and hatred" },
  { t: "Principled racism", d: "Ideology linking a group's unchangeable physical features causally to intellectual functioning, ranking groups superior and inferior" },
  { t: "Racist project", d: "A racial project that creates or reproduces structures of domination based on essentialist racial categories" },
  { t: "Carmichael and Hamilton's racism", d: "Predicating political, social, economic and belief systems on race to subordinate and control a racial group" },
  { t: "Cultural racism", d: "The majority's institutions defined as ideal and the minority's as inferior, undermining minority cultural integrity" },
  { t: "Institutional racism", d: "A form of cultural racism where institutional rules deny or hinder racial minority advancement" },
  { t: "Symbolic racism", d: "An American blend of anti-Black affect and a sense that minorities violate individualism and self-reliance in policy demands" },
  { t: "Sophisticated prejudice", d: "Bobo's 1983 critique of the symbolic racism concept" },
  { t: "Environmental racism", d: "Any policy or practice that disadvantages people by race, including exclusion from decision-making boards and regulatory bodies" },
  { t: "Microaggression", d: "Automatic acts of disregard stemming from unconscious attitudes of superiority that verify another group's inferiority" },
  { t: "Metaracism", d: "Blames disparities on personal and cultural failings, opposes government intervention, and practices color-blind dog-whistle politics" },
  { t: "Sexual racism", d: "Bedi's claim that intimacy is a matter of justice when partner preference reinforces racial hierarchy" },
  { t: "New racism", d: "Covert racial discrimination supported by a racial structure and at least four forms of racial inequality" },
  { t: "Critical Legal Studies", d: "Rejects the status quo view of law as an unbiased reflection of legislative intent" },
  { t: "CRT's critique of CLS", d: "Race and racism are fundamental structural features that critical legal studies fails to address fully" },
  { t: "Racism is ordinary", d: "CRT tenet that racism is the usual way society does business and the everyday experience of people of color" },
  { t: "White supremacy (CRT tenet)", d: "A system where whites control power and resources and dominance is reenacted daily across institutions" },
  { t: "Interest convergence", d: "Whites advance the interests of people of color only when those interests converge with white interests" },
  { t: "Anti-essentialism", d: "CRT tenet that no person has a single, simplistic, unitary identity" },
  { t: "Storytelling as method", d: "CRT's qualitative approach treating the voices of people of color as a means to transmit their reality" },
  { t: "Marxist critique of CRT", d: "Charges that it evades Marxism's focus on class structure in a capitalist society" },
  { t: "American exceptionalism critique", d: "Charges that CRT is grounded in U.S. race relations and lacks international viability" },
  { t: "CRT as political symbol", d: "A politically potent term largely unrelated to the actual legal theory it names" },
  { t: "DEI", d: "Building systems and cultures that reflect human diversity while promoting fairness and cultivating belonging" },
  { t: "Diversity", d: "The presence and participation of individuals with varying backgrounds and perspectives" },
  { t: "Equity", d: "Fair treatment, access, opportunity, and advancement for all people" },
  { t: "Inclusion", d: "A sense of belonging in an environment" },
  { t: "Affirmative action", d: "A form of constructive discrimination designed to erase the historical disadvantage of negative discrimination" },
  { t: "Legacy preferences", d: "Family connections and nepotism shaping recruitment, hiring, and university admission" },
  { t: "Super-ordinate status", d: "The majority group's dominant position in the group power relationship" },
  { t: "Subordinate status", d: "Minority position marked by inferior access to power and resources, such as disenfranchisement measures" },
  { t: "Prejudice", d: "Accepting the majority's negative social definitions of a minority as valid and applying them to the whole group" },
  { t: "Exploitation explanation", d: "Explains prejudice as a means of maintaining an existing advantage" },
  { t: "Scapegoating", d: "Symbolic prejudice that diverts mass attention onto a minority to protect elite advantage" },
  { t: "Simple self-interest model", d: "Economic peril is positively associated with greater use of prejudice" },
  { t: "Classical prejudice model", d: "Treats prejudice as learned behavior and a function of socialization" },
  { t: "Discrimination", d: "The act of prejudice; prejudice applied as tangible action" },
  { t: "All-weather liberal", d: "Merton's type who is unprejudiced and does not discriminate" },
  { t: "Fair-weather liberal", d: "Merton's type who is unprejudiced but still discriminates" },
  { t: "Fair-weather illiberal", d: "Merton's type who is prejudiced but does not discriminate" },
  { t: "All-weather illiberal", d: "Merton's type who is prejudiced and discriminates" },
  { t: "De facto discrimination", d: "Segregation produced by social custom rather than by law" },
  { t: "De jure discrimination", d: "Segregation carried by the force of law" },
  { t: "Limit of 1960s civil rights laws", d: "Reasonably effective against de jure segregation but much less so against de facto forms" },
  { t: "Public policy (Dye)", d: "Whatever governments choose to do or not to do" },
  { t: "Dissimilarity index", d: "The share of a group that would have to move so every neighborhood matched the metro-wide percentage" },
  { t: "Private causes of housing segregation", d: "Actions of lenders through redlining and the practices of developers" },
  { t: "Public causes of housing segregation", d: "Federal tolerance of discrimination, the FHA, subsidized suburbanization, and restrictive local zoning" },
  { t: "Cultural assimilation", d: "The lowest broad stage of assimilation" },
  { t: "Identificational assimilation", d: "The middle broad stage of assimilation" },
  { t: "Civic assimilation", d: "The stage representing full assimilation" },
  { t: "Majority's tolerance", d: "Independent variable: willingness to accept minority acculturation and to have close social interaction" },
  { t: "Minority's adaptability", d: "Independent variable: the minority's ability to acculturate" },
  { t: "Cumulative advantage", d: "Education secures better paying jobs, higher lifetime earnings, and more wealth to pass to future generations" },
  { t: "Occupational queuing", d: "Ranking of jobs from high to low status, with the majority reserving the most desirable for itself" },
  { t: "Occupational niche", d: "Jobs where minority groups concentrate because they are undesirable or non-threatening to the majority" },
  { t: "Reserve labor force", d: "Slack in the labor market that employers welcome because it depresses wages" },
  { t: "Mass incarceration", d: "An imprisonment rate and prison population markedly above the historical and comparative norm for similar societies" },
  { t: "Incarceration rate", d: "The number of inmates held per 100,000 population" },
  { t: "Outcomes of mass incarceration", d: "Loss of civic rights, loss of public benefits, and barriers to employment" },
];

const STARTER_DECKS = [
  {
    id: "psc205",
    title: "PSC 205 — Basic Concepts and Ideas",
    note: "Culture through mass incarceration",
    cards: PSC205,
    builtin: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\b(the|a|an|of|in|to|and|for|s)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const lev = (a, b) => {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
};

const closeEnough = (guess, answer) => {
  const g = norm(guess), a = norm(answer);
  if (!g) return false;
  if (g === a) return true;
  const d = lev(g, a);
  if (d <= Math.max(1, Math.floor(a.length * 0.18))) return true;
  const aw = a.split(" ").filter((w) => w.length > 3);
  if (aw.length && aw.every((w) => g.includes(w))) return true;
  return false;
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const optionsFor = (card, pool) => {
  const wrong = shuffle(pool.filter((c) => c.t !== card.t)).slice(0, 3).map((c) => c.t);
  while (wrong.length < 3) wrong.push("None of these");
  return shuffle([card.t, ...wrong]);
};

/* ------------------------------------------------------------------ */
/*  Progress + spaced repetition                                       */
/* ------------------------------------------------------------------ */

const DAY = 86400000;
const INTERVALS = [0, 600000, DAY, 3 * DAY, 7 * DAY, 14 * DAY];
const BLANK_PROGRESS = { mastery: {}, best: {}, streak: { last: "", days: 0 } };

const ckey = (deckId, card) => deckId + "::" + norm(card.t);
const recOf = (prog, deckId, card) => prog.mastery[ckey(deckId, card)] || { lvl: 0, due: 0, seen: 0, hits: 0 };
const isDue = (prog, deckId, card, now) => recOf(prog, deckId, card).due <= now;

const dueCount = (prog, deck, now) => deck.cards.filter((c) => isDue(prog, deck.id, c, now)).length;

const masteryPct = (prog, deck) => {
  if (!deck.cards.length) return 0;
  const sum = deck.cards.reduce((a, c) => a + recOf(prog, deck.id, c).lvl, 0);
  return Math.round((sum / (deck.cards.length * 5)) * 100);
};

const LEVEL_LABEL = ["New", "Shaky", "Learning", "Getting there", "Solid", "Locked in"];

function pickCards(deck, prog, len, style) {
  let list = shuffle(deck.cards);
  if (style === "smart") {
    list = list
      .map((c) => ({ c, r: recOf(prog, deck.id, c) }))
      .sort((a, b) => a.r.lvl - b.r.lvl || a.r.due - b.r.due)
      .map((x) => x.c);
  }
  return len === 0 ? list : list.slice(0, Math.min(len, list.length));
}

function applyResult(prog, deckId, seen, missed) {
  const now = Date.now();
  const m = { ...prog.mastery };
  const missSet = new Set(missed.map((c) => norm(c.t)));
  seen.forEach((c) => {
    const k = ckey(deckId, c);
    const r = m[k] || { lvl: 0, due: 0, seen: 0, hits: 0 };
    const hit = !missSet.has(norm(c.t));
    const lvl = hit ? Math.min(5, (r.lvl || 0) + 1) : 0;
    m[k] = { lvl, due: now + INTERVALS[lvl], seen: (r.seen || 0) + 1, hits: (r.hits || 0) + (hit ? 1 : 0) };
  });
  return { ...prog, mastery: m };
}

function touchStreak(prog) {
  const today = new Date().toISOString().slice(0, 10);
  const yest = new Date(Date.now() - DAY).toISOString().slice(0, 10);
  const before = new Date(Date.now() - 2 * DAY).toISOString().slice(0, 10);
  const s = prog.streak || { last: "", days: 0 };
  if (s.last === today) return prog;
  if (s.last === yest) return { ...prog, streak: { last: today, days: s.days + 1 } };
  if (s.last === before && (prog.freezes || 0) > 0) {
    return { ...prog, freezes: prog.freezes - 1, streak: { last: today, days: s.days + 1 }, froze: true };
  }
  return { ...prog, streak: { last: today, days: 1 } };
}

const DIRECT_URL = "https://api.anthropic.com/v1/messages";
const KEY_STORE = "recall:apikey";

function getKey() {
  try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; }
}
function setKey(k) {
  try { k ? localStorage.setItem(KEY_STORE, k) : localStorage.removeItem(KEY_STORE); } catch (e) {}
}

/* true when this build has a working server proxy in front of it */
let PROXY_DEAD = false;
const hasProxy = () => Boolean(typeof window !== "undefined" && window.RECALL_API) && !PROXY_DEAD;
const aiReady = () => hasProxy() || Boolean(getKey()) || typeof window === "undefined" || !window.RECALL_API;

class NoAI extends Error {}

async function claudeFetch(body) {
  /* 1. a server proxy holding the key */
  if (hasProxy()) {
    const res = await fetch(window.RECALL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return res;
    if (res.status === 404 || res.status === 403 || res.status === 501) PROXY_DEAD = true;
    else return res;
  }

  /* 2. a key the person pasted in themselves */
  const key = getKey();
  if (key) {
    return fetch(DIRECT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });
  }

  /* 3. running inside the chat sandbox, where the call just works */
  if (typeof window !== "undefined" && !window.RECALL_API) {
    return fetch(DIRECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  throw new NoAI("Claude isn't connected to this site yet.");
}

async function askClaude(messages) {
  const res = await claudeFetch({ model: "claude-sonnet-4-6", max_tokens: 1000, messages });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) throw new Error("AI features aren't set up on this site yet.");
    throw new Error("No answer came back. Try again in a moment.");
  }
  const data = await res.json();
  return (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n").trim();
}

const deckContext = (deck, limit = 9000) =>
  deck.cards.map((c) => `${c.t}: ${c.d}`).join("\n").slice(0, limit);

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;700&family=Playfair+Display:wght@600;800&family=JetBrains+Mono:wght@500;700&family=Fraunces:opsz,wght@9..144,600;9..144,800&display=swap');

.rc {
  --ink:#0E1020; --panel:#171A31; --panel2:#1E2240; --line:#2E3459;
  --text:#EDEEF9; --dim:#9AA0CC; --sunk:#0A0C1A; --hover:#262B52; --edge:#3D4574;
  --sel:#2C3468; --okbg:#0F2E27; --oktext:#8FEFC8; --glow:#1B2046; --onink:#04231F;
  --a1:#FFB020; --a2:#FF5F6D; --a3:#25D0C0; --a4:#9B7BFF;
  --tfg1:#2A1B00; --tfg2:#33060A; --tfg3:#04231F; --tfg4:#190B3D;
  --good:#3DDC91; --bad:#FF5F6D;
  --disp:'Bricolage Grotesque';
  background:var(--ink); color:var(--text);
  font-family:'IBM Plex Sans',ui-sans-serif,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.rc h1,.rc h2,.rc .disp{font-family:var(--disp),'IBM Plex Sans',sans-serif;font-weight:800;letter-spacing:-0.02em;line-height:1.02;}
.rc button{font-family:inherit;color:inherit;cursor:pointer;}
.rc button:focus-visible,.rc input:focus-visible,.rc select:focus-visible{outline:2px solid var(--a3);outline-offset:2px;}
.panel{background:var(--panel);border:1px solid var(--line);}
.panel2{background:var(--panel2);border:1px solid var(--line);}
.dim{color:var(--dim);}
.rule{height:1px;background:var(--line);}
.btn{background:var(--panel2);border:1px solid var(--line);transition:background .12s ease,border-color .12s ease;}
.btn:hover{background:var(--hover);border-color:var(--edge);}
.btn-go{background:var(--a3);color:var(--onink);border:none;font-weight:600;}
.btn-go:hover{filter:brightness(1.08);}
.btn-go:disabled{opacity:.45;cursor:not-allowed;}
.tile{border:1px solid transparent;transition:transform .1s ease,filter .12s ease;text-align:left;}
.tile:hover{filter:brightness(1.08);}
.tile:active{transform:scale(.985);}
.t1{background:var(--a1);color:var(--tfg1);}
.t2{background:var(--a2);color:var(--tfg2);}
.t3{background:var(--a3);color:var(--tfg3);}
.t4{background:var(--a4);color:var(--tfg4);}
.faded{opacity:.28;}
.right{box-shadow:inset 0 0 0 3px var(--good);}
.wrong{box-shadow:inset 0 0 0 3px var(--bad);}
.mtile{background:var(--panel2);border:1px solid var(--line);text-align:left;transition:background .12s ease,border-color .12s ease;}
.mtile:hover{border-color:var(--edge);}
.msel{background:var(--sel);border-color:var(--a3);}
.mdone{background:var(--okbg);border-color:var(--good);color:var(--oktext);}
.mbad{border-color:var(--bad);animation:nudge .25s ease;}
@keyframes nudge{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.bar{background:var(--sunk);overflow:hidden;}
.bar > i{display:block;height:100%;background:var(--a3);transition:width .1s linear;}
.bar.low > i{background:var(--a2);}
.chip{background:var(--sunk);border:1px solid var(--line);}
.chip-on{background:var(--a3);color:var(--onink);border-color:var(--a3);font-weight:600;}
.field{background:var(--sunk);border:1px solid var(--line);color:var(--text);}
.field::placeholder{color:var(--dim);opacity:.75;}
.card3d{perspective:1200px;}
.card3d > div{transition:transform .45s cubic-bezier(.2,.7,.3,1);transform-style:preserve-3d;}
.flipped{transform:rotateY(180deg);}
.face{backface-visibility:hidden;-webkit-backface-visibility:hidden;}
.back{transform:rotateY(180deg);}
.drop{border:1px dashed var(--edge);transition:border-color .12s ease,background .12s ease;}
.drop.hot{border-color:var(--a3);background:var(--panel2);}
.pill{background:var(--sunk);border:1px solid var(--line);font-size:12px;}
.lvl0{color:var(--dim)}.lvl1{color:var(--a2)}.lvl2{color:var(--a1)}.lvl3{color:var(--a1)}.lvl4{color:var(--a3)}.lvl5{color:var(--good)}
.meter{background:var(--sunk);height:6px;border-radius:99px;overflow:hidden;}
.meter > i{display:block;height:100%;background:linear-gradient(90deg,var(--a4),var(--a3));}
.heart{color:var(--a2);}
.heart.out{color:var(--edge);}
.bubble{background:var(--panel2);border:1px solid var(--line);}
.bubble-me{background:var(--sel);border:1px solid var(--edge);}
.driftbg{background:radial-gradient(120% 90% at 50% 0%, var(--glow) 0%, var(--ink) 62%);}
.drifttext{font-family:var(--disp),'IBM Plex Sans',sans-serif;font-weight:600;letter-spacing:-0.02em;}
.linkish{color:var(--a3);}
.rowedit{background:var(--sunk);border:1px solid var(--line);color:var(--text);width:100%;}
.nav{background:var(--ink);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;}
.coin{color:var(--a1);}
.swatch{width:100%;height:44px;border-radius:10px;display:flex;overflow:hidden;}
.swatch > span{flex:1;}
.locked{opacity:.6;}
.eq{border-color:var(--a3)!important;}
.landing-hero{background:radial-gradient(90% 70% at 20% 0%, var(--glow) 0%, var(--ink) 70%);}
@media (prefers-reduced-motion: reduce){
  .rc *{transition:none!important;animation:none!important;}
}
`;

/* ------------------------------------------------------------------ */
/*  Deck building from a PDF or pasted text                            */
/* ------------------------------------------------------------------ */

const PARTS = ["the opening third", "the middle third", "the final third"];

async function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1]);
    r.onerror = () => rej(new Error("Could not read that file."));
    r.readAsDataURL(file);
  });
}

function parseCards(raw) {
  let s = raw.replace(/```json/g, "").replace(/```/g, "").trim();
  const i = s.indexOf("["), j = s.lastIndexOf("]");
  if (i === -1 || j === -1) return [];
  try {
    const arr = JSON.parse(s.slice(i, j + 1));
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((o) => o && typeof o.t === "string" && typeof o.d === "string")
      .map((o) => ({
        t: o.t.trim(), d: o.d.trim(),
        g: typeof o.g === "string" ? o.g.trim().slice(0, 28) : undefined,
        x: Number(o.x) || 2,
        s: Number.isFinite(Number(o.s)) ? Number(o.s) : undefined,
      }))
      .filter((o) => o.t.length > 1 && o.d.length > 12);
  } catch (e) {
    return [];
  }
}

async function askForCards(source, part, existing) {
  const instruction =
    `You are turning course material into a study deck of term/definition pairs.\n` +
    `Pull 12 of the most testable concepts from ${part} of this material.\n` +
    `Rules:\n` +
    `- "t" is the term or concept, 1-6 words, exactly as the material names it.\n` +
    `- "d" is a definition in 10-24 words that does NOT contain the term itself.\n` +
    `- Prefer concepts with named authors, typologies, categories, and defined vocabulary.\n` +
    `- Skip title slides, citations, page numbers, and slide numbers.\n` +
    (existing.length ? `- Do not repeat any of these: ${existing.slice(-40).join("; ")}\n` : "") +
    `Respond with ONLY a JSON array like [{"t":"...","d":"...","g":"...","x":2${'' }}]. No preamble, no markdown.`;

  const content =
    source.kind === "pdf"
      ? [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: source.data } },
          { type: "text", text: instruction },
        ]
      : [{ type: "text", text: instruction + "\n\nMATERIAL:\n" + source.data.slice(0, 40000) }];

  const res = await claudeFetch({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content }] });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) throw new NoAI("That API key was rejected.");
    throw new Error("Claude didn't answer. Try again in a moment.");
  }
  const data = await res.json();
  const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n");
  return parseCards(text);
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function PageHead({ eyebrow, title, sub }) {
  return (
    <div className="pagehead">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <div className="pagetitle">{title}</div>
      {sub && <div className="pagesub">{sub}</div>}
    </div>
  );
}

function TopBar({ left, right, onQuit, label }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="text-sm dim">{left}</div>
      <div className="flex items-center gap-3">
        <div className="text-sm">{right}</div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">
          {label || "End round"}
        </button>
      </div>
    </div>
  );
}

function Progress({ value }) {
  return (
    <div className="bar rounded-full mb-6" style={{ height: 4 }}>
      <i style={{ width: `${clamp(value * 100, 0, 100)}%`, background: "var(--dim)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Why was I wrong?                                                   */
/* ------------------------------------------------------------------ */

const WHY_CACHE = {};

function WhyPanel({ card, picked, chose, deckTitle, open, onOpen }) {
  const answer = picked !== undefined ? picked : chose;
  const managed = open === undefined;
  const [shown, setShown] = useState(false);
  const isOpen = managed ? shown : open;
  const key = card.t + "|" + (answer || "");
  const [text, setText] = useState(WHY_CACHE[key] || "");
  const [busy, setBusy] = useState(false);

  const ask = async () => {
    if (managed) setShown(true);
    onOpen && onOpen();
    if (text || busy) return;
    setBusy(true);
    try {
      const out = await askClaude([{
        role: "user",
        content:
          `A student studying "${deckTitle}" was shown this definition and asked to name the term.\n\n` +
          `Definition: ${card.d}\nCorrect term: ${card.t}\n` +
          (answer ? `They answered: ${answer}\n\n` : `They ran out of time.\n\n`) +
          (answer
            ? `In under 80 words, plain sentences, no headings: say the one specific thing that separates ${answer} from ${card.t}, then say what to look for in the wording next time.`
            : `In under 70 words, plain sentences: give the clearest hook in this definition that points to ${card.t}, and one thing it is easily confused with.`),
      }]);
      WHY_CACHE[key] = out;
      setText(out);
    } catch (e) {
      setText("Couldn't reach the explainer just now.");
    } finally { setBusy(false); }
  };

  if (!isOpen) {
    return (
      <button onClick={ask} className="btn rounded-xl px-4 py-2 text-sm w-full mt-2">
        Why was that wrong?
      </button>
    );
  }
  return (
    <div className="panel2 rounded-xl p-4 fadein" style={{ fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
      {busy && !text ? <span className="dim">Working out the difference…</span> : text}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Your character, reacting                                           */
/* ------------------------------------------------------------------ */

function Buddy({ a, state, size = 78 }) {
  const look = state === "yes" ? { ...a, eyes: "happy", mouth: "open" }
    : state === "no" ? { ...a, eyes: "spiral", mouth: "grit" }
      : a;
  return (
    <div
      style={{
        width: size,
        transition: "transform .25s cubic-bezier(.3,1.4,.5,1)",
        transform: state === "yes" ? "translateY(-12px) rotate(-4deg)" : state === "no" ? "rotate(9deg) translateY(4px)" : "none",
      }}
    >
      <Avatar a={look} fluid />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Quiz                                                         */
/* ------------------------------------------------------------------ */

const QUESTION_TIME = 20;

function Quiz({ cards, pool, avatar, deckTitle, sfx, fifties, onFifty, onDone, onQuit }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [left, setLeft] = useState(QUESTION_TIME);
  const [missed, setMissed] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [picks, setPicks] = useState({});
  const [why, setWhy] = useState(false);
  const [hold, setHold] = useState(false);
  const [gone, setGone] = useState([]);

  const rounds = useMemo(
    () => cards.map((c) => ({ card: c, options: optionsFor(c, pool) })),
    [cards, pool]
  );
  const cur = rounds[i];

  useEffect(() => {
    if (picked !== null) return;
    setLeft(QUESTION_TIME);
    const started = Date.now();
    const id = setInterval(() => {
      const rem = QUESTION_TIME - (Date.now() - started) / 1000;
      if (rem <= 0) {
        clearInterval(id);
        setLeft(0);
        setPicked("__timeout__");
      } else setLeft(rem);
    }, 100);
    return () => clearInterval(id);
  }, [i, picked]);

  const answer = useCallback(
    (opt) => {
      if (picked !== null) return;
      const hit = opt === cur.card.t;
      if (hit) {
        const speed = Math.round(500 * (left / QUESTION_TIME));
        setScore((s) => s + 500 + speed + Math.min(streak, 5) * 100);
        setStreak((s) => s + 1);
        setCorrect((c) => c + 1);
        playSfx(sfx, "right");
      } else {
        setStreak(0);
        setMissed((m) => [...m, { ...cur.card, chose: opt }]);
        setPicks((p) => ({ ...p, [cur.card.t]: opt }));
        setHold(true);
        playSfx(sfx, "wrong");
      }
      setPicked(opt);
    },
    [cur, left, picked, streak, sfx]
  );

  const advance = useCallback(() => {
    setHold(false); setWhy(false); setGone([]);
    if (i + 1 >= rounds.length) {
      onDone({ score, correct, total: rounds.length, missed, picks });
    } else { setPicked(null); setI(i + 1); }
  }, [i, rounds.length, score, correct, missed, picks, onDone]);

  useEffect(() => {
    if (picked === null) return;
    if (picked === "__timeout__") {
      setMissed((m) => (m.some((c) => c.t === cur.card.t) ? m : [...m, { ...cur.card, chose: null }]));
      setHold(true);
      return;
    }
    if (hold) return;
    const id = setTimeout(advance, 900);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  useEffect(() => {
    const h = (e) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && cur) answer(cur.options[n - 1]);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [answer, cur]);

  if (!cur) return null;
  const tones = ["t1", "t2", "t3", "t4"];
  const frac = left / QUESTION_TIME;

  return (
    <div>
      <TopBar
        left={`Question ${i + 1} of ${rounds.length}`}
        right={
          <span>
            <span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>
            {streak > 1 && <span className="dim text-sm"> · {streak} in a row</span>}
          </span>
        }
        onQuit={onQuit}
      />
      <div className={"bar rounded-full mb-6" + (frac < 0.25 ? " low" : "")} style={{ height: 6 }}>
        <i style={{ width: `${frac * 100}%` }} />
      </div>

      <div className="panel rounded-2xl p-6 mb-4">
        <div className="dim text-sm mb-2">Which term does this describe?</div>
        <div className="disp" style={{ fontSize: "clamp(20px,3.4vw,32px)" }}>{cur.card.d}</div>
      </div>

      {picked === null && fifties > 0 && gone.length === 0 && (
        <button
          onClick={() => { onFifty(); setGone(shuffle(cur.options.filter((o) => o !== cur.card.t)).slice(0, 2)); playSfx(sfx, "coin"); }}
          className="btn rounded-xl px-3 py-1 text-sm mb-3">
          Use a 50/50 · {fifties} left
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, n) => {
          const isAnswer = opt === cur.card.t;
          const done = picked !== null || gone.includes(opt);
          let cls = "tile " + tones[n];
          if (gone.includes(opt)) cls += " faded";
          else if (picked !== null && isAnswer) cls += " right";
          else if (picked !== null && opt === picked) cls += " wrong";
          else if (picked !== null) cls += " faded";
          return (
            <button key={opt + n} onClick={() => answer(opt)} className={cls + " rounded-xl p-4 w-full"} disabled={done}>
              <span className="text-xs opacity-60">{n + 1}</span>
              <span className="block font-medium" style={{ fontSize: 17, lineHeight: 1.3 }}>{gone.includes(opt) ? "—" : opt}</span>
            </button>
          );
        })}
      </div>

      {hold && (
        <div className="mt-4 fadein">
          <div className="panel rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-3">
              <Buddy a={avatar} state="no" size={62} />
              <div>
                <div className="dim text-sm">{picked === "__timeout__" ? "Ran out of time" : "Not that one"}</div>
                <div className="font-semibold" style={{ fontSize: 16 }}>The answer is {cur.card.t}</div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <WhyPanel card={cur.card} picked={picked === "__timeout__" ? null : picked}
              deckTitle={deckTitle} open={why} onOpen={() => setWhy(true)} />
          </div>
          <button onClick={advance} className="btn-go rounded-xl py-3 w-full">
            {i + 1 >= rounds.length ? "See results" : "Next question"}
          </button>
        </div>
      )}

      {picked !== null && !hold && (
        <div className="flex justify-end mt-3"><Buddy a={avatar} state="yes" size={64} /></div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Match                                                        */
/* ------------------------------------------------------------------ */

function Match({ cards, onDone, onQuit }) {
  const boards = useMemo(() => {
    const out = [];
    for (let i = 0; i < cards.length; i += 6) out.push(cards.slice(i, i + 6));
    return out.filter((b) => b.length >= 2);
  }, [cards]);

  const [b, setB] = useState(0);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState([]);
  const [bad, setBad] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [missed, setMissed] = useState([]);
  const [score, setScore] = useState(0);

  const board = boards[b] || [];
  const noBoard = !boards.length;
  const tiles = useMemo(
    () =>
      shuffle(
        board.flatMap((c, idx) => [
          { key: `t${idx}`, idx, kind: "t", text: c.t },
          { key: `d${idx}`, idx, kind: "d", text: c.d },
        ])
      ),
    [board]
  );

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => clearInterval(id);
  }, [b]);

  const tap = (tile) => {
    if (done.includes(tile.idx) || bad) return;
    if (!sel) return setSel(tile);
    if (sel.key === tile.key) return setSel(null);
    if (sel.idx === tile.idx && sel.kind !== tile.kind) {
      setDone((d) => [...d, tile.idx]);
      setScore((s) => s + 400);
      setSel(null);
      if (done.length + 1 === board.length) {
        setTimeout(() => {
          if (b + 1 >= boards.length) {
            onDone({
              score: score + 400,
              correct: cards.length - missed.length,
              total: cards.length,
              missed,
              extra: `${Math.round(elapsed)}s · ${errors} misfires`,
            });
          } else {
            setB(b + 1);
            setDone([]);
          }
        }, 500);
      }
    } else {
      setBad(tile.key);
      setErrors((e) => e + 1);
      setScore((s) => Math.max(0, s - 100));
      const card = board[sel.idx];
      setMissed((m) => (m.some((x) => x.t === card.t) ? m : [...m, card]));
      setTimeout(() => {
        setBad(null);
        setSel(null);
      }, 350);
    }
  };

  if (noBoard) {
    return (
      <div>
        <TopBar left="Match" right="" onQuit={onQuit} />
        <div className="panel rounded-2xl p-5">This round needs at least two cards. Pick a longer round or add cards to the deck.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar
        left={`Board ${b + 1} of ${boards.length} · ${done.length}/${board.length} paired`}
        right={
          <span>
            <span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>
            <span className="dim text-sm"> · {Math.round(elapsed)}s</span>
          </span>
        }
        onQuit={onQuit}
      />
      <Progress value={(b + done.length / Math.max(board.length, 1)) / boards.length} />
      <div className="dim text-sm mb-3">Tap a term, then the definition that goes with it.</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tiles.map((tile) => {
          const isDone = done.includes(tile.idx);
          let cls = "mtile rounded-xl p-3 w-full";
          if (isDone) cls += " mdone";
          else if (sel && sel.key === tile.key) cls += " msel";
          if (bad === tile.key) cls += " mbad";
          return (
            <button key={tile.key} onClick={() => tap(tile)} className={cls} disabled={isDone}>
              <span
                className={tile.kind === "t" ? "font-semibold" : ""}
                style={{ fontSize: tile.kind === "t" ? 16 : 14, lineHeight: 1.35 }}
              >
                {tile.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Flashcards                                                   */
/* ------------------------------------------------------------------ */

function Cards({ cards, onDone, onQuit }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [missed, setMissed] = useState([]);
  const [got, setGot] = useState(0);
  const card = cards[i];

  const mark = (knew) => {
    if (!knew) setMissed((m) => [...m, card]);
    else setGot((g) => g + 1);
    if (i + 1 >= cards.length) {
      onDone({
        score: (knew ? got + 1 : got) * 200,
        correct: knew ? got + 1 : got,
        total: cards.length,
        missed: knew ? missed : [...missed, card],
      });
    } else {
      setFlip(false);
      setTimeout(() => setI(i + 1), 120);
    }
  };

  useEffect(() => {
    const h = (e) => {
      if (e.code === "Space") { e.preventDefault(); setFlip((f) => !f); }
      if (e.key === "ArrowRight") mark(true);
      if (e.key === "ArrowLeft") mark(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  if (!card) return null;

  return (
    <div>
      <TopBar left={`Card ${i + 1} of ${cards.length}`} right={<span className="dim text-sm">{got} known</span>} onQuit={onQuit} />
      <Progress value={i / cards.length} />
      <div className="card3d mb-4" style={{ minHeight: 260 }}>
        <div className={flip ? "flipped" : ""} style={{ position: "relative", minHeight: 260 }}>
          <button
            onClick={() => setFlip(true)}
            className="face panel rounded-2xl p-6 w-full flex items-center justify-center text-center"
            style={{ position: "absolute", inset: 0 }}
          >
            <span>
              <span className="disp block" style={{ fontSize: "clamp(24px,4vw,40px)" }}>{card.t}</span>
              <span className="dim text-sm block mt-4">Tap to see the definition</span>
            </span>
          </button>
          <button
            onClick={() => setFlip(false)}
            className="face back panel2 rounded-2xl p-6 w-full flex items-center justify-center text-center"
            style={{ position: "absolute", inset: 0 }}
          >
            <span style={{ fontSize: "clamp(16px,2.6vw,22px)", lineHeight: 1.45 }}>{card.d}</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => mark(false)} className="btn rounded-xl py-3">Study again</button>
        <button onClick={() => mark(true)} className="btn-go rounded-xl py-3">Got it</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Type it                                                      */
/* ------------------------------------------------------------------ */

function TypeIt({ cards, sfx, deckTitle, hints, onHint, onDone, onQuit }) {
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState([]);
  const ref = useRef(null);
  const card = cards[i];

  useEffect(() => { if (ref.current) ref.current.focus(); }, [i]);

  const submit = () => {
    if (state) return next();
    const ok = closeEnough(val, card.t);
    if (ok) { setScore((s) => s + 600); setCorrect((c) => c + 1); }
    else setMissed((m) => [...m, { ...card, chose: val }]);
    setState(ok ? "ok" : "no");
  };

  const override = () => {
    setScore((s) => s + 600);
    setCorrect((c) => c + 1);
    setMissed((m) => m.filter((x) => x.t !== card.t));
    setState("ok");
  };

  const next = () => {
    if (i + 1 >= cards.length) {
      onDone({ score, correct, total: cards.length, missed });
    } else {
      setVal(""); setState(null); setI(i + 1);
    }
  };

  if (!card) return null;

  return (
    <div>
      <TopBar left={`${i + 1} of ${cards.length}`} right={<span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>} onQuit={onQuit} />
      <Progress value={i / cards.length} />
      <div className="panel rounded-2xl p-6 mb-4">
        <div className="dim text-sm mb-2">Name the term</div>
        <div className="disp" style={{ fontSize: "clamp(20px,3.2vw,30px)" }}>{card.d}</div>
      </div>
      {!state && hints > 0 && (
        <button onClick={() => { onHint(); setVal(card.t.slice(0, Math.max(2, Math.ceil(card.t.length / 3)))); }}
          className="btn rounded-xl px-3 py-1 text-sm mb-3">Use a hint · {hints} left</button>
      )}
      <input
        ref={ref}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="Type your answer"
        readOnly={!!state}
        className="field rounded-xl px-4 py-3 w-full mb-3"
        style={{ fontSize: 17 }}
      />
      {state === "ok" && <div className="mb-3" style={{ color: "var(--good)" }}>Correct — {card.t}</div>}
      {state === "no" && (
        <div className="mb-3">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span style={{ color: "var(--bad)" }}>Not quite. The answer is {card.t}.</span>
            <button onClick={override} className="btn rounded-lg px-3 py-1 text-sm">Count mine as right</button>
          </div>
          <WhyPanel card={card} chose={val} deckTitle={deckTitle} />
        </div>
      )}
      <button onClick={submit} className="btn-go rounded-xl py-3 w-full">{state ? "Next" : "Check answer"}</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lounge: Drift                                                      */
/* ------------------------------------------------------------------ */

const PACES = [
  { id: "slow", name: "Slow", term: 5000, def: 8000 },
  { id: "easy", name: "Easy", term: 3500, def: 6000 },
  { id: "brisk", name: "Brisk", term: 2200, def: 4000 },
];

function Drift({ cards, onQuit }) {
  const [i, setI] = useState(0);
  const [showDef, setShowDef] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [pace, setPace] = useState(PACES[1]);
  const [speak, setSpeak] = useState(false);
  const card = cards[i];
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  const say = useCallback((text) => {
    if (!speak || !canSpeak) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) { /* voice unavailable */ }
  }, [speak, canSpeak]);

  useEffect(() => () => { if (canSpeak) try { window.speechSynthesis.cancel(); } catch (e) {} }, [canSpeak]);

  useEffect(() => {
    if (!playing || !card) return;
    const wait = showDef ? pace.def : pace.term;
    say(showDef ? card.d : card.t);
    const id = setTimeout(() => {
      if (showDef) { setShowDef(false); setI((n) => (n + 1) % cards.length); }
      else setShowDef(true);
    }, wait);
    return () => clearTimeout(id);
  }, [i, showDef, playing, pace, card, cards.length, say]);

  const step = () => {
    if (showDef) { setShowDef(false); setI((n) => (n + 1) % cards.length); }
    else setShowDef(true);
  };

  if (!card) return null;

  return (
    <div className="driftbg rounded-2xl p-5" style={{ minHeight: "70vh" }}>
      <TopBar label="Back" left={`${i + 1} of ${cards.length} · hands free`} right={<span className="dim text-sm">{pace.name}</span>} onQuit={onQuit} />
      <button onClick={step} className="w-full text-center flex items-center justify-center" style={{ minHeight: "42vh" }}>
        <span style={{ maxWidth: "34ch" }}>
          <span className="drifttext block" style={{ fontSize: showDef ? "clamp(20px,3.2vw,30px)" : "clamp(30px,6vw,58px)", lineHeight: 1.2 }}>
            {showDef ? card.d : card.t}
          </span>
          {!showDef && <span className="dim text-sm block mt-6">definition next</span>}
        </span>
      </button>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        <button onClick={() => setPlaying(!playing)} className="btn-go rounded-full px-5 py-2">
          {playing ? "Pause" : "Play"}
        </button>
        {PACES.map((p) => (
          <button key={p.id} onClick={() => setPace(p)} className={"chip rounded-full px-3 py-1 text-sm " + (pace.id === p.id ? "chip-on" : "")}>
            {p.name}
          </button>
        ))}
        {canSpeak && (
          <button
            onClick={() => { setSpeak(!speak); try { window.speechSynthesis.cancel(); } catch (e) {} }}
            className={"chip rounded-full px-3 py-1 text-sm " + (speak ? "chip-on" : "")}
          >
            Read aloud
          </button>
        )}
      </div>
      <p className="dim text-xs text-center mt-4">Tap the card to move it along yourself. Nothing here counts against your stats.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lounge: Browse                                                     */
/* ------------------------------------------------------------------ */

function Browse({ deck, prog, onFlag, onSettings, onQuit }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [deep, setDeep] = useState({});
  const [loading, setLoading] = useState(null);
  const [flagged, setFlagged] = useState([]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return deck.cards;
    return deck.cards.filter((c) => (c.t + " " + c.d).toLowerCase().includes(s));
  }, [q, deck]);

  const explain = async (card) => {
    if (deep[card.t] || loading) return;
    setLoading(card.t);
    try {
      const out = await askClaude([
        {
          role: "user",
          content:
            `From a course deck on: ${deck.title}\n\nTerm: ${card.t}\nDefinition: ${card.d}\n\n` +
            `Explain this in plain language in under 90 words, then give one concrete real-world example on its own line starting with "Example: ". No headings, no bullet points.`,
        },
      ]);
      setDeep((d) => ({ ...d, [card.t]: out }));
    } catch (e) {
      setDeep((d) => ({ ...d, [card.t]: e.message }));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <AIBanner what="Explaining a card" onConnect={onSettings} />
      <TopBar label="Back" left={`${deck.cards.length} cards`} right={<span className="dim text-sm">{list.length} shown</span>} onQuit={onQuit} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms and definitions"
        className="field rounded-xl px-4 py-3 w-full mb-4"
      />
      <div className="flex flex-col gap-2">
        {list.map((c, n) => {
          const lvl = recOf(prog, deck.id, c).lvl;
          const isOpen = open === c.t;
          return (
            <div key={c.t + n} className="panel rounded-xl p-4">
              <button onClick={() => setOpen(isOpen ? null : c.t)} className="text-left w-full flex items-start justify-between gap-3">
                <span className="font-semibold" style={{ fontSize: 16 }}>{c.t}</span>
                <span className={"pill rounded-full px-2 py-1 lvl" + lvl} style={{ whiteSpace: "nowrap" }}>{LEVEL_LABEL[lvl]}</span>
              </button>
              <div className="dim mt-2" style={{ fontSize: 15, lineHeight: 1.45 }}>{c.d}</div>
              {deck.source && c.s != null && (
                <a href={watchLink(deck.source, c.s)} target="_blank" rel="noreferrer"
                  className="linkish text-xs" style={{ display: "inline-block", marginTop: 6 }}>
                  Watch this bit · {stamp(c.s)}
                </a>
              )}
              {isOpen && (
                <div className="mt-3">
                  {deep[c.t] ? (
                    <div className="panel2 rounded-lg p-3"><RichText size={14}>{deep[c.t]}</RichText></div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => explain(c)} className="btn rounded-lg px-3 py-1 text-sm" disabled={loading === c.t}>
                        {loading === c.t ? "Thinking…" : "Explain it deeper"}
                      </button>
                      <button
                        onClick={() => { onFlag(c); setFlagged((f) => [...f, c.t]); }}
                        className="btn rounded-lg px-3 py-1 text-sm"
                      >
                        {flagged.includes(c.t) ? "Queued" : "Send to the top of my queue"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {!list.length && <div className="dim">Nothing matches that. Try a shorter search.</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lounge: Tutor                                                      */
/* ------------------------------------------------------------------ */

const STARTERS = [
  "Give me the five things most likely to be on the exam",
  "Explain the hardest concept here like I'm new to it",
  "What gets confused with what in this deck?",
  "Walk me through this material in 10 sentences",
];

function Tutor({ deck, onAsk, onSettings, onQuit }) {
  const [msgs, setMsgs] = useState([]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ block: "end" }); }, [msgs, busy]);

  const send = async (text) => {
    const q = (text || val).trim();
    if (!q || busy) return;
    if (onAsk) onAsk();
    setVal(""); setBusy(true);
    const shown = [...msgs, { role: "user", content: q }];
    setMsgs(shown);
    try {
      const payload = shown.map((m, idx) =>
        idx === 0
          ? {
              role: "user",
              content:
                `You are a study tutor working strictly from this course deck titled "${deck.title}".\n\n` +
                `MATERIAL:\n${deckContext(deck)}\n\n` +
                `Answer using this material. Keep it under 150 words unless asked for more. Plain sentences, no headings. ` +
                `If something is outside the material, say so briefly and answer anyway.\n\n` +
                `Question: ${m.content}`,
            }
          : m
      );
      const out = await askClaude(payload);
      setMsgs((m) => [...m, { role: "assistant", content: out }]);
      if (onAsk) onAsk();
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: e.message }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <AIBanner what="The tutor" onConnect={onSettings} />
      <TopBar label="Back" left={`Asking about ${deck.title}`} right={<span className="dim text-sm">{deck.cards.length} cards in context</span>} onQuit={onQuit} />
      {!msgs.length && (
        <div className="mb-4">
          <div className="dim text-sm mb-3">Ask anything about this deck. A few openers:</div>
          <div className="flex flex-col gap-2">
            {STARTERS.map((s) => (
              <button key={s} onClick={() => send(s)} className="btn rounded-xl px-4 py-3 text-left" style={{ fontSize: 15 }}>{s}</button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 mb-4">
        {msgs.map((m, n) => (
          <div
            key={n}
            className={(m.role === "user" ? "bubble-me" : "bubble") + " rounded-2xl px-4 py-3"}
            style={{ fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-wrap", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}
          >
            {m.content}
          </div>
        ))}
        {busy && <div className="bubble rounded-2xl px-4 py-3 dim" style={{ alignSelf: "flex-start" }}>Reading the deck…</div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="Ask about anything in this deck"
          className="field rounded-xl px-4 py-3 w-full"
        />
        <button onClick={() => send()} disabled={busy} className="btn-go rounded-xl px-5">Send</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Deck editor                                                        */
/* ------------------------------------------------------------------ */

function Editor({ deck, onSave, onQuit }) {
  const [title, setTitle] = useState(deck.title);
  const [rows, setRows] = useState(deck.cards.map((c) => ({ ...c })));
  const [warn, setWarn] = useState("");

  const set = (i, k, v) => setRows((r) => r.map((row, n) => (n === i ? { ...row, [k]: v } : row)));
  const add = () => setRows((r) => [...r, { t: "", d: "" }]);
  const del = (i) => setRows((r) => r.filter((_, n) => n !== i));

  const save = () => {
    const clean = rows.filter((r) => r.t.trim() && r.d.trim()).map((r) => ({ ...r, t: r.t.trim(), d: r.d.trim() }));
    if (!clean.length) { setWarn("Add at least one card with both a term and a definition."); return; }
    onSave({ ...deck, builtin: false, title: title.trim() || "Untitled deck", note: `${clean.length} cards`, cards: clean });
  };

  return (
    <div>
      <TopBar label="Done" left="Editing deck" right={<span className="dim text-sm">{rows.length} rows</span>} onQuit={onQuit} />
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="field rounded-xl px-4 py-3 w-full mb-4" style={{ fontSize: 18 }} />
      <div className="flex flex-col gap-3 mb-4">
        {rows.map((r, i) => (
          <div key={i} className="panel rounded-xl p-3">
            <input value={r.t} onChange={(e) => set(i, "t", e.target.value)} placeholder="Term" className="rowedit rounded-lg px-3 py-2 mb-2 font-semibold" />
            <textarea value={r.d} onChange={(e) => set(i, "d", e.target.value)} placeholder="Definition" rows={2} className="rowedit rounded-lg px-3 py-2" />
            <button onClick={() => del(i)} className="dim text-xs mt-2">Delete this card</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={add} className="btn rounded-xl py-3">Add a card</button>
        <button onClick={save} className="btn-go rounded-xl py-3">Save deck</button>
      </div>
      {warn && <div className="text-sm mt-3" style={{ color: "var(--bad)" }}>{warn}</div>}
      {deck.builtin && <p className="dim text-xs mt-3">Saving turns this into your own copy, edits and all.</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Results                                                            */
/* ------------------------------------------------------------------ */

function Results({ result, modeName, coins, deckTitle, source, onDrill, onAgain, onHome }) {
  const pct = Math.round((result.correct / Math.max(result.total, 1)) * 100);
  return (
    <div>
      <div className="dim text-sm mb-1">{modeName} · complete</div>
      <div className="disp mb-1" style={{ fontSize: "clamp(44px,9vw,84px)" }}>{result.score.toLocaleString()}</div>
      <div className="dim mb-4">
        {result.correct} of {result.total} right · {pct}%{result.extra ? ` · ${result.extra}` : ""}
      </div>
      {coins > 0 && (
        <div className="panel2 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
          <span className="coin disp" style={{ fontSize: 20 }}>+{coins} coins</span>
          <span className="dim text-sm">spend them in the shop</span>
        </div>
      )}

      <MissList misses={result.missed} deckTitle={deckTitle} source={source} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {result.missed.length > 0 && (
          <button onClick={onDrill} className="btn-go rounded-xl py-3">Drill the misses</button>
        )}
        <button onClick={onAgain} className="btn rounded-xl py-3">Play again</button>
        <button onClick={onHome} className="btn rounded-xl py-3">Pick another deck</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Builder panel                                                      */
/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Unlockables: themes, display fonts, music                          */
/* ------------------------------------------------------------------ */

const THEMES = [
  {
    id: "twilight", name: "Twilight", price: 0, note: "Deep violet, soft glow",
    vars: {
      "--ink": "#120E26", "--panel": "#1C1740", "--panel2": "#241D52", "--line": "#332A63",
      "--text": "#F2EEFF", "--dim": "#A79BD6", "--sunk": "#0D0A1C", "--hover": "#2C2460",
      "--edge": "#463A80", "--sel": "#382D74", "--okbg": "#14331F", "--oktext": "#9BF0C0",
      "--glow": "#2A1F5E", "--onink": "#0D0A1C",
      "--a1": "#FFC14D", "--a2": "#FF6B9D", "--a3": "#6BE3FF", "--a4": "#A47BFF",
      "--tfg1": "#33240A", "--tfg2": "#3A0A1E", "--tfg3": "#06222B", "--tfg4": "#190B3D",
      "--good": "#4FE0A0", "--bad": "#FF6B9D",
    },
  },
  {
    id: "midnight", name: "Midnight", price: 0, note: "Where it all starts",
    vars: {
      "--ink": "#0E1020", "--panel": "#171A31", "--panel2": "#1E2240", "--line": "#2E3459",
      "--text": "#EDEEF9", "--dim": "#9AA0CC", "--sunk": "#0A0C1A", "--hover": "#262B52",
      "--edge": "#3D4574", "--sel": "#2C3468", "--okbg": "#0F2E27", "--oktext": "#8FEFC8",
      "--glow": "#1B2046", "--onink": "#04231F",
      "--a1": "#FFB020", "--a2": "#FF5F6D", "--a3": "#25D0C0", "--a4": "#9B7BFF",
      "--tfg1": "#2A1B00", "--tfg2": "#33060A", "--tfg3": "#04231F", "--tfg4": "#190B3D",
      "--good": "#3DDC91", "--bad": "#FF5F6D",
    },
  },
  {
    id: "paper", name: "Paper", price: 200, note: "Daylight, for library hours",
    vars: {
      "--ink": "#EFF1F7", "--panel": "#FFFFFF", "--panel2": "#F3F5FB", "--line": "#D5DAE8",
      "--text": "#171A2B", "--dim": "#5C6480", "--sunk": "#E7EAF3", "--hover": "#E4E8F4",
      "--edge": "#B9C0D6", "--sel": "#D8E0FA", "--okbg": "#DCF6EA", "--oktext": "#0B5C40",
      "--glow": "#DCE2F5", "--onink": "#04231F",
      "--a1": "#F0A11A", "--a2": "#F2545F", "--a3": "#12B5A6", "--a4": "#7C5CF0",
      "--tfg1": "#2A1B00", "--tfg2": "#33060A", "--tfg3": "#04231F", "--tfg4": "#F4F1FF",
      "--good": "#12A56E", "--bad": "#E23B4A",
    },
  },
  {
    id: "terminal", name: "Terminal", price: 350, note: "Green on black, market hours",
    vars: {
      "--ink": "#07090A", "--panel": "#0E1213", "--panel2": "#141A1B", "--line": "#223033",
      "--text": "#D8F5E6", "--dim": "#6E9187", "--sunk": "#050708", "--hover": "#1B2426",
      "--edge": "#2E4045", "--sel": "#123028", "--okbg": "#0B2A20", "--oktext": "#7CF3C0",
      "--glow": "#0C1F1B", "--onink": "#03150E",
      "--a1": "#E9C46A", "--a2": "#F4715B", "--a3": "#35E08A", "--a4": "#58C7F5",
      "--tfg1": "#2A1B00", "--tfg2": "#2C0A04", "--tfg3": "#03150E", "--tfg4": "#04212E",
      "--good": "#35E08A", "--bad": "#F4715B",
    },
  },
  {
    id: "sunset", name: "Sunset", price: 500, note: "Warm, late, unbothered",
    vars: {
      "--ink": "#17101E", "--panel": "#22182C", "--panel2": "#2C2038", "--line": "#43314F",
      "--text": "#F6ECF6", "--dim": "#B79EC0", "--sunk": "#100A16", "--hover": "#33253F",
      "--edge": "#56405F", "--sel": "#3D2A50", "--okbg": "#1F3326", "--oktext": "#A8ECC0",
      "--glow": "#35204A", "--onink": "#12241F",
      "--a1": "#FFB25B", "--a2": "#FF6B8B", "--a3": "#56D9C7", "--a4": "#B98BFF",
      "--tfg1": "#2E1A00", "--tfg2": "#340813", "--tfg3": "#0A2723", "--tfg4": "#1F0B3D",
      "--good": "#6BE0A0", "--bad": "#FF6B8B",
    },
  },
  {
    id: "court", name: "Court", price: 700, note: "Deep felt green",
    vars: {
      "--ink": "#0B1A14", "--panel": "#10251C", "--panel2": "#163024", "--line": "#234437",
      "--text": "#EAF6EF", "--dim": "#8FB6A2", "--sunk": "#071310", "--hover": "#1D3B2D",
      "--edge": "#2E5443", "--sel": "#1D4536", "--okbg": "#123D2C", "--oktext": "#9BEFC5",
      "--glow": "#122C21", "--onink": "#042115",
      "--a1": "#E9C46A", "--a2": "#E76F51", "--a3": "#2AC48A", "--a4": "#7FB3FF",
      "--tfg1": "#2A1B00", "--tfg2": "#2E0C03", "--tfg3": "#042115", "--tfg4": "#0A2140",
      "--good": "#2AC48A", "--bad": "#E76F51",
    },
  },
  {
    id: "vapor", name: "Vapor", price: 900, note: "Neon, but quiet about it",
    vars: {
      "--ink": "#120E24", "--panel": "#1B1636", "--panel2": "#241D46", "--line": "#3A2F6B",
      "--text": "#F2ECFF", "--dim": "#A79BD8", "--sunk": "#0C0919", "--hover": "#2B2358",
      "--edge": "#4C3F8A", "--sel": "#372C74", "--okbg": "#1A3340", "--oktext": "#8FE6F0",
      "--glow": "#241A4A", "--onink": "#062026",
      "--a1": "#FFD166", "--a2": "#FF6EC7", "--a3": "#4CE0F5", "--a4": "#A78BFA",
      "--tfg1": "#33270A", "--tfg2": "#3A0A2B", "--tfg3": "#062026", "--tfg4": "#1C0C46",
      "--good": "#4CE0B0", "--bad": "#FF6EC7",
    },
  },
  {
    id: "sakura", name: "Sakura", price: 900, note: "Pale pink, soft as a nap",
    vars: {
      "--ink": "#FBEEF2", "--panel": "#FFFFFF", "--panel2": "#F7E4EC", "--line": "#E5C6D4",
      "--text": "#3A2430", "--dim": "#8A6476", "--sunk": "#F2DCE6", "--hover": "#F0D5E0",
      "--edge": "#D8AABE", "--sel": "#F5D0E0", "--okbg": "#DCF3E6", "--oktext": "#1E6B48",
      "--glow": "#F6DCE8", "--onink": "#3A2430",
      "--a1": "#F2A03C", "--a2": "#E8557E", "--a3": "#4FC7B0", "--a4": "#A87BE0",
      "--tfg1": "#2E1B00", "--tfg2": "#3A0716", "--tfg3": "#04231F", "--tfg4": "#1F0B3D",
      "--good": "#1E9E6E", "--bad": "#D93B5C",
    },
  },
  {
    id: "matcha", name: "Matcha", price: 1600, note: "Warm paper and green tea",
    vars: {
      "--ink": "#1B2119", "--panel": "#252E22", "--panel2": "#2E3A2A", "--line": "#3F5138",
      "--text": "#EDF3E6", "--dim": "#9DB48F", "--sunk": "#141A12", "--hover": "#374533",
      "--edge": "#516A47", "--sel": "#38512F", "--okbg": "#1C3A26", "--oktext": "#A8ECBE",
      "--glow": "#26331F", "--onink": "#0C1A10",
      "--a1": "#E8C15A", "--a2": "#E2725B", "--a3": "#8FD14F", "--a4": "#7FB3E0",
      "--tfg1": "#2A1B00", "--tfg2": "#2E0C05", "--tfg3": "#0F2205", "--tfg4": "#0A2140",
      "--good": "#8FD14F", "--bad": "#E2725B",
    },
  },
  {
    id: "ghost", name: "Ghost", price: 1200, note: "Silver, charcoal, one red line",
    vars: {
      "--ink": "#0A0A0B", "--panel": "#131315", "--panel2": "#1A1A1D", "--line": "#2A2A2F",
      "--text": "#F2F2F4", "--dim": "#8A8A93", "--sunk": "#060607", "--hover": "#232327",
      "--edge": "#3A3A41", "--sel": "#26262C", "--okbg": "#14261C", "--oktext": "#A9F0C4",
      "--glow": "#171719", "--onink": "#0A0A0B",
      "--a1": "#F2F2F4", "--a2": "#FF3B47", "--a3": "#C9C9D2", "--a4": "#8E8E99",
      "--tfg1": "#0A0A0B", "--tfg2": "#2A0206", "--tfg3": "#0A0A0B", "--tfg4": "#0A0A0B",
      "--good": "#3DDC91", "--bad": "#FF3B47",
    },
  },
];

const FONTS = [
  { id: "bricolage", name: "Bricolage", price: 0, css: "'Bricolage Grotesque'", note: "Chunky and modern" },
  { id: "space", name: "Space Grotesk", price: 250, css: "'Space Grotesk'", note: "Tighter, technical" },
  { id: "playfair", name: "Playfair", price: 400, css: "'Playfair Display'", note: "Serif, old syllabus energy" },
  { id: "mono", name: "JetBrains Mono", price: 600, css: "'JetBrains Mono'", note: "Everything looks like a terminal" },
  { id: "fraunces", name: "Fraunces", price: 900, css: "'Fraunces'", note: "Soft serif with a wobble" },
];

/* ------------------------------------------------------------------ */
/*  Music engine (Web Audio, no files)                                 */
/* ------------------------------------------------------------------ */

function makeNoise(ctx, kind) {
  const len = Math.floor(ctx.sampleRate * 2);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    else d[i] = w * 0.9;
  }
  return buf;
}

const SCALE = [0, 2, 4, 5, 7, 9, 11];
const hz = (base, semi) => base * Math.pow(2, semi / 12);

function buildStation(ctx, out, id) {
  const nodes = [];
  const timers = [];
  const keep = (n) => { nodes.push(n); return n; };

  const delay = keep(ctx.createDelay(1));
  delay.delayTime.value = 0.38;
  const fb = keep(ctx.createGain());
  fb.gain.value = 0.28;
  const wet = keep(ctx.createGain());
  wet.gain.value = 0.35;
  delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(out);

  const pluck = (freq, dur, type, level, toDelay) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "triangle";
    o.frequency.value = freq;
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(level, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out);
    if (toDelay) g.connect(delay);
    o.start(t); o.stop(t + dur + 0.1);
  };

  if (id === "rain") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "white"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 1100; lp.Q.value = 0.4;
    const hp = keep(ctx.createBiquadFilter()); hp.type = "highpass"; hp.frequency.value = 320;
    const g = keep(ctx.createGain()); g.gain.value = 0.5;
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    timers.push(setInterval(() => {
      lp.frequency.setTargetAtTime(700 + Math.random() * 900, ctx.currentTime, 1.6);
    }, 3200));
  }

  if (id === "lofi") {
    const base = 174.61;
    const prog = [[0, 4, 7, 11], [-3, 0, 4, 9], [-5, 0, 2, 7], [-7, -3, 0, 4]];
    let step = 0;
    const chord = () => {
      const c = prog[step % prog.length];
      c.forEach((s, n) => setTimeout(() => pluck(hz(base, s + (n === 3 ? 12 : 0)), 3.6, "triangle", 0.075, true), n * 90));
      if (Math.random() < 0.55) {
        const m = SCALE[Math.floor(Math.random() * SCALE.length)] + 12;
        setTimeout(() => pluck(hz(base, m), 2.2, "sine", 0.06, true), 700 + Math.random() * 800);
      }
      step++;
    };
    chord();
    timers.push(setInterval(chord, 3400));
  }

  if (id === "drone") {
    [55, 82.41, 110].forEach((f, n) => {
      const o = keep(ctx.createOscillator());
      o.type = n === 2 ? "triangle" : "sawtooth";
      o.frequency.value = f;
      o.detune.value = (n - 1) * 6;
      const g = keep(ctx.createGain());
      g.gain.value = n === 2 ? 0.05 : 0.09;
      const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 320; lp.Q.value = 3;
      o.connect(lp); lp.connect(g); g.connect(out);
      o.start();
      timers.push(setInterval(() => {
        lp.frequency.setTargetAtTime(220 + Math.random() * 320, ctx.currentTime, 4);
        g.gain.setTargetAtTime(0.05 + Math.random() * 0.06, ctx.currentTime, 5);
      }, 6000 + n * 1700));
    });
  }

  if (id === "library") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "brown"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 460;
    const g = keep(ctx.createGain()); g.gain.value = 0.5;
    src.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    const bell = () => {
      const s = SCALE[Math.floor(Math.random() * SCALE.length)] + (Math.random() < 0.4 ? 12 : 0);
      pluck(hz(261.63, s), 5, "sine", 0.05, true);
    };
    timers.push(setInterval(bell, 11000));
  }

  if (id === "cafe") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "brown"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 700;
    const g = keep(ctx.createGain()); g.gain.value = 0.4;
    src.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    timers.push(setInterval(() => {
      if (Math.random() < 0.5) pluck(hz(523.25, SCALE[Math.floor(Math.random() * 7)] + 12), 0.5, "sine", 0.022, true);
    }, 4200));
  }

  if (id === "forest") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "white"); src.loop = true;
    const bp = keep(ctx.createBiquadFilter()); bp.type = "bandpass"; bp.frequency.value = 620; bp.Q.value = 0.8;
    const g = keep(ctx.createGain()); g.gain.value = 0.22;
    src.connect(bp); bp.connect(g); g.connect(out);
    src.start();
    timers.push(setInterval(() => {
      const f = 2600 + Math.random() * 900;
      for (let n = 0; n < 3; n++) pluck(f, 0.05, "square", 0.012, false);
    }, 1500));
    timers.push(setInterval(() => bp.frequency.setTargetAtTime(400 + Math.random() * 500, ctx.currentTime, 3), 5000));
  }

  if (id === "ocean") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "white"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 500; lp.Q.value = 0.6;
    const g = keep(ctx.createGain()); g.gain.value = 0.18;
    src.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    const swell = () => {
      g.gain.setTargetAtTime(0.46, ctx.currentTime, 1.8);
      lp.frequency.setTargetAtTime(1100, ctx.currentTime, 1.8);
      const t2 = setTimeout(() => {
        g.gain.setTargetAtTime(0.16, ctx.currentTime, 2.6);
        lp.frequency.setTargetAtTime(420, ctx.currentTime, 2.6);
      }, 4200);
      timers.push(t2);
    };
    swell();
    timers.push(setInterval(swell, 9000));
  }

  if (id === "synth") {
    const base = 110;
    const notes = [0, 3, 7, 10, 12, 10, 7, 3];
    let step = 0;
    const bass = keep(ctx.createOscillator());
    bass.type = "sawtooth"; bass.frequency.value = base / 2;
    const bl = keep(ctx.createBiquadFilter()); bl.type = "lowpass"; bl.frequency.value = 180;
    const bg = keep(ctx.createGain()); bg.gain.value = 0.09;
    bass.connect(bl); bl.connect(bg); bg.connect(out); bass.start();
    const arp = () => {
      pluck(hz(base * 2, notes[step % notes.length]), 0.45, "square", 0.03, true);
      if (step % 8 === 0) {
        const root = [0, -2, -5, -4][Math.floor(step / 8) % 4];
        bass.frequency.setTargetAtTime((base / 2) * Math.pow(2, root / 12), ctx.currentTime, 0.05);
      }
      step++;
    };
    arp();
    timers.push(setInterval(arp, 260));
  }

  if (id === "tape") {
    const base = 196;
    const prog2 = [[0, 4, 7, 11], [-2, 2, 5, 9], [-4, 0, 3, 7], [-5, -1, 2, 6]];
    let step = 0;
    const hiss = keep(ctx.createBufferSource());
    hiss.buffer = makeNoise(ctx, "white"); hiss.loop = true;
    const hf = keep(ctx.createBiquadFilter()); hf.type = "highpass"; hf.frequency.value = 3000;
    const hg = keep(ctx.createGain()); hg.gain.value = 0.04;
    hiss.connect(hf); hf.connect(hg); hg.connect(out); hiss.start();
    const chord = () => {
      const c = prog2[step % prog2.length];
      const drift = 1 + (Math.random() - 0.5) * 0.012;
      c.forEach((n, k) => timers.push(setTimeout(() => pluck(hz(base, n) * drift, 3.2, "triangle", 0.045, true), k * 110)));
      step++;
    };
    chord();
    timers.push(setInterval(chord, 3800));
  }

  if (id === "storm") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "white"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 900;
    const g = keep(ctx.createGain()); g.gain.value = 0.42;
    src.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    const thunder = () => {
      const o = ctx.createBufferSource();
      o.buffer = makeNoise(ctx, "brown");
      const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 160;
      const tg = ctx.createGain();
      const t = ctx.currentTime;
      tg.gain.setValueAtTime(0.0001, t);
      tg.gain.exponentialRampToValueAtTime(0.5, t + 0.25);
      tg.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      o.connect(f); f.connect(tg); tg.connect(out);
      o.start(t); o.stop(t + 3.4);
    };
    timers.push(setInterval(() => { if (Math.random() < 0.55) thunder(); }, 14000));
  }

  if (id === "fire") {
    const src = keep(ctx.createBufferSource());
    src.buffer = makeNoise(ctx, "brown"); src.loop = true;
    const lp = keep(ctx.createBiquadFilter()); lp.type = "lowpass"; lp.frequency.value = 380;
    const g = keep(ctx.createGain()); g.gain.value = 0.45;
    src.connect(lp); lp.connect(g); g.connect(out);
    src.start();
    const crack = () => {
      const o = ctx.createBufferSource();
      o.buffer = makeNoise(ctx, "white");
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass";
      bp.frequency.value = 1200 + Math.random() * 1800; bp.Q.value = 6;
      const cg = ctx.createGain();
      const t = ctx.currentTime;
      cg.gain.setValueAtTime(0.13, t);
      cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(bp); bp.connect(cg); cg.connect(out);
      o.start(t); o.stop(t + 0.2);
    };
    timers.push(setInterval(() => { crack(); if (Math.random() < 0.4) timers.push(setTimeout(crack, 120)); }, 900));
  }

  return () => {
    timers.forEach((t) => { clearInterval(t); clearTimeout(t); });
    nodes.forEach((n) => {
      try { if (n.stop) n.stop(); } catch (e) {}
      try { n.disconnect(); } catch (e) {}
    });
  };
}

function useMusic() {
  const ref = useRef({ ctx: null, master: null, stop: null });
  const [station, setStation] = useState(null);
  const [vol, setVolState] = useState(0.5);
  const [failed, setFailed] = useState(false);

  const stop = useCallback(() => {
    const s = ref.current;
    if (s.stop) { s.stop(); s.stop = null; }
    setStation(null);
  }, []);

  const play = useCallback((id) => {
    try {
      const s = ref.current;
      if (!s.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        s.ctx = new AC();
        s.master = s.ctx.createGain();
        s.master.gain.value = vol * 0.32;
        s.master.connect(s.ctx.destination);
      }
      if (s.ctx.state === "suspended") s.ctx.resume();
      if (s.stop) s.stop();
      s.stop = buildStation(s.ctx, s.master, id);
      setStation(id);
      setFailed(false);
    } catch (e) {
      setFailed(true);
    }
  }, [vol]);

  const setVol = useCallback((v) => {
    setVolState(v);
    const s = ref.current;
    if (s.master) s.master.gain.setTargetAtTime(v * 0.32, s.ctx.currentTime, 0.1);
  }, []);

  useEffect(() => () => { const s = ref.current; if (s.stop) s.stop(); if (s.ctx) try { s.ctx.close(); } catch (e) {} }, []);

  return { station, play, stop, vol, setVol, failed };
}

/* ------------------------------------------------------------------ */
/*  Landing                                                            */
/* ------------------------------------------------------------------ */
/*  Extra styling                                                      */
/* ------------------------------------------------------------------ */

const EXTRA_CSS = `
.ticket{color:var(--a4);}
.xpbar{background:var(--sunk);height:10px;border-radius:99px;overflow:hidden;}
.xpbar > i{display:block;height:100%;background:linear-gradient(90deg,var(--a1),var(--a2));transition:width .4s ease;}
.tier{min-width:96px;}
.tier.got{border-color:var(--good)!important;}
.tier.now{border-color:var(--a1)!important;}
.scroller{overflow-x:auto;-webkit-overflow-scrolling:touch;}
.scroller::-webkit-scrollbar{height:6px;}
.scroller::-webkit-scrollbar-thumb{background:var(--edge);border-radius:99px;}
.hp{background:var(--sunk);height:14px;border-radius:99px;overflow:hidden;}
.hp > i{display:block;height:100%;background:linear-gradient(90deg,var(--a2),var(--a1));transition:width .35s ease;}
.hpme > i{background:linear-gradient(90deg,var(--a4),var(--a3));}
.bucket{background:var(--panel2);border:2px dashed var(--edge);transition:border-color .12s ease,background .12s ease;}
.bucket.live{border-color:var(--a3);background:var(--sel);}
.pop{animation:pop .3s ease;}
@keyframes pop{0%{transform:scale(.85);opacity:0}100%{transform:scale(1);opacity:1}}
.shake{animation:shake .4s ease;}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}60%{transform:translateX(8px)}}
.fadein{animation:fadein .5s ease;}
@keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.stage{background:radial-gradient(80% 70% at 50% 30%, var(--glow) 0%, var(--sunk) 75%);}
.grain{background-image:radial-gradient(var(--line) 1px, transparent 1px);background-size:14px 14px;}
.striped{background-image:repeating-linear-gradient(45deg,var(--panel2) 0 12px,var(--panel) 12px 24px);}
.dotted{background-image:radial-gradient(var(--edge) 1.4px, transparent 1.4px);background-size:22px 22px;}
.sq{border-radius:6px!important;}
.round{border-radius:22px!important;}
.hero{position:relative;overflow:hidden;border-radius:22px;padding:20px;
  background:linear-gradient(135deg,var(--a4) 0%,var(--sel) 55%,var(--panel2) 100%);
  box-shadow:0 14px 34px rgba(0,0,0,.4);}
.hero:after{content:"";position:absolute;right:-40px;top:-50px;width:190px;height:190px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,255,255,.22),transparent 68%);}
.statrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:12px 10px;text-align:center;}
.stat b{display:block;font-size:22px;line-height:1.1;font-family:var(--disp),sans-serif;}
.stat span{font-size:11px;color:var(--dim);}
.card2{background:var(--panel);border:1px solid var(--line);border-radius:20px;
  box-shadow:0 8px 22px rgba(0,0,0,.28);}
.goal{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--line);}
.goal:last-child{border-bottom:none;}
.tick{width:24px;height:24px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;border:2px solid var(--edge);font-size:13px;font-weight:800;}
.tick.on{background:var(--good);border-color:var(--good);color:#07271A;}
.bigbtn{width:100%;border:none;border-radius:20px;padding:16px;font-size:17px;font-weight:700;
  color:#0D0A1C;background:linear-gradient(90deg,var(--a3),var(--a4));
  box-shadow:0 10px 26px rgba(0,0,0,.35);transition:transform .12s ease,filter .12s ease;}
.bigbtn:hover{filter:brightness(1.07);}
.bigbtn:active{transform:scale(.985);}
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--panel);
  border-top:1px solid var(--line);backdrop-filter:blur(12px);
  padding-bottom:env(safe-area-inset-bottom,0px);}
.rail{max-width:880px;margin:0 auto;display:flex;align-items:center;gap:8px;
  padding:8px 12px;border-bottom:1px solid var(--line);}
.rail .grow{flex:1;}
.railbtn{background:var(--panel2);border:1px solid var(--line);border-radius:14px;
  padding:8px 14px;font-size:14px;font-weight:600;position:relative;}
.railbtn.hot{border-color:var(--a3);color:var(--a3);}
.sheet{position:fixed;left:0;right:0;z-index:55;padding:0 12px;}
.sheetinner{max-width:880px;margin:0 auto;background:var(--panel);border:1px solid var(--line);
  border-radius:20px;padding:12px;box-shadow:0 -12px 40px rgba(0,0,0,.5);}
.tabinner{max-width:880px;margin:0 auto;display:grid;grid-template-columns:repeat(6,1fr);}
.tab{font-size:9.5px;}
.tab{padding:9px 4px 11px;display:flex;flex-direction:column;align-items:center;gap:3px;
  font-size:10px;color:var(--dim);background:none;border:none;}
.tab em{font-style:normal;font-size:19px;line-height:1;}
.tab.on{color:var(--a3);}
.tab.on em{filter:drop-shadow(0 0 8px var(--a3));}
.dot{width:8px;height:8px;border-radius:50%;background:var(--a2);position:absolute;
  transform:translate(10px,-4px);}
.sheet{position:fixed;left:0;right:0;top:68px;z-index:56;padding:0 12px;}
.sheetinner{max-width:880px;margin:0 auto;background:var(--panel);border:1px solid var(--line);
  border-radius:22px;padding:14px;box-shadow:0 18px 50px rgba(0,0,0,.55);
  animation:dropin .2s cubic-bezier(.2,.9,.3,1) both;}
@keyframes dropin{from{opacity:0;transform:translateY(-10px) scale(.98)}to{opacity:1;transform:none}}
.menubtn{position:fixed;top:14px;right:14px;z-index:57;width:44px;height:44px;border-radius:15px;
  background:var(--panel);border:1px solid var(--line);display:flex;align-items:center;
  justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.34);transition:background .12s ease;}
.menubtn:hover{background:var(--hover);}
.menubtn .bars{display:flex;flex-direction:column;gap:4px;width:18px;}
.menubtn .bars i{display:block;height:2px;border-radius:2px;background:var(--text);
  transition:transform .2s ease,opacity .2s ease;}
.menubtn.open .bars i:nth-child(1){transform:translateY(6px) rotate(45deg);}
.menubtn.open .bars i:nth-child(2){opacity:0;}
.menubtn.open .bars i:nth-child(3){transform:translateY(-6px) rotate(-45deg);}
.menubtn .dot{transform:translate(14px,-14px);}
.greet{padding:4px 58px 14px 2px;}
.roomtag{position:absolute;right:12px;top:12px;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);
  border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:5px 12px;
  font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff;}
.seg{display:flex;gap:6px;background:var(--sunk);border:1px solid var(--line);
  border-radius:999px;padding:5px;margin-bottom:16px;}
.seg button{flex:1;border:none;background:none;border-radius:999px;padding:9px;
  font-weight:700;font-size:14px;color:var(--dim);transition:background .14s ease,color .14s ease;}
.seg button.on{background:linear-gradient(145deg,var(--panel2),var(--panel));color:var(--text);
  box-shadow:0 3px 10px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.08);}
.roomcard{display:block;position:relative;width:100%;padding:0;border-radius:22px;overflow:hidden;
  border:1px solid var(--line);box-shadow:0 14px 34px rgba(0,0,0,.4);line-height:0;}
.roomcard:after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.55) 100%);}
.roomme{position:absolute;left:7%;bottom:6%;width:15%;z-index:2;}
.roomtag{position:absolute;right:14px;bottom:12px;z-index:3;font-size:11px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;color:#fff;opacity:.85;line-height:1;}
.seg{display:flex;gap:6px;padding:5px;border-radius:16px;background:var(--sunk);
  border:1px solid var(--line);}
.segbtn{flex:1;padding:10px;border-radius:12px;border:none;background:none;font-weight:700;
  font-size:14px;color:var(--dim);transition:background .14s ease,color .14s ease;}
.segbtn.on{background:linear-gradient(145deg,var(--panel2),var(--panel));color:var(--text);
  box-shadow:0 4px 12px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.07);}
.wallet{max-width:880px;margin:0 auto;display:flex;align-items:center;justify-content:center;
  gap:10px;padding:10px 14px 12px;}
.wpill{display:flex;align-items:center;gap:8px;padding:7px 14px 7px 7px;border-radius:999px;
  background:linear-gradient(145deg,var(--panel2),var(--panel));
  border:1px solid var(--line);box-shadow:0 4px 14px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.07);
  font-variant-numeric:tabular-nums;font-weight:700;font-size:14px;letter-spacing:.01em;}
.wpill i{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-style:normal;font-size:12px;font-weight:800;flex-shrink:0;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3);}
.wcoin i{background:linear-gradient(145deg,#FFD87A,#E09A1F);color:#4A2E00;}
.wtick i{background:linear-gradient(145deg,#C9A8FF,#7B4CE0);color:#22093F;}
.wfire i{background:linear-gradient(145deg,#FF9AA6,#E0405F);color:#3E020C;}
.wcoin{color:var(--a1);} .wtick{color:var(--a4);} .wfire{color:var(--a2);}
.strip2{display:flex;border-radius:20px;overflow:hidden;
  background:linear-gradient(145deg,var(--panel2),var(--panel));
  border:1px solid var(--line);box-shadow:0 10px 26px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.06);}
.s2{flex:1;padding:14px 8px;text-align:center;position:relative;}
.s2 + .s2:before{content:"";position:absolute;left:0;top:18%;height:64%;width:1px;background:var(--line);}
.s2 b{display:block;font-family:var(--disp),sans-serif;font-size:26px;line-height:1;
  font-variant-numeric:tabular-nums;}
.s2 b small{font-size:13px;opacity:.5;font-weight:600;margin-left:2px;}
.s2 span{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--dim);margin-top:6px;font-weight:700;}
.strip{display:flex;align-items:center;background:var(--panel);border:1px solid var(--line);
  border-radius:18px;padding:14px 8px;box-shadow:0 8px 22px rgba(0,0,0,.26);}
.sitem{flex:1;text-align:center;}
.sitem b{display:block;font-family:var(--disp),sans-serif;font-size:24px;line-height:1.05;}
.sitem b small{font-size:13px;opacity:.55;font-weight:600;}
.sitem span{display:block;font-size:11px;color:var(--dim);margin-top:3px;}
.sdiv{width:1px;align-self:stretch;background:var(--line);}
.shopgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
@media (min-width:640px){.shopgrid{grid-template-columns:repeat(3,minmax(0,1fr));}}
.shoptile{border:2px solid var(--line);border-radius:14px;overflow:hidden;background:var(--panel);
  text-align:left;padding:0;transition:transform .12s ease,box-shadow .12s ease;}
.shoptile:hover{transform:translateY(-3px);box-shadow:0 12px 26px rgba(0,0,0,.4);}
.shoptile:active{transform:translateY(0);}
.shopart{display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:10px;}
.shoprarity{height:5px;width:100%;}
.shopfoot{padding:8px 10px 10px;background:#00000038;}
.shopname{font-weight:700;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.shopprice{font-size:13px;font-weight:700;margin-top:3px;}
.shopowned{position:absolute;top:8px;right:8px;background:#0009;color:#fff;font-size:10px;
  font-weight:700;border-radius:99px;padding:2px 8px;}
.shopclock{font-variant-numeric:tabular-nums;font-weight:700;color:var(--a3);font-size:14px;}
.shoptag{font-size:10px;font-weight:800;letter-spacing:.08em;color:#0B0B10;border-radius:99px;padding:2px 8px;text-transform:uppercase;}
.shopmodal{position:fixed;inset:0;background:#000000b0;z-index:60;display:flex;align-items:center;
  justify-content:center;padding:18px;animation:fadein .18s ease;}
.shopsheet{background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:16px;
  width:100%;max-width:420px;max-height:90vh;overflow:auto;}
.badge{background:var(--a2);color:#fff;font-size:11px;border-radius:99px;padding:1px 7px;}
.locked{opacity:.55;}
.eq{border-color:var(--a3)!important;}
`;

/* ------------------------------------------------------------------ */
/*  Sound effects                                                      */
/* ------------------------------------------------------------------ */

const SFX_PACKS = [
  { id: "off", name: "Silent", price: 0, note: "No blips at all" },
  { id: "soft", name: "Soft", price: 0, note: "Gentle wooden taps" },
  { id: "arcade", name: "Arcade", price: 900, note: "Coin-op chirps" },
  { id: "chime", name: "Chime", price: 1400, note: "Glassy bells" },
  { id: "retro", name: "8-bit", price: 2200, note: "Square waves, no apologies" },
  { id: "bubble", name: "Bubbles", price: 1600, note: "Little wet pops" },
  { id: "wood", name: "Woodblock", price: 1800, note: "Dry taps and a click" },
];

let SFX_CTX = null;
function sfxCtx() {
  try {
    if (!SFX_CTX) { const AC = window.AudioContext || window.webkitAudioContext; SFX_CTX = new AC(); }
    if (SFX_CTX.state === "suspended") SFX_CTX.resume();
    return SFX_CTX;
  } catch (e) { return null; }
}

function buzz(kind) {
  try {
    if (!navigator.vibrate) return;
    navigator.vibrate(kind === "wrong" ? [26, 40, 26] : kind === "level" ? [14, 30, 14, 30, 22] : 12);
  } catch (e) {}
}

function playSfx(pack, kind) {
  buzz(kind);
  if (!pack || pack === "off") return;
  const ctx = sfxCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  const tone = (f, dur, type, vol, delay) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t + (delay || 0));
    g.gain.setValueAtTime(0, t + (delay || 0));
    g.gain.linearRampToValueAtTime(vol, t + (delay || 0) + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (delay || 0) + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(t + (delay || 0)); o.stop(t + (delay || 0) + dur + 0.05);
  };
  const shape = { soft: "sine", arcade: "square", chime: "sine", retro: "square", bubble: "sine", wood: "triangle" }[pack] || "sine";
  const lvl = pack === "retro" ? 0.08 : 0.06;
  if (kind === "right") {
    if (pack === "chime") { tone(880, 1.1, "sine", lvl, 0); tone(1318, 1.4, "sine", lvl * 0.7, 0.06); }
    else { tone(660, 0.12, shape, lvl, 0); tone(990, 0.16, shape, lvl, 0.09); }
  } else if (kind === "wrong") {
    tone(200, 0.18, shape, lvl, 0); tone(150, 0.24, shape, lvl, 0.08);
  } else if (kind === "coin") {
    tone(1046, 0.09, shape, lvl, 0); tone(1568, 0.22, shape, lvl, 0.07);
  } else if (kind === "level") {
    [523, 659, 784, 1046].forEach((f, n) => tone(f, 0.22, shape, lvl, n * 0.08));
  } else if (kind === "fail") {
    [392, 349, 294, 196].forEach((f, n) => tone(f, 0.35, shape, lvl, n * 0.14));
  } else if (kind === "tick") {
    tone(1200, 0.04, shape, lvl * 0.5, 0);
  }
}

/* ------------------------------------------------------------------ */
/*  Music stations                                                     */
/* ------------------------------------------------------------------ */

const STATIONS = [
  { id: "rain", name: "Rain", price: 0, note: "Steady rainfall, nothing else" },
  { id: "lofi", name: "Lo-fi keys", price: 0, note: "Slow chords that wander" },
  { id: "cafe", name: "Café hum", price: 900, note: "Room tone and distant cups" },
  { id: "drone", name: "Deep focus", price: 1200, note: "One low warm drone" },
  { id: "forest", name: "Night forest", price: 1600, note: "Crickets and a soft breeze" },
  { id: "ocean", name: "Ocean", price: 2000, note: "Waves on a long loop" },
  { id: "library", name: "Night library", price: 2400, note: "Soft room tone, far-off bells" },
  { id: "synth", name: "Synthwave", price: 3200, note: "Arpeggios and a fat bass" },
  { id: "tape", name: "Tape jazz", price: 4000, note: "Warped keys, brushed rhythm" },
  { id: "storm", name: "Distant storm", price: 3000, note: "Rain with far-off thunder" },
  { id: "fire", name: "Fireplace", price: 5000, note: "Crackle and low rumble", ticket: 2 },
];

/* ------------------------------------------------------------------ */
/*  Economy                                                            */
/* ------------------------------------------------------------------ */

const COIN = { firstTry: 1, lvl4: 6, lvl5: 15, acc90: 10, perfect: 20 };

function streakMult(days) {
  if (days >= 14) return 1.5;
  if (days >= 7) return 1.25;
  if (days >= 3) return 1.1;
  return 1;
}

function dailyDamp(roundsToday) {
  if (roundsToday < 4) return 1;
  if (roundsToday < 8) return 0.5;
  return 0.25;
}

/* levelUps: array of {from,to} for each card seen this round */
function payout(prog, r, mode, levelUps) {
  const acc = r.total ? r.correct / r.total : 0;
  let base = (r.correct || 0) * COIN.firstTry;
  levelUps.forEach((u) => {
    if (u.to >= 5 && u.from < 5) base += COIN.lvl5;
    else if (u.to >= 4 && u.from < 4) base += COIN.lvl4;
  });
  if (acc >= 1 && r.total) base += COIN.perfect;
  else if (acc >= 0.9) base += COIN.acc90;
  if (mode === "boss" && r.won) base += 40;
  if (mode === "survival") base += Math.floor((r.score || 0) / 4000);
  const damp = dailyDamp(prog.stats.today || 0);
  const mult = streakMult(prog.streak.days || 0);
  return Math.max(1, Math.round(base * damp * mult));
}

function xpFor(r, levelUps) {
  return (r.correct || 0) * 2 + (r.total || 0) + levelUps.filter((u) => u.to > u.from).length * 8;
}

/* ------------------------------------------------------------------ */
/*  Daily login                                                        */
/* ------------------------------------------------------------------ */

const DAILY = [
  { day: 1, coins: 80 },
  { day: 2, coins: 120 },
  { day: 3, coins: 180 },
  { day: 4, coins: 240 },
  { day: 5, coins: 320 },
  { day: 6, coins: 420 },
  { day: 7, coins: 700, item: "hat:crown", itemName: "Paper crown" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Still up";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const todayStr = () => new Date().toISOString().slice(0, 10);
const yesterStr = () => new Date(Date.now() - 86400000).toISOString().slice(0, 10);

function dailyReady(prog) {
  return (prog.login || {}).last !== todayStr();
}

function claimDaily(prog) {
  const l = prog.login || { last: "", day: 0 };
  const day = l.last === yesterStr() ? (l.day % 7) + 1 : 1;
  const reward = DAILY[day - 1];
  const next = {
    ...prog,
    login: { last: todayStr(), day },
    coins: prog.coins + (reward.coins || 0),
    tickets: (prog.tickets || 0) + (reward.tickets || 0),
  };
  if (reward.item && !next.owned.includes(reward.item)) next.owned = [...next.owned, reward.item];
  return { next, reward, day };
}

/* ------------------------------------------------------------------ */
/*  Battle pass                                                        */
/* ------------------------------------------------------------------ */

const PASS_ITEMS = {
  2: { id: "hat:cone", name: "Traffic cone" },
  4: { id: "top:flannel", name: "Flannel" },
  6: { id: "hand:boba", name: "Boba" },
  8: { id: "art:pennant", name: "Pennant" },
  10: { id: "hat:bread", name: "Bread hat" },
  12: { id: "bottom:cargo", name: "Cargos" },
  14: { id: "pet:duck", name: "Rubber duck" },
  16: { id: "back:wings", name: "Little wings" },
  18: { id: "tv:fire", name: "Fireplace channel" },
  20: { id: "top:dino", name: "Dino onesie" },
  22: { id: "lamp:lava", name: "Lava lamp" },
  24: { id: "gear:vr", name: "VR headset" },
  26: { id: "arcade:cab", name: "Arcade cabinet" },
  28: { id: "hat:pigeon", name: "Pigeon friend" },
  30: { id: "wall:mural", name: "Skyline mural" },
  33: { id: "top:banana", name: "Banana suit" },
  36: { id: "pet:cat", name: "A cat" },
  40: { id: "hat:trex", name: "Inflatable T-rex" },
};

const passNeed = (tier) => 110 + tier * 14;

function passState(prog) {
  let tier = 0, xp = prog.xp || 0;
  while (tier < 40 && xp >= passNeed(tier + 1)) { xp -= passNeed(tier + 1); tier++; }
  return { tier, into: xp, need: passNeed(Math.min(tier + 1, 40)) };
}

function tierReward(tier) {
  if (PASS_ITEMS[tier]) return { kind: "item", ...PASS_ITEMS[tier] };
  if (tier % 5 === 0) return { kind: "coins", amount: 200 + tier * 12 };
  return { kind: "coins", amount: 60 + tier * 8 };
}

/* ------------------------------------------------------------------ */
/*  Tasks                                                              */
/* ------------------------------------------------------------------ */

const QUESTS = [
  { id: "q-first", name: "Off the mark", desc: "Finish your first round", goal: 1, coins: 120, get: (s) => s.rounds, reward: "rug:neon", rewardName: "Glow ring rug" },
  { id: "q-perfect", name: "Clean sheet", desc: "Finish a round without missing one", goal: 1, coins: 200, get: (s) => s.perfect, reward: "seat:beans", rewardName: "Bean bags" },
  { id: "q-build", name: "Bring your own", desc: "Build a deck from a PDF or your notes", goal: 1, coins: 300, get: (s) => s.built, reward: "floor:wood", rewardName: "Warm wood floor" },
  { id: "q-drift", name: "Hands off", desc: "Let Drift run once", goal: 1, coins: 150, get: (s) => s.drift, reward: "pet:cat", rewardName: "A cat" },
  { id: "q-ask", name: "Curious", desc: "Ask the tutor five questions", goal: 5, coins: 220, get: (s) => s.asks, reward: "tv:reef", rewardName: "Aquarium channel" },
  { id: "q-modes", name: "Full rotation", desc: "Play every scored mode", goal: 10, coins: 500, get: (s) => (s.modes || []).length, reward: "tv:city", rewardName: "Night skyline channel" },
  { id: "q-boss", name: "Giant slayer", desc: "Beat a Boss Exam", goal: 1, coins: 400, get: (s) => s.bosses, reward: "art:trophy", rewardName: "Trophy shelf" },
  { id: "q-century", name: "Century", desc: "Answer 100 cards correctly", goal: 100, coins: 400, get: (s) => s.correct, reward: "plant:monstera", rewardName: "Monstera" },
  { id: "q-streak", name: "Three straight", desc: "Study three days in a row", goal: 3, coins: 350, get: (s, p) => p.streak.days, reward: "lamp:neon", rewardName: "Neon sign" },
  { id: "q-week", name: "Full week", desc: "Study seven days in a row", goal: 7, coins: 800, get: (s, p) => p.streak.days, reward: "hat:halo", rewardName: "Halo" },
  { id: "q-survive", name: "Still standing", desc: "Score 12,000 in Survival", goal: 12000, coins: 600, get: (s) => s.bestSurvival, reward: "pet:bot", rewardName: "Little robot" },
  { id: "q-mastery", name: "Locked in", desc: "Get 25 cards to level four", goal: 25, coins: 700, get: (s, p) => Object.values(p.mastery).filter((r) => r.lvl >= 4).length, reward: "desk:setup", rewardName: "Full desk rig" },
  { id: "q-master2", name: "Committed", desc: "Get 60 cards to level five", goal: 60, coins: 1500, get: (s, p) => Object.values(p.mastery).filter((r) => r.lvl >= 5).length, reward: "wall:gold", rewardName: "Gold wall" },
];

const MILESTONES = [
  { pct: 25, tickets: 1, name: "Quarter learned" },
  { pct: 50, tickets: 2, name: "Half learned" },
  { pct: 75, tickets: 3, name: "Most of it learned" },
  { pct: 100, tickets: 6, name: "Deck mastered" },
];

const deckMilestones = (prog, deck) => {
  const pct = masteryPct(prog, deck);
  return MILESTONES.map((m) => ({
    ...m,
    key: `m:${deck.id}:${m.pct}`,
    reached: pct >= m.pct,
    claimed: prog.claimed.includes(`m:${deck.id}:${m.pct}`),
  }));
};

const ACHIEVEMENTS = [
  { id: "a-boss3", name: "Undefeated", desc: "Beat three Boss Exams", goal: 3, tickets: 2, get: (s) => s.bosses },
  { id: "a-streak14", name: "Two weeks straight", desc: "A 14-day study streak", goal: 14, tickets: 3, get: (s, p) => p.streak.days },
  { id: "a-500", name: "Five hundred", desc: "Answer 500 cards correctly", goal: 500, tickets: 3, get: (s) => s.correct },
  { id: "a-decks", name: "Deck builder", desc: "Build three decks of your own", goal: 3, tickets: 2, get: (s) => s.built },
  { id: "a-lvl5", name: "Hundred locked", desc: "Get 100 cards to level five", goal: 100, tickets: 4, get: (s, p) => Object.values(p.mastery).filter((r) => r.lvl >= 5).length },
  { id: "a-survive", name: "Deck cleared", desc: "Clear a full Survival run without dying", goal: 1, tickets: 3, get: (s) => s.survivalClears },
  { id: "a-perfect10", name: "Ten clean rounds", desc: "Ten rounds with nothing missed", goal: 10, tickets: 3, get: (s) => s.perfect },
  { id: "a-survive5", name: "Five clean runs", desc: "Clear Survival five times without dying", goal: 5, tickets: 6, get: (s) => s.survivalClears },
  { id: "a-boss10", name: "Exam season", desc: "Beat ten Boss Exams", goal: 10, tickets: 5, get: (s) => s.bosses },
  { id: "a-ladder", name: "Top of the ladder", desc: "Reach the last rung without falling", goal: 1, tickets: 4, get: (s) => s.ladderTops || 0 },
];

const achState = (a, prog) => {
  const have = Math.min(a.goal, Math.max(0, a.get(prog.stats, prog) || 0));
  return { have, done: have >= a.goal, claimed: prog.claimed.includes(a.id) };
};

const ticketsWaiting = (prog, decks) => {
  let n = 0;
  decks.forEach((d) => deckMilestones(prog, d).forEach((m) => { if (m.reached && !m.claimed) n++; }));
  ACHIEVEMENTS.forEach((a) => { const st = achState(a, prog); if (st.done && !st.claimed) n++; });
  return n;
};

const questState = (q, prog) => {
  const have = Math.min(q.goal, Math.max(0, q.get(prog.stats, prog) || 0));
  return { have, done: have >= q.goal, claimed: prog.claimed.includes(q.id) };
};

const claimable = (prog) => QUESTS.filter((q) => { const s = questState(q, prog); return s.done && !s.claimed; }).length;
/* ------------------------------------------------------------------ */
/*  Character: catalogs                                                */
/* ------------------------------------------------------------------ */

const BODIES = [
  { id: "neutral", name: "Neutral", price: 0 },
  { id: "femme", name: "Femme", price: 0 },
  { id: "masc", name: "Masc", price: 0 },
];

const SKINS = [
  { id: "s1", name: "Sand", price: 0, c: "#F3C99B" },
  { id: "s2", name: "Amber", price: 0, c: "#E0A878" },
  { id: "s3", name: "Clay", price: 0, c: "#C4854F" },
  { id: "s4", name: "Umber", price: 0, c: "#8D5A34" },
  { id: "s5", name: "Cocoa", price: 0, c: "#5E3A20" },
  { id: "s6", name: "Porcelain", price: 0, c: "#FADFC8" },
  { id: "s7", name: "Olive", price: 0, c: "#D2A96A" },
  { id: "s8", name: "Slime", price: 1800, c: "#7FD6A6" },
  { id: "s9", name: "Grape", price: 2400, c: "#A98BF0" },
  { id: "s10", name: "Ghost", price: 4000, c: "#DCE3F2" },
  { id: "s11", name: "Ember", price: 6000, c: "#F0754A", ticket: 2 },
];

const HAIR_COLORS = [
  { id: "h1", name: "Ink", price: 0, c: "#2A2A33" },
  { id: "h2", name: "Coffee", price: 0, c: "#5A3A22" },
  { id: "h3", name: "Sand", price: 0, c: "#D6A85F" },
  { id: "h4", name: "Rust", price: 0, c: "#C2552F" },
  { id: "h5", name: "Ash", price: 0, c: "#9AA0AC" },
  { id: "h6", name: "Cherry", price: 900, c: "#E8446B" },
  { id: "h7", name: "Mint", price: 900, c: "#3FD9B0" },
  { id: "h8", name: "Ultra", price: 1600, c: "#8A5BFF" },
  { id: "h9", name: "Bleach", price: 1600, c: "#F5F0DC" },
  { id: "h10", name: "Traffic", price: 3000, c: "#FF7A18" },
];

const HAIRS = [
  { id: "none", name: "Shaved", price: 0 },
  { id: "buzz", name: "Buzz", price: 0 },
  { id: "short", name: "Short", price: 0 },
  { id: "bowl", name: "Bowl", price: 0 },
  { id: "bob", name: "Bob", price: 0 },
  { id: "pixie", name: "Pixie", price: 0 },
  { id: "halfup", name: "Half up", price: 0 },
  { id: "fringe", name: "Blunt fringe", price: 0 },
  { id: "curtain", name: "Curtain bangs", price: 500 },
  { id: "curly", name: "Curls", price: 500 },
  { id: "afro", name: "Afro", price: 500 },
  { id: "pigtails", name: "Pigtails", price: 600 },
  { id: "shag", name: "Shag", price: 700 },
  { id: "tail", name: "Ponytail", price: 800 },
  { id: "highpony", name: "High wrap pony", price: 900 },
  { id: "bun", name: "Messy bun", price: 900 },
  { id: "lowbun", name: "Low bun", price: 900 },
  { id: "puffs", name: "Afro puffs", price: 1000 },
  { id: "buns", name: "Space buns", price: 1100 },
  { id: "twists", name: "Twists", price: 1200 },
  { id: "spiky", name: "Spikes", price: 1200 },
  { id: "wolf", name: "Wolf cut", price: 1400 },
  { id: "bantu", name: "Bantu knots", price: 1400 },
  { id: "locs", name: "Locs", price: 1500 },
  { id: "cornrows", name: "Cornrows", price: 1500 },
  { id: "long", name: "Long", price: 1500 },
  { id: "braids", name: "Box braids", price: 1600 },
  { id: "hime", name: "Hime cut", price: 1800 },
  { id: "wavylong", name: "Long waves", price: 1800 },
  { id: "locsup", name: "Locs updo", price: 2000 },
  { id: "crown", name: "Braided crown", price: 2400 },
  { id: "fadecurl", name: "Fade with curls", price: 2400 },
  { id: "mohawk", name: "Mohawk", price: 2600 },
  { id: "wave", name: "Big wave", price: 3200 },
];

const HAIR_ACC = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "clips", name: "Hair clips", price: 0 },
  { id: "band", name: "Headband", price: 400 },
  { id: "bow", name: "Bow", price: 700 },
  { id: "scrunchie", name: "Scrunchie", price: 700 },
  { id: "flower", name: "Flower", price: 1100 },
  { id: "scarf", name: "Head scarf", price: 1400 },
  { id: "shades", name: "Shades up top", price: 2000 },
];

const BROWS = [
  { id: "flat", name: "Flat", price: 0 },
  { id: "raised", name: "Raised", price: 0 },
  { id: "worried", name: "Worried", price: 0 },
  { id: "angry", name: "Furrowed", price: 400 },
  { id: "unibrow", name: "Unibrow", price: 1200 },
];

const EYES = [
  { id: "dot", name: "Dots", price: 0 },
  { id: "happy", name: "Happy", price: 0 },
  { id: "wide", name: "Wide", price: 0 },
  { id: "sleepy", name: "Sleepy", price: 0 },
  { id: "side", name: "Side eye", price: 500 },
  { id: "dead", name: "8am eyes", price: 900 },
  { id: "star", name: "Stars", price: 2200 },
  { id: "spiral", name: "Spirals", price: 2600 },
  { id: "money", name: "Dollar signs", price: 4000 },
  { id: "laser", name: "Laser eyes", price: 7000, ticket: 3 },
];

const MOUTHS = [
  { id: "smile", name: "Smile", price: 0 },
  { id: "flat", name: "Flat", price: 0 },
  { id: "open", name: "Open", price: 0 },
  { id: "smirk", name: "Smirk", price: 0 },
  { id: "grit", name: "Gritted", price: 400 },
  { id: "tongue", name: "Tongue", price: 800 },
  { id: "fangs", name: "Fangs", price: 1600 },
  { id: "stache2", name: "Duck lips", price: 2000 },
  { id: "scream", name: "Screaming", price: 2600 },
];

const BEARDS = [
  { id: "none", name: "Clean", price: 0 },
  { id: "stubble", name: "Stubble", price: 0 },
  { id: "goatee", name: "Goatee", price: 500 },
  { id: "full", name: "Full beard", price: 1000 },
  { id: "handle", name: "Handlebar", price: 1800 },
  { id: "santa", name: "Enormous", price: 3000 },
];

const TOPS = [
  { id: "tee", name: "Tee", price: 0 },
  { id: "hoodie", name: "Hoodie", price: 0 },
  { id: "jacket", name: "Jacket", price: 0 },
  { id: "tank", name: "Tank", price: 0 },
  { id: "flannel", name: "Flannel", price: 700 },
  { id: "puffer", name: "Puffer", price: 900 },
  { id: "varsity", name: "Varsity", price: 1200 },
  { id: "jersey", name: "Jersey", price: 1200 },
  { id: "blazer", name: "Blazer", price: 1600 },
  { id: "turtle", name: "Turtleneck", price: 1600 },
  { id: "crop", name: "Crop + sleeves", price: 1800 },
  { id: "labcoat", name: "Lab coat", price: 2200 },
  { id: "apron", name: "Apron", price: 2200 },
  { id: "gown", name: "Grad gown", price: 3000 },
  { id: "suit", name: "Full suit", price: 3600 },
  { id: "dino", name: "Dino onesie", price: 5000 },
  { id: "banana", name: "Banana suit", price: 6500, ticket: 2 },
  { id: "hotdog", name: "Hotdog suit", price: 5600 },
  { id: "hivis", name: "Hi-vis vest", price: 1400 },
  { id: "box", name: "Cardboard armour", price: 8000, ticket: 3 },
  { id: "blouse", name: "Blouse", price: 700 },
  { id: "cardi", name: "Cardigan", price: 900 },
  { id: "sundress", name: "Sundress", price: 1200 },
  { id: "vest", name: "Sweater vest", price: 1200 },
  { id: "corset", name: "Corset top", price: 1600 },
  { id: "denim", name: "Denim jacket", price: 1600 },
  { id: "overall", name: "Overalls", price: 1800 },
  { id: "kimono", name: "Long kimono", price: 3000 },
];

const TOP_COLORS = [
  { id: "o1", name: "Signal", price: 0, c: "#E8544B" },
  { id: "o2", name: "Cobalt", price: 0, c: "#3B6FE0" },
  { id: "o3", name: "Moss", price: 0, c: "#4C9A5C" },
  { id: "o4", name: "Butter", price: 0, c: "#F0B84A" },
  { id: "o5", name: "Charcoal", price: 0, c: "#33363F" },
  { id: "o6", name: "Cream", price: 0, c: "#EFE3CC" },
  { id: "o7", name: "Bubble", price: 700, c: "#F177B0" },
  { id: "o8", name: "Ice", price: 700, c: "#54CFE0" },
  { id: "o9", name: "Violet", price: 1400, c: "#8A5BFF" },
  { id: "o10", name: "Highlighter", price: 2600, c: "#C8F53C" },
];

const BOTTOMS = [
  { id: "jeans", name: "Jeans", price: 0 },
  { id: "sweats", name: "Sweats", price: 0 },
  { id: "shorts", name: "Shorts", price: 0 },
  { id: "cargo", name: "Cargos", price: 700 },
  { id: "pleat", name: "Pleated skirt", price: 900 },
  { id: "long", name: "Long skirt", price: 900 },
  { id: "joggers", name: "Joggers", price: 1100 },
  { id: "denimskirt", name: "Denim skirt", price: 900 },
  { id: "slacks", name: "Slacks", price: 1400 },
  { id: "stripe", name: "Track pants", price: 1800 },
  { id: "kilt", name: "Kilt", price: 2600 },
  { id: "boxers", name: "Just boxers", price: 3200 },
  { id: "leggings", name: "Leggings", price: 700 },
  { id: "mom", name: "Mom jeans", price: 900 },
  { id: "wide", name: "Wide leg", price: 1100 },
  { id: "flare", name: "Flares", price: 1400 },
  { id: "biker", name: "Bike shorts", price: 1400 },
  { id: "tulle", name: "Tulle skirt", price: 2600 },
];

const BOTTOM_COLORS = [
  { id: "b1", name: "Indigo", price: 0, c: "#38507F" },
  { id: "b2", name: "Slate", price: 0, c: "#3A3F52" },
  { id: "b3", name: "Khaki", price: 0, c: "#B7A177" },
  { id: "b4", name: "Black", price: 0, c: "#23252E" },
  { id: "b5", name: "Rust", price: 0, c: "#B4593A" },
  { id: "b6", name: "Sky", price: 800, c: "#6FA8E0" },
  { id: "b7", name: "Plaid red", price: 1600, c: "#A33A3A" },
  { id: "b8", name: "Purple", price: 2400, c: "#7A5AC8" },
];

const SHOES = [
  { id: "sneak", name: "Sneakers", price: 0 },
  { id: "boots", name: "Boots", price: 0 },
  { id: "slides", name: "Slides", price: 0 },
  { id: "dress", name: "Dress shoes", price: 800 },
  { id: "cleats", name: "Cleats", price: 1200 },
  { id: "platform", name: "Platform boots", price: 1600 },
  { id: "socks", name: "Socks and sandals", price: 1800 },
  { id: "bunny", name: "Bunny slippers", price: 2600 },
  { id: "bare", name: "Barefoot", price: 3000 },
  { id: "mary", name: "Mary janes", price: 800 },
  { id: "heels", name: "Block heels", price: 1200 },
  { id: "chunky", name: "Chunky sneakers", price: 1400 },
  { id: "ugg", name: "Fuzzy boots", price: 1800 },
];

const HATS = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "cans", name: "Headphones", price: 0 },
  { id: "cap", name: "Cap", price: 0 },
  { id: "beanie", name: "Beanie", price: 600 },
  { id: "bucket", name: "Bucket hat", price: 900 },
  { id: "band", name: "Headband", price: 900 },
  { id: "grad", name: "Grad cap", price: 1400 },
  { id: "crown", name: "Paper crown", price: 1800 },
  { id: "fox", name: "Fox hood", price: 2200 },
  { id: "chicken", name: "Chicken hood", price: 2400 },
  { id: "cone", name: "Traffic cone", price: 2600 },
  { id: "bread", name: "Bread hat", price: 2800 },
  { id: "crab", name: "Crab bucket", price: 3000 },
  { id: "top", name: "Tall hat", price: 3000 },
  { id: "antlers", name: "Antlers", price: 3200 },
  { id: "pigeon", name: "Pigeon friend", price: 3600 },
  { id: "shower", name: "Shower cap", price: 3800 },
  { id: "cactus", name: "Cactus pot", price: 4200 },
  { id: "tv", name: "TV head", price: 5000, mask: true },
  { id: "bag", name: "Paper bag", price: 5200, mask: true, hideFace: true },
  { id: "pumpkin", name: "Pumpkin", price: 6000, mask: true, hideFace: true },
  { id: "trex", name: "Inflatable T-rex", price: 9000, mask: true, hideFace: true, ticket: 4 },
  { id: "fishbowl", name: "Fishbowl helmet", price: 4600 },
  { id: "basket", name: "Laundry basket", price: 4800, mask: true, hideFace: true },
  { id: "trafficlight", name: "Traffic light", price: 5400 },
  { id: "toast", name: "Toast, balanced", price: 3400 },
  { id: "wizard", name: "Wizard hat", price: 3800 },
  { id: "propeller", name: "Propeller beanie", price: 2400 },
  { id: "chickbucket", name: "Bucket of chicken", price: 4400 },
  { id: "pineapple", name: "Pineapple", price: 3600 },
  { id: "halo", name: "Halo", price: 8000, ticket: 3 },
  { id: "beret", name: "Beret", price: 1200 },
  { id: "sunhat", name: "Sun hat", price: 1600 },
];

const GEAR = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "shades", name: "Shades", price: 0 },
  { id: "glasses", name: "Glasses", price: 0 },
  { id: "3d", name: "3D specs", price: 700 },
  { id: "mask", name: "Face mask", price: 700 },
  { id: "monocle", name: "Monocle", price: 1600 },
  { id: "shutter", name: "Shutter shades", price: 1900 },
  { id: "eyepatch", name: "Eye patch", price: 2200 },
  { id: "swim", name: "Swim goggles", price: 2400 },
  { id: "vr", name: "VR headset", price: 4000 },
  { id: "clown", name: "Clown nose", price: 900 },
  { id: "bandaid", name: "Face plaster", price: 1200 },
  { id: "hoops", name: "Hoop earrings", price: 800 },
  { id: "studs", name: "Star studs", price: 800 },
  { id: "blush", name: "Blush", price: 600 },
  { id: "freckles", name: "Freckles", price: 600 },
  { id: "cateye", name: "Cat-eye glasses", price: 1600 },
];

const BACKS = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "pack", name: "Backpack", price: 900 },
  { id: "tube", name: "Poster tube", price: 1400 },
  { id: "guitar", name: "Guitar", price: 2600 },
  { id: "wings", name: "Little wings", price: 3800 },
  { id: "jet", name: "Jetpack", price: 5500 },
  { id: "cape", name: "Cape", price: 4200 },
  { id: "turtle", name: "Turtle shell", price: 3600 },
  { id: "balloons", name: "Balloons", price: 4800 },
  { id: "overpack", name: "Backpack, overpacked", price: 2200 },
];

const HANDS = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "book", name: "Textbook", price: 0 },
  { id: "coffee", name: "Coffee", price: 600 },
  { id: "boba", name: "Boba", price: 1000 },
  { id: "energy", name: "Energy drink", price: 1400 },
  { id: "calc", name: "Calculator", price: 1400 },
  { id: "phone", name: "Phone", price: 1800 },
  { id: "foam", name: "Foam finger", price: 2400 },
  { id: "pizza", name: "Pizza slice", price: 2800 },
  { id: "plunger", name: "Plunger", price: 3200 },
  { id: "noodles", name: "Instant noodles", price: 2600 },
  { id: "trophy", name: "Participation trophy", price: 3400 },
  { id: "chicken", name: "Rubber chicken", price: 2800 },
  { id: "extinguisher", name: "Fire extinguisher", price: 3400 },
  { id: "shaker", name: "Protein shaker", price: 1800 },
  { id: "sword", name: "Highlighter sword", price: 5000, ticket: 2 },
];

const AURAS = [
  { id: "none", name: "None", price: 0 },
  { id: "glow", name: "Soft glow", price: 0, ticket: 2 },
  { id: "gold", name: "Gold aura", price: 0, ticket: 4 },
  { id: "sparkle", name: "Orbiting sparks", price: 0, ticket: 5 },
  { id: "flame", name: "On fire", price: 0, ticket: 6 },
  { id: "static", name: "Broken signal", price: 0, ticket: 6 },
  { id: "holo", name: "Holographic", price: 0, ticket: 8 },
];

const PLATES = [
  { id: "none", name: "Normal", price: 0 },
  { id: "gold", name: "Gold plated", price: 0, ticket: 3 },
  { id: "chrome", name: "Chromed", price: 0, ticket: 3 },
  { id: "holo", name: "Foil finish", price: 0, ticket: 6 },
  { id: "cursed", name: "Cursed", price: 0, ticket: 6 },
];

const TITLES = [
  { id: "none", name: "No title", price: 0 },
  { id: "night", name: "Night Shift", price: 0, ticket: 2 },
  { id: "crammer", name: "Professional Crammer", price: 0, ticket: 2 },
  { id: "boss", name: "Exam Slayer", price: 0, ticket: 3 },
  { id: "streak", name: "Never Misses a Day", price: 0, ticket: 4 },
  { id: "scholar", name: "Certified Scholar", price: 0, ticket: 5 },
  { id: "goat", name: "The GOAT", price: 0, ticket: 8 },
];

const NECK = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "chain", name: "Chain", price: 600 },
  { id: "choker", name: "Choker", price: 600 },
  { id: "lanyard", name: "Student lanyard", price: 900 },
  { id: "scarf", name: "Scarf", price: 1200 },
  { id: "cans", name: "Headphones down", price: 1400 },
  { id: "tie", name: "Loose tie", price: 1400 },
  { id: "medal", name: "Gold medal", price: 3000 },
  { id: "floatie", name: "Pool floatie", price: 4200 },
];

const LEGWEAR = [
  { id: "none", name: "Nothing", price: 0 },
  { id: "socks", name: "Crew socks", price: 0 },
  { id: "stripe", name: "Striped socks", price: 500 },
  { id: "knee", name: "Knee highs", price: 700 },
  { id: "warmers", name: "Leg warmers", price: 900 },
  { id: "tights", name: "Tights", price: 900 },
  { id: "fishnet", name: "Fishnets", price: 1400 },
];

const MAKEUP = [
  { id: "none", name: "None", price: 0 },
  { id: "blush", name: "Blush", price: 0 },
  { id: "freckles", name: "Freckles", price: 400 },
  { id: "gloss", name: "Gloss", price: 600 },
  { id: "liner", name: "Sharp liner", price: 900 },
  { id: "glitter", name: "Glitter", price: 1400 },
  { id: "warpaint", name: "Game day stripes", price: 1800 },
  { id: "tears", name: "Finals-week tears", price: 2200 },
  { id: "marker", name: "Fell asleep first", price: 2600 },
];

const CHAR_SLOTS = [
  { key: "body", name: "Build", items: BODIES },
  { key: "skin", name: "Skin", items: SKINS, color: true },
  { key: "hair", name: "Hair", items: HAIRS },
  { key: "hairColor", name: "Hair colour", items: HAIR_COLORS, color: true },
  { key: "acc", name: "Hair extras", items: HAIR_ACC },
  { key: "brows", name: "Brows", items: BROWS },
  { key: "eyes", name: "Eyes", items: EYES },
  { key: "mouth", name: "Mouth", items: MOUTHS },
  { key: "beard", name: "Facial hair", items: BEARDS },
  { key: "top", name: "Top", items: TOPS },
  { key: "topColor", name: "Top colour", items: TOP_COLORS, color: true },
  { key: "bottom", name: "Bottom", items: BOTTOMS },
  { key: "bottomColor", name: "Bottom colour", items: BOTTOM_COLORS, color: true },
  { key: "shoes", name: "Shoes", items: SHOES },
  { key: "hat", name: "Head", items: HATS },
  { key: "gear", name: "Face gear", items: GEAR },
  { key: "back", name: "On the back", items: BACKS },
  { key: "neck", name: "Neck", items: NECK },
  { key: "legs", name: "Legwear", items: LEGWEAR },
  { key: "makeup", name: "Makeup", items: MAKEUP },
  { key: "hand", name: "In hand", items: HANDS },
  { key: "aura", name: "Aura 🎟", items: AURAS },
  { key: "plate", name: "Head finish 🎟", items: PLATES },
  { key: "title", name: "Title 🎟", items: TITLES },
];

const DEFAULT_AVATAR = {
  body: "neutral", skin: "s2", hair: "short", hairColor: "h1", brows: "flat", eyes: "dot",
  mouth: "smile", beard: "none", top: "hoodie", topColor: "o2", bottom: "jeans",
  bottomColor: "b1", shoes: "sneak", hat: "none", gear: "none", back: "none", hand: "none",
  acc: "none", neck: "none", legs: "none", makeup: "none", aura: "none", plate: "none", title: "none",
};

const titleOf = (a) => {
  const t = TITLES.find((x) => x.id === ((a || {}).title || "none"));
  return t && t.id !== "none" ? t.name : null;
};

const colorOf = (list, id, fallback) => (list.find((x) => x.id === id) || { c: fallback }).c || fallback;

/* ------------------------------------------------------------------ */
/*  Character: renderer                                                */
/* ------------------------------------------------------------------ */

function Avatar({ a, size = 140, fluid, pose }) {
  const v = { ...DEFAULT_AVATAR, ...(a || {}) };
  const skin = colorOf(SKINS, v.skin, "#E0A878");
  const hc = colorOf(HAIR_COLORS, v.hairColor, "#2A2A33");
  const tc = colorOf(TOP_COLORS, v.topColor, "#3B6FE0");
  const bc = colorOf(BOTTOM_COLORS, v.bottomColor, "#38507F");
  const hat = HATS.find((h) => h.id === v.hat) || HATS[0];
  const D = "#26262E";
  const sh = "rgba(0,0,0,0.15)";
  const femme = v.body === "femme";
  const masc = v.body === "masc";
  const tw = masc ? 78 : femme ? 62 : 70;          /* torso width */
  const tx = 100 - tw / 2;
  const shoulder = masc ? 8 : femme ? -2 : 3;

  const hi = "rgba(255,255,255,0.18)";
  const lo = "rgba(0,0,0,0.20)";

  /* back layer: anything that falls behind the head */
  const hairBack = {
    long: <g><rect x="44" y="62" width="112" height="118" rx="30" fill={hc} /><rect x="44" y="124" width="112" height="56" fill={lo} /></g>,
    wavylong: <g><path d="M42 96 q-4 -78 58 -80 q62 2 58 80 l6 96 q-16 14 -26 -4 l-6 -74 q-32 20 -64 0 l-6 74 q-10 18 -26 4 z" fill={hc} /><path d="M50 130 q18 16 40 12" stroke={lo} strokeWidth="6" fill="none" /></g>,
    hime: <g><rect x="44" y="64" width="112" height="120" rx="26" fill={hc} /><rect x="40" y="70" width="20" height="80" rx="8" fill={hc} /><rect x="140" y="70" width="20" height="80" rx="8" fill={hc} /></g>,
    bob: <rect x="48" y="66" width="104" height="78" rx="32" fill={hc} />,
    shag: <g><path d="M46 90 q-2 -68 54 -70 q56 2 54 70 l2 52 q-14 10 -22 -6 l-4 -34 q-30 16 -60 0 l-4 34 q-8 16 -22 6 z" fill={hc} /></g>,
    wolf: <g><path d="M44 92 q-2 -72 56 -74 q58 2 56 74 l4 74 q-16 12 -24 -6 l-6 -52 q-30 18 -60 0 l-6 52 q-8 18 -24 6 z" fill={hc} /></g>,
    tail: <g><path d="M154 90 q30 14 24 52 q-6 36 -28 46 q16 -36 6 -60 q-6 -20 -20 -26 z" fill={hc} /><path d="M158 108 q14 22 8 46" stroke={lo} strokeWidth="5" fill="none" /></g>,
    highpony: <g><path d="M110 26 q52 6 50 56 q-2 44 -30 62 q14 -44 2 -70 q-10 -22 -30 -30 z" fill={hc} /></g>,
    pigtails: <g>{[40, 160].map((x, n) => <g key={x}><circle cx={x} cy="110" r="23" fill={hc} /><path d={`M${x} 126 q${n ? 18 : -18} 36 ${n ? 4 : -4} 58 q${n ? -20 : 20} -16 ${n ? -12 : 12} -58 z`} fill={hc} /><circle cx={x} cy="110" r="23" fill={n ? hi : "transparent"} opacity="0.12" /></g>)}</g>,
    puffs: <g><circle cx="42" cy="78" r="27" fill={hc} /><circle cx="158" cy="78" r="27" fill={hc} /><circle cx="36" cy="70" r="10" fill={hi} /></g>,
    braids: <g>{[38, 146].map((x) => <g key={x}><rect x={x} y="84" width="17" height="92" rx="8" fill={hc} />{[94, 114, 134, 154].map((y) => <rect key={y} x={x - 2} y={y} width="21" height="5" rx="2" fill={lo} />)}</g>)}</g>,
    twists: <g>{[38, 148].map((x) => <g key={x}>{[86, 108, 130, 152].map((y) => <ellipse key={y} cx={x + 7} cy={y} rx="9" ry="12" fill={hc} />)}</g>)}</g>,
    locs: <g>{[38, 56, 142, 160].map((x, n) => <g key={x}><rect x={x} y="78" width="14" height={82 + (n % 2) * 18} rx="7" fill={hc} /><rect x={x + 3} y="86" width="4" height={70 + (n % 2) * 16} fill={hi} opacity="0.5" /></g>)}</g>,
    afro: <circle cx="100" cy="76" r="58" fill={hc} />,
    fadecurl: null,
    bun: <g><circle cx="100" cy="28" r="25" fill={hc} /><path d="M84 20 q18 -12 34 4" stroke={hi} strokeWidth="5" fill="none" /></g>,
    lowbun: <g><circle cx="100" cy="146" r="24" fill={hc} /><path d="M86 140 q16 -10 30 2" stroke={hi} strokeWidth="4" fill="none" /></g>,
    locsup: <g><ellipse cx="100" cy="34" rx="38" ry="20" fill={hc} />{[70, 86, 100, 114, 130].map((x) => <ellipse key={x} cx={x} cy="26" rx="8" ry="14" fill={hc} />)}</g>,
    wave: <path d="M40 96 q-6 -72 60 -76 q66 4 60 76 q-14 -36 -60 -32 q-46 -4 -60 32 z" fill={hc} />,
    halfup: <g><rect x="48" y="70" width="104" height="86" rx="30" fill={hc} /><circle cx="100" cy="42" r="18" fill={hc} /></g>,
    crown: <rect x="48" y="68" width="104" height="80" rx="30" fill={hc} />,
    curly: <g>{[52, 72, 100, 128, 148].map((x, n) => <circle key={x} cx={x} cy={92 + (n % 2) * 14} r="20" fill={hc} />)}</g>,
  }[v.hair] || null;

  /* the cap of hair that sits on the skull, with a highlight */
  const cap = (extra, ry) => (
    <g>
      <ellipse cx="100" cy="66" rx="49" ry={ry || 30} fill={hc} />
      <path d="M58 60 q42 -30 84 0 q-30 -13 -42 -13 q-12 0 -42 13 z" fill={hi} />
      {extra}
    </g>
  );
  const sides = (h) => (
    <g><rect x="50" y="64" width="17" height={h} rx="8" fill={hc} /><rect x="133" y="64" width="17" height={h} rx="8" fill={hc} /></g>
  );

  const hairFront = {
    none: null,
    buzz: <g><ellipse cx="100" cy="66" rx="46" ry="26" fill={hc} /><ellipse cx="94" cy="58" rx="26" ry="11" fill={hi} /></g>,
    short: cap(sides(30)),
    bowl: cap(<rect x="51" y="66" width="98" height="17" rx="8" fill={hc} />),
    pixie: cap(<g><path d="M54 76 q24 -26 48 -14 q-18 8 -24 22 z" fill={hi} /><rect x="51" y="66" width="13" height="26" rx="6" fill={hc} /></g>),
    fringe: cap(<g><rect x="56" y="72" width="88" height="20" rx="4" fill={hc} /><rect x="56" y="72" width="88" height="6" fill={hi} opacity="0.5" />{sides(46)}</g>),
    curtain: cap(<g><path d="M100 60 q-26 4 -34 40 q-4 -30 12 -42 z" fill={hc} /><path d="M100 60 q26 4 34 40 q4 -30 -12 -42 z" fill={hc} />{sides(40)}</g>),
    bob: cap(sides(62)),
    hime: cap(<g><rect x="58" y="72" width="84" height="18" rx="4" fill={hc} />{sides(58)}</g>),
    halfup: cap(sides(48)),
    curly: <g><ellipse cx="100" cy="68" rx="46" ry="24" fill={hc} />{[56, 76, 100, 124, 144].map((x, n) => <circle key={n} cx={x} cy={n % 2 ? 44 : 52} r="16" fill={hc} />)}{[68, 92, 116].map((x, n) => <circle key={x} cx={x} cy={n % 2 ? 48 : 42} r="8" fill={hi} />)}</g>,
    afro: <ellipse cx="100" cy="64" rx="46" ry="22" fill={hc} />,
    fadecurl: <g><ellipse cx="100" cy="70" rx="46" ry="22" fill={hc} opacity="0.5" />{[72, 90, 108, 126].map((x, n) => <circle key={x} cx={x} cy={48 + (n % 2) * 5} r="14" fill={hc} />)}</g>,
    puffs: cap(null),
    shag: cap(<g><rect x="56" y="70" width="88" height="16" rx="6" fill={hc} />{sides(52)}</g>),
    wolf: cap(<g><path d="M60 74 q40 -22 80 0 q-24 -6 -40 -6 q-16 0 -40 6 z" fill={hc} />{sides(56)}</g>),
    tail: cap(null),
    highpony: cap(<path d="M60 62 q40 -24 80 -2 q-32 -8 -80 2 z" fill={hi} />),
    pigtails: cap(<rect x="56" y="70" width="88" height="14" rx="5" fill={hc} />),
    bun: cap(null),
    lowbun: cap(null),
    buns: cap(<g><circle cx="52" cy="42" r="19" fill={hc} /><circle cx="148" cy="42" r="19" fill={hc} /><circle cx="47" cy="36" r="7" fill={hi} /></g>),
    bantu: cap(<g>{[[66, 40], [100, 32], [134, 40]].map(([x, y], n) => <g key={n}><ellipse cx={x} cy={y} rx="13" ry="15" fill={hc} /><ellipse cx={x - 4} cy={y - 4} rx="5" ry="6" fill={hi} /></g>)}</g>),
    cornrows: cap(<g>{[62, 76, 90, 104, 118, 132].map((x) => <g key={x}><rect x={x - 3} y="38" width="7" height="36" rx="3" fill={hc} /><rect x={x - 3} y="38" width="7" height="36" rx="3" fill={lo} opacity="0.35" /></g>)}</g>),
    twists: cap(<g>{[64, 84, 100, 116, 136].map((x) => <ellipse key={x} cx={x} cy="46" rx="8" ry="12" fill={hc} />)}</g>),
    spiky: <g><ellipse cx="100" cy="68" rx="46" ry="24" fill={hc} />{[60, 78, 100, 122, 140].map((x, n) => <path key={n} d={`M${x - 13} 62 L${x + (n % 2 ? 7 : -7)} 20 L${x + 13} 62 z`} fill={hc} />)}</g>,
    long: cap(null),
    wavylong: cap(<path d="M58 64 q42 -28 84 0 q-30 -14 -42 -14 q-12 0 -42 14 z" fill={hi} />),
    braids: cap(<g>{[64, 82, 100, 118, 136].map((x) => <rect key={x} x={x - 4} y="40" width="9" height="30" rx="4" fill={hc} />)}</g>),
    locs: cap(<g>{[62, 80, 100, 120, 138].map((x, n) => <rect key={x} x={x - 6} y={36 + (n % 2) * 4} width="13" height="36" rx="6" fill={hc} />)}</g>),
    locsup: cap(null),
    crown: cap(<g><path d="M52 62 q48 -32 96 0" stroke={hc} strokeWidth="17" fill="none" strokeLinecap="round" />{[62, 82, 100, 118, 138].map((x) => <ellipse key={x} cx={x} cy="55" rx="9" ry="7" fill={lo} />)}</g>),
    mohawk: <g><ellipse cx="100" cy="70" rx="44" ry="20" fill={lo} /><path d="M86 62 q14 -52 28 0 z" fill={hc} /><path d="M92 56 q8 -26 14 0 z" fill={hi} /></g>,
    wave: cap(null),
  }[v.hair];

  const accArt = {
    none: null,
    clips: <g><rect x="60" y="56" width="19" height="6" rx="3" fill="#F177B0" /><rect x="64" y="68" width="15" height="5" rx="2.5" fill="#54CFE0" /><rect x="124" y="58" width="17" height="6" rx="3" fill="#F5D34D" /></g>,
    band: <g><path d="M52 66 q48 -24 96 0" stroke="#E8446B" strokeWidth="11" fill="none" /><path d="M52 64 q48 -20 96 0" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" /></g>,
    bow: <g transform="translate(142,50)"><path d="M0 0 l-17 -11 l0 22 z" fill="#F177B0" /><path d="M0 0 l17 -11 l0 22 z" fill="#F177B0" /><circle r="6" fill="#E0508E" /></g>,
    scrunchie: <g><circle cx="100" cy="30" r="15" fill="none" stroke="#F5D34D" strokeWidth="9" /><circle cx="100" cy="30" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" /></g>,
    flower: <g transform="translate(56,58)">{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-10" rx="7" ry="10" fill="#F7C8D8" transform={`rotate(${a})`} />)}<circle r="5" fill="#F5D34D" /></g>,
    scarf: <g><path d="M50 68 q50 -32 100 0 l0 -13 q-50 -28 -100 0 z" fill="#E0714A" /><path d="M148 60 q20 6 15 28 q-13 -13 -22 -15 z" fill="#C25A38" /></g>,
    shades: <g><rect x="58" y="46" width="84" height="19" rx="8" fill="#1E1F26" /><rect x="60" y="49" width="36" height="6" rx="3" fill="rgba(255,255,255,0.2)" /></g>,
  }[v.acc];

  const brows = {
    flat: <g><rect x="66" y="80" width="24" height="6" rx="3" fill={D} /><rect x="110" y="80" width="24" height="6" rx="3" fill={D} /></g>,
    raised: <g><rect x="66" y="74" width="24" height="6" rx="3" fill={D} /><rect x="110" y="80" width="24" height="6" rx="3" fill={D} /></g>,
    worried: <g><path d="M66 84 l24 -8" stroke={D} strokeWidth="6" strokeLinecap="round" /><path d="M134 84 l-24 -8" stroke={D} strokeWidth="6" strokeLinecap="round" /></g>,
    angry: <g><path d="M66 76 l24 10" stroke={D} strokeWidth="6" strokeLinecap="round" /><path d="M134 76 l-24 10" stroke={D} strokeWidth="6" strokeLinecap="round" /></g>,
    unibrow: <rect x="66" y="78" width="68" height="8" rx="4" fill={D} />,
  }[v.brows];

  const eyePos = [[78, 100], [122, 100]];
  const eyes = {
    dot: <g>{eyePos.map(([x, y]) => <circle key={x} cx={x} cy={y} r="7" fill={D} />)}</g>,
    happy: <g>{eyePos.map(([x, y]) => <path key={x} d={`M${x - 10} ${y + 3} q10 -12 20 0`} stroke={D} strokeWidth="6" fill="none" strokeLinecap="round" />)}</g>,
    wide: <g>{eyePos.map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="12" ry="14" fill="#fff" /><circle cx={x} cy={y + 2} r="6" fill={D} /></g>)}</g>,
    sleepy: <g>{eyePos.map(([x, y]) => <g key={x}><path d={`M${x - 11} ${y} q11 10 22 0`} stroke={D} strokeWidth="6" fill="none" strokeLinecap="round" /></g>)}</g>,
    side: <g>{eyePos.map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="12" ry="13" fill="#fff" /><circle cx={x + 6} cy={y} r="6" fill={D} /></g>)}</g>,
    dead: <g>{eyePos.map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="12" ry="12" fill="#fff" /><circle cx={x} cy={y} r="5" fill={D} /><path d={`M${x - 12} ${y + 12} q12 8 24 0`} stroke="#9A7FA8" strokeWidth="4" fill="none" opacity="0.8" /></g>)}</g>,
    star: <g>{eyePos.map(([x, y]) => <path key={x} d={`M${x} ${y - 13} l4 9 l10 1 l-7 7 l2 10 l-9 -5 l-9 5 l2 -10 l-7 -7 l10 -1 z`} fill="#FFD34D" />)}</g>,
    spiral: <g>{eyePos.map(([x, y]) => <g key={x}><circle cx={x} cy={y} r="12" fill="#fff" /><path d={`M${x} ${y} m-8 0 a8 8 0 1 1 8 8 a5 5 0 1 1 -5 -5`} stroke={D} strokeWidth="3" fill="none" /></g>)}</g>,
    money: <g>{eyePos.map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="12" ry="13" fill="#fff" /><text x={x} y={y + 6} fontSize="16" fontWeight="700" textAnchor="middle" fill="#2FA96B">$</text></g>)}</g>,
    laser: <g>{eyePos.map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="12" ry="10" fill="#FF3B3B" /><rect x={x - 30} y={y - 3} width="60" height="6" rx="3" fill="#FF6B6B" opacity="0.55" /></g>)}</g>,
  }[v.eyes];

  const mouth = {
    smile: <path d="M84 122 q16 16 32 0" stroke={D} strokeWidth="6" fill="none" strokeLinecap="round" />,
    flat: <rect x="88" y="124" width="24" height="6" rx="3" fill={D} />,
    open: <ellipse cx="100" cy="126" rx="13" ry="10" fill={D} />,
    smirk: <path d="M86 126 q16 10 28 -4" stroke={D} strokeWidth="6" fill="none" strokeLinecap="round" />,
    grit: <g><rect x="82" y="118" width="36" height="14" rx="4" fill={D} /><rect x="84" y="120" width="32" height="5" fill="#fff" />{[92, 100, 108].map((x) => <rect key={x} x={x} y="120" width="2" height="10" fill={D} />)}</g>,
    tongue: <g><ellipse cx="100" cy="126" rx="13" ry="10" fill={D} /><ellipse cx="100" cy="133" rx="7" ry="6" fill="#F0708A" /></g>,
    fangs: <g><path d="M84 120 q16 16 32 0" stroke={D} strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M90 124 l4 8 l4 -8 z" fill="#fff" /><path d="M104 124 l4 8 l4 -8 z" fill="#fff" /></g>,
    stache2: <ellipse cx="100" cy="126" rx="9" ry="11" fill={D} />,
    scream: <g><ellipse cx="100" cy="128" rx="15" ry="16" fill={D} /><ellipse cx="100" cy="136" rx="8" ry="6" fill="#F0708A" /></g>,
  }[v.mouth];

  const beard = {
    none: null,
    stubble: <ellipse cx="100" cy="126" rx="34" ry="24" fill={hc} opacity="0.22" />,
    goatee: <g><rect x="92" y="134" width="16" height="18" rx="7" fill={hc} /><rect x="86" y="116" width="28" height="6" rx="3" fill={hc} /></g>,
    full: <path d="M62 104 q4 52 38 52 q34 0 38 -52 q-12 30 -38 30 q-26 0 -38 -30 z" fill={hc} />,
    handle: <path d="M74 118 q12 -12 26 -2 q14 -10 26 2 q-12 12 -26 4 q-14 8 -26 -4 z" fill={hc} />,
    santa: <path d="M56 100 q0 74 44 74 q44 0 44 -74 q-14 40 -44 40 q-30 0 -44 -40 z" fill="#F2F2F5" />,
  }[v.beard];

  const gear = {
    none: null,
    shades: <g><rect x="62" y="90" width="76" height="22" rx="8" fill="#1E1F26" /><rect x="96" y="97" width="8" height="6" fill="#1E1F26" /></g>,
    glasses: <g><circle cx="78" cy="100" r="16" fill="none" stroke={D} strokeWidth="4" /><circle cx="122" cy="100" r="16" fill="none" stroke={D} strokeWidth="4" /><rect x="94" y="98" width="12" height="4" fill={D} /></g>,
    "3d": <g><rect x="60" y="88" width="80" height="24" rx="6" fill="#F2F2F5" /><rect x="66" y="93" width="28" height="14" rx="4" fill="#E5484D" opacity="0.85" /><rect x="106" y="93" width="28" height="14" rx="4" fill="#3B82F6" opacity="0.85" /></g>,
    mask: <g><rect x="66" y="112" width="68" height="34" rx="12" fill="#9FD8F0" /><rect x="66" y="118" width="68" height="4" fill="#7FC2DE" /></g>,
    monocle: <g><circle cx="122" cy="100" r="18" fill="#CFE9F5" opacity="0.5" stroke="#D8B24A" strokeWidth="4" /><path d="M122 118 l4 24" stroke="#D8B24A" strokeWidth="3" /></g>,
    shutter: <g><rect x="60" y="90" width="80" height="22" rx="5" fill="#E5484D" />{[94, 100, 106].map((y) => <rect key={y} x="62" y={y} width="76" height="3" fill="#fff" opacity="0.85" />)}</g>,
    eyepatch: <g><path d="M62 88 L138 96" stroke={D} strokeWidth="4" /><rect x="106" y="88" width="32" height="26" rx="8" fill="#1E1F26" /></g>,
    swim: <g><circle cx="78" cy="100" r="15" fill="#7FD8E8" opacity="0.7" stroke="#2E7C8C" strokeWidth="4" /><circle cx="122" cy="100" r="15" fill="#7FD8E8" opacity="0.7" stroke="#2E7C8C" strokeWidth="4" /><rect x="92" y="97" width="16" height="5" fill="#2E7C8C" /></g>,
    vr: <g><rect x="54" y="84" width="92" height="34" rx="10" fill="#2B2E3A" /><rect x="60" y="92" width="80" height="18" rx="6" fill="#4C5CE0" opacity="0.8" /><rect x="48" y="94" width="10" height="8" rx="3" fill="#2B2E3A" /></g>,
    hoops: <g><circle cx="52" cy="114" r="10" fill="none" stroke="#F0C33C" strokeWidth="4" /><circle cx="148" cy="114" r="10" fill="none" stroke="#F0C33C" strokeWidth="4" /></g>,
    studs: <g><path d="M52 110 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 z" fill="#F0C33C" transform="scale(1.6) translate(-19,-42)" /><path d="M148 110 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 z" fill="#F0C33C" transform="scale(1.6) translate(-56,-42)" /></g>,
    blush: <g><ellipse cx="68" cy="116" rx="12" ry="7" fill="#F0708A" opacity="0.45" /><ellipse cx="132" cy="116" rx="12" ry="7" fill="#F0708A" opacity="0.45" /></g>,
    freckles: <g fill="#B4784A" opacity="0.7">{[[74, 114], [82, 120], [90, 114], [110, 114], [118, 120], [126, 114]].map(([x, y], n) => <circle key={n} cx={x} cy={y} r="2.4" />)}</g>,
    cateye: <g><path d="M60 96 q18 -12 36 0 q-6 16 -20 16 q-14 0 -16 -16 z" fill="none" stroke="#22242E" strokeWidth="4" /><path d="M104 96 q18 -12 36 0 q-2 16 -16 16 q-14 0 -20 -16 z" fill="none" stroke="#22242E" strokeWidth="4" /><path d="M56 92 l8 -6 M144 92 l-8 -6" stroke="#22242E" strokeWidth="4" strokeLinecap="round" /><rect x="94" y="96" width="12" height="4" fill="#22242E" /></g>,
    clown: <g><circle cx="100" cy="114" r="11" fill="#E5484D" /><circle cx="96" cy="110" r="3.4" fill="#FF8A8A" /></g>,
    bandaid: <g transform="rotate(-18 122 88)"><rect x="106" y="82" width="34" height="13" rx="5" fill="#F0C89A" /><rect x="118" y="84" width="10" height="9" rx="2" fill="#E0B183" /></g>,
  }[v.gear];

  const hatArt = {
    none: null,
    cans: <g><path d="M52 84 q48 -60 96 0" stroke="#2E3242" strokeWidth="11" fill="none" /><rect x="40" y="80" width="22" height="42" rx="10" fill="#E5484D" /><rect x="138" y="80" width="22" height="42" rx="10" fill="#E5484D" /></g>,
    cap: <g><path d="M52 62 q48 -44 96 0 z" fill={tc} /><rect x="50" y="58" width="100" height="12" rx="6" fill={tc} /><rect x="140" y="58" width="46" height="11" rx="5" fill={tc} opacity="0.9" /></g>,
    beanie: <g><path d="M52 66 q48 -50 96 0 z" fill="#E0714A" /><rect x="48" y="60" width="104" height="16" rx="8" fill="#C25A38" /><circle cx="100" cy="20" r="10" fill="#F2E3C8" /></g>,
    bucket: <g><path d="M56 56 q44 -34 88 0 l0 14 l-88 0 z" fill="#7FA86A" /><path d="M40 68 q60 20 120 0 l0 10 q-60 20 -120 0 z" fill="#6B915A" /></g>,
    band: <rect x="50" y="62" width="100" height="14" rx="7" fill="#E8446B" />,
    beret: <g><ellipse cx="100" cy="56" rx="46" ry="24" fill="#8A2436" /><ellipse cx="88" cy="50" rx="26" ry="12" fill="rgba(255,255,255,0.14)" /><circle cx="122" cy="34" r="6" fill="#8A2436" /><rect x="54" y="60" width="92" height="8" rx="4" fill="#6B1B2A" /></g>,
    sunhat: <g><ellipse cx="100" cy="70" rx="76" ry="22" fill="#EBD9A8" /><ellipse cx="100" cy="52" rx="42" ry="26" fill="#F2E3BC" /><rect x="58" y="58" width="84" height="10" rx="5" fill="#D9A05B" /></g>,
    grad: <g><rect x="70" y="52" width="60" height="12" rx="3" fill="#22242E" /><path d="M40 50 L100 30 L160 50 L100 70 z" fill="#22242E" /><path d="M152 50 l0 26" stroke="#F0B84A" strokeWidth="4" /><circle cx="152" cy="78" r="5" fill="#F0B84A" /></g>,
    crown: <path d="M56 62 l0 -34 l16 16 l14 -24 l14 24 l14 -24 l14 24 l16 -16 l0 34 z" fill="#F0C33C" stroke="#C79A22" strokeWidth="3" />,
    fox: <g><path d="M44 78 q0 -66 56 -66 q56 0 56 66 q0 20 -10 26 l0 -34 q-16 -22 -46 -22 q-30 0 -46 22 l0 34 q-10 -6 -10 -26 z" fill="#E07A3C" /><path d="M46 46 l4 -34 l28 20 z" fill="#E07A3C" /><path d="M154 46 l-4 -34 l-28 20 z" fill="#E07A3C" /><path d="M52 22 l2 -14 l12 9 z" fill="#F5D8C0" /></g>,
    chicken: <g><path d="M44 76 q0 -64 56 -64 q56 0 56 64 q0 18 -8 24 l0 -32 q-18 -20 -48 -20 q-30 0 -48 20 l0 32 q-8 -6 -8 -24 z" fill="#F2C13C" /><g fill="#E5484D">{[86, 100, 114].map((x) => <circle key={x} cx={x} cy={12} r="11" />)}</g><path d="M92 96 l16 0 l-8 12 z" fill="#F09A2C" /></g>,
    cone: <g><path d="M100 6 L136 74 L64 74 z" fill="#F0651F" /><rect x="56" y="70" width="88" height="12" rx="4" fill="#E2571A" /><rect x="76" y="42" width="48" height="12" fill="#F5F5F7" opacity="0.9" /></g>,
    bread: <g><path d="M52 66 q6 -46 48 -46 q42 0 48 46 q-48 14 -96 0 z" fill="#D9A05B" /><path d="M52 62 q48 16 96 0 l0 12 q-48 16 -96 0 z" fill="#B87F3E" /></g>,
    crab: <g><path d="M56 60 q44 -32 88 0 l0 12 l-88 0 z" fill="#F0A93A" /><path d="M40 66 q60 18 120 0 l0 10 q-60 18 -120 0 z" fill="#E09522" /><g fill="#F0651F"><path d="M44 40 q-18 -18 -4 -30 q14 -8 18 8 z" /><path d="M156 40 q18 -18 4 -30 q-14 -8 -18 8 z" /></g><circle cx="72" cy="34" r="12" fill="#fff" /><circle cx="128" cy="34" r="12" fill="#fff" /><circle cx="72" cy="34" r="6" fill={D} /><circle cx="128" cy="34" r="6" fill={D} /></g>,
    top: <g><rect x="68" y="-8" width="64" height="66" fill="#E5484D" /><g fill="#F5F5F7">{[0, 16, 32, 48].map((y) => <rect key={y} x="68" y={y - 8} width="64" height="8" />)}</g><rect x="68" y="34" width="64" height="18" fill="#2F4FA8" /><rect x="46" y="52" width="108" height="14" rx="7" fill="#2F2F38" /></g>,
    antlers: <g><path d="M70 54 q-10 -34 -30 -40 M70 40 q-16 -6 -22 -18 M130 54 q10 -34 30 -40 M130 40 q16 -6 22 -18" stroke="#C79A6A" strokeWidth="8" fill="none" strokeLinecap="round" /><ellipse cx="100" cy="60" rx="48" ry="18" fill="#8E96A8" /></g>,
    pigeon: <g><ellipse cx="100" cy="60" rx="46" ry="16" fill="#7E8698" opacity="0.35" /><ellipse cx="104" cy="34" rx="26" ry="20" fill="#8E9AB0" /><circle cx="84" cy="20" r="13" fill="#8E9AB0" /><circle cx="79" cy="18" r="3.5" fill={D} /><path d="M68 20 l-12 3 l12 5 z" fill="#F0A93A" /></g>,
    shower: <g><ellipse cx="100" cy="52" rx="54" ry="34" fill="#9FD8F0" opacity="0.9" /><ellipse cx="100" cy="62" rx="52" ry="14" fill="#7FC2DE" />{[74, 100, 126].map((x) => <circle key={x} cx={x} cy="40" r="6" fill="#fff" opacity="0.5" />)}</g>,
    cactus: <g><path d="M76 62 l48 0 l-6 -22 l-36 0 z" fill="#C87F4A" /><g fill="#4C9A5C"><rect x="90" y="4" width="20" height="42" rx="10" /><rect x="72" y="18" width="14" height="24" rx="7" /><rect x="114" y="14" width="14" height="28" rx="7" /></g></g>,
    tv: <g><rect x="30" y="30" width="140" height="118" rx="14" fill="#8E96A8" /><rect x="42" y="42" width="116" height="82" rx="8" fill="#1B2030" /><rect x="46" y="46" width="108" height="74" rx="6" fill="#2E4C7A" opacity="0.8" /><circle cx="82" cy="86" r="7" fill="#CFE9F5" /><circle cx="118" cy="86" r="7" fill="#CFE9F5" /><path d="M84 106 q16 12 32 0" stroke="#CFE9F5" strokeWidth="5" fill="none" strokeLinecap="round" />{[60, 76, 92].map((x) => <circle key={x} cx={x} cy="136" r="4" fill="#5C6478" />)}<path d="M60 30 L40 4 M140 30 L160 4" stroke="#8E96A8" strokeWidth="5" /><circle cx="38" cy="2" r="6" fill="#C8CEDC" /><circle cx="162" cy="2" r="6" fill="#C8CEDC" /></g>,
    bag: <g><path d="M40 34 q60 -14 120 0 l0 108 q-60 14 -120 0 z" fill="#E0BE94" /><path d="M40 46 q60 12 120 0" stroke="#C7A275" strokeWidth="4" fill="none" /><circle cx="78" cy="92" r="12" fill="#1B1B22" /><circle cx="124" cy="92" r="12" fill="#1B1B22" /><circle cx="80" cy="90" r="4" fill="#E5484D" /><circle cx="126" cy="90" r="4" fill="#E5484D" /><path d="M80 126 q22 12 44 0" stroke="#1B1B22" strokeWidth="5" fill="none" /></g>,
    pumpkin: <g><ellipse cx="100" cy="90" rx="66" ry="58" fill="#EE8A2B" /><path d="M60 44 q40 -14 80 0" stroke="#D9761F" strokeWidth="4" fill="none" opacity="0.6" /><rect x="92" y="24" width="14" height="20" rx="6" fill="#6B4A2A" /><path d="M72 74 l22 14 l-22 12 z" fill="#2A1A08" /><path d="M128 74 l-22 14 l22 12 z" fill="#2A1A08" /><path d="M66 116 l12 10 l10 -8 l12 10 l10 -8 l12 10 l12 -14 q-40 22 -68 0 z" fill="#2A1A08" /></g>,
    trex: <g><ellipse cx="100" cy="86" rx="62" ry="56" fill="#4C9A5C" /><path d="M52 96 q-20 4 -26 24 q22 -6 30 -10 z" fill="#4C9A5C" /><ellipse cx="100" cy="118" rx="44" ry="26" fill="#7FC28A" /><circle cx="76" cy="70" r="10" fill="#fff" /><circle cx="124" cy="70" r="10" fill="#fff" /><circle cx="76" cy="72" r="5" fill={D} /><circle cx="124" cy="72" r="5" fill={D} /><g fill="#3B7F49">{[60, 80, 100, 120, 140].map((x, n) => <path key={x} d={`M${x - 8} 34 l8 -${12 + (n % 2) * 6} l8 ${12 + (n % 2) * 6} z`} />)}</g><path d="M78 124 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8" stroke="#2E6B3A" strokeWidth="4" fill="none" /></g>,
    fishbowl: <g><circle cx="100" cy="96" r="62" fill="#9FD8F0" opacity="0.35" stroke="#BFE6F5" strokeWidth="4" /><ellipse cx="100" cy="150" rx="40" ry="10" fill="#7FC2DE" opacity="0.5" /><ellipse cx="128" cy="72" rx="10" ry="6" fill="#F0A93A" /><path d="M118 72 l-8 -5 l0 10 z" fill="#F0A93A" />{[70, 84, 96].map((x, n) => <circle key={x} cx={x} cy={60 + n * 6} r={3 - n * 0.5} fill="#fff" opacity="0.6" />)}</g>,
    basket: <g><rect x="34" y="26" width="132" height="120" rx="10" fill="#7FB8E8" />{[46, 66, 86, 106, 126, 146].map((y) => <rect key={y} x="34" y={y} width="132" height="6" fill="rgba(255,255,255,0.35)" />)}{[54, 76, 98, 120, 142].map((x) => <rect key={x} x={x} y="26" width="6" height="120" fill="rgba(255,255,255,0.25)" />)}<rect x="26" y="60" width="12" height="34" rx="5" fill="#7FB8E8" /><rect x="162" y="60" width="12" height="34" rx="5" fill="#7FB8E8" /></g>,
    trafficlight: <g><rect x="76" y="-16" width="48" height="86" rx="8" fill="#2A2E3C" />{[["#E5484D", 4], ["#F5D34D", 26], ["#3DDC91", 48]].map(([c, y]) => <circle key={y} cx="100" cy={y} r="12" fill={c} />)}<rect x="60" y="66" width="80" height="10" rx="5" fill="#2A2E3C" /></g>,
    toast: <g><path d="M70 30 q0 -18 30 -18 q30 0 30 18 l0 34 l-60 0 z" fill="#E0B87A" /><path d="M78 34 q0 -12 22 -12 q22 0 22 12 l0 24 l-44 0 z" fill="#F2D9A8" /><ellipse cx="100" cy="66" rx="34" ry="7" fill="#C7A275" /></g>,
    wizard: <g><path d="M100 -18 q-8 40 -44 78 l88 0 q-36 -38 -44 -78 z" fill="#5B3FA8" /><ellipse cx="100" cy="62" rx="58" ry="14" fill="#6B4BC0" /><path d="M78 34 l4 -9 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 z" fill="#F5D34D" /><circle cx="118" cy="16" r="3.5" fill="#F5D34D" /><rect x="60" y="52" width="80" height="9" rx="4" fill="#F5D34D" opacity="0.85" /></g>,
    propeller: <g><path d="M54 64 q46 -44 92 0 z" fill="#E5484D" /><path d="M54 64 q46 -14 92 0 l0 8 l-92 0 z" fill="#3B6FE0" /><rect x="97" y="12" width="6" height="14" fill="#8E96A8" /><g><animateTransform attributeName="transform" type="rotate" from="0 100 12" to="360 100 12" dur="1.4s" repeatCount="indefinite" /><rect x="66" y="9" width="34" height="6" rx="3" fill="#F5D34D" /><rect x="100" y="9" width="34" height="6" rx="3" fill="#25D0C0" /></g></g>,
    chickbucket: <g><path d="M58 20 l84 0 l-8 46 l-68 0 z" fill="#F2F2F5" /><rect x="54" y="14" width="92" height="12" rx="4" fill="#E5484D" /><path d="M66 66 q34 12 68 0 l-2 12 q-32 10 -64 0 z" fill="#E0E3EA" /><text x="100" y="52" fontSize="15" fontWeight="800" textAnchor="middle" fill="#E5484D">KFZ</text><ellipse cx="82" cy="18" rx="12" ry="7" fill="#C7A275" /><ellipse cx="118" cy="16" rx="10" ry="6" fill="#D9B184" /></g>,
    pineapple: <g><ellipse cx="100" cy="46" rx="40" ry="30" fill="#F0B84A" /><g opacity="0.45" stroke="#C78A28" strokeWidth="2.5">{[[64,32,136,60],[64,60,136,32],[100,18,100,76]].map(([a,b,c,d],n)=><line key={n} x1={a} y1={b} x2={c} y2={d} />)}</g><g fill="#4C9A5C">{[[100,-2],[78,6],[122,6],[88,-6],[112,-6]].map(([x,y],n)=><path key={n} d={`M${x} ${y} q-9 20 0 30 q9 -10 0 -30 z`} />)}</g></g>,
    halo: <g><ellipse cx="100" cy="18" rx="34" ry="10" fill="none" stroke="#F5D34D" strokeWidth="7" /><ellipse cx="100" cy="18" rx="34" ry="10" fill="none" stroke="#FFF3B0" strokeWidth="2" /></g>,
  }[v.hat];

  const backArt = {
    none: null,
    pack: <g><rect x="44" y="150" width="26" height="52" rx="10" fill="#3E6B8C" /><rect x="130" y="150" width="26" height="52" rx="10" fill="#3E6B8C" /></g>,
    tube: <g><rect x="120" y="132" width="18" height="86" rx="9" fill="#C7A275" transform="rotate(18 130 176)" /></g>,
    guitar: <g transform="rotate(24 140 180)"><ellipse cx="140" cy="196" rx="26" ry="30" fill="#B4593A" /><rect x="134" y="130" width="12" height="52" rx="4" fill="#7A4A28" /><circle cx="140" cy="196" r="8" fill="#3A2A1E" /></g>,
    wings: <g opacity="0.95"><path d="M62 152 q-44 -20 -52 22 q26 26 54 6 z" fill="#F2F2F8" /><path d="M138 152 q44 -20 52 22 q-26 26 -54 6 z" fill="#F2F2F8" /></g>,
    jet: <g><rect x="48" y="150" width="24" height="50" rx="10" fill="#8E96A8" /><rect x="128" y="150" width="24" height="50" rx="10" fill="#8E96A8" /><path d="M52 200 q8 22 16 0 z" fill="#F0651F" /><path d="M132 200 q8 22 16 0 z" fill="#F0651F" /></g>,
    turtle: <g><ellipse cx="100" cy="182" rx="62" ry="48" fill="#4C9A5C" /><ellipse cx="100" cy="182" rx="44" ry="34" fill="#3B7F49" />{[[80, 168], [120, 168], [100, 196]].map(([x, y], n) => <path key={n} d={`M${x} ${y - 12} l12 8 l-5 14 l-14 0 l-5 -14 z`} fill="#2E6B3A" />)}</g>,
    balloons: <g>{[[46, 60, "#E5484D"], [24, 92, "#F5D34D"], [66, 96, "#54CFE0"]].map(([x, y, c], n) => <g key={n}><ellipse cx={x} cy={y} rx="19" ry="23" fill={c} /><path d={`M${x} ${y + 23} Q${x + 8} 150 62 176`} stroke="#C9C9D2" strokeWidth="2" fill="none" /></g>)}</g>,
    overpack: <g><rect x="46" y="146" width="28" height="62" rx="10" fill="#3E6B8C" /><rect x="126" y="146" width="28" height="62" rx="10" fill="#3E6B8C" /><rect x="40" y="136" width="120" height="70" rx="14" fill="#2E5470" /><rect x="52" y="150" width="96" height="16" rx="6" fill="#26455C" /><path d="M64 136 l0 -18 l14 0 l0 18" stroke="#C7A275" strokeWidth="6" fill="none" /><rect x="120" y="112" width="26" height="28" rx="3" fill="#E5484D" /><rect x="88" y="118" width="18" height="22" rx="2" fill="#F5D34D" /></g>,
    cape: <path d="M62 150 q38 90 76 0 l14 84 q-52 22 -104 0 z" fill="#8A2436" />,
  }[v.back];

  const handArt = {
    none: null,
    book: <g><rect x="132" y="192" width="34" height="26" rx="3" fill="#3E6B8C" /><rect x="132" y="192" width="8" height="26" fill="#2E5470" /></g>,
    coffee: <g><rect x="140" y="188" width="22" height="28" rx="4" fill="#F2EDE4" /><rect x="140" y="188" width="22" height="8" rx="3" fill="#C7724A" /><path d="M162 196 q10 6 0 12" stroke="#F2EDE4" strokeWidth="4" fill="none" /></g>,
    boba: <g><rect x="140" y="184" width="22" height="34" rx="5" fill="#E9D9C0" opacity="0.9" /><rect x="140" y="204" width="22" height="14" rx="4" fill="#3A2A22" /><rect x="148" y="168" width="5" height="24" fill="#E8446B" /></g>,
    energy: <g><rect x="142" y="184" width="18" height="34" rx="4" fill="#C8F53C" /><rect x="142" y="196" width="18" height="8" fill="#22242E" /></g>,
    calc: <g><rect x="136" y="188" width="28" height="34" rx="4" fill="#3A3F52" /><rect x="140" y="192" width="20" height="9" fill="#A8D8B0" />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={141 + c * 7} y={205 + r * 6} width="5" height="4" fill="#8E96A8" />))}</g>,
    phone: <g><rect x="140" y="186" width="20" height="34" rx="4" fill="#22242E" /><rect x="143" y="190" width="14" height="26" rx="2" fill="#5C7CE0" /></g>,
    foam: <g><path d="M136 214 l0 -34 q0 -14 12 -14 q12 0 12 14 l0 12 l10 0 q8 0 8 8 l0 14 z" fill="#E5484D" /></g>,
    pizza: <g><path d="M134 216 L166 200 L150 182 z" fill="#F0B84A" /><path d="M136 214 L162 201 L150 187 z" fill="#E5484D" opacity="0.8" /></g>,
    plunger: <g><rect x="146" y="150" width="8" height="56" rx="4" fill="#8E6B3A" /><path d="M136 200 q14 -18 28 0 q-14 22 -28 0 z" fill="#E5484D" /></g>,
    noodles: <g><path d="M134 190 q16 -8 32 0 l-4 26 q-12 6 -24 0 z" fill="#F2EDE4" /><rect x="132" y="186" width="36" height="8" rx="3" fill="#E5484D" /><path d="M144 186 q6 -12 14 -4" stroke="#F0C33C" strokeWidth="3" fill="none" /></g>,
    trophy: <g><path d="M138 184 l26 0 l-3 18 l-20 0 z" fill="#F0C33C" /><rect x="146" y="202" width="10" height="10" fill="#D8A82A" /><rect x="138" y="212" width="26" height="7" rx="2" fill="#8E6B3A" /><path d="M136 186 q-10 6 0 12 M166 186 q10 6 0 12" stroke="#F0C33C" strokeWidth="3" fill="none" /></g>,
    chicken: <g transform="rotate(14 150 196)"><ellipse cx="150" cy="200" rx="13" ry="20" fill="#F5D34D" /><circle cx="150" cy="176" r="10" fill="#F5D34D" /><path d="M141 172 l-9 3 l9 5 z" fill="#F0A93A" /><circle cx="147" cy="174" r="2" fill="#22242E" /><path d="M146 166 q4 -7 8 0" stroke="#E5484D" strokeWidth="3.5" fill="none" /><path d="M150 220 q-5 10 -10 12 M150 220 q5 10 10 12" stroke="#F0A93A" strokeWidth="3" fill="none" /></g>,
    extinguisher: <g><rect x="140" y="182" width="24" height="42" rx="9" fill="#E5484D" /><rect x="140" y="196" width="24" height="10" fill="#F2F2F5" opacity="0.85" /><rect x="147" y="172" width="10" height="12" rx="3" fill="#3A3F52" /><path d="M157 176 q12 -4 14 8" stroke="#3A3F52" strokeWidth="4" fill="none" /></g>,
    shaker: <g><rect x="140" y="184" width="24" height="38" rx="6" fill="#25D0C0" opacity="0.55" /><rect x="140" y="184" width="24" height="9" rx="4" fill="#22242E" /><rect x="142" y="204" width="20" height="16" rx="3" fill="#F2EDE4" opacity="0.8" /><rect x="144" y="176" width="16" height="9" rx="3" fill="#22242E" /></g>,
    sword: <g transform="rotate(-24 150 190)"><rect x="145" y="146" width="12" height="66" rx="4" fill="#C8F53C" /><rect x="138" y="208" width="26" height="8" rx="3" fill="#3A3F52" /></g>,
  }[v.hand];

  const neckArt = {
    none: null,
    chain: <g><path d="M78 148 q22 22 44 0" stroke="#F0C33C" strokeWidth="4" fill="none" /><circle cx="100" cy="164" r="5" fill="#F0C33C" /></g>,
    choker: <g><path d="M76 146 q24 14 48 0" stroke="#22242E" strokeWidth="7" fill="none" /><circle cx="100" cy="153" r="4" fill="#C9C9D2" /></g>,
    lanyard: <g><path d="M82 146 L96 176 M118 146 L104 176" stroke="#3B6FE0" strokeWidth="5" fill="none" /><rect x="92" y="176" width="17" height="22" rx="3" fill="#F4F6FA" /><rect x="95" y="180" width="11" height="4" fill="#8E96A8" /></g>,
    scarf: <g><path d="M74 146 q26 20 52 0 l0 16 q-26 16 -52 0 z" fill="#E0714A" /><path d="M118 160 q12 22 4 40 l-14 -4 q6 -18 0 -34 z" fill="#C25A38" /></g>,
    cans: <g><rect x="70" y="142" width="60" height="14" rx="7" fill="#2E3242" /><rect x="62" y="138" width="18" height="26" rx="8" fill="#E5484D" /><rect x="120" y="138" width="18" height="26" rx="8" fill="#E5484D" /></g>,
    tie: <g><path d="M92 146 L108 146 L104 158 L96 158 z" fill="#8A2436" /><path d="M96 158 L104 158 L110 192 L100 200 L90 192 z" fill="#A32E42" /></g>,
    medal: <g><path d="M84 146 L98 178 M116 146 L102 178" stroke="#E5484D" strokeWidth="6" fill="none" /><circle cx="100" cy="188" r="13" fill="#F0C33C" /><circle cx="100" cy="188" r="7" fill="#D8A82A" /></g>,
    floatie: <g><ellipse cx="100" cy="176" rx="52" ry="26" fill="#F5D34D" /><ellipse cx="100" cy="176" rx="30" ry="13" fill={skin} /><path d="M52 172 q14 -12 30 -8" stroke="#fff" strokeWidth="5" fill="none" opacity="0.6" /></g>,
  }[v.neck];

  const legArt = {
    none: null,
    socks: <g><rect x="80" y="230" width="17" height="14" fill="#F2F2F5" /><rect x="103" y="230" width="17" height="14" fill="#F2F2F5" /></g>,
    stripe: <g>{[80, 103].map((x) => <g key={x}><rect x={x} y="220" width="17" height="26" fill="#F2F2F5" />{[222, 230, 238].map((y) => <rect key={y} x={x} y={y} width="17" height="4" fill="#E5484D" />)}</g>)}</g>,
    knee: <g><rect x="80" y="212" width="17" height="34" rx="3" fill="#2A2E3C" /><rect x="103" y="212" width="17" height="34" rx="3" fill="#2A2E3C" /><rect x="80" y="212" width="17" height="4" fill="#F2F2F5" /><rect x="103" y="212" width="17" height="4" fill="#F2F2F5" /></g>,
    warmers: <g>{[78, 101].map((x) => <g key={x}><rect x={x} y="216" width="21" height="28" rx="6" fill="#F0A93A" />{[220, 228, 236].map((y) => <rect key={y} x={x} y={y} width="21" height="3" fill="rgba(0,0,0,0.15)" />)}</g>)}</g>,
    tights: <g><rect x="80" y="206" width="17" height="40" rx="7" fill="#22242E" opacity="0.75" /><rect x="103" y="206" width="17" height="40" rx="7" fill="#22242E" opacity="0.75" /></g>,
    fishnet: <g opacity="0.8">{[80, 103].map((x) => <g key={x}>{[210, 220, 230, 240].map((y) => <rect key={y} x={x} y={y} width="17" height="2" fill="#22242E" />)}{[0, 6, 12].map((o) => <rect key={o} x={x + o} y="206" width="2" height="40" fill="#22242E" />)}</g>)}</g>,
  }[v.legs];

  const makeupArt = {
    none: null,
    blush: <g><ellipse cx="68" cy="116" rx="12" ry="7" fill="#F0708A" opacity="0.45" /><ellipse cx="132" cy="116" rx="12" ry="7" fill="#F0708A" opacity="0.45" /></g>,
    freckles: <g fill="#B4784A" opacity="0.7">{[[74, 112], [82, 118], [90, 112], [110, 112], [118, 118], [126, 112]].map(([x, y], n) => <circle key={n} cx={x} cy={y} r="2.4" />)}</g>,
    gloss: <ellipse cx="100" cy="126" rx="14" ry="7" fill="#F0708A" opacity="0.5" />,
    liner: <g><path d="M64 96 l-8 -6 M136 96 l8 -6" stroke="#22242E" strokeWidth="4" strokeLinecap="round" /><path d="M66 94 q12 -8 24 -2" stroke="#22242E" strokeWidth="3" fill="none" /><path d="M134 94 q-12 -8 -24 -2" stroke="#22242E" strokeWidth="3" fill="none" /></g>,
    glitter: <g>{[[66, 88], [76, 82], [124, 82], [134, 88], [70, 96], [130, 96]].map(([x, y], n) => <path key={n} d={`M${x} ${y - 5} l1.6 3.4 l3.4 1.6 l-3.4 1.6 l-1.6 3.4 l-1.6 -3.4 l-3.4 -1.6 l3.4 -1.6 z`} fill="#F5D34D" />)}</g>,
    warpaint: <g><rect x="60" y="104" width="34" height="7" rx="3" fill="#25D0C0" transform="rotate(-8 77 107)" /><rect x="106" y="104" width="34" height="7" rx="3" fill="#25D0C0" transform="rotate(8 123 107)" /></g>,
    marker: <g stroke="#3B6FE0" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M62 92 q10 -8 20 -2 M118 90 q10 -6 20 2" />
      <path d="M86 138 q14 8 28 0" />
      <circle cx="100" cy="126" r="9" />
      <path d="M124 118 l10 -4 M126 126 l11 0 M124 134 l10 4" />
    </g>,
    tears: <g><path d="M74 110 q-3 16 2 24" stroke="#7FB8E8" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M126 110 q3 16 -2 24" stroke="#7FB8E8" strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx="76" cy="136" r="4" fill="#7FB8E8" /></g>,
  }[v.makeup];

  /* clothing */
  const dk = "rgba(0,0,0,0.20)";
  const lt = "rgba(255,255,255,0.20)";
  const H = femme ? 56 : 60;
  const R = femme ? 20 : 15;

  const sleeve = (side, len, fill, cuff) => {
    const x = side === "l" ? tx - 21 : tx + tw + 3;
    return (
      <g>
        <rect x={x} y={155 + shoulder / 2} width="19" height={len} rx="9.5" fill={fill || tc} />
        <rect x={x} y={155 + shoulder / 2} width="7" height={len} rx="3.5" fill={side === "l" ? dk : lt} opacity="0.5" />
        {cuff && <rect x={x} y={155 + shoulder / 2 + len - 9} width="19" height="9" rx="4" fill={dk} />}
      </g>
    );
  };

  const torso = (fill, h, r) => (
    <g>
      <path d={`M${tx} ${150 + (r || R) - 4} q0 -${(r || R) - 4} ${(r || R)} -${(r || R) - 4} l${tw - (r || R) * 2} 0 q${(r || R)} 0 ${(r || R)} ${(r || R) - 4} l0 ${(h || H) - (r || R) + 4} q0 8 -8 8 l-${tw - 16} 0 q-8 0 -8 -8 z`} fill={fill || tc} />
      <rect x={tx} y="150" width="14" height={h || H} fill={dk} opacity="0.45" />
      <rect x={tx + tw - 10} y="150" width="10" height={h || H} fill={lt} opacity="0.35" />
      <ellipse cx="100" cy="152" rx={tw / 2 - 6} ry="9" fill={dk} opacity="0.35" />
    </g>
  );

  const collar = (kind) => {
    if (kind === "v") return <path d="M86 148 L100 176 L114 148 z" fill={skin} />;
    if (kind === "crew") return <ellipse cx="100" cy="152" rx="19" ry="8" fill={skin} />;
    if (kind === "wide") return <ellipse cx="100" cy="152" rx="26" ry="9" fill={skin} />;
    return null;
  };

  const topArt = () => {
    const arms = <g>{sleeve("l", 50)}{sleeve("r", 50)}</g>;
    switch (v.top) {
      case "tank":
        return <g>{torso()}{collar("wide")}<rect x={tx + 8} y="148" width="12" height="26" fill={skin} /><rect x={tx + tw - 20} y="148" width="12" height="26" fill={skin} /></g>;
      case "hoodie":
        return <g>{torso()}{arms}<path d={`M${tx + 6} 148 q${tw / 2 - 6} 30 ${tw - 12} 0 q-${tw / 2 - 6} 12 -${tw - 12} 0 z`} fill={dk} /><ellipse cx="100" cy="150" rx="24" ry="10" fill={dk} /><rect x="97" y="156" width="6" height="30" rx="3" fill={lt} /><rect x={tx + 4} y={150 + H - 10} width={tw - 8} height="10" rx="4" fill={dk} /></g>;
      case "jacket":
        return <g>{torso()}{arms}<rect x="96" y="150" width="8" height={H} fill={dk} /><path d={`M86 148 L100 172 L114 148 z`} fill={skin} /><rect x={tx + 6} y="176" width="14" height="16" rx="3" fill={dk} /><rect x={tx + tw - 20} y="176" width="14" height="16" rx="3" fill={dk} /></g>;
      case "cardi":
        return <g>{torso()}{arms}<rect x={tx + 2} y="150" width="12" height={H} fill={lt} /><rect x={tx + tw - 14} y="150" width="12" height={H} fill={lt} />{[162, 180, 198].map((y) => <circle key={y} cx="100" cy={y} r="3" fill={lt} />)}{collar("v")}</g>;
      case "blouse":
        return <g>{torso("#F6F2EA")}{sleeve("l", 44, "#F6F2EA", true)}{sleeve("r", 44, "#F6F2EA", true)}<path d="M88 148 L100 170 L112 148 z" fill={skin} /><rect x={tx + 4} y="148" width={tw - 8} height="8" rx="4" fill={tc} opacity="0.85" />{[170, 186, 202].map((y) => <circle key={y} cx="100" cy={y} r="2.6" fill={dk} />)}</g>;
      case "vest":
        return <g><rect x={tx + 4} y="150" width={tw - 8} height={H} rx={R} fill="#F6F2EA" />{sleeve("l", 46, "#F6F2EA", true)}{sleeve("r", 46, "#F6F2EA", true)}{torso(tc, H - 6, R)}<path d="M86 148 L100 178 L114 148 z" fill="#F6F2EA" /><rect x={tx} y={150 + H - 12} width={tw} height="6" fill={dk} /></g>;
      case "flannel":
        return <g>{torso()}{arms}<g opacity="0.32">{[0, 1, 2, 3].map((n) => <rect key={n} x={tx + 6 + n * (tw / 4)} y="150" width="7" height={H} fill="#000" />)}{[160, 176, 192, 206].map((y) => <rect key={y} x={tx} y={y} width={tw} height="5" fill="#000" />)}</g><rect x="96" y="150" width="8" height={H} fill={dk} /></g>;
      case "puffer":
        return <g>{torso()}{arms}<g opacity="0.22">{[164, 180, 196].map((y) => <rect key={y} x={tx} y={y} width={tw} height="5" rx="2" fill="#000" />)}</g><rect x="97" y="150" width="6" height={H} fill={lt} /><ellipse cx="100" cy="154" rx="22" ry="9" fill={dk} /></g>;
      case "varsity":
        return <g>{torso()}{sleeve("l", 50, "#F6F2EA", true)}{sleeve("r", 50, "#F6F2EA", true)}<rect x={tx} y={150 + H - 12} width={tw} height="8" fill="#F6F2EA" /><rect x={tx + 4} y="148" width={tw - 8} height="8" rx="4" fill="#F6F2EA" /><text x="100" y="192" fontSize="30" fontWeight="800" textAnchor="middle" fill="#F6F2EA">R</text></g>;
      case "jersey":
        return <g>{torso()}{collar("wide")}<rect x={tx + 6} y="148" width="14" height="30" fill={skin} /><rect x={tx + tw - 20} y="148" width="14" height="30" fill={skin} /><text x="100" y="196" fontSize="30" fontWeight="800" textAnchor="middle" fill="rgba(255,255,255,0.9)">1</text></g>;
      case "blazer":
        return <g>{torso()}{arms}<rect x="94" y="150" width="12" height={H} fill={dk} /><path d="M84 148 L100 182 L116 148 z" fill="#F6F2EA" /><path d="M84 148 L96 172 L84 176 z" fill={lt} /><path d="M116 148 L104 172 L116 176 z" fill={lt} /><rect x={tx + tw - 22} y="180" width="14" height="4" fill={lt} /></g>;
      case "turtle":
        return <g>{torso()}{arms}<rect x="80" y="134" width="40" height="22" rx="10" fill={tc} /><rect x="80" y="134" width="40" height="8" rx="4" fill={dk} /></g>;
      case "crop":
        return <g><rect x={tx} y="150" width={tw} height="32" rx="14" fill={tc} /><rect x={tx} y="150" width="12" height="32" fill={dk} />{arms}<rect x={tx + 4} y="182" width={tw - 8} height="24" fill={skin} />{collar("wide")}</g>;
      case "sundress":
        return <g><path d={`M${tx + 4} 150 L${tx + tw - 4} 150 L${tx + tw + 14} 236 L${tx - 14} 236 z`} fill={tc} /><rect x={tx + 4} y="150" width="14" height="86" fill={dk} opacity="0.4" /><g opacity="0.25">{[74, 92, 110, 128].map((x) => <circle key={x} cx={x} cy="200" r="5" fill="#fff" />)}</g><rect x={tx + 12} y="146" width="10" height="14" fill={skin} /><rect x={tx + tw - 22} y="146" width="10" height="14" fill={skin} />{collar("wide")}</g>;
      case "overall":
        return <g><rect x={tx + 6} y="150" width={tw - 12} height="26" rx="6" fill="#F6F2EA" />{torso(tc, H - 20, 10)}<rect x={tx + 2} y="168" width={tw - 4} height={H - 18} rx="8" fill={tc} /><rect x={tx + 14} y="146" width="10" height="26" fill={tc} /><rect x={tx + tw - 24} y="146" width="10" height="26" fill={tc} /><rect x={tx + 18} y="186" width="24" height="18" rx="3" fill={dk} /></g>;
      case "labcoat":
        return <g><rect x={tx - 4} y="150" width={tw + 8} height="74" rx="12" fill="#F6F8FC" />{sleeve("l", 50, "#F6F8FC", false)}{sleeve("r", 50, "#F6F8FC", false)}<rect x="96" y="150" width="8" height="74" fill="#DDE3EE" /><path d="M86 148 L100 174 L114 148 z" fill={tc} /><rect x={tx + 6} y="192" width="18" height="16" fill="#DDE3EE" /><rect x={tx + tw - 24} y="192" width="18" height="16" fill="#DDE3EE" /></g>;
      case "apron":
        return <g>{torso()}{arms}<path d="M82 146 L118 146 L124 210 L76 210 z" fill="#EDE3CC" /><rect x="86" y="138" width="28" height="10" fill="#EDE3CC" /><rect x="76" y="180" width="48" height="4" fill={dk} opacity="0.4" /><rect x="88" y="188" width="24" height="16" fill="#DCCFB0" /></g>;
      case "gown":
        return <g><path d={`M${tx - 8} 150 L${tx + tw + 8} 150 L${tx + tw + 18} 230 L${tx - 18} 230 z`} fill="#22242E" />{sleeve("l", 56, "#22242E", false)}{sleeve("r", 56, "#22242E", false)}<path d="M86 148 L100 190 L114 148 z" fill="#F0B84A" /><rect x={tx - 4} y="150" width="14" height="80" fill="rgba(255,255,255,0.08)" /></g>;
      case "suit":
        return <g>{torso("#2A2E3C")}{sleeve("l", 50, "#2A2E3C", false)}{sleeve("r", 50, "#2A2E3C", false)}<path d="M86 148 L100 184 L114 148 z" fill="#F6F8FC" /><path d="M96 156 l8 0 l5 24 l-9 7 l-9 -7 z" fill={tc} /><rect x="96" y="150" width="8" height={H} fill="rgba(0,0,0,0.35)" /></g>;
      case "dino":
        return <g>{torso("#4C9A5C", H + 4, 20)}{sleeve("l", 50, "#4C9A5C", false)}{sleeve("r", 50, "#4C9A5C", false)}<ellipse cx="100" cy="190" rx="25" ry="21" fill="#A8D8A8" /><g fill="#3B7F49">{[158, 174, 190, 206].map((y) => <path key={y} d={`M${tx - 1} ${y} l-11 8 l11 6 z`} />)}</g></g>;
      case "banana":
        return <g><path d={`M${tx - 6} 152 q${tw / 2 + 6} -20 ${tw + 12} 0 l-8 72 q-${tw / 2} 14 -${tw - 4} 0 z`} fill="#F5D33C" /><path d={`M${tx - 4} 154 q10 60 8 68`} stroke="#DCB92C" strokeWidth="5" fill="none" />{sleeve("l", 48, "#F5D33C", false)}{sleeve("r", 48, "#F5D33C", false)}<rect x="94" y="138" width="12" height="18" rx="4" fill="#8E7A22" /></g>;
      case "hotdog":
        return <g><path d={`M${tx - 10} 152 q${tw / 2 + 10} -22 ${tw + 20} 0 l-6 66 q-${tw / 2} 16 -${tw + 8} 0 z`} fill="#F0C070" />
          <path d={`M${tx - 2} 160 q${tw / 2} -14 ${tw + 4} 0 l-4 52 q-${tw / 2} 12 -${tw} 0 z`} fill="#D9604A" />
          <path d={`M${tx + 4} 172 q${tw / 2} 16 ${tw - 8} -4`} stroke="#F5D34D" strokeWidth="6" fill="none" />
          <path d={`M${tx + 4} 192 q${tw / 2} 14 ${tw - 8} -4`} stroke="#F2F2F5" strokeWidth="5" fill="none" />
          {sleeve("l", 48, "#F0C070", false)}{sleeve("r", 48, "#F0C070", false)}</g>;
      case "hivis":
        return <g>{torso("#D9E84A")}{arms}<rect x={tx} y="170" width={tw} height="9" fill="#F2F2F5" opacity="0.9" />
          <rect x={tx} y="190" width={tw} height="9" fill="#F2F2F5" opacity="0.9" />
          <rect x="96" y="150" width="8" height={H} fill="rgba(0,0,0,.25)" />{collar("crew")}</g>;
      case "box":
        return <g><rect x={tx - 12} y="146" width={tw + 24} height="72" fill="#C7A275" /><rect x={tx - 12} y="146" width="16" height="72" fill="rgba(0,0,0,0.15)" /><path d={`M${tx - 12} 170 L${tx + tw + 12} 170`} stroke="#A8814F" strokeWidth="4" /><rect x="86" y="178" width="28" height="20" fill="#A8814F" /><text x="100" y="163" fontSize="12" fontWeight="700" textAnchor="middle" fill="#7A5C34">FRAGILE</text></g>;
      case "corset":
        return <g><rect x={tx + 2} y="152" width={tw - 4} height="42" rx="10" fill={tc} /><rect x={tx + 2} y="152" width="12" height="42" fill={dk} />{[0, 1, 2].map((n) => <rect key={n} x={tx + 12 + n * ((tw - 28) / 3)} y="156" width="3" height="34" fill={lt} />)}<rect x={tx + 6} y="194" width={tw - 12} height="14" fill={skin} />{collar("wide")}</g>;
      case "denim":
        return <g>{torso("#4A6E9E")}{sleeve("l", 48, "#4A6E9E", true)}{sleeve("r", 48, "#4A6E9E", true)}<rect x="96" y="150" width="8" height={H} fill="rgba(0,0,0,0.28)" /><rect x={tx + 8} y="176" width="14" height="14" rx="2" fill="rgba(0,0,0,0.2)" /><rect x={tx + tw - 22} y="176" width="14" height="14" rx="2" fill="rgba(0,0,0,0.2)" />{collar("v")}</g>;
      case "kimono":
        return <g><path d={`M${tx - 4} 150 L${tx + tw + 4} 150 L${tx + tw + 10} 232 L${tx - 10} 232 z`} fill={tc} />{sleeve("l", 62, tc, false)}{sleeve("r", 62, tc, false)}<path d={`M88 148 L100 200 L112 148 z`} fill="#F6F2EA" /><rect x={tx - 2} y="192" width={tw + 4} height="12" fill={dk} /><g opacity="0.25">{[168, 190, 212].map((y) => <circle key={y} cx={tx + 16} cy={y} r="6" fill="#fff" />)}</g></g>;
      default:
        return <g>{torso()}{arms}{collar("crew")}</g>;
    }
  };

  const bottomArt = () => {
    const legs = (
      <g>
        <rect x="80" y="206" width="17" height="40" rx="8" fill={bc} />
        <rect x="103" y="206" width="17" height="40" rx="8" fill={bc} />
      </g>
    );
    switch (v.bottom) {
      case "shorts":
        return <g><rect x="80" y="206" width="17" height="22" rx="8" fill={bc} /><rect x="103" y="206" width="17" height="22" rx="8" fill={bc} /><rect x="80" y="226" width="17" height="20" rx="8" fill={skin} /><rect x="103" y="226" width="17" height="20" rx="8" fill={skin} /></g>;
      case "pleat":
        return <g><path d="M74 206 L126 206 L134 240 L66 240 z" fill={bc} /><g opacity="0.25">{[84, 96, 108, 120].map((x) => <rect key={x} x={x} y="206" width="3" height="34" fill="#000" />)}</g><rect x="80" y="238" width="17" height="10" rx="5" fill={skin} /><rect x="103" y="238" width="17" height="10" rx="5" fill={skin} /></g>;
      case "long":
        return <g><path d="M76 206 L124 206 L134 250 L66 250 z" fill={bc} /></g>;
      case "kilt":
        return <g><path d="M74 206 L126 206 L132 242 L68 242 z" fill={bc} /><g opacity="0.3">{[80, 92, 104, 116].map((x) => <rect key={x} x={x} y="206" width="5" height="36" fill="#000" />)}{[212, 226].map((y) => <rect key={y} x="68" y={y} width="64" height="4" fill="#000" />)}</g></g>;
      case "leggings":
        return <g><rect x="81" y="206" width="15" height="42" rx="7" fill={bc} /><rect x="104" y="206" width="15" height="42" rx="7" fill={bc} /><rect x="81" y="206" width="5" height="42" fill="rgba(0,0,0,0.18)" /></g>;
      case "wide":
        return <g><path d="M78 206 L98 206 L102 250 L70 250 z" fill={bc} /><path d="M102 206 L122 206 L130 250 L98 250 z" fill={bc} /></g>;
      case "denimskirt":
        return <g><path d="M76 206 L124 206 L130 236 L70 236 z" fill={bc} /><rect x="76" y="206" width="48" height="7" fill="rgba(0,0,0,0.22)" /><rect x="80" y="234" width="17" height="14" rx="7" fill={skin} /><rect x="103" y="234" width="17" height="14" rx="7" fill={skin} /></g>;
      case "mom":
        return <g><rect x="78" y="206" width="19" height="44" rx="7" fill={bc} /><rect x="103" y="206" width="19" height="44" rx="7" fill={bc} /><rect x="78" y="206" width="44" height="8" rx="3" fill="rgba(0,0,0,0.22)" /></g>;
      case "flare":
        return <g><path d="M79 206 L97 206 L103 250 L69 250 z" fill={bc} /><path d="M103 206 L121 206 L131 250 L97 250 z" fill={bc} /><rect x="79" y="206" width="42" height="7" fill="rgba(0,0,0,0.2)" /></g>;
      case "biker":
        return <g><rect x="80" y="206" width="17" height="24" rx="7" fill={bc} /><rect x="103" y="206" width="17" height="24" rx="7" fill={bc} /><rect x="80" y="228" width="17" height="18" rx="8" fill={skin} /><rect x="103" y="228" width="17" height="18" rx="8" fill={skin} /></g>;
      case "tulle":
        return <g><path d="M72 206 L128 206 L142 244 L58 244 z" fill={bc} opacity="0.85" /><path d="M76 206 L124 206 L134 236 L66 236 z" fill={bc} opacity="0.6" /><rect x="80" y="240" width="17" height="8" rx="4" fill={skin} /><rect x="103" y="240" width="17" height="8" rx="4" fill={skin} /></g>;
      case "cargo":
        return <g>{legs}<rect x="76" y="216" width="9" height="14" rx="2" fill="rgba(0,0,0,0.25)" /><rect x="115" y="216" width="9" height="14" rx="2" fill="rgba(0,0,0,0.25)" /></g>;
      case "stripe":
        return <g>{legs}<rect x="82" y="206" width="4" height="40" fill="#F4F6FA" /><rect x="112" y="206" width="4" height="40" fill="#F4F6FA" /></g>;
      case "joggers":
        return <g>{legs}<rect x="80" y="238" width="17" height="8" rx="4" fill="rgba(0,0,0,0.3)" /><rect x="103" y="238" width="17" height="8" rx="4" fill="rgba(0,0,0,0.3)" /></g>;
      case "boxers":
        return <g><rect x="78" y="204" width="44" height="24" rx="8" fill={bc} /><g opacity="0.3">{[84, 96, 108].map((x) => <circle key={x} cx={x} cy="216" r="4" fill="#fff" />)}</g><rect x="80" y="226" width="17" height="20" rx="8" fill={skin} /><rect x="103" y="226" width="17" height="20" rx="8" fill={skin} /></g>;
      default:
        return legs;
    }
  };

  const shoeArt = {
    sneak: <g><rect x="74" y="238" width="26" height="14" rx="7" fill="#F4F4F8" /><rect x="100" y="238" width="26" height="14" rx="7" fill="#F4F4F8" /></g>,
    boots: <g><rect x="74" y="230" width="26" height="22" rx="6" fill="#5A3A22" /><rect x="100" y="230" width="26" height="22" rx="6" fill="#5A3A22" /></g>,
    slides: <g><rect x="74" y="244" width="26" height="8" rx="4" fill="#22242E" /><rect x="100" y="244" width="26" height="8" rx="4" fill="#22242E" /></g>,
    dress: <g><rect x="72" y="240" width="30" height="12" rx="5" fill="#2A1A12" /><rect x="98" y="240" width="30" height="12" rx="5" fill="#2A1A12" /></g>,
    cleats: <g><rect x="74" y="238" width="26" height="12" rx="5" fill="#C8F53C" /><rect x="100" y="238" width="26" height="12" rx="5" fill="#C8F53C" />{[78, 88, 104, 114].map((x) => <rect key={x} x={x} y="250" width="4" height="5" fill="#22242E" />)}</g>,
    mary: <g><ellipse cx="87" cy="245" rx="15" ry="9" fill="#2A1A12" /><ellipse cx="113" cy="245" rx="15" ry="9" fill="#2A1A12" /><rect x="76" y="236" width="22" height="5" rx="2" fill="#2A1A12" /><rect x="102" y="236" width="22" height="5" rx="2" fill="#2A1A12" /></g>,
    heels: <g><path d="M74 240 l26 0 l0 10 l-26 0 z" fill="#8A2436" /><rect x="94" y="248" width="5" height="10" fill="#8A2436" /><path d="M100 240 l26 0 l0 10 l-26 0 z" fill="#8A2436" /><rect x="120" y="248" width="5" height="10" fill="#8A2436" /></g>,
    platform: <g><rect x="72" y="226" width="28" height="22" rx="5" fill="#22242E" /><rect x="100" y="226" width="28" height="22" rx="5" fill="#22242E" /><rect x="70" y="244" width="32" height="10" rx="4" fill="#F4F4F8" /><rect x="98" y="244" width="32" height="10" rx="4" fill="#F4F4F8" /></g>,
    chunky: <g><rect x="70" y="230" width="32" height="16" rx="6" fill="#F4F4F8" /><rect x="98" y="230" width="32" height="16" rx="6" fill="#F4F4F8" /><rect x="68" y="242" width="36" height="12" rx="6" fill="#DCE0EA" /><rect x="96" y="242" width="36" height="12" rx="6" fill="#DCE0EA" /></g>,
    ugg: <g><rect x="72" y="224" width="28" height="26" rx="9" fill="#C7A275" /><rect x="100" y="224" width="28" height="26" rx="9" fill="#C7A275" /><rect x="72" y="222" width="28" height="8" rx="4" fill="#F2EDE4" /><rect x="100" y="222" width="28" height="8" rx="4" fill="#F2EDE4" /></g>,
    socks: <g><rect x="76" y="230" width="22" height="16" fill="#F2F2F5" /><rect x="102" y="230" width="22" height="16" fill="#F2F2F5" /><rect x="74" y="244" width="26" height="8" rx="4" fill="#8E6B3A" /><rect x="100" y="244" width="26" height="8" rx="4" fill="#8E6B3A" /></g>,
    bunny: <g><ellipse cx="87" cy="245" rx="15" ry="10" fill="#F7C8D8" /><ellipse cx="113" cy="245" rx="15" ry="10" fill="#F7C8D8" /><circle cx="82" cy="242" r="2.5" fill={D} /><circle cx="108" cy="242" r="2.5" fill={D} /><path d="M92 236 q4 -12 8 0" stroke="#F7C8D8" strokeWidth="5" fill="none" /></g>,
    bare: <g><ellipse cx="87" cy="246" rx="13" ry="8" fill={skin} /><ellipse cx="113" cy="246" rx="13" ry="8" fill={skin} /></g>,
  }[v.shoes];

  const showFace = !hat.hideFace;
  const showHair = !hat.mask;

  const auraBack = {
    glow: <ellipse cx="100" cy="150" rx="82" ry="112" fill="#4CE0F5" opacity="0.3" filter="url(#rcBlur)" />,
    gold: <ellipse cx="100" cy="150" rx="86" ry="116" fill="#F5D34D" opacity="0.34" filter="url(#rcBlur)" />,
    holo: <ellipse cx="100" cy="150" rx="86" ry="116" fill="url(#rcHoloGrad)" opacity="0.38" filter="url(#rcBlur)" />,
    flame: (
      <g>
        {[62, 100, 138].map((x, n) => (
          <path key={x} d={`M${x} 250 q-16 -${34 + n * 8} 0 -${52 + n * 10} q16 ${18 + n * 6} 0 ${52 + n * 10} z`} fill={["#F0651F", "#F5A623", "#F5D34D"][n]} opacity="0.75">
            <animate attributeName="opacity" values="0.75;0.3;0.75" dur={`${0.7 + n * 0.2}s`} repeatCount="indefinite" />
          </path>
        ))}
      </g>
    ),
  }[v.aura] || null;

  const auraFront = {
    sparkle: (
      <g transform="translate(100,146)">
        {[0, 1, 2, 3, 4].map((n) => (
          <g key={n}>
            <animateTransform attributeName="transform" type="rotate" from={`${n * 72} 0 0`} to={`${n * 72 + 360} 0 0`} dur="7s" repeatCount="indefinite" />
            <path transform="translate(94,0)" d="M0 -9 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#FFE9A8" />
          </g>
        ))}
      </g>
    ),
    static: (
      <g opacity="0.5">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <rect key={n} x="46" y={40 + n * 36} width="108" height="4" fill="#9FD8F0" opacity="0.6">
            <animate attributeName="y" values={`${40 + n * 36};${226};${40 + n * 36}`} dur="2.4s" begin={`${n * 0.3}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
    ),
    holo: (
      <rect x="40" y="30" width="120" height="226" fill="url(#rcHoloGrad)" opacity="0.22" style={{ mixBlendMode: "screen" }} />
    ),
  }[v.aura] || null;

  const plate = v.plate && v.plate !== "none" ? `url(#rcPlate-${v.plate})` : undefined;

  return (
    <svg
      viewBox="0 0 200 260"
      width={fluid ? "100%" : size}
      height={fluid ? undefined : size * 1.3}
      style={{ display: "block", overflow: "visible", transform: pose === "fall" ? "rotate(-14deg)" : undefined }}
      role="img"
      aria-label="Your character"
    >
      <defs>
        <TintDefs />
        <filter id="rcBlur"><feGaussianBlur stdDeviation="11" /></filter>
        <linearGradient id="rcHoloGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6EC7" /><stop offset="35%" stopColor="#4CE0F5" />
          <stop offset="70%" stopColor="#C8F53C" /><stop offset="100%" stopColor="#9B7BFF" />
          <animateTransform attributeName="gradientTransform" type="translate" values="0 0;0.4 0.2;0 0" dur="5s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="rcPlate-gold">
          <feColorMatrix type="matrix" values="0.85 0.72 0.28 0 0.12  0.62 0.58 0.18 0 0.07  0.16 0.14 0.06 0 0  0 0 0 1 0" />
        </filter>
        <filter id="rcPlate-chrome">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncR type="linear" slope="1.2" intercept="0.06" /><feFuncG type="linear" slope="1.2" intercept="0.08" /><feFuncB type="linear" slope="1.25" intercept="0.12" /></feComponentTransfer>
        </filter>
        <filter id="rcPlate-holo">
          <feColorMatrix type="hueRotate" values="0">
            <animate attributeName="values" from="0" to="360" dur="4s" repeatCount="indefinite" />
          </feColorMatrix>
          <feColorMatrix type="saturate" values="2.2" />
        </filter>
        <filter id="rcPlate-cursed">
          <feColorMatrix type="matrix" values="0.5 0.1 0.1 0 0  0.05 0.12 0.05 0 0  0.1 0.05 0.24 0 0.03  0 0 0 1 0" />
        </filter>
      </defs>
      {auraBack}
      <ellipse cx="100" cy="252" rx="46" ry="8" fill={sh} />
      {(() => { const f = tintFilter((v.tint || {}).back); return f ? <g filter={f}>{backArt}</g> : backArt; })()}
      {bottomArt()}
      {legArt}
      {shoeArt}
      {topArt()}
      <circle cx={tx - 12} cy="206" r="9" fill={skin} />
      <circle cx={tx + tw + 12} cy="206" r="9" fill={skin} />
      {(() => { const f = tintFilter((v.tint || {}).hand); return f ? <g filter={f}>{handArt}</g> : handArt; })()}
      {showHair && hairBack}
      <rect x="52" y="46" width="96" height="98" rx="34" fill={skin} />
      <ellipse cx="52" cy="102" rx="7" ry="9" fill={skin} />
      <ellipse cx="148" cy="102" rx="7" ry="9" fill={skin} />
      {neckArt}
      {showFace && (
        <g>
          {beard}
          {brows}
          {eyes}
          {mouth}
          {gear}
          {makeupArt}
        </g>
      )}
      {showHair && hairFront}
      {showHair && accArt}
      {(() => {
        const f = plate || tintFilter((v.tint || {}).hat);
        return f ? <g filter={f}>{hatArt}</g> : hatArt;
      })()}
      {auraFront}
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/*  Room: catalogs                                                     */
/* ------------------------------------------------------------------ */

const ROOM_SLOTS = [
  { key: "wall", name: "Walls", items: [
    { id: "plum", name: "Plum", price: 0 }, { id: "slate", name: "Slate", price: 0 },
    { id: "teal", name: "Deep teal", price: 900 }, { id: "rose", name: "Dusty rose", price: 1400 },
    { id: "brick", name: "Exposed brick", price: 2200 }, { id: "mural", name: "Skyline mural", quest: "q-mastery" },
    { id: "gold", name: "Gold leaf", quest: "q-master2" }, { id: "void", name: "Deep space", price: 7000, ticket: 3 },
  ] },
  { key: "trim", name: "Trim light", items: [
    { id: "none", name: "None", price: 0 }, { id: "strip", name: "Neon strip", price: 0 },
    { id: "warm", name: "Warm bulbs", price: 800 }, { id: "rgb", name: "RGB wash", price: 2400 },
    { id: "star", name: "String lights", price: 3200 },
  ] },
  { key: "floor", name: "Floor", items: [
    { id: "dark", name: "Dark tile", price: 0 }, { id: "wood", name: "Warm wood", quest: "q-build" },
    { id: "grid", name: "Grid glass", price: 1800 }, { id: "checker", name: "Checkerboard", price: 2600 },
    { id: "carpet", name: "Deep carpet", price: 3400 },
    { id: "lava", name: "The floor is lava", price: 5200 },
    { id: "grass", name: "Actual grass", price: 3800 },
  ] },
  { key: "rug", name: "Rug", items: [
    { id: "none", name: "Bare", price: 0 }, { id: "round", name: "Round rug", price: 0 },
    { id: "neon", name: "Glow ring", quest: "q-first" }, { id: "shag", name: "Shag square", price: 1600 },
    { id: "persian", name: "Patterned", price: 2800 },
    { id: "bear", name: "Bear rug, unbothered", price: 4400 },
  ] },
  { key: "desk", name: "Desk", items: [
    { id: "none", name: "No desk", price: 0 }, { id: "simple", name: "Simple desk", price: 0 },
    { id: "setup", name: "Full rig", quest: "q-mastery" }, { id: "standing", name: "Standing desk", price: 3000 },
    { id: "trading", name: "Six-screen wall", price: 9000, ticket: 4 },
  ] },
  { key: "seat", name: "Seating", items: [
    { id: "stool", name: "Stool", price: 0 }, { id: "sofa", name: "Sofa", price: 0 },
    { id: "beans", name: "Bean bags", quest: "q-perfect" }, { id: "gamer", name: "Gaming chair", price: 2600 },
    { id: "hammock", name: "Hammock", price: 4200 }, { id: "throne", name: "Throne", price: 8000, ticket: 3 },
  ] },
  { key: "tv", name: "Big screen", items: [
    { id: "none", name: "No screen", price: 0 }, { id: "off", name: "Screen, off", price: 700 },
    { id: "city", name: "Night skyline", quest: "q-modes" }, { id: "reef", name: "Aquarium", quest: "q-ask" },
    { id: "fire", name: "Fireplace", price: 2200 }, { id: "chart", name: "Ticker board", price: 3600 },
    { id: "space", name: "Slow orbit", price: 5000 },
    { id: "static", name: "Pure static", price: 900 },
    { id: "loading", name: "Loading, 99%", price: 2600 },
  ] },
  { key: "lamp", name: "Lighting", items: [
    { id: "none", name: "None", price: 0 }, { id: "floor", name: "Floor lamp", price: 600 },
    { id: "lava", name: "Lava lamp", price: 2000 }, { id: "neon", name: "Neon sign", quest: "q-streak" },
    { id: "disco", name: "Disco ball", price: 4600 },
    { id: "salt", name: "Salt lamp", price: 1400 },
  ] },
  { key: "art", name: "Wall art", items: [
    { id: "none", name: "Bare wall", price: 0 }, { id: "posters", name: "Poster trio", price: 900 },
    { id: "pennant", name: "Pennant", price: 1400 }, { id: "board", name: "Whiteboard", price: 2000 },
    { id: "trophy", name: "Trophy shelf", quest: "q-boss" }, { id: "clock", name: "Big clock", price: 1800 },
    { id: "hangin", name: "Hang in there", price: 1600 },
    { id: "dart", name: "Dartboard", price: 2200 },
  ] },
  { key: "shelf", name: "Shelving", items: [
    { id: "none", name: "None", price: 0 }, { id: "books", name: "Bookshelf", price: 800 },
    { id: "crates", name: "Crate stack", price: 1600 }, { id: "vinyl", name: "Record wall", price: 3000 },
  ] },
  { key: "plant", name: "Greenery", items: [
    { id: "none", name: "None", price: 0 }, { id: "small", name: "Little pot", price: 0 },
    { id: "monstera", name: "Monstera", quest: "q-century" }, { id: "cactus", name: "Cactus", price: 1200 },
    { id: "tree", name: "Fig tree", price: 2800 }, { id: "hang", name: "Hanging vines", price: 3400 },
    { id: "dead", name: "Whatever this was", price: 800 },
  ] },
  { key: "pet", name: "Company", items: [
    { id: "none", name: "Alone", price: 0 }, { id: "duck", name: "Rubber duck", price: 900 },
    { id: "fish", name: "Fishbowl", price: 1800 }, { id: "cat", name: "Cat", quest: "q-drift" },
    { id: "bot", name: "Little robot", quest: "q-survive" }, { id: "dog", name: "Dog", price: 5000 },
    { id: "pigeon", name: "Pigeon that got in", price: 2800 },
    { id: "rock", name: "Pet rock", price: 600 },
  ] },
  { key: "arcade", name: "Big toys", items: [
    { id: "none", name: "None", price: 0 }, { id: "cab", name: "Arcade cabinet", price: 4000 },
    { id: "fridge", name: "Mini fridge", price: 2400 }, { id: "hoop", name: "Mini hoop", price: 2000 },
    { id: "drum", name: "Drum kit", price: 5600 },
    { id: "vending", name: "Vending machine", price: 6200 },
    { id: "tread", name: "Treadmill, for clothes", price: 4800 },
  ] },
  { key: "window", name: "Window", items: [
    { id: "none", name: "No window", price: 0 }, { id: "night", name: "City night", price: 1200 },
    { id: "rain", name: "Rainy glass", price: 2400 }, { id: "space", name: "Porthole to space", price: 6000, ticket: 2 },
    { id: "brick", name: "Bricked up", price: 700 },
  ] },
  { key: "speaker", name: "Speakers", items: [
    { id: "none", name: "None", price: 0 }, { id: "book", name: "Bookshelf pair", price: 1000 },
    { id: "tower", name: "Tower stack", price: 2600 },
  ] },
  { key: "fx", name: "Atmosphere 🎟", items: [
    { id: "none", name: "Still air", price: 0 },
    { id: "dust", name: "Dust motes", price: 0, ticket: 2 },
    { id: "bubbles", name: "Floating bubbles", price: 0, ticket: 3 },
    { id: "embers", name: "Rising embers", price: 0, ticket: 4 },
    { id: "snow", name: "Indoor snow", price: 0, ticket: 5 },
    { id: "aurora", name: "Ceiling aurora", price: 0, ticket: 7 },
  ] },
  { key: "clutter", name: "Desk clutter", items: [
    { id: "none", name: "Tidy", price: 0 }, { id: "mugs", name: "Too many mugs", price: 700 },
    { id: "snacks", name: "Snack pile", price: 1100 }, { id: "papers", name: "Paper avalanche", price: 1500 },
    { id: "cans", name: "Energy drink pyramid", price: 1900 },
    { id: "sock", name: "One sock", price: 400 },
  ] },
];

const DEFAULT_ROOM = {
  wall: "plum", trim: "strip", floor: "dark", rug: "round", desk: "simple", seat: "stool",
  tv: "none", lamp: "none", art: "none", shelf: "none", plant: "small", pet: "none",
  arcade: "none", window: "none", speaker: "none", clutter: "none", fx: "none",
};

const WALL_C = {
  plum: ["#3B2470", "#2A1A52"], slate: ["#2B3450", "#1B2138"], teal: ["#144A4A", "#0C3232"],
  rose: ["#5C3350", "#3E2038"], brick: ["#5A3226", "#3E2018"], mural: ["#2C1E63", "#1A1140"],
  gold: ["#6B5320", "#3E2F12"], void: ["#0B1030", "#05061A"],
};
const FLOOR_C = { dark: "#241546", wood: "#7A4A28", grid: "#152A46", checker: "#2A2438", carpet: "#4A2438" };

/* ------------------------------------------------------------------ */
/*  Room: renderer                                                     */
/* ------------------------------------------------------------------ */

function Room({ r, glow = "#7C5BFF", width = "100%", due = 0, score = 0, trophies = 0 }) {
  const m = { ...DEFAULT_ROOM, ...(r || {}) };
  const [w1, w2] = WALL_C[m.wall] || WALL_C.plum;
  const floor = FLOOR_C[m.floor] || FLOOR_C.dark;
  const D = "#1A1424";

  return (
    <svg viewBox="0 0 800 380" width={width} style={{ display: "block" }} role="img" aria-label="Your study room">
      <defs><TintDefs /></defs>
      <rect x="0" y="0" width="800" height="300" fill={w1} />
      <rect x="0" y="0" width="800" height="300" fill={w2} opacity="0.5" />
      <rect x="0" y="0" width="800" height="24" fill={w2} />

      {m.wall === "brick" && (
        <g opacity="0.25">
          {[40, 70, 100, 130, 160, 190, 220, 250, 280].map((y, r2) =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
              <rect key={`${y}-${c}`} x={c * 84 + (r2 % 2 ? -42 : 0)} y={y} width="78" height="24" rx="3" fill="#000" />
            ))
          )}
        </g>
      )}
      {m.wall === "mural" && (
        <g opacity="0.85">
          <circle cx="400" cy="150" r="86" fill="#3A2A8C" />
          {[300, 330, 356, 384, 414, 444, 472].map((x, n) => (
            <rect key={x} x={x} y={120 + (n % 3) * 22} width="22" height={110 - (n % 3) * 18} fill="#4FE0D0" opacity="0.5" />
          ))}
        </g>
      )}
      {m.wall === "gold" && (
        <g opacity="0.3">{[0, 1, 2, 3, 4, 5, 6, 7].map((n) => <rect key={n} x={n * 100} y="0" width="46" height="300" fill="#F5D34D" />)}</g>
      )}
      {m.wall === "grid" && (
        <g opacity="0.22">
          {[...Array(17)].map((_, n) => <line key={"v" + n} x1={n * 50} y1="0" x2={n * 50} y2="300" stroke="#9FD8F0" strokeWidth="1.5" />)}
          {[...Array(7)].map((_, n) => <line key={"h" + n} x1="0" y1={n * 50} x2="800" y2={n * 50} stroke="#9FD8F0" strokeWidth="1.5" />)}
        </g>
      )}
      {m.wall === "void" && (
        <g>{[...Array(40)].map((_, n) => <circle key={n} cx={(n * 97) % 780 + 10} cy={(n * 53) % 280 + 10} r={n % 5 === 0 ? 2.4 : 1.4} fill="#fff" opacity="0.7" />)}</g>
      )}

      {m.trim === "strip" && <g><rect x="0" y="18" width="800" height="7" rx="3" fill={glow} /><rect x="0" y="292" width="800" height="6" fill={glow} opacity="0.6" /></g>}
      {m.trim === "warm" && <g>{[80, 240, 400, 560, 720].map((x) => <g key={x}><circle cx={x} cy="30" r="12" fill="#FFD9A0" opacity="0.9" /><circle cx={x} cy="30" r="26" fill="#FFD9A0" opacity="0.14" /></g>)}</g>}
      {m.trim === "rgb" && <g opacity="0.85">{["#FF3B6B", "#FFB020", "#3DDC91", "#25D0C0", "#9B7BFF"].map((c, n) => <rect key={c} x={n * 160} y="18" width="160" height="8" fill={c} />)}</g>}
      {m.trim === "star" && <g>{[...Array(16)].map((_, n) => <g key={n}><path d={`M${n * 50} 20 q25 ${18 + (n % 3) * 6} 50 0`} stroke="#F5D34D" strokeWidth="2" fill="none" opacity="0.6" /><circle cx={n * 50 + 25} cy={34 + (n % 3) * 4} r="4" fill="#FFE9A8" /></g>)}</g>}

      {m.window === "night" && (
        <g><rect x="600" y="60" width="150" height="110" rx="8" fill="#0B1030" stroke="#5C4A8C" strokeWidth="6" />{[614, 646, 678, 710].map((x, n) => <rect key={x} x={x} y={90 + (n % 2) * 18} width="24" height={80 - (n % 2) * 18} fill="#2E4C7A" />)}<circle cx="726" cy="86" r="14" fill="#F2EDD0" /></g>
      )}
      {m.window === "rain" && (
        <g><rect x="600" y="60" width="150" height="110" rx="8" fill="#16305A" stroke="#5C4A8C" strokeWidth="6" />{[...Array(14)].map((_, n) => <path key={n} d={`M${610 + n * 10} ${70 + (n % 4) * 22} l-4 18`} stroke="#9FD8F0" strokeWidth="2" opacity="0.7" />)}</g>
      )}
      {m.window === "brick" && (
        <g><rect x="600" y="60" width="150" height="110" rx="8" fill="#5A3226" stroke="#3E2018" strokeWidth="6" />
          {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={606 + c * 36 + (r % 2 ? -18 : 0)} y={66 + r * 26} width="32" height="22" rx="2"
              fill="#6B3E2E" stroke="#4A2A1E" strokeWidth="2" />
          )))}
        </g>
      )}
      {m.window === "space" && (
        <g><circle cx="678" cy="112" r="62" fill="#05061A" stroke="#8E96A8" strokeWidth="8" /><circle cx="662" cy="100" r="22" fill="#C87F4A" /><ellipse cx="662" cy="100" rx="36" ry="8" fill="#E0B183" opacity="0.7" />{[...Array(10)].map((_, n) => <circle key={n} cx={640 + ((n * 37) % 76)} cy={80 + ((n * 23) % 64)} r="1.6" fill="#fff" />)}</g>
      )}

      {m.art === "posters" && (
        <g>{[[70, 60, "#E5484D"], [150, 76, "#25D0C0"], [230, 58, "#F0B84A"]].map(([x, y, c], n) => (
          <g key={n}><rect x={x} y={y} width="62" height="80" rx="4" fill={c} opacity="0.85" /><rect x={x + 8} y={y + 10} width="46" height="8" rx="4" fill="#fff" opacity="0.6" /><rect x={x + 8} y={y + 26} width="30" height="6" rx="3" fill="#fff" opacity="0.4" /></g>
        ))}</g>
      )}
      {m.art === "pennant" && (
        <g><path d="M70 60 L210 82 L70 104 z" fill="#E5484D" /><text x="110" y="90" fontSize="20" fontWeight="800" fill="#fff">RECALL</text></g>
      )}
      {m.art === "board" && (
        <g><rect x="60" y="54" width="200" height="120" rx="6" fill="#F4F6FA" stroke="#8E96A8" strokeWidth="5" /><text x="80" y="90" fontSize="20" fontWeight="700" fill="#2B3450">TO DO</text><text x="80" y="122" fontSize="17" fill="#5C6478">{due} cards due</text><rect x="80" y="136" width="120" height="5" rx="2" fill="#C8CEDC" /><rect x="80" y="150" width="90" height="5" rx="2" fill="#C8CEDC" /></g>
      )}
      {m.art === "trophy" && (
        <g><rect x="70" y="120" width="190" height="10" rx="4" fill="#7A4A28" />{[100, 150, 200, 240].slice(0, Math.max(1, Math.min(4, trophies))).map((x, n) => <g key={x}><rect x={x - 10} y={104 - n % 2 * 6} width="20" height={16 + (n % 2) * 6} rx="4" fill="#F0C33C" /><rect x={x - 14} y="114" width="28" height="6" rx="3" fill="#C79A22" /></g>)}</g>
      )}
      {m.art === "hangin" && (
        <g><rect x="70" y="52" width="150" height="120" rx="6" fill="#F4F6FA" />
          <rect x="78" y="60" width="134" height="86" fill="#7FC2DE" />
          <path d="M120 146 q6 -40 24 -52" stroke="#5A3A22" strokeWidth="7" fill="none" />
          <ellipse cx="150" cy="86" rx="17" ry="14" fill="#C7A275" />
          <circle cx="144" cy="82" r="3" fill="#22242E" /><circle cx="156" cy="82" r="3" fill="#22242E" />
          <path d="M138 96 q12 8 24 0" stroke="#22242E" strokeWidth="2.5" fill="none" />
          <path d="M136 94 q-4 12 4 16 M164 94 q4 12 -4 16" stroke="#C7A275" strokeWidth="5" fill="none" />
          <text x="145" y="164" fontSize="12" fontWeight="800" textAnchor="middle" fill="#2B3450">HANG IN THERE</text>
        </g>
      )}
      {m.art === "dart" && (
        <g>{[42, 34, 26, 18, 10].map((r, n) => (
          <circle key={r} cx="150" cy="104" r={r} fill={n % 2 ? "#F4F6FA" : "#22242E"} />
        ))}
          <circle cx="150" cy="104" r="5" fill="#E5484D" />
          <g transform="rotate(38 168 88)"><rect x="166" y="60" width="4" height="30" fill="#C9C9D2" />
            <path d="M162 56 l8 0 l-4 -10 z" fill="#25D0C0" /></g>
        </g>
      )}
      {m.art === "clock" && (
        <g><circle cx="150" cy="100" r="42" fill="#F4F6FA" stroke="#2B3450" strokeWidth="6" /><rect x="147" y="70" width="6" height="34" rx="3" fill="#2B3450" /><rect x="150" y="97" width="28" height="6" rx="3" fill="#E5484D" /></g>
      )}

      {m.tv !== "none" && (
        <g>
          <rect x="440" y="50" width="250" height="150" rx="10" fill="#15161E" />
          <rect x="450" y="60" width="230" height="130" rx="6" fill={m.tv === "off" ? "#22242E" : "#0B1030"} />
          {m.tv === "city" && <g><rect x="450" y="60" width="230" height="130" fill="#1B2A5A" />{[466, 500, 534, 568, 602, 636].map((x, n) => <rect key={x} x={x} y={100 + (n % 3) * 18} width="26" height={90 - (n % 3) * 18} fill="#3E5CA8" />)}<circle cx="640" cy="86" r="16" fill="#F2EDD0" opacity="0.9" /></g>}
          {m.tv === "reef" && <g><rect x="450" y="60" width="230" height="130" fill="#12506B" />{[...Array(6)].map((_, n) => <g key={n}><ellipse cx={480 + n * 34} cy={100 + (n % 3) * 30} rx="14" ry="9" fill={["#F0A93A", "#E5484D", "#F5D34D"][n % 3]} /><path d={`M${466 + n * 34} ${100 + (n % 3) * 30} l-10 -6 l0 12 z`} fill={["#F0A93A", "#E5484D", "#F5D34D"][n % 3]} /></g>)}<g fill="#2A9A6A">{[470, 620, 660].map((x) => <rect key={x} x={x} y="150" width="10" height="40" rx="5" />)}</g></g>}
          {m.tv === "fire" && <g><rect x="450" y="60" width="230" height="130" fill="#2A1408" />{[520, 560, 600].map((x, n) => <path key={x} d={`M${x} 180 q-20 -${40 + n * 12} 0 -${60 + n * 14} q20 ${20 + n * 8} 0 ${60 + n * 14} z`} fill={["#F0651F", "#F5A623", "#F5D34D"][n]} opacity="0.9" />)}</g>}
          {m.tv === "chart" && <g><rect x="450" y="60" width="230" height="130" fill="#07120E" /><path d="M460 170 L500 150 L530 158 L570 110 L610 128 L670 76" stroke="#35E08A" strokeWidth="4" fill="none" /><text x="460" y="86" fontSize="18" fontWeight="700" fill="#35E08A">+{Math.max(0, score).toLocaleString()}</text></g>}
          {m.tv === "static" && (
            <g><rect x="450" y="60" width="230" height="130" fill="#1A1A1E" />
              {[...Array(150)].map((_, n) => (
                <rect key={n} x={452 + ((n * 37) % 226)} y={62 + ((n * 61) % 126)} width="4" height="3"
                  fill={n % 3 === 0 ? "#F2F2F5" : n % 3 === 1 ? "#8E96A8" : "#4A4A52"}>
                  <animate attributeName="opacity" values="1;0.1;1" dur="0.2s" begin={`${(n % 7) * 0.03}s`} repeatCount="indefinite" />
                </rect>
              ))}
            </g>
          )}
          {m.tv === "loading" && (
            <g><rect x="450" y="60" width="230" height="130" fill="#0E1224" />
              <circle cx="565" cy="112" r="24" fill="none" stroke="#2E3459" strokeWidth="6" />
              <path d="M565 88 a24 24 0 0 1 24 24" fill="none" stroke="#6BE3FF" strokeWidth="6" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 565 112" to="360 565 112" dur="1.1s" repeatCount="indefinite" />
              </path>
              <text x="565" y="162" fontSize="16" fontWeight="700" textAnchor="middle" fill="#A79BD6">99%</text>
            </g>
          )}
          {m.tv === "space" && <g><rect x="450" y="60" width="230" height="130" fill="#05061A" /><circle cx="565" cy="125" r="34" fill="#3E5CA8" /><ellipse cx="565" cy="125" rx="58" ry="12" fill="#A88ED8" opacity="0.7" />{[...Array(12)].map((_, n) => <circle key={n} cx={456 + ((n * 61) % 220)} cy={66 + ((n * 37) % 118)} r="1.6" fill="#fff" />)}</g>}
          <rect x="540" y="200" width="50" height="14" fill="#15161E" />
        </g>
      )}

      {m.speaker === "book" && <g>{[420, 706].map((x) => <g key={x}><rect x={x} y="150" width="42" height="60" rx="5" fill="#2A2E3C" /><circle cx={x + 21} cy="172" r="12" fill="#4A5064" /><circle cx={x + 21} cy="196" r="7" fill="#4A5064" /></g>)}</g>}
      {m.speaker === "tower" && <g>{[400, 716].map((x) => <g key={x}><rect x={x} y="120" width="52" height="180" rx="6" fill="#22242E" />{[146, 190, 234].map((y) => <circle key={y} cx={x + 26} cy={y} r="15" fill="#3E4356" />)}<circle cx={x + 26} cy="272" r="9" fill="#3E4356" /></g>)}</g>}

      {m.shelf === "books" && (
        <g><rect x="20" y="150" width="120" height="150" rx="6" fill="#5A3A22" /><rect x="26" y="156" width="108" height="60" fill="#3E2818" /><rect x="26" y="222" width="108" height="72" fill="#3E2818" />{[30, 44, 58, 72, 86, 100, 114].map((x, n) => <rect key={x} x={x} y={162 + (n % 2) * 4} width="10" height={48 - (n % 2) * 4} fill={["#E5484D", "#25D0C0", "#F0B84A", "#9B7BFF"][n % 4]} />)}{[30, 46, 62, 78, 96, 112].map((x, n) => <rect key={`b${x}`} x={x} y={230 + (n % 2) * 5} width="12" height={56 - (n % 2) * 5} fill={["#4C9A5C", "#F177B0", "#54CFE0", "#F0651F"][n % 4]} />)}</g>
      )}
      {m.shelf === "crates" && <g>{[[24, 210], [90, 210], [56, 150]].map(([x, y], n) => <g key={n}><rect x={x} y={y} width="62" height="58" rx="4" fill="#8E6B3A" /><rect x={x + 6} y={y + 6} width="50" height="46" fill="#7A5C34" /></g>)}</g>}
      {m.shelf === "vinyl" && <g><rect x="20" y="140" width="130" height="160" rx="6" fill="#2A2E3C" />{[0, 1, 2].map((r2) => [0, 1, 2].map((c) => <g key={`${r2}${c}`}><rect x={28 + c * 42} y={148 + r2 * 52} width="36" height="44" fill={["#E5484D", "#25D0C0", "#F0B84A", "#9B7BFF", "#4C9A5C", "#F177B0"][(r2 * 3 + c) % 6]} /><circle cx={46 + c * 42} cy={170 + r2 * 52} r="9" fill="#15161E" /></g>))}</g>}

      {m.lamp === "floor" && <g><rect x="360" y="180" width="8" height="120" fill="#3E4356" /><path d="M340 180 L388 180 L378 146 L350 146 z" fill="#F0D9A8" /><ellipse cx="364" cy="182" rx="46" ry="30" fill="#FFE9A8" opacity="0.16" /></g>}
      {m.lamp === "lava" && <g><rect x="352" y="220" width="30" height="12" rx="4" fill="#8E96A8" /><path d="M356 220 q-6 -70 11 -70 q17 0 11 70 z" fill="#E5484D" opacity="0.55" />{[168, 190, 206].map((y, n) => <ellipse key={y} cx={367 + (n % 2 ? 4 : -4)} cy={y} rx={7 - n} ry={9 - n} fill="#F5A623" />)}</g>}
      {m.lamp === "neon" && <g><path d="M320 60 q40 -30 80 0 q-40 34 -80 0 z" fill="none" stroke="#FF6EC7" strokeWidth="6" /><text x="336" y="104" fontSize="30" fontWeight="800" fill="#4CE0F5" opacity="0.95">study</text></g>}
      {m.lamp === "salt" && (
        <g><path d="M352 232 l30 0 l-4 10 l-22 0 z" fill="#5A3A22" />
          <path d="M356 232 q-6 -34 11 -42 q19 6 13 42 z" fill="#F0885A" opacity="0.92" />
          <path d="M360 226 q-2 -20 7 -26" stroke="#FFC9A8" strokeWidth="4" fill="none" opacity="0.8" />
          <ellipse cx="367" cy="212" rx="44" ry="34" fill="#F0885A" opacity="0.14">
            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}
      {m.lamp === "disco" && <g><rect x="396" y="0" width="4" height="34" fill="#8E96A8" /><circle cx="398" cy="52" r="24" fill="#8E96A8" />{[0, 1, 2, 3].map((n) => <rect key={n} x={382 + n * 8} y="30" width="6" height="44" fill="#C8CEDC" opacity="0.5" />)}{[0, 1, 2, 3, 4, 5].map((n) => <path key={n} d={`M398 52 L${240 + n * 64} 300`} stroke="#F5F5F7" strokeWidth="2" opacity="0.12" />)}</g>}

      {m.plant === "hang" && <g><rect x="700" y="24" width="8" height="30" fill="#5A3A22" /><ellipse cx="704" cy="66" rx="26" ry="18" fill="#8E6B3A" />{[684, 700, 716].map((x, n) => <path key={x} d={`M${x} 78 q${n % 2 ? 12 : -12} 50 ${n % 2 ? -6 : 6} 92`} stroke="#4C9A5C" strokeWidth="6" fill="none" />)}</g>}

      <rect x="0" y="298" width="800" height="82" fill={floor} />
      {m.floor === "grid" && <g opacity="0.35">{[...Array(9)].map((_, n) => <path key={n} d={`M${n * 100} 300 L${n * 100 - 60} 380`} stroke="#4FE0D0" strokeWidth="2" />)}{[314, 336, 362].map((y) => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#4FE0D0" strokeWidth="2" />)}</g>}
      {m.floor === "checker" && <g opacity="0.5">{[...Array(10)].map((_, c) => [0, 1].map((r2) => (c + r2) % 2 === 0 ? <rect key={`${c}${r2}`} x={c * 80} y={300 + r2 * 40} width="80" height="40" fill="#F2F2F5" opacity="0.22" /> : null))}</g>}
      {m.floor === "carpet" && <g opacity="0.25">{[...Array(30)].map((_, n) => <circle key={n} cx={(n * 71) % 790} cy={306 + ((n * 29) % 70)} r="8" fill="#000" />)}</g>}

      {m.floor === "lava" && (
        <g><rect x="0" y="298" width="800" height="82" fill="#3A1004" />
          {[...Array(7)].map((_, n) => (
            <path key={n} d={`M${n * 120} 378 q28 -${24 + (n % 3) * 10} 56 -42 q26 -16 52 -4`}
              stroke="#FF6A1F" strokeWidth={5 - (n % 2)} fill="none">
              <animate attributeName="opacity" values="0.45;1;0.45" dur={`${2 + (n % 3)}s`} repeatCount="indefinite" />
            </path>
          ))}
          <rect x="0" y="298" width="800" height="12" fill="#FFB020" opacity="0.55" />
        </g>
      )}
      {m.floor === "grass" && (
        <g><rect x="0" y="298" width="800" height="82" fill="#2E6B34" />
          {[...Array(60)].map((_, n) => (
            <path key={n} d={`M${n * 14} 380 q${n % 2 ? 4 : -4} -14 ${n % 3 ? 2 : -2} -24`}
              stroke={n % 4 === 0 ? "#4C9A5C" : "#3E8C4A"} strokeWidth="3" fill="none" />
          ))}
          {[120, 430, 690].map((x) => <ellipse key={x} cx={x} cy="342" rx="15" ry="7" fill="#F5D34D" opacity="0.7" />)}
        </g>
      )}
      <g filter={tintFilter((m.tint || {}).rug)}>{m.rug === "bear" && (
        <g><ellipse cx="400" cy="336" rx="130" ry="33" fill="#8A6236" />
          <circle cx="264" cy="330" r="29" fill="#8A6236" />
          <circle cx="246" cy="310" r="11" fill="#8A6236" /><circle cx="284" cy="308" r="11" fill="#8A6236" />
          <circle cx="254" cy="326" r="4" fill="#22242E" /><circle cx="274" cy="326" r="4" fill="#22242E" />
          <ellipse cx="264" cy="340" rx="9" ry="6" fill="#4A3320" />
          {[[344, 306], [344, 364], [500, 306], [500, 364]].map(([x, y], n) => (
            <ellipse key={n} cx={x} cy={y} rx="25" ry="16" fill="#7A5630" />
          ))}
        </g>
      )}</g>
      {m.desk === "simple" && (
        <g><rect x="90" y="238" width="180" height="12" rx="4" fill="#7A4A28" />
          <rect x="100" y="250" width="10" height="52" fill="#5A3A22" />
          <rect x="250" y="250" width="10" height="52" fill="#5A3A22" />
          <rect x="112" y="228" width="34" height="10" rx="2" fill="#3E6B8C" />
        </g>
      )}
      <g filter={tintFilter((m.tint || {}).rug)}>{m.rug === "round" && <ellipse cx="400" cy="336" rx="150" ry="34" fill="#5C4A8C" opacity="0.85" />}</g>
      <g filter={tintFilter((m.tint || {}).rug)}>{m.rug === "neon" && <g><ellipse cx="400" cy="336" rx="150" ry="34" fill={glow} opacity="0.35" /><ellipse cx="400" cy="336" rx="150" ry="34" fill="none" stroke={glow} strokeWidth="6" /><ellipse cx="400" cy="336" rx="110" ry="24" fill="none" stroke={glow} strokeWidth="3" opacity="0.7" /></g>}</g>
      <g filter={tintFilter((m.tint || {}).rug)}>{m.rug === "shag" && <g><rect x="256" y="308" width="290" height="58" rx="8" fill="#C7724A" />{[...Array(24)].map((_, n) => <rect key={n} x={260 + n * 12} y="308" width="6" height="58" fill="#B4593A" opacity="0.5" />)}</g>}</g>
      <g filter={tintFilter((m.tint || {}).rug)}>{m.rug === "persian" && <g><rect x="250" y="306" width="300" height="62" rx="10" fill="#8A2436" /><rect x="264" y="314" width="272" height="46" rx="6" fill="none" stroke="#F0C33C" strokeWidth="3" />{[320, 400, 480].map((x) => <path key={x} d={`M${x} 322 l16 15 l-16 15 l-16 -15 z`} fill="#F0C33C" opacity="0.85" />)}</g>}</g>

      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "stool" && <g><rect x="90" y="238" width="180" height="12" rx="4" fill="#7A4A28" /><rect x="100" y="250" width="10" height="52" fill="#5A3A22" /><rect x="250" y="250" width="10" height="52" fill="#5A3A22" /></g>}</g>
      {m.desk === "standing" && <g><rect x="90" y="212" width="180" height="12" rx="4" fill="#8E96A8" /><rect x="170" y="224" width="18" height="78" fill="#5C6478" /><rect x="130" y="298" width="100" height="8" rx="4" fill="#5C6478" /></g>}
      {(m.desk === "setup" || m.desk === "trading") && (
        <g>
          <rect x="70" y="236" width="220" height="12" rx="4" fill="#2A2E3C" />
          <rect x="82" y="248" width="10" height="54" fill="#22242E" /><rect x="268" y="248" width="10" height="54" fill="#22242E" />
          {(m.desk === "setup" ? [[110, 190], [190, 190]] : [[86, 168], [154, 168], [222, 168], [86, 206], [154, 206], [222, 206]]).map(([x, y], n) => (
            <g key={n}><rect x={x} y={y} width="62" height="40" rx="4" fill="#15161E" /><rect x={x + 4} y={y + 4} width="54" height="32" fill={m.desk === "trading" ? (n % 2 ? "#07120E" : "#0F1A2E") : "#2E4C7A"} />{m.desk === "trading" && <path d={`M${x + 8} ${y + 28} L${x + 22} ${y + 18} L${x + 36} ${y + 24} L${x + 54} ${y + 10}`} stroke="#35E08A" strokeWidth="2" fill="none" />}</g>
          ))}
          <rect x="130" y="244" width="90" height="8" rx="3" fill="#3E4356" />
        </g>
      )}

      {m.clutter === "mugs" && <g>{[[112, 226], [136, 228], [160, 224]].map(([x, y], n) => <g key={n}><rect x={x} y={y} width="16" height="14" rx="3" fill={["#F4F6FA", "#E5484D", "#25D0C0"][n]} /><path d={`M${x + 16} ${y + 3} q7 4 0 8`} stroke={["#F4F6FA", "#E5484D", "#25D0C0"][n]} strokeWidth="3" fill="none" /></g>)}</g>}
      {m.clutter === "snacks" && <g><rect x="180" y="222" width="26" height="18" rx="3" fill="#F0651F" /><rect x="210" y="226" width="20" height="14" rx="3" fill="#F5D34D" /><circle cx="168" cy="232" r="8" fill="#C7724A" /></g>}
      {m.clutter === "cans" && (
        <g>{[[128, 226], [146, 226], [164, 226], [137, 208], [155, 208], [146, 190]].map(([x, y], n) => (
          <g key={n}><rect x={x} y={y} width="15" height="18" rx="2" fill={n % 2 ? "#C8F53C" : "#25D0C0"} />
            <rect x={x} y={y + 6} width="15" height="5" fill="rgba(0,0,0,.3)" /></g>
        ))}</g>
      )}
      {m.clutter === "sock" && (
        <g><path d="M186 232 q-2 -14 8 -14 q10 0 8 14 q10 2 12 8 q-14 6 -30 2 z" fill="#F2F2F5" />
          <path d="M186 224 q8 -3 16 0" stroke="#E5484D" strokeWidth="3" fill="none" />
        </g>
      )}
      {m.clutter === "papers" && <g>{[...Array(7)].map((_, n) => <rect key={n} x={100 + n * 22} y={226 - (n % 3) * 3} width="30" height="14" rx="2" fill="#F4F6FA" opacity="0.9" transform={`rotate(${(n % 5) * 6 - 12} ${115 + n * 22} 232)`} />)}</g>}

      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "stool" && <g><rect x="352" y="284" width="56" height="10" rx="5" fill="#7A4A28" /><rect x="358" y="294" width="8" height="26" fill="#5A3A22" /><rect x="394" y="294" width="8" height="26" fill="#5A3A22" /></g>}</g>
      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "sofa" && <g><rect x="300" y="250" width="200" height="50" rx="14" fill="#4A5AA8" /><rect x="312" y="262" width="80" height="38" rx="10" fill="#5C6CC0" /><rect x="404" y="262" width="80" height="38" rx="10" fill="#5C6CC0" /><rect x="292" y="264" width="20" height="46" rx="10" fill="#3E4C90" /><rect x="488" y="264" width="20" height="46" rx="10" fill="#3E4C90" /></g>}</g>
      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "beans" && <g>{[[330, 300], [470, 296]].map(([x, y], n) => <g key={n}><ellipse cx={x} cy={y} rx={48 - n * 6} ry={30 - n * 4} fill={n ? "#9B7BFF" : "#F177B0"} /><ellipse cx={x} cy={y - 10} rx={34 - n * 5} ry={20 - n * 3} fill={n ? "#B49BFF" : "#F59AC6"} /></g>)}</g>}</g>
      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "gamer" && <g><rect x="366" y="200" width="60" height="86" rx="14" fill="#22242E" /><rect x="374" y="210" width="44" height="66" rx="10" fill="#E5484D" /><rect x="356" y="230" width="14" height="40" rx="6" fill="#22242E" /><rect x="422" y="230" width="14" height="40" rx="6" fill="#22242E" /><rect x="390" y="286" width="12" height="22" fill="#3E4356" /><ellipse cx="396" cy="312" rx="34" ry="8" fill="#3E4356" /></g>}</g>
      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "hammock" && <g><path d="M280 210 q120 110 240 0" stroke="#C7A275" strokeWidth="8" fill="none" /><path d="M280 210 q120 110 240 0 l0 -6 q-120 100 -240 6 z" fill="#4C9A5C" opacity="0.9" /><rect x="272" y="150" width="10" height="150" fill="#7A4A28" /><rect x="518" y="150" width="10" height="150" fill="#7A4A28" /></g>}</g>
      <g filter={tintFilter((m.tint || {}).seat)}>{m.seat === "throne" && <g><rect x="356" y="176" width="86" height="120" rx="10" fill="#6B2436" /><rect x="366" y="188" width="66" height="88" rx="8" fill="#8A2436" /><path d="M356 176 l14 -26 l14 26 l15 -32 l15 32 l14 -26 l14 26 z" fill="#F0C33C" /><rect x="342" y="230" width="16" height="60" rx="6" fill="#F0C33C" /><rect x="440" y="230" width="16" height="60" rx="6" fill="#F0C33C" /></g>}</g>

      {m.arcade === "cab" && <g><rect x="596" y="176" width="86" height="128" rx="8" fill="#E5484D" /><rect x="606" y="188" width="66" height="52" rx="4" fill="#15161E" /><rect x="610" y="192" width="58" height="44" fill="#2E4C7A" /><rect x="606" y="248" width="66" height="30" rx="4" fill="#22242E" /><circle cx="624" cy="262" r="7" fill="#F5D34D" /><circle cx="646" cy="262" r="6" fill="#25D0C0" /><circle cx="664" cy="262" r="6" fill="#F177B0" /></g>}
      {m.arcade === "fridge" && <g><rect x="620" y="216" width="66" height="88" rx="8" fill="#F4F6FA" /><rect x="620" y="252" width="66" height="5" fill="#C8CEDC" /><rect x="676" y="230" width="6" height="18" rx="3" fill="#8E96A8" /><rect x="632" y="264" width="16" height="12" rx="2" fill="#E5484D" /></g>}
      {m.arcade === "hoop" && <g><rect x="640" y="60" width="80" height="56" rx="4" fill="#F4F6FA" /><rect x="666" y="96" width="28" height="20" fill="none" stroke="#E5484D" strokeWidth="3" /><path d="M660 116 l40 0 l-6 22 l-28 0 z" fill="none" stroke="#E5484D" strokeWidth="3" /><circle cx="700" cy="290" r="16" fill="#F0651F" /></g>}
      {m.arcade === "vending" && (
        <g><rect x="596" y="150" width="96" height="152" rx="8" fill="#1E5A8C" />
          <rect x="606" y="160" width="60" height="100" fill="#0E2C46" />
          {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={612 + c * 18} y={166 + r * 24} width="13" height="18" rx="2"
              fill={["#E5484D", "#F5D34D", "#4CE0B0", "#FF6EC7"][(r + c) % 4]} />
          )))}
          <rect x="672" y="160" width="14" height="60" rx="3" fill="#3E7CB0" />
          <rect x="606" y="268" width="60" height="24" rx="3" fill="#0A1E30" />
        </g>
      )}
      {m.arcade === "tread" && (
        <g><rect x="600" y="262" width="110" height="18" rx="6" fill="#2A2E3C" />
          <rect x="604" y="266" width="102" height="10" fill="#15161E" />
          <rect x="694" y="186" width="10" height="80" fill="#3E4356" />
          <rect x="636" y="180" width="68" height="10" rx="4" fill="#3E4356" />
          <path d="M648 186 q-10 30 4 44 q14 -16 8 -44 z" fill="#E5484D" />
          <path d="M674 186 q12 26 0 42 q-16 -12 -10 -42 z" fill="#3B6FE0" />
          <rect x="612" y="276" width="86" height="8" rx="4" fill="#22242E" />
        </g>
      )}
      {m.arcade === "drum" && <g><ellipse cx="640" cy="290" rx="42" ry="18" fill="#E5484D" /><rect x="598" y="262" width="84" height="28" fill="#E5484D" /><ellipse cx="640" cy="262" rx="42" ry="16" fill="#F2EDE4" /><circle cx="592" cy="240" r="20" fill="#F2EDE4" opacity="0.9" /><circle cx="690" cy="246" r="16" fill="#F5D34D" opacity="0.9" /></g>}

      {m.plant === "small" && <g><path d="M712 300 l6 -34 l32 0 l6 34 z" fill="#C7724A" /><g fill="#4C9A5C"><ellipse cx="734" cy="250" rx="12" ry="20" /><ellipse cx="716" cy="256" rx="10" ry="16" transform="rotate(-28 716 256)" /><ellipse cx="752" cy="256" rx="10" ry="16" transform="rotate(28 752 256)" /></g></g>}
      {m.plant === "monstera" && <g><path d="M706 300 l8 -44 l44 0 l8 44 z" fill="#8E6B3A" /><g fill="#2A9A6A">{[[736, 200], [706, 224], [766, 220], [722, 186], [756, 190]].map(([x, y], n) => <ellipse key={n} cx={x} cy={y} rx="24" ry="18" transform={`rotate(${(n - 2) * 22} ${x} ${y})`} />)}</g><rect x="732" y="196" width="6" height="64" fill="#2A7A56" /></g>}
      {m.plant === "cactus" && <g><path d="M716 300 l6 -30 l34 0 l6 30 z" fill="#C7724A" /><g fill="#4C9A5C"><rect x="726" y="196" width="24" height="76" rx="12" /><rect x="704" y="216" width="16" height="32" rx="8" /><rect x="756" y="210" width="16" height="38" rx="8" /></g><circle cx="738" cy="196" r="7" fill="#F177B0" /></g>}
      {m.plant === "tree" && <g><path d="M700 300 l8 -40 l56 0 l8 40 z" fill="#8E6B3A" /><rect x="730" y="150" width="8" height="112" fill="#7A5C34" /><g fill="#3E8C5A">{[[706, 176], [762, 172], [734, 140], [712, 214], [758, 210]].map(([x, y], n) => <ellipse key={n} cx={x} cy={y} rx="26" ry="18" />)}</g></g>}

      {m.plant === "dead" && (
        <g><path d="M714 300 l6 -32 l32 0 l6 32 z" fill="#8E6B3A" />
          <path d="M734 268 q-2 -26 -14 -34" stroke="#7A5C34" strokeWidth="5" fill="none" />
          <path d="M734 268 q4 -22 16 -28" stroke="#7A5C34" strokeWidth="5" fill="none" />
          <path d="M718 236 q-10 6 -12 16 q10 -2 14 -10 z" fill="#8A7A3A" />
          <path d="M752 242 q10 4 11 14 q-10 -2 -13 -9 z" fill="#8A7A3A" />
          <circle cx="726" cy="296" r="3" fill="#6B5A2A" /><circle cx="744" cy="298" r="2.4" fill="#6B5A2A" />
        </g>
      )}
      {m.pet === "pigeon" && (
        <g><ellipse cx="556" cy="322" rx="26" ry="17" fill="#8E9AB0" />
          <circle cx="534" cy="304" r="13" fill="#8E9AB0" />
          <circle cx="529" cy="302" r="3" fill="#E5484D" />
          <path d="M522 304 l-11 3 l11 5 z" fill="#F0A93A" />
          <path d="M556 312 q16 -6 26 4 q-14 6 -26 2 z" fill="#7A8698" />
          <path d="M540 338 l0 8 M560 338 l0 8" stroke="#F0A93A" strokeWidth="3" />
          <ellipse cx="556" cy="286" rx="18" ry="5" fill="#25D0C0" opacity="0.25" />
        </g>
      )}
      {m.pet === "rock" && (
        <g><ellipse cx="556" cy="330" rx="22" ry="15" fill="#8E96A8" />
          <ellipse cx="550" cy="324" rx="9" ry="6" fill="#A8B0C0" />
          <circle cx="548" cy="328" r="2.6" fill="#22242E" /><circle cx="562" cy="328" r="2.6" fill="#22242E" />
          <path d="M550 336 q6 5 12 0" stroke="#22242E" strokeWidth="2" fill="none" />
          <rect x="534" y="344" width="44" height="6" rx="3" fill="#5A3A22" />
        </g>
      )}
      {m.pet === "duck" && <g><ellipse cx="560" cy="322" rx="18" ry="14" fill="#F5D34D" /><circle cx="548" cy="308" r="11" fill="#F5D34D" /><path d="M538 308 l-10 3 l10 5 z" fill="#F0A93A" /><circle cx="545" cy="305" r="2" fill="#22242E" /></g>}
      {m.pet === "fish" && <g><circle cx="560" cy="310" r="30" fill="#59D8F5" opacity="0.35" /><path d="M534 316 q26 18 52 0 l0 -6 q-26 16 -52 0 z" fill="#2E9BD6" opacity="0.6" /><ellipse cx="556" cy="312" rx="10" ry="6" fill="#F0A93A" /><path d="M546 312 l-8 -5 l0 10 z" fill="#F0A93A" /><rect x="536" y="332" width="48" height="8" rx="4" fill="#2A2140" /></g>}
      {m.pet === "cat" && <g><ellipse cx="556" cy="322" rx="30" ry="16" fill="#8E96A8" /><circle cx="530" cy="308" r="15" fill="#8E96A8" /><path d="M520 298 l-2 -12 l11 6 z" fill="#8E96A8" /><path d="M540 298 l3 -12 l-11 6 z" fill="#8E96A8" /><circle cx="525" cy="308" r="2.5" fill="#22242E" /><circle cx="535" cy="308" r="2.5" fill="#22242E" /><path d="M584 320 q18 -6 12 -26" stroke="#8E96A8" strokeWidth="7" fill="none" strokeLinecap="round" /></g>}
      {m.pet === "dog" && <g><ellipse cx="556" cy="320" rx="32" ry="18" fill="#C7A275" /><circle cx="526" cy="304" r="17" fill="#C7A275" /><ellipse cx="512" cy="300" rx="7" ry="12" fill="#A8814F" /><circle cx="520" cy="304" r="2.6" fill="#22242E" /><circle cx="532" cy="304" r="2.6" fill="#22242E" /><ellipse cx="524" cy="312" rx="5" ry="4" fill="#22242E" /><path d="M586 314 q16 -10 6 -24" stroke="#C7A275" strokeWidth="8" fill="none" strokeLinecap="round" /></g>}
      {m.pet === "bot" && <g><rect x="540" y="296" width="36" height="30" rx="8" fill="#8E96A8" /><rect x="546" y="304" width="24" height="14" rx="4" fill="#25D0C0" /><rect x="556" y="284" width="4" height="12" fill="#8E96A8" /><circle cx="558" cy="282" r="5" fill="#E5484D" /><rect x="534" y="326" width="48" height="7" rx="3" fill="#5C6478" /></g>}
      {m.fx === "dust" && (
        <g opacity="0.5">
          {[...Array(18)].map((_, n) => (
            <circle key={n} cx={30 + ((n * 89) % 740)} cy={40 + ((n * 53) % 240)} r={n % 3 === 0 ? 3 : 2} fill="#F5F5F7">
              <animate attributeName="cy" values={`${40 + ((n * 53) % 240)};${18 + ((n * 53) % 240)};${40 + ((n * 53) % 240)}`} dur={`${6 + (n % 5)}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.7;0.15" dur={`${4 + (n % 4)}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
      {m.fx === "bubbles" && (
        <g>
          {[...Array(14)].map((_, n) => (
            <circle key={n} cx={40 + ((n * 113) % 720)} cy="360" r={5 + (n % 4) * 3} fill="none" stroke="#9FD8F0" strokeWidth="2" opacity="0.7">
              <animate attributeName="cy" values="360;-20" dur={`${7 + (n % 5)}s`} begin={`${n * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
      {m.fx === "embers" && (
        <g>
          {[...Array(20)].map((_, n) => (
            <circle key={n} cx={20 + ((n * 97) % 760)} cy="370" r={2 + (n % 3)} fill={["#F0651F", "#F5A623", "#F5D34D"][n % 3]}>
              <animate attributeName="cy" values="370;30" dur={`${5 + (n % 6)}s`} begin={`${n * 0.35}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.95;0" dur={`${5 + (n % 6)}s`} begin={`${n * 0.35}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
      {m.fx === "snow" && (
        <g opacity="0.9">
          {[...Array(24)].map((_, n) => (
            <circle key={n} cx={15 + ((n * 71) % 770)} cy="-10" r={2 + (n % 3)} fill="#F4F8FF">
              <animate attributeName="cy" values="-10;376" dur={`${6 + (n % 7)}s`} begin={`${n * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
      {m.fx === "aurora" && (
        <g opacity="0.5">
          {["#4CE0F5", "#9B7BFF", "#3DDC91"].map((c, n) => (
            <path key={c} d={`M0 ${34 + n * 16} q200 ${30 + n * 10} 400 0 q200 -${30 + n * 10} 400 0 l0 ${26 + n * 6} q-200 ${26 + n * 8} -400 0 q-200 -${26 + n * 8} -400 0 z`} fill={c}>
              <animate attributeName="opacity" values="0.2;0.75;0.2" dur={`${5 + n * 2}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>
      )}
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/*  Cutscenes                                                          */
/* ------------------------------------------------------------------ */

function Cutscene({ kind, avatar, score, coins, question, misses, deckTitle, onDrill, onAgain, onHome }) {
  const [beat, setBeat] = useState(0);
  const [tally, setTally] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBeat(1), 700);
    const t2 = setTimeout(() => setBeat(2), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (beat < 2) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(score / 28));
    const id = setInterval(() => {
      n = Math.min(score, n + step);
      setTally(n);
      if (n >= score) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [beat, score]);

  const dead = kind === "dead";

  return (
    <div className="fadein">
      <div className="stage rounded-2xl p-6 mb-5" style={{ position: "relative", overflow: "hidden", minHeight: 300 }}>
        {!dead && (
          <div>
            {[...Array(14)].map((_, n) => (
              <span
                key={n}
                className="pop"
                style={{
                  position: "absolute", left: `${(n * 37) % 92 + 4}%`, top: `${(n * 23) % 60 + 6}%`,
                  width: 12, height: 12, borderRadius: n % 2 ? 3 : 99,
                  background: ["var(--a1)", "var(--a2)", "var(--a3)", "var(--a4)"][n % 4],
                  animationDelay: `${n * 0.06}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-end justify-center gap-4" style={{ minHeight: 220 }}>
          {dead && beat >= 1 && (
            <div className="dim" style={{ fontSize: 40, transform: "rotate(-16deg)", opacity: 0.6 }}>📕</div>
          )}
          <div
            style={{
              width: 150,
              transform: dead
                ? beat >= 1 ? "rotate(-78deg) translateY(28px)" : "rotate(-8deg)"
                : beat >= 1 ? "translateY(-10px)" : "none",
              transition: "transform .7s cubic-bezier(.3,.9,.4,1)",
            }}
          >
            <Avatar a={avatar} fluid />
          </div>
          {dead && beat >= 1 && (
            <div className="dim" style={{ fontSize: 34, transform: "rotate(24deg)", opacity: 0.6 }}>📗</div>
          )}
        </div>

        {beat >= 1 && (
          <div className="pop" style={{ textAlign: "center", marginTop: 8 }}>
            <div className="disp" style={{ fontSize: "clamp(38px,9vw,74px)", color: dead ? "var(--bad)" : "var(--good)" }}>
              {dead ? "RUN OVER" : "CLEARED"}
            </div>
          </div>
        )}
      </div>

      {beat >= 2 && (
        <div className="fadein">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="panel rounded-2xl p-4">
              <div className="dim text-sm">Score</div>
              <div className="disp" style={{ fontSize: 30 }}>{tally.toLocaleString()}</div>
            </div>
            <div className="panel rounded-2xl p-4">
              <div className="dim text-sm">Earned</div>
              <div className="disp coin" style={{ fontSize: 30 }}>+{coins}</div>
            </div>
          </div>

          {question && (
            <div className="panel rounded-2xl p-4 mb-4">
              <div className="dim text-sm mb-1">{dead ? "This is the one that got you" : "Last card standing"}</div>
              <div className="font-semibold mb-1">{question.t}</div>
              <div className="dim text-sm mb-1">{question.d}</div>
              {question.chose && question.chose !== question.t && (
                <div className="text-sm" style={{ color: "var(--bad)" }}>You said: {question.chose}</div>
              )}
              <WhyPanel card={question} chose={question.chose} deckTitle={deckTitle} />
            </div>
          )}
          {misses && misses.length > 1 && <MissList misses={misses} deckTitle={deckTitle} />}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {onDrill && <button onClick={onDrill} className="btn-go rounded-xl py-3">Drill the misses</button>}
            <button onClick={onAgain} className="btn rounded-xl py-3">Run it back</button>
            <button onClick={onHome} className="btn rounded-xl py-3">Back to room</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Survival                                                     */
/* ------------------------------------------------------------------ */

const POWERS = [
  { id: "fifty", name: "50/50", note: "Drops two wrong answers" },
  { id: "freeze", name: "Freeze", note: "Stops the clock for one question" },
  { id: "double", name: "Double", note: "2× points for three questions" },
];

function Survival({ cards, pool, best, sfx, coins, avatar, spare, onSpend, onDone, onQuit }) {
  const rounds = useMemo(() => cards.map((c) => ({ card: c, options: optionsFor(c, pool) })), [cards, pool]);
  const [i, setI] = useState(0);
  const [lives, setLives] = useState(3 + (spare ? 1 : 0));
  const [score, setScore] = useState(0);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState(null);
  const [left, setLeft] = useState(12);
  const [missed, setMissed] = useState([]);
  const [held, setHeld] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [frozen, setFrozen] = useState(false);
  const [dbl, setDbl] = useState(0);
  const [revive, setRevive] = useState(null);
  const [usedRevive, setUsedRevive] = useState(false);
  const cur = rounds[i];
  const limit = Math.max(4.5, 12 - i * 0.35);
  const mult = (1 + Math.floor(run / 5)) * (dbl > 0 ? 2 : 1);

  useEffect(() => {
    if (picked !== null || !cur || revive) return;
    setLeft(limit);
    if (frozen) return;
    const started = Date.now();
    const id = setInterval(() => {
      const rem = limit - (Date.now() - started) / 1000;
      if (rem <= 0) { clearInterval(id); setLeft(0); setPicked("__timeout__"); }
      else setLeft(rem);
    }, 100);
    return () => clearInterval(id);
  }, [i, picked, limit, cur, frozen, revive]);

  const grant = () => {
    const p = POWERS[Math.floor(Math.random() * POWERS.length)];
    setHeld((h) => (h.length >= 3 ? h : [...h, p.id]));
  };

  const firePower = (id) => {
    if (picked !== null) return;
    setHeld((h) => { const n = [...h]; n.splice(n.indexOf(id), 1); return n; });
    if (id === "fifty") {
      const wrong = cur.options.filter((o) => o !== cur.card.t);
      setHidden(shuffle(wrong).slice(0, 2));
    } else if (id === "freeze") setFrozen(true);
    else if (id === "double") setDbl(3);
    playSfx(sfx, "coin");
  };

  const answer = useCallback((opt) => {
    if (picked !== null || !cur || revive) return;
    const hit = opt === cur.card.t;
    if (hit) {
      setScore((s) => s + (250 + Math.round(250 * (left / limit))) * mult);
      setRun((r) => { const n = r + 1; if (n % 4 === 0) grant(); return n; });
      playSfx(sfx, "right");
    } else {
      setRun(0);
      playSfx(sfx, "wrong");
    }
    setPicked(opt);
  }, [cur, left, limit, mult, picked, revive, sfx]);

  useEffect(() => {
    if (picked === null) return;
    const hit = picked === cur.card.t;
    const timeout = picked === "__timeout__";
    const nextMissed = hit || missed.some((c) => c.t === cur.card.t) ? missed : [...missed, { ...cur.card, chose: timeout ? null : picked }];
    const livesAfter = hit ? lives : lives - 1;

    const id = setTimeout(() => {
      setHidden([]); setFrozen(false);
      if (hit) setDbl((d) => Math.max(0, d - 1));
      if (!hit) { setLives(livesAfter); setMissed(nextMissed); }
      if (!hit && livesAfter <= 0 && !usedRevive) {
        setRevive({ card: cur.card, missed: nextMissed });
        return;
      }
      if ((!hit && livesAfter <= 0) || i + 1 >= rounds.length) {
        playSfx(sfx, livesAfter <= 0 ? "fail" : "level");
        onDone({
          score, correct: i + 1 - nextMissed.length, total: i + 1, missed: nextMissed,
          seen: rounds.slice(0, i + 1).map((r) => r.card), killer: cur.card,
          cutscene: livesAfter <= 0 ? "dead" : "clear",
        });
      } else { setPicked(null); setI(i + 1); }
    }, 900);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  const takeRevive = (paid) => {
    if (paid && !(onSpend && onSpend(250))) return;
    setUsedRevive(true);
    setLives(1);
    setRevive(null);
    setPicked(null);
    setI((n) => Math.min(n + 1, rounds.length - 1));
    playSfx(sfx, "level");
  };

  const giveUp = () => {
    const r = revive;
    setRevive(null);
    playSfx(sfx, "fail");
    onDone({
      score, correct: i + 1 - r.missed.length, total: i + 1, missed: r.missed,
      seen: rounds.slice(0, i + 1).map((x) => x.card), killer: r.card, cutscene: "dead",
    });
  };

  useEffect(() => {
    const h = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= 4 && cur) answer(cur.options[n - 1]); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [answer, cur]);

  if (!cur) return null;

  if (revive) {
    const canPay = coins >= 250;
    return (
      <div className="fadein">
        <div className="stage rounded-2xl p-6 text-center mb-4">
          <div className="disp mb-2" style={{ fontSize: "clamp(30px,7vw,54px)", color: "var(--a2)" }}>Down to nothing</div>
          <div className="dim mb-5">One way back in. Take it or bank what you've got.</div>
          <div style={{ width: 120, margin: "0 auto" }}><Avatar a={avatar} fluid /></div>
        </div>
        <div className="panel rounded-2xl p-4 mb-4">
          <div className="dim text-sm mb-1">You went down on</div>
          <div className="font-semibold">{revive.card.t}</div>
          <div className="dim text-sm">{revive.card.d}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => takeRevive(true)} disabled={!canPay} className="btn-go rounded-xl py-3" style={!canPay ? { opacity: 0.45 } : undefined}>
            Second chance · 250 coins
          </button>
          <button onClick={giveUp} className="btn rounded-xl py-3">Bank it and stop</button>
        </div>
        {!canPay && <div className="dim text-xs mt-3">You need 250 coins for the revive.</div>}
      </div>
    );
  }

  const tones = ["t1", "t2", "t3", "t4"];
  const frac = frozen ? 1 : left / limit;

  return (
    <div>
      <TopBar
        left={
          <span>
            {[0, 1, 2, 3].slice(0, spare ? 4 : 3).map((n) => <span key={n} className={"heart" + (n < lives ? "" : " out")} style={{ marginRight: 4 }}>♥</span>)}
            <span className="ml-2">{mult}×{dbl > 0 ? ` · double ${dbl}` : ""}</span>
          </span>
        }
        right={
          <span>
            <span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>
            {best > 0 && <span className="dim text-sm"> · best {best.toLocaleString()}</span>}
          </span>
        }
        onQuit={onQuit}
      />
      <div className={"bar rounded-full mb-3" + (frac < 0.3 ? " low" : "")} style={{ height: 6 }}>
        <i style={{ width: `${frac * 100}%`, background: frozen ? "var(--a4)" : undefined }} />
      </div>

      {held.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {held.map((id, n) => {
            const p = POWERS.find((x) => x.id === id);
            return (
              <button key={id + n} onClick={() => firePower(id)} className="chip rounded-full px-3 py-1 text-sm">
                {p.name}
              </button>
            );
          })}
        </div>
      )}

      <div className="panel rounded-2xl p-6 mb-4">
        <div className="dim text-sm mb-2">Question {i + 1} · {frozen ? "clock frozen" : `${limit.toFixed(1)}s`}</div>
        <div className="disp" style={{ fontSize: "clamp(20px,3.4vw,32px)" }}>{cur.card.d}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, n) => {
          const done = picked !== null;
          const gone = hidden.includes(opt);
          let cls = "tile " + tones[n];
          if (gone) cls += " faded";
          else if (done && opt === cur.card.t) cls += " right";
          else if (done && opt === picked) cls += " wrong";
          else if (done) cls += " faded";
          return (
            <button key={opt + n} onClick={() => answer(opt)} className={cls + " rounded-xl p-4 w-full"} disabled={done || gone}>
              <span className="text-xs opacity-60">{n + 1}</span>
              <span className="block font-medium" style={{ fontSize: 17, lineHeight: 1.3 }}>{gone ? "—" : opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Leap — your character picks the answer                       */
/* ------------------------------------------------------------------ */

function Leap({ cards, pool, avatar, deckTitle, sfx, onDone, onQuit }) {
  const rounds = useMemo(() => cards.map((c) => ({ card: c, options: optionsFor(c, pool) })), [cards, pool]);
  const [i, setI] = useState(0);
  const [lane, setLane] = useState(1.5);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState([]);
  const [picks, setPicks] = useState({});
  const [why, setWhy] = useState(false);
  const [hold, setHold] = useState(false);
  const [gone, setGone] = useState([]);
  const cur = rounds[i];

  const jump = (n, opt) => {
    if (picked !== null) return;
    setLane(n);
    const hit = opt === cur.card.t;
    setTimeout(() => {
      setPicked(opt);
      if (hit) { setScore((v) => v + 400); setCorrect((c) => c + 1); playSfx(sfx, "right"); }
      else {
        setMissed((m) => [...m, cur.card]);
        setPicks((p) => ({ ...p, [cur.card.t]: opt }));
        setHold(true);
        playSfx(sfx, "wrong");
      }
    }, 260);
  };

  const advance = () => {
    setHold(false); setWhy(false); setPicked(null); setLane(1.5);
    if (i + 1 >= rounds.length) onDone({ score, correct, total: rounds.length, missed, picks });
    else setI(i + 1);
  };

  useEffect(() => {
    if (picked === null || hold) return;
    const id = setTimeout(advance, 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, hold]);

  if (!cur) return null;
  const state = picked === null ? "idle" : picked === cur.card.t ? "yes" : "no";

  return (
    <div>
      <TopBar left={`Stone ${i + 1} of ${rounds.length}`} right={<span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>} onQuit={onQuit} />
      <div className="panel rounded-2xl p-5 mb-4">
        <div className="dim text-sm mb-2">Hop to the right term</div>
        <div className="disp" style={{ fontSize: "clamp(18px,3vw,26px)" }}>{cur.card.d}</div>
      </div>

      <div className="stage rounded-2xl p-4 mb-3" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ height: 96, position: "relative" }}>
          <div
            style={{
              position: "absolute", bottom: 0, width: "22%",
              left: `calc(${(lane / 4) * 100}% + ${lane === 1.5 ? 8 : 1.5}%)`,
              transform: "translateX(-50%)",
              transition: "left .26s cubic-bezier(.35,1.5,.5,1)",
            }}
          >
            <Buddy a={avatar} state={state} size={80} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {cur.options.map((opt, n) => {
            const done = picked !== null;
            const right = opt === cur.card.t;
            return (
              <button
                key={opt + n}
                onClick={() => jump(n, opt)}
                disabled={done}
                className={"rounded-xl p-2 " + (done && right ? "mdone" : done && opt === picked ? "mtile mbad" : "mtile")}
                style={{ minHeight: 62, fontSize: 12, lineHeight: 1.25 }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {hold && (
        <div className="fadein">
          <div className="panel rounded-2xl p-4 mb-3">
            <div className="dim text-sm">You landed wrong</div>
            <div className="font-semibold">The answer is {cur.card.t}</div>
          </div>
          <div className="mb-3">
            <WhyPanel card={cur.card} picked={picked} deckTitle={deckTitle} open={why} onOpen={() => setWhy(true)} />
          </div>
          <button onClick={advance} className="btn-go rounded-xl py-3 w-full">
            {i + 1 >= rounds.length ? "See results" : "Next stone"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Boss Exam                                                    */
/* ------------------------------------------------------------------ */

const BOSSES = [
  { id: "midterm", name: "The Midterm", hp: 10, face: "😐" },
  { id: "final", name: "The Final", hp: 14, face: "😤" },
  { id: "cume", name: "The Cumulative", hp: 18, face: "💀" },
];

function Boss({ cards, pool, sfx, deckTitle, shield, onDone, onQuit }) {
  const boss = useMemo(() => BOSSES[Math.min(2, Math.floor(cards.length / 10))], [cards.length]);
  const rounds = useMemo(() => cards.map((c) => ({ card: c, options: optionsFor(c, pool) })), [cards, pool]);
  const [i, setI] = useState(0);
  const [hp, setHp] = useState(boss.hp);
  const [mine, setMine] = useState(5 + (shield ? 2 : 0));
  const [picked, setPicked] = useState(null);
  const [missed, setMissed] = useState([]);
  const [hits, setHits] = useState(0);
  const [shake, setShake] = useState(false);
  const cur = rounds[i];

  const answer = (opt) => {
    if (picked !== null) return;
    const hit = opt === cur.card.t;
    setPicked(opt);
    if (hit) { setHp((h) => Math.max(0, h - 1)); setHits((n) => n + 1); playSfx(sfx, "right"); }
    else { setMine((m) => m - 1); setMissed((x) => [...x, { ...cur.card, chose: opt }]); setShake(true); playSfx(sfx, "wrong"); }
  };

  useEffect(() => {
    if (picked === null) return;
    const hit = picked === cur.card.t;
    const bossHp = hit ? hp - 1 : hp;
    const myHp = hit ? mine : mine - 1;
    const id = setTimeout(() => {
      setShake(false);
      if (bossHp <= 0 || myHp <= 0 || i + 1 >= rounds.length) {
        playSfx(sfx, bossHp <= 0 ? "level" : "fail");
        onDone({
          score: Math.max(0, (boss.hp - bossHp) * 300 + myHp * 200),
          correct: hits + (hit ? 1 : 0), total: i + 1,
          missed: hit ? missed : [...missed, cur.card],
          seen: rounds.slice(0, i + 1).map((r) => r.card),
          won: bossHp <= 0, cutscene: bossHp <= 0 ? "clear" : "dead", killer: cur.card,
          extra: bossHp <= 0 ? `${boss.name} down` : `${boss.name} still standing`,
        });
      } else { setPicked(null); setI(i + 1); }
    }, 850);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  if (!cur) return null;
  const tones = ["t1", "t2", "t3", "t4"];

  return (
    <div>
      <TopBar left={`${boss.name}`} right={<span className="dim text-sm">{i + 1} of {rounds.length}</span>} onQuit={onQuit} />
      <div className={"panel rounded-2xl p-4 mb-4 " + (shake ? "shake" : "")}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{boss.name}</span>
          <span style={{ fontSize: 26 }}>{boss.face}</span>
        </div>
        <div className="hp mb-3"><i style={{ width: `${(hp / boss.hp) * 100}%` }} /></div>
        <div className="flex items-center justify-between mb-2">
          <span className="dim text-sm">You</span>
          <span className="dim text-sm">{mine} left</span>
        </div>
        <div className="hp hpme"><i style={{ width: `${(mine / (shield ? 7 : 5)) * 100}%` }} /></div>
      </div>

      <div className="panel rounded-2xl p-6 mb-4">
        <div className="dim text-sm mb-2">It asks you</div>
        <div className="disp" style={{ fontSize: "clamp(20px,3.4vw,30px)" }}>{cur.card.d}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, n) => {
          const done = picked !== null;
          let cls = "tile " + tones[n];
          if (done && opt === cur.card.t) cls += " right";
          else if (done && opt === picked) cls += " wrong";
          else if (done) cls += " faded";
          return (
            <button key={opt + n} onClick={() => answer(opt)} className={cls + " rounded-xl p-4 w-full"} disabled={done}>
              <span className="block font-medium" style={{ fontSize: 17, lineHeight: 1.3 }}>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Recall Rush                                                  */
/* ------------------------------------------------------------------ */

function Rush({ cards, pool, sfx, deckTitle, onDone, onQuit }) {
  const rounds = useMemo(() => shuffle(cards).map((c) => ({ card: c, options: optionsFor(c, pool) })), [cards, pool]);
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [run, setRun] = useState(0);
  const [missed, setMissed] = useState([]);
  const [hits, setHits] = useState(0);
  const [flash, setFlash] = useState(null);
  const cur = rounds[i % rounds.length];
  const doneRef = useRef(false);

  useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => {
      const rem = 60 - (Date.now() - started) / 1000;
      setLeft(Math.max(0, rem));
      if (rem <= 0 && !doneRef.current) {
        doneRef.current = true;
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (left > 0 || doneRef.current === false) return;
    const seen = rounds.slice(0, Math.min(i, rounds.length)).map((r) => r.card);
    onDone({ score, correct: hits, total: Math.max(1, i), missed, seen, extra: `${hits} in sixty seconds` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const answer = (opt) => {
    const hit = opt === cur.card.t;
    if (hit) {
      setScore((s) => s + 100 + run * 20);
      setRun((r) => r + 1);
      setHits((h) => h + 1);
      playSfx(sfx, "right");
    } else {
      setRun(0);
      setMissed((m) => (m.some((c) => c.t === cur.card.t) ? m : [...m, { ...cur.card, chose: opt }]));
      playSfx(sfx, "wrong");
    }
    setFlash(hit ? "right" : "wrong");
    setTimeout(() => setFlash(null), 140);
    setI((n) => n + 1);
  };

  if (!cur) return null;

  return (
    <div>
      <TopBar
        left={<span>{left.toFixed(1)}s left</span>}
        right={<span><span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>{run > 1 && <span className="dim text-sm"> · {run} run</span>}</span>}
        onQuit={onQuit}
      />
      <div className={"bar rounded-full mb-5" + (left < 15 ? " low" : "")} style={{ height: 6 }}>
        <i style={{ width: `${(left / 60) * 100}%` }} />
      </div>
      <div className={"panel rounded-2xl p-6 mb-4 " + (flash === "wrong" ? "shake" : "")}
        style={flash ? { boxShadow: `inset 0 0 0 3px var(--${flash === "right" ? "good" : "bad"})` } : undefined}>
        <div className="dim text-sm mb-2">Fast as you can</div>
        <div className="disp" style={{ fontSize: "clamp(19px,3.2vw,28px)" }}>{cur.card.d}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, n) => (
          <button key={opt + n} onClick={() => answer(opt)} className={"tile " + ["t1", "t2", "t3", "t4"][n] + " rounded-xl p-4 w-full"}>
            <span className="block font-medium" style={{ fontSize: 16, lineHeight: 1.3 }}>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Speed Sort                                                   */
/* ------------------------------------------------------------------ */

function buildBuckets(cards) {
  if (cards.some((c) => c.g)) {
    const tagged = {};
    cards.forEach((c) => { if (c.g) (tagged[c.g] = tagged[c.g] || []).push(c); });
    const usable = Object.entries(tagged).filter(([, v]) => v.length >= 2);
    if (usable.length >= 2) return shuffle(usable).slice(0, 3);
  }
  const groups = {};
  cards.forEach((c) => {
    const w = c.d.toLowerCase();
    let key = null;
    if (/merton/.test(w)) key = "Merton's types";
    else if (/subculture|settlement|marketplace|commonwealth/.test(w)) key = "Political subcultures";
    else if (/crt|critical race|tenet/.test(w)) key = "Critical race theory";
    else if (/racism|racial|prejudice|discriminat/.test(w)) key = "Racism and prejudice";
    else if (/segregation|housing|school|neighbou?rhood/.test(w)) key = "Segregation";
    else if (/assimilat|accultur|tolerance|adaptab/.test(w)) key = "Assimilation";
    else if (/incarcerat|prison|inmate/.test(w)) key = "Criminal justice";
    else if (/education|degree|earnings|affirmative/.test(w)) key = "Education policy";
    else if (/ethnic|identity|belonging/.test(w)) key = "Ethnicity";
    else key = "Culture and politics";
    (groups[key] = groups[key] || []).push(c);
  });
  const usable = Object.entries(groups).filter(([, v]) => v.length >= 2);
  return shuffle(usable).slice(0, 3);
}

function Sort({ cards, sfx, onDone, onQuit }) {
  const buckets = useMemo(() => buildBuckets(cards), [cards]);
  const queue = useMemo(() => shuffle(buckets.flatMap(([k, v]) => v.slice(0, 5).map((c) => ({ c, k })))), [buckets]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const [hits, setHits] = useState(0);
  const [flash, setFlash] = useState(null);
  const item = queue[i];

  const drop = (k) => {
    if (!item || flash) return;
    const right = k === item.k;
    if (right) { setScore((s) => s + 220); setHits((h) => h + 1); playSfx(sfx, "right"); }
    else { setMissed((m) => [...m, { ...item.c, chose: k }]); playSfx(sfx, "wrong"); }
    setFlash(right ? "right" : "wrong");
    setTimeout(() => {
      setFlash(null);
      if (i + 1 >= queue.length) {
        onDone({
          score, correct: hits + (right ? 1 : 0), total: queue.length,
          missed: right ? missed : [...missed, item.c],
          seen: queue.map((q) => q.c), extra: `${buckets.length} categories`,
        });
      } else setI(i + 1);
    }, 420);
  };

  if (!buckets.length || !item) {
    return (
      <div>
        <TopBar left="Speed Sort" right="" onQuit={onQuit} />
        <div className="panel rounded-2xl p-5">This deck doesn't split into clear categories yet. Try Quiz or Match instead.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar left={`${i + 1} of ${queue.length}`} right={<span className="disp" style={{ fontSize: 18 }}>{score.toLocaleString()}</span>} onQuit={onQuit} />
      <Progress value={i / queue.length} />
      <div className={"panel rounded-2xl p-6 mb-4 " + (flash === "wrong" ? "shake" : "")}
        style={flash ? { boxShadow: `inset 0 0 0 3px var(--${flash === "right" ? "good" : "bad"})` } : undefined}>
        <div className="dim text-sm mb-2">Which pile does this belong in?</div>
        <div className="disp" style={{ fontSize: "clamp(19px,3vw,27px)" }}>{item.c.t}</div>
        <div className="dim text-sm mt-2">{item.c.d}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {buckets.map(([k]) => (
          <button key={k} onClick={() => drop(k)} className="bucket rounded-2xl p-5 text-center font-medium" style={{ minHeight: 92 }}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: Ladder                                                       */
/* ------------------------------------------------------------------ */

const RUNGS = [200, 400, 800, 1400, 2200, 3200, 4600, 6400];

function Ladder({ cards, pool, sfx, deckTitle, onDone, onQuit }) {
  const rounds = useMemo(() => cards.map((c) => ({ card: c, options: optionsFor(c, pool) })), [cards, pool]);
  const [i, setI] = useState(0);
  const [rung, setRung] = useState(0);
  const [picked, setPicked] = useState(null);
  const [missed, setMissed] = useState([]);
  const cur = rounds[i];

  const bank = () => {
    playSfx(sfx, "coin");
    onDone({
      score: rung > 0 ? RUNGS[rung - 1] : 0, correct: rung, total: i,
      missed, seen: rounds.slice(0, i).map((r) => r.card), extra: `banked on rung ${rung}`,
    });
  };

  const answer = (opt) => {
    if (picked !== null) return;
    const hit = opt === cur.card.t;
    setPicked(opt);
    playSfx(sfx, hit ? "right" : "wrong");
    setTimeout(() => {
      if (!hit) {
        onDone({
          score: 0, correct: rung, total: i + 1, missed: [...missed, cur.card],
          seen: rounds.slice(0, i + 1).map((r) => r.card),
          cutscene: "dead", killer: cur.card, extra: `fell from rung ${rung + 1}`,
        });
        return;
      }
      const next = rung + 1;
      if (next >= RUNGS.length || i + 1 >= rounds.length) {
        onDone({
          score: RUNGS[Math.min(next, RUNGS.length) - 1], correct: next, total: i + 1, missed,
          seen: rounds.slice(0, i + 1).map((r) => r.card), cutscene: "clear", extra: "topped the ladder",
        });
        return;
      }
      setRung(next); setPicked(null); setI(i + 1);
    }, 800);
  };

  if (!cur) return null;

  return (
    <div>
      <TopBar
        left={`Rung ${rung + 1} of ${RUNGS.length}`}
        right={<span className="dim text-sm">holding {(rung > 0 ? RUNGS[rung - 1] : 0).toLocaleString()}</span>}
        onQuit={onQuit}
      />
      <div className="scroller flex gap-2 mb-4">
        {RUNGS.map((v, n) => (
          <div key={v} className={"tier panel rounded-xl p-2 text-center " + (n < rung ? "got" : n === rung ? "now" : "")}>
            <div className="dim text-xs">{n + 1}</div>
            <div className="font-semibold" style={{ fontSize: 13 }}>{v.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="panel rounded-2xl p-6 mb-4">
        <div className="dim text-sm mb-2">Get it right, climb. Get it wrong, lose the lot.</div>
        <div className="disp" style={{ fontSize: "clamp(19px,3.2vw,28px)" }}>{cur.card.d}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {cur.options.map((opt, n) => {
          const done = picked !== null;
          let cls = "tile " + ["t1", "t2", "t3", "t4"][n];
          if (done && opt === cur.card.t) cls += " right";
          else if (done && opt === picked) cls += " wrong";
          else if (done) cls += " faded";
          return (
            <button key={opt + n} onClick={() => answer(opt)} className={cls + " rounded-xl p-4 w-full"} disabled={done}>
              <span className="block font-medium" style={{ fontSize: 16, lineHeight: 1.3 }}>{opt}</span>
            </button>
          );
        })}
      </div>
      {rung > 0 && <button onClick={bank} className="btn rounded-xl py-3 w-full">Bank {RUNGS[rung - 1].toLocaleString()} and walk</button>}
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  Miss list                                                          */
/* ------------------------------------------------------------------ */

function MissList({ misses, deckTitle, source }) {
  if (!misses.length) return <div className="panel rounded-2xl p-5 mb-5">Clean sweep. Nothing missed.</div>;
  return (
    <div className="panel rounded-2xl p-5 mb-5">
      <div className="font-semibold mb-1">Worth another look ({misses.length})</div>
      <div className="dim text-sm mb-4">Tap any one to have the difference explained.</div>
      <div className="flex flex-col gap-4">
        {misses.map((c, n) => (
          <div key={c.t + n}>
            <div className="font-medium" style={{ fontSize: 15 }}>{c.t}</div>
            <div className="dim" style={{ fontSize: 14, lineHeight: 1.4 }}>{c.d}</div>
            {c.chose && c.chose !== c.t && (
              <div className="text-sm mt-1" style={{ color: "var(--bad)" }}>You said: {c.chose}</div>
            )}
            {source && c.s != null && (
              <a href={watchLink(source, c.s)} target="_blank" rel="noreferrer" className="linkish text-xs">
                Rewatch it · {stamp(c.s)}
              </a>
            )}
            <WhyPanel card={c} chose={c.chose} deckTitle={deckTitle} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mastery + achievements                                             */
/* ------------------------------------------------------------------ */

function Mastery({ prog, decks, onClaim, onQuit }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "clamp(30px,7vw,48px)" }}>Mastery</h1>
          <div className="dim text-sm">The only place tickets come from</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <div className="panel2 rounded-2xl p-4 mb-6">
        <p className="dim text-sm" style={{ lineHeight: 1.5 }}>
          A deck's mastery is how far its cards have climbed, not how often you've played it.
          Push a deck to a quarter, half, three quarters and all the way, and it pays tickets each time.
          Mastering a whole deck is worth six.
        </p>
      </div>

      {decks.map((d) => {
        const pct = masteryPct(prog, d);
        const ms = deckMilestones(prog, d);
        return (
          <div key={d.id} className="panel rounded-2xl p-4 mb-3">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="font-semibold" style={{ fontSize: 16 }}>{d.title}</span>
              <span className="disp" style={{ fontSize: 20 }}>{pct}%</span>
            </div>
            <div className="meter mb-3"><i style={{ width: `${pct}%` }} /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ms.map((m) => (
                <div key={m.pct} className={"panel2 rounded-xl p-2 text-center " + (m.claimed ? "locked" : m.reached ? "eq" : "")}>
                  <div className="dim text-xs">{m.pct}%</div>
                  <div className="ticket font-semibold" style={{ fontSize: 14 }}>{m.tickets}🎟</div>
                  {m.claimed ? <div className="dim text-xs mt-1">Claimed</div>
                    : m.reached ? <button onClick={() => onClaim(m.key, m.tickets, `${d.title}: ${m.name}`)} className="btn-go rounded-lg px-2 py-1 text-xs mt-1">Claim</button>
                      : <div className="dim text-xs mt-1">Locked</div>}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h2 className="mt-8 mb-3" style={{ fontSize: 22 }}>Achievements</h2>
      <div className="flex flex-col gap-3">
        {ACHIEVEMENTS.map((a) => {
          const { have, done, claimed } = achState(a, prog);
          return (
            <div key={a.id} className={"panel rounded-2xl p-4 " + (done && !claimed ? "eq" : claimed ? "locked" : "")}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold" style={{ fontSize: 15 }}>{a.name}</div>
                  <div className="dim text-sm">{a.desc}</div>
                </div>
                {claimed ? <span className="dim text-sm">Claimed</span>
                  : done ? <button onClick={() => onClaim(a.id, a.tickets, a.name)} className="btn-go rounded-lg px-3 py-1 text-sm">{a.tickets}🎟</button>
                    : <span className="dim text-sm" style={{ whiteSpace: "nowrap" }}>{have} / {a.goal}</span>}
              </div>
              <div className="meter"><i style={{ width: `${(have / a.goal) * 100}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Save layer — profiles, codes, autosave                             */
/*  Swap the four store* functions for a server call to go online.     */
/* ------------------------------------------------------------------ */

const PROFILES_KEY = "recall:profiles";
const LAST_KEY = "recall:last";
const saveKeyFor = (id) => "recall:save:" + id;

async function storeGet(key) {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch (e) { return null; }
}

async function storeSet(key, val) {
  try {
    await window.storage.set(key, JSON.stringify(val));
    return true;
  } catch (e) { return false; }
}

async function loadProfiles() {
  const list = await storeGet(PROFILES_KEY);
  return Array.isArray(list) ? list : [];
}

async function saveProfiles(list) { return storeSet(PROFILES_KEY, list); }

function encodeSave(obj) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
  catch (e) { return ""; }
}

function decodeSave(code) {
  try { return JSON.parse(decodeURIComponent(escape(atob(code.trim())))); }
  catch (e) { return null; }
}

/* ------------------------------------------------------------------ */
/*  Opening sequence                                                   */
/* ------------------------------------------------------------------ */

const INTRO_CSS = `
.iwrap{position:relative;min-height:70vh;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.ibg{position:absolute;inset:0;background:
  radial-gradient(60% 40% at 50% 38%, var(--glow) 0%, transparent 70%),
  radial-gradient(40% 30% at 18% 78%, var(--a4) 0%, transparent 72%),
  radial-gradient(40% 30% at 82% 22%, var(--a3) 0%, transparent 72%);
  opacity:.35;animation:breathe 6s ease-in-out infinite;}
@keyframes breathe{0%,100%{opacity:.28;transform:scale(1)}50%{opacity:.45;transform:scale(1.06)}}
.icard{position:absolute;border-radius:16px;padding:14px;display:flex;align-items:center;
  justify-content:center;text-align:center;line-height:1.35;
  background:linear-gradient(150deg,var(--panel2),var(--panel));
  border:1px solid var(--line);
  box-shadow:0 18px 40px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.07);
  backdrop-filter:blur(6px);}
.imark{position:relative;font-family:var(--disp),sans-serif;font-weight:800;letter-spacing:-.03em;
  display:inline-flex;align-items:flex-start;}
.iltr{display:inline-block;
  background:linear-gradient(100deg,var(--text) 20%,var(--a3) 42%,var(--a4) 58%,var(--text) 78%);
  background-size:320% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:rise .7s cubic-bezier(.2,.9,.3,1.1) both, sheen 2.4s ease-in-out 1s both;
  filter:drop-shadow(0 6px 24px rgba(107,227,255,.28));}
@keyframes rise{from{opacity:0;transform:translateY(38px) rotate(6deg) scale(.86);filter:blur(6px)}
  to{opacity:1;transform:none;filter:blur(0)}}
@keyframes sheen{from{background-position:130% 0}to{background-position:-50% 0}}
.ispark{display:inline-block;font-size:.3em;margin-left:.06em;margin-top:.12em;color:var(--a3);
  animation:pop .5s cubic-bezier(.2,1.5,.4,1) both, twinkle 2.4s ease-in-out 1s infinite;}
@keyframes twinkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.82)}}
.itag{color:var(--dim);margin-top:16px;font-size:12px;letter-spacing:.24em;text-transform:uppercase;
  font-weight:700;animation:titleIn .8s ease .25s both;}
.iline{height:2px;width:0;margin:18px auto 0;border-radius:2px;
  background:linear-gradient(90deg,transparent,var(--a3),var(--a4),transparent);
  box-shadow:0 0 18px var(--a3);animation:widen .9s cubic-bezier(.2,.9,.3,1) both;}
@keyframes widen{to{width:250px}}
.ibar{position:absolute;left:0;right:0;bottom:0;height:2px;background:rgba(255,255,255,.07);}
.ibar > i{display:block;height:100%;width:0;
  background:linear-gradient(90deg,var(--a3),var(--a4));
  animation:fill 7.6s linear both;}
@keyframes fill{to{width:100%}}
.ibrack{position:absolute;width:26px;height:26px;border:2px solid var(--a3);opacity:.5;
  animation:brack .6s ease .1s both;}
@keyframes brack{from{opacity:0;transform:scale(1.4)}to{opacity:.5;transform:none}}
.imote{position:absolute;border-radius:50%;background:var(--a3);
  animation:mote linear infinite;}
@keyframes mote{from{transform:translateY(20px);opacity:0}
  35%{opacity:.75}to{transform:translateY(-120px);opacity:0}}
@keyframes flyIn{from{opacity:0;transform:translate(var(--fx),var(--fy)) rotate(var(--fr)) scale(.6)}to{opacity:1;transform:none}}
@keyframes flipCard{0%,40%{transform:rotateY(0)}55%,100%{transform:rotateY(180deg)}}
@keyframes stackUp{from{opacity:0;transform:translateY(40px) scale(.9)}to{opacity:1;transform:none}}
@keyframes titleIn{from{opacity:0;letter-spacing:.3em;transform:scale(.85)}to{opacity:1;letter-spacing:-.02em;transform:none}}
@keyframes riser{from{transform:translateY(0);opacity:.9}to{transform:translateY(-90px);opacity:0}}
.introcard{position:absolute;border-radius:16px;padding:14px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:600;}
`;

function Intro({ terms, onDone }) {
  const [beat, setBeat] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;

  /* 0 cards arrive · 1 they flip · 2 they gather · 3 they scatter
     4 the name lands · 5 the line and tagline */
  useEffect(() => {
    const marks = [900, 2100, 3300, 4100, 4600, 5600];
    const ts = marks.map((ms, n) => setTimeout(() => setBeat(n + 1), ms));
    ts.push(setTimeout(() => done.current(), 7600));
    return () => ts.forEach(clearTimeout);
  }, []);

  const picks = useMemo(() => shuffle(terms && terms.length ? terms : SAMPLE_TERMS).slice(0, 5), [terms]);
  const lanes = [
    { x: -250, y: -22, r: -13 },
    { x: -126, y: 26, r: -6 },
    { x: 0, y: -40, r: 0 },
    { x: 126, y: 26, r: 6 },
    { x: 250, y: -22, r: 13 },
  ];
  const letters = "Recall".split("");

  const cardStyle = (n) => {
    const lane = lanes[n];
    if (beat >= 3) {
      return {
        transform: `translate(${lane.x * 2.6}px, ${lane.y - 150}px) rotate(${lane.r * 4}deg) scale(.7)`,
        opacity: 0,
        transition: "transform .75s cubic-bezier(.55,0,.8,.2), opacity .6s ease",
        transitionDelay: `${n * 0.04}s`,
      };
    }
    if (beat >= 2) {
      return {
        transform: `translate(${(n - 2) * 13}px, 0px) rotate(${(n - 2) * 3}deg) scale(1.04)`,
        opacity: 1,
        transition: "transform .8s cubic-bezier(.2,.9,.25,1)",
        zIndex: 5 - Math.abs(n - 2),
      };
    }
    return {
      transform: `translate(${lane.x}px, ${lane.y}px) rotate(${lane.r}deg)`,
      animation: `flyIn .9s cubic-bezier(.16,.9,.3,1.03) ${n * 0.16}s both`,
      "--fx": `${lane.x * 2}px`, "--fy": "150px", "--fr": `${lane.r * 5}deg`,
      transition: "transform .7s cubic-bezier(.2,.9,.3,1)",
    };
  };

  return (
    <div className="iwrap">
      <style>{INTRO_CSS}</style>
      <div className="ibg" />

      {[...Array(11)].map((_, n) => (
        <span key={n} className="imote" style={{
          left: `${5 + n * 9}%`, bottom: "20%",
          width: n % 3 === 0 ? 4 : 2.5, height: n % 3 === 0 ? 4 : 2.5,
          background: ["var(--a3)", "var(--a4)", "var(--a1)"][n % 3],
          animationDuration: `${5 + (n % 4)}s`, animationDelay: `${n * 0.4}s`,
        }} />
      ))}

      {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h]) => (
        <span key={v + h} className="ibrack" style={{
          [v]: 18, [h]: 18,
          borderTopWidth: v === "top" ? 2 : 0, borderBottomWidth: v === "bottom" ? 2 : 0,
          borderLeftWidth: h === "left" ? 2 : 0, borderRightWidth: h === "right" ? 2 : 0,
        }} />
      ))}

      {beat < 4 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {picks.map((c, n) => (
            <div key={c.t + n} className="icard" style={{
              width: 136, minHeight: 180, fontSize: 13, position: "absolute", ...cardStyle(n),
            }}>
              <span className={beat >= 1 ? "disp" : "dim"} style={{
                fontSize: beat >= 1 ? 17 : 12.5,
                transition: "font-size .3s ease",
              }}>
                {beat >= 1 ? c.t : c.d}
              </span>
            </div>
          ))}
        </div>
      )}

      {beat >= 4 && (
        <div style={{ position: "relative", textAlign: "center", zIndex: 5 }}>
          <div className="imark" style={{ fontSize: "clamp(62px,16vw,142px)", lineHeight: 1 }}>
            {letters.map((ch, n) => (
              <span key={n} className="iltr" style={{ animationDelay: `${n * 0.08}s` }}>{ch}</span>
            ))}
            <span className="ispark" style={{ animationDelay: `${letters.length * 0.08 + 0.2}s` }}>✦</span>
          </div>
          {beat >= 5 && (
            <>
              <div className="iline" />
              <div className="itag">Study · Play · Make it yours</div>
            </>
          )}
        </div>
      )}

      <div className="ibar"><i /></div>

      <button onClick={() => done.current()} className="dim text-sm"
        style={{ position: "absolute", right: 16, bottom: 18, letterSpacing: ".06em" }}>Skip</button>
    </div>
  );
}

function FlipTerm({ cards }) {
  const [i, setI] = useState(0);
  const [face, setFace] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setFace((f) => {
        if (f) setI((n) => (n + 1) % Math.max(1, cards.length));
        return !f;
      });
    }, 2600);
    return () => clearInterval(id);
  }, [cards.length]);
  const c = cards[i % Math.max(1, cards.length)];
  if (!c) return null;
  return (
    <div className="panel2 rounded-2xl p-4 fadein" key={String(face) + i} style={{ minHeight: 96 }}>
      <div className="dim text-xs mb-1">{face ? "term" : "definition"}</div>
      <div style={{ fontSize: face ? 20 : 14, lineHeight: 1.35, fontWeight: face ? 700 : 400 }}>
        {face ? c.t : c.d}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profiles                                                           */
/* ------------------------------------------------------------------ */

function Profiles({ profiles, cards, pending, onClearPending, onPick, onCreate, onRestore, onDelete }) {
  const [mode, setMode] = useState("pick");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [usePin, setUsePin] = useState(false);
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [script, setScript] = useState("");
  const [asking, setAsking] = useState(pending || null);
  const [lookup, setLookup] = useState("");
  const [entered, setEntered] = useState("");
  const [err, setErr] = useState("");

  const tryOpen = (p) => {
    if (p.pin) { setAsking(p); setEntered(""); setErr(""); }
    else onPick(p);
  };

  const submitPin = () => {
    if (entered === asking.pin) { onClearPending && onClearPending(); onPick(asking); }
    else setErr("That's not it.");
  };

  const signIn = () => {
    const hit = profiles.find((p) => p.name.toLowerCase() === lookup.trim().toLowerCase());
    if (!hit) { setErr("No profile with that name on this device."); return; }
    setErr("");
    tryOpen(hit);
  };

  if (asking) {
    return (
      <div className="fadein">
        <h1 className="mb-1" style={{ fontSize: "clamp(28px,6vw,44px)" }}>{asking.name}</h1>
        <p className="dim text-sm mb-4">Enter your four digits.</p>
        <input
          value={entered} onChange={(e) => setEntered(e.target.value.replace(/\D/g, "").slice(0, 4))}
          onKeyDown={(e) => { if (e.key === "Enter") submitPin(); }}
          inputMode="numeric" placeholder="••••"
          className="field rounded-xl px-4 py-3 w-full mb-3" style={{ fontSize: 24, letterSpacing: "0.4em" }}
        />
        {err && <div className="text-sm mb-3" style={{ color: "var(--bad)" }}>{err}</div>}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setAsking(null); onClearPending && onClearPending(); }} className="btn rounded-xl py-3">Back</button>
          <button onClick={submitPin} className="btn-go rounded-xl py-3">Open</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fadein">
      <div className="mb-5">
        <h1 style={{ fontSize: "clamp(34px,8vw,60px)" }}>Who's studying?</h1>
        <p className="dim text-sm mt-1">Everything saves to this device under the profile you pick.</p>
      </div>

      {mode === "pick" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {profiles.map((p) => (
              <div key={p.id} className="panel rounded-2xl p-4">
                <button onClick={() => tryOpen(p)} className="flex items-center gap-3 w-full text-left">
                  <div style={{ width: 56, flexShrink: 0 }}><Avatar a={p.avatar} fluid /></div>
                  <div>
                    <div className="font-semibold" style={{ fontSize: 16 }}>{p.name}</div>
                    <div className="dim text-xs mt-1">{p.pin ? "PIN locked" : "Tap to continue"}</div>
                  </div>
                </button>
                <button onClick={() => onDelete(p)} className="dim text-xs mt-2">Delete</button>
              </div>
            ))}
            {!profiles.length && <div className="panel rounded-2xl p-5 dim">No profiles yet. Make one below.</div>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <button onClick={() => setMode("new")} className="btn-go rounded-xl py-3">New profile</button>
            <button onClick={() => setMode("restore")} className="btn rounded-xl py-3">Restore from a code</button>
          </div>
          <div className="panel2 rounded-2xl p-4">
            <div className="font-semibold mb-2">Sign in by name</div>
            <div className="flex gap-2">
              <input value={lookup} onChange={(e) => setLookup(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") signIn(); }}
                placeholder="Your name" className="field rounded-xl px-4 py-2 w-full" />
              <button onClick={signIn} className="btn rounded-xl px-4">Go</button>
            </div>
            {err && <div className="text-sm mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
            <p className="dim text-xs mt-2">Next time this device opens Recall it goes straight to whoever was last in.</p>
          </div>
        </div>
      )}

      {mode === "new" && (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 20))} placeholder="What should we call you?"
            className="field rounded-xl px-4 py-3 w-full mb-3" style={{ fontSize: 17 }} />
          <label className="flex items-center gap-2 mb-3" style={{ cursor: "pointer" }}>
            <input type="checkbox" checked={usePin} onChange={(e) => setUsePin(e.target.checked)} style={{ accentColor: "var(--a3)" }} />
            <span className="text-sm">Lock it with a PIN</span>
          </label>
          {usePin && (
            <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric"
              placeholder="Four digits" className="field rounded-xl px-4 py-3 w-full mb-3" style={{ letterSpacing: "0.3em" }} />
          )}
          <p className="dim text-xs mb-4">
            A PIN keeps a housemate out of your save. It isn't real security, and nothing leaves this device.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setMode("pick")} className="btn rounded-xl py-3">Back</button>
            <button
              onClick={() => name.trim() && onCreate(name.trim(), usePin && pin.length === 4 ? pin : "")}
              disabled={!name.trim() || (usePin && pin.length !== 4)}
              className="btn-go rounded-xl py-3"
              style={!name.trim() || (usePin && pin.length !== 4) ? { opacity: 0.45 } : undefined}
            >
              Make it
            </button>
          </div>
        </div>
      )}

      {mode === "restore" && (
        <div>
          <p className="dim text-sm mb-3">
            Paste a save code from another device. It brings across your decks, coins, character, room and progress.
          </p>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} placeholder="Paste the code here"
            className="field rounded-xl p-4 w-full mb-3" style={{ fontSize: 12, fontFamily: "monospace" }} />
          {err && <div className="text-sm mb-3" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { setMode("pick"); setErr(""); }} className="btn rounded-xl py-3">Back</button>
            <button onClick={() => { const ok = onRestore(code); if (!ok) setErr("That code didn't read properly."); }} className="btn-go rounded-xl py-3">Restore</button>
          </div>
        </div>
      )}

      <div className="rule my-8" />
      <div className="dim text-sm mb-2">While you're here</div>
      <FlipTerm cards={cards} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Account screen                                                     */
/* ------------------------------------------------------------------ */

function Account({ profile, decks, prog, storageOk, onRename, onPin, onSwitch, onQuit }) {
  const [name, setName] = useState(profile.name);
  const [pin, setPin] = useState(profile.pin || "");
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);

  const makeCode = () => {
    const out = encodeSave({ v: 1, name: profile.name, decks: decks.filter((d) => !d.builtin), prog });
    setCode(out);
    try { navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch (e) {}
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: "clamp(30px,7vw,48px)" }}>Account</h1>
          <div className="dim text-sm">{profile.name} · saved on this device</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      {!storageOk && (
        <div className="panel rounded-2xl p-4 mb-5" style={{ borderColor: "var(--bad)" }}>
          <div className="font-semibold mb-1" style={{ color: "var(--bad)" }}>This browser is blocking saves</div>
          <p className="dim text-sm">
            Your progress will last for this session only. Copy a save code below before you close the tab.
          </p>
        </div>
      )}

      <div className="panel rounded-2xl p-4 mb-4">
        <div className="font-semibold mb-2">Name</div>
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 20))} className="field rounded-xl px-4 py-2 w-full" />
          <button onClick={() => onRename(name.trim() || profile.name)} className="btn rounded-xl px-4">Save</button>
        </div>
      </div>

      <div className="panel rounded-2xl p-4 mb-4">
        <div className="font-semibold mb-2">PIN</div>
        <div className="flex gap-2 mb-2">
          <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric"
            placeholder="Four digits, or empty for none" className="field rounded-xl px-4 py-2 w-full" />
          <button onClick={() => onPin(pin.length === 4 ? pin : "")} className="btn rounded-xl px-4">Set</button>
        </div>
        <p className="dim text-xs">Keeps other people on this device out of your save.</p>
      </div>

      <div className="panel rounded-2xl p-4 mb-4">
        <div className="font-semibold mb-2">Save code</div>
        <p className="dim text-sm mb-3">
          Your whole account as text. Paste it into Recall on another device to move everything across.
          Make a fresh one whenever you want an up-to-date backup.
        </p>
        <button onClick={makeCode} className="btn-go rounded-xl px-4 py-2 mb-3">{copied ? "Copied" : "Make a save code"}</button>
        {code && (
          <textarea readOnly value={code} rows={4} className="field rounded-xl p-3 w-full"
            style={{ fontSize: 11, fontFamily: "monospace" }} onFocus={(e) => e.target.select()} />
        )}
      </div>

      <button onClick={onSwitch} className="btn rounded-xl py-3 w-full">Switch profile</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Goals — exam countdown, weekly challenges, trouble cards           */
/* ------------------------------------------------------------------ */

const daysBetween = (iso) => {
  if (!iso) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const then = new Date(iso + "T00:00:00");
  return Math.round((then.getTime() - today.getTime()) / DAY);
};

/* a card counts as exam-ready once it has climbed to level 4 */
const readyCount = (prog, deck) => deck.cards.filter((c) => recOf(prog, deck.id, c).lvl >= 4).length;

function examPlan(prog, deck) {
  if (!deck.exam) return null;
  const left = daysBetween(deck.exam);
  const ready = readyCount(prog, deck);
  const remaining = Math.max(0, deck.cards.length - ready);
  const days = Math.max(1, left === null ? 1 : left);
  const perDay = left !== null && left < 0 ? remaining : Math.ceil(remaining / days);
  const done = (prog.examDone || {})[deck.id] === todayStr() ? true : false;
  const todayCount = ((prog.examCount || {})[deck.id] || {}).day === todayStr()
    ? (prog.examCount || {})[deck.id].n : 0;
  return { left, ready, remaining, perDay, todayCount, done, total: deck.cards.length };
}

const TROUBLE_MIN = 4;
const troubleCards = (prog, deck) =>
  deck.cards.filter((c) => {
    const r = recOf(prog, deck.id, c);
    return (r.seen || 0) - (r.hits || 0) >= TROUBLE_MIN;
  });

/* ---- weekly challenges ---- */
const weekId = () => {
  const d = new Date();
  const jan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan) / DAY + jan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
};

const WEEKLY_POOL = [
  { id: "w-correct", name: "Two hundred right", desc: "Answer 200 cards correctly this week", goal: 200, coins: 600, stat: "correct" },
  { id: "w-rounds", name: "Fifteen rounds", desc: "Finish 15 rounds this week", goal: 15, coins: 450, stat: "rounds" },
  { id: "w-perfect", name: "Three clean", desc: "Three rounds with nothing missed", goal: 3, coins: 500, stat: "perfect" },
  { id: "w-boss", name: "Two bosses", desc: "Beat two Boss Exams this week", goal: 2, coins: 700, stat: "bosses" },
  { id: "w-ask", name: "Ask five", desc: "Ask the tutor five questions", goal: 5, coins: 300, stat: "asks" },
  { id: "w-drift", name: "Wind down", desc: "Run Drift three times", goal: 3, coins: 250, stat: "drift" },
  { id: "w-clear", name: "Survive one", desc: "Clear a Survival run", goal: 1, coins: 650, stat: "survivalClears" },
];

function weeklyPicks() {
  const id = weekId();
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) % 9973;
  const pool = [...WEEKLY_POOL];
  const out = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483647;
    out.push(pool.splice(seed % pool.length, 1)[0]);
  }
  return out;
}

function weeklyState(prog, ch) {
  const wk = prog.week || {};
  const base = wk.id === weekId() ? wk.base || {} : {};
  const have = Math.max(0, (prog.stats[ch.stat] || 0) - (base[ch.stat] || 0));
  return { have: Math.min(ch.goal, have), done: have >= ch.goal, claimed: (wk.claimed || []).includes(ch.id) };
}

function rollWeek(prog) {
  if ((prog.week || {}).id === weekId()) return prog;
  const base = {};
  WEEKLY_POOL.forEach((c) => { base[c.stat] = prog.stats[c.stat] || 0; });
  return { ...prog, week: { id: weekId(), base, claimed: [] } };
}

const weeklyReady = (prog) => weeklyPicks().filter((c) => { const s = weeklyState(prog, c); return s.done && !s.claimed; }).length;

/* ------------------------------------------------------------------ */
/*  Today's goals                                                      */
/* ------------------------------------------------------------------ */

const blankDay = () => ({ day: todayStr(), cards: 0, rounds: 0, fixed: 0, claimed: false });

function dayOf(prog) {
  const d = prog.daily || {};
  return d.day === todayStr() ? { ...blankDay(), ...d } : blankDay();
}

function todayGoals(prog) {
  const d = dayOf(prog);
  return [
    { id: "cards", name: "Study flashcards", have: Math.min(d.cards, 50), goal: 50 },
    { id: "fixed", name: "Review mistakes", have: Math.min(d.fixed, 20), goal: 20 },
    { id: "round", name: "Finish a session", have: Math.min(d.rounds, 1), goal: 1 },
  ];
}

const goalsDone = (prog) => todayGoals(prog).filter((g) => g.have >= g.goal).length;

/* ------------------------------------------------------------------ */
/*  Goals screen                                                       */
/* ------------------------------------------------------------------ */

function Goals({ prog, decks, deck, onExam, onClaimWeek, onDrill, onQuit }) {
  const [pick, setPick] = useState(deck.id);
  const target = decks.find((d) => d.id === pick) || deck;
  const plan = examPlan(prog, target);
  const trouble = troubleCards(prog, target);
  const weeks = weeklyPicks();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: "clamp(30px,7vw,48px)" }}>Goals</h1>
          <div className="dim text-sm">Exam dates, weekly challenges, and what keeps tripping you up</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <h2 className="mb-3" style={{ fontSize: 20 }}>Exam countdown</h2>
      <div className="scroller flex gap-2 mb-3 pb-1">
        {decks.map((d) => (
          <button key={d.id} onClick={() => setPick(d.id)}
            className={"chip rounded-full px-3 py-1 text-sm " + (pick === d.id ? "chip-on" : "")} style={{ whiteSpace: "nowrap" }}>
            {d.title.length > 26 ? d.title.slice(0, 24) + "…" : d.title}
          </button>
        ))}
      </div>

      <div className="panel rounded-2xl p-5 mb-8">
        {!target.exam ? (
          <div>
            <div className="font-semibold mb-1">No exam set for {target.title}</div>
            <p className="dim text-sm mb-4">
              Optional. Set a date and Recall works out how many cards you need to lock in each day to be ready,
              and pays a bonus every day you hit it. Leave it off if you're not studying toward anything.
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <input type="date" onChange={(e) => e.target.value && onExam(target.id, e.target.value)}
                className="field rounded-xl px-4 py-2" />
              <span className="dim text-sm">pick a date to switch it on</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-between gap-4 mb-3">
              <div>
                <div className="disp" style={{ fontSize: 40 }}>
                  {plan.left < 0 ? "Past" : plan.left === 0 ? "Today" : plan.left}
                </div>
                <div className="dim text-sm">{plan.left > 0 ? `days until ${target.title}` : "exam date reached"}</div>
              </div>
              <div className="text-right">
                <div style={{ fontSize: 15 }}>{plan.ready} / {plan.total} ready</div>
                <div className="dim text-sm">{plan.remaining} left to lock in</div>
              </div>
            </div>
            <div className="meter mb-4"><i style={{ width: `${(plan.ready / Math.max(1, plan.total)) * 100}%` }} /></div>

            <div className="panel2 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Today's target: {plan.perDay} card{plan.perDay === 1 ? "" : "s"}</div>
                  <div className="dim text-sm mt-1">{plan.todayCount} locked in so far today</div>
                </div>
                {plan.done && <span className="text-sm" style={{ color: "var(--good)" }}>Hit it ✓</span>}
              </div>
              <div className="meter mt-3"><i style={{ width: `${Math.min(100, (plan.todayCount / Math.max(1, plan.perDay)) * 100)}%` }} /></div>
            </div>

            <div className="flex flex-wrap gap-2">
              <input type="date" defaultValue={target.exam} onChange={(e) => e.target.value && onExam(target.id, e.target.value)}
                className="field rounded-xl px-3 py-2 text-sm" />
              <button onClick={() => onExam(target.id, null)} className="btn rounded-xl px-3 py-2 text-sm">Turn it off</button>
            </div>
          </div>
        )}
      </div>

      <h2 className="mb-1" style={{ fontSize: 20 }}>Trouble cards</h2>
      <p className="dim text-sm mb-3">Cards you've missed {TROUBLE_MIN} times or more in {target.title}.</p>
      <div className="panel rounded-2xl p-5 mb-8">
        {trouble.length ? (
          <div>
            <div className="disp mb-1" style={{ fontSize: 30 }}>{trouble.length}</div>
            <div className="dim text-sm mb-4">These are the ones costing you rounds. A drill runs them with explanations on.</div>
            <div className="flex flex-col gap-2 mb-4">
              {trouble.slice(0, 5).map((c, n) => (
                <div key={c.t + n} className="font-medium" style={{ fontSize: 14 }}>{c.t}</div>
              ))}
              {trouble.length > 5 && <div className="dim text-sm">and {trouble.length - 5} more</div>}
            </div>
            <button onClick={() => onDrill(target.id, trouble)} className="btn-go rounded-xl py-3 w-full">Drill these now</button>
          </div>
        ) : (
          <div className="dim">Nothing flagged yet. Cards land here after you miss them four times.</div>
        )}
      </div>

      <h2 className="mb-1" style={{ fontSize: 20 }}>This week</h2>
      <p className="dim text-sm mb-3">Three challenges, new every Monday.</p>
      <div className="flex flex-col gap-3">
        {weeks.map((c) => {
          const st = weeklyState(prog, c);
          return (
            <div key={c.id} className={"panel rounded-2xl p-4 " + (st.done && !st.claimed ? "eq" : st.claimed ? "locked" : "")}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold" style={{ fontSize: 15 }}>{c.name}</div>
                  <div className="dim text-sm">{c.desc}</div>
                </div>
                {st.claimed ? <span className="dim text-sm">Claimed</span>
                  : st.done ? <button onClick={() => onClaimWeek(c)} className="btn-go rounded-lg px-3 py-1 text-sm">{c.coins} coins</button>
                    : <span className="dim text-sm" style={{ whiteSpace: "nowrap" }}>{st.have} / {c.goal}</span>}
              </div>
              <div className="meter"><i style={{ width: `${(st.have / c.goal) * 100}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sample terms for the opening                                       */
/* ------------------------------------------------------------------ */

const SAMPLE_TERMS = [
  { t: "Photosynthesis", d: "How plants turn light, water and carbon dioxide into sugar" },
  { t: "Opportunity cost", d: "What you give up when you choose one option over another" },
  { t: "Mitochondria", d: "The part of a cell that turns nutrients into usable energy" },
  { t: "Supply and demand", d: "How price settles where what's offered meets what's wanted" },
  { t: "Metaphor", d: "Describing one thing as another to carry meaning across" },
  { t: "Newton's second law", d: "Force equals mass times acceleration" },
  { t: "Habeas corpus", d: "The right to be brought before a court rather than held without cause" },
  { t: "Recursion", d: "A process defined in terms of a smaller version of itself" },
  { t: "Plate tectonics", d: "The slow movement of the plates that make up the planet's surface" },
  { t: "Cognitive bias", d: "A predictable way that judgement drifts away from what's accurate" },
];

/* ------------------------------------------------------------------ */
/*  Sharing a single deck                                              */
/* ------------------------------------------------------------------ */

function encodeDeck(deck) {
  return "DECK1-" + encodeSave({ t: deck.title, c: deck.cards.map((c) => [c.t, c.d, c.g || "", c.x || 2]) });
}

function decodeDeck(code) {
  const raw = (code || "").trim();
  if (!raw.startsWith("DECK1-")) return null;
  const data = decodeSave(raw.slice(6));
  if (!data || !Array.isArray(data.c)) return null;
  return {
    id: "d" + Date.now(),
    title: (data.t || "Shared deck").slice(0, 60),
    note: `${data.c.length} cards`,
    cards: data.c.map(([t, d, g, x]) => ({ t, d, g: g || undefined, x: x || 2 })).filter((c) => c.t && c.d),
  };
}

/* ------------------------------------------------------------------ */
/*  Power-ups you can buy                                              */
/* ------------------------------------------------------------------ */

const POWERUPS = [
  { id: "life", name: "Spare life", price: 900, note: "Start Survival with a fourth heart" },
  { id: "fifty", name: "50/50", price: 500, note: "Drop two wrong answers in Quiz" },
  { id: "hint", name: "First letters", price: 400, note: "Reveal the opening of a Type it answer" },
  { id: "shield", name: "Exam shield", price: 1100, note: "Boss Exam starts you with two extra mistakes" },
  { id: "double", name: "Double coins", price: 1600, note: "Doubles the payout of your next round" },
];

const holdOf = (prog, id) => ((prog.powerups || {})[id] || 0);
const spendPower = (prog, id) => ({ ...prog, powerups: { ...(prog.powerups || {}), [id]: Math.max(0, holdOf(prog, id) - 1) } });
const givePower = (prog, id, n) => ({ ...prog, powerups: { ...(prog.powerups || {}), [id]: holdOf(prog, id) + (n || 1) } });

/* ------------------------------------------------------------------ */
/*  Recolouring what you own                                           */
/* ------------------------------------------------------------------ */

const TINTS = [
  { id: "none", name: "As it comes", deg: null },
  { id: "t40", name: "Warmer", deg: 40 },
  { id: "t80", name: "Gold", deg: 80 },
  { id: "t140", name: "Green", deg: 140 },
  { id: "t190", name: "Teal", deg: 190 },
  { id: "t240", name: "Blue", deg: 240 },
  { id: "t290", name: "Violet", deg: 290 },
  { id: "t330", name: "Pink", deg: 330 },
  { id: "grey", name: "Washed out", deg: "grey" },
];

const TINT_SLOTS = { hat: "Headwear", back: "Back item", hand: "Held item" };
const ROOM_TINT_SLOTS = { seat: "Seating", rug: "Rug" };
const tintFilter = (id) => {
  if (!id || id === "none") return undefined;
  return `url(#rcTint-${id})`;
};

function TintDefs() {
  return (
    <>
      {TINTS.filter((t) => t.deg !== null).map((t) => (
        <filter key={t.id} id={"rcTint-" + t.id}>
          {t.deg === "grey"
            ? <feColorMatrix type="saturate" values="0.15" />
            : <feColorMatrix type="hueRotate" values={String(t.deg)} />}
        </filter>
      ))}
    </>
  );
}

function TintStrip({ label, value, onPick }) {
  return (
    <div className="panel2 rounded-2xl p-3 mb-4">
      <div className="dim text-xs mb-2">Recolour your {label} — free once you own it</div>
      <div className="flex flex-wrap gap-2">
        {TINTS.map((t) => (
          <button key={t.id} onClick={() => onPick(t.id)}
            className={"chip rounded-full px-3 py-1 text-xs " + (value === t.id || (!value && t.id === "none") ? "chip-on" : "")}>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shop stock that rotates every day                                  */
/* ------------------------------------------------------------------ */

function dailyStock(prog) {
  const seedStr = todayStr();
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 131 + seedStr.charCodeAt(i)) % 99991;
  const pool = [];
  CHAR_SLOTS.concat(ROOM_SLOTS).forEach((s) => {
    s.items.forEach((it) => {
      if (it.price && !it.ticket && !it.quest && !prog.owned.includes(s.key + ":" + it.id)) {
        pool.push({ slot: s.key, it, label: s.name });
      }
    });
  });
  const out = [];
  for (let i = 0; i < 6 && pool.length; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483647;
    const [entry] = pool.splice(seed % pool.length, 1);
    out.push({ ...entry, it: { ...entry.it, price: Math.max(50, Math.round((entry.it.price * 0.7) / 10) * 10), was: entry.it.price } });
  }
  return out;
}

function hoursLeftToday() {
  const end = new Date();
  end.setHours(24, 0, 0, 0);
  return Math.max(1, Math.round((end.getTime() - Date.now()) / 3600000));
}

/* ------------------------------------------------------------------ */
/*  Transcripts                                                        */
/* ------------------------------------------------------------------ */

const toSeconds = (str) => {
  const p = str.split(":").map(parseFloat);
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  if (p.length === 2) return p[0] * 60 + p[1];
  return p[0] || 0;
};

const stamp = (sec) => {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return (h ? h + ":" + String(m).padStart(2, "0") : String(m)) + ":" + String(r).padStart(2, "0");
};

/* Handles YouTube's copy-paste format, .srt, .vtt, and plain text. */
function parseTranscript(raw) {
  const lines = String(raw).replace(/\r/g, "").split("\n");
  const out = [];
  let pending = null;
  for (let line of lines) {
    const t = line.trim();
    if (!t || /^WEBVTT/i.test(t) || /^\d+$/.test(t)) continue;
    const cue = t.match(/^(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d+)?)\s*-->/);
    if (cue) { pending = toSeconds(cue[1].replace(",", ".")); continue; }
    const lead = t.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s+(.*)$/);
    if (lead && lead[2]) { out.push({ at: toSeconds(lead[1]), text: lead[2] }); pending = null; continue; }
    if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(t)) { pending = toSeconds(t); continue; }
    out.push({ at: pending, text: t.replace(/^[A-Z][A-Za-z .'-]{0,24}:\s/, "") });
    pending = null;
  }
  const merged = [];
  out.forEach((seg) => {
    const last = merged[merged.length - 1];
    if (last && last.at != null && seg.at == null) last.text += " " + seg.text;
    else merged.push({ ...seg });
  });
  const words = merged.reduce((n, m) => n + m.text.split(/\s+/).length, 0);
  const body = merged.map((m) => (m.at != null ? `[${stamp(m.at)}] ` : "") + m.text).join("\n");
  return { body, words, timed: merged.some((m) => m.at != null), minutes: merged.length ? Math.round((merged[merged.length - 1].at || 0) / 60) : 0 };
}

const youtubeId = (url) => {
  const m = String(url).match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
};

const watchLink = (source, ts) => {
  if (!source) return null;
  const id = youtubeId(source);
  if (id) return `https://www.youtube.com/watch?v=${id}${ts ? "&t=" + Math.max(0, Math.round(ts)) + "s" : ""}`;
  return source;
};

/* ------------------------------------------------------------------ */
/*  Reading PDFs in the browser                                        */
/* ------------------------------------------------------------------ */

const PDFJS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  return new Promise((res, rej) => {
    const tag = document.createElement("script");
    tag.src = PDFJS_SRC;
    tag.onload = () => {
      if (!window.pdfjsLib) return rej(new Error("PDF reader wouldn't load."));
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      res(window.pdfjsLib);
    };
    tag.onerror = () => rej(new Error("Couldn't reach the PDF reader."));
    document.head.appendChild(tag);
  });
}

async function pdfToText(file, onPage) {
  const lib = await loadPdfJs();
  const buf = await file.arrayBuffer();
  const doc = await lib.getDocument({ data: buf }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    if (onPage) onPage(i, doc.numPages);
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let last = 0, line = "", out = [];
    content.items.forEach((it) => {
      const y = it.transform[5];
      if (last && Math.abs(y - last) > 4) { out.push(line.trim()); line = ""; }
      line += it.str + " ";
      last = y;
    });
    if (line.trim()) out.push(line.trim());
    pages.push(out.filter(Boolean).join("\n"));
  }
  return pages.join("\n\n");
}

/* ------------------------------------------------------------------ */
/*  Making cards without Claude                                        */
/* ------------------------------------------------------------------ */

const JUNK = /^(chapter|section|page|figure|table|source|note|copyright|all rights|slide)\b/i;

function localCards(text, limit = 60) {
  const lines = String(text).replace(/\r/g, "").split("\n").map((l) => l.trim()).filter(Boolean);
  const out = [];
  const add = (t, d) => {
    t = t.replace(/^[\s\-\*\u2022\d.)\]]+/, "").replace(/[:\-\u2013\u2014=]\s*$/, "").trim();
    d = d.replace(/^[\s:\-\u2013\u2014=]+/, "").trim();
    if (!t || !d) return;
    if (JUNK.test(t)) return;
    const tw = t.split(/\s+/).length, dw = d.split(/\s+/).length;
    if (tw < 1 || tw > 7 || dw < 4 || t.length > 60 || d.length < 18) return;
    if (out.some((c) => norm(c.t) === norm(t))) return;
    out.push({ t, d: d.slice(0, 220), x: 2 });
  };

  /* tab or double-space columns, the shape most exports use */
  lines.forEach((l) => {
    const col = l.split(/\t| {3,}/);
    if (col.length === 2) add(col[0], col[1]);
  });

  /* term, then a separator, then the meaning */
  if (out.length < 6) {
    lines.forEach((l) => {
      const m = l.match(/^(.{2,60}?)\s*(?::|\u2014|\u2013| - |=)\s+(.{18,})$/);
      if (m) add(m[1], m[2]);
    });
  }

  /* bold or quoted term followed by its meaning */
  if (out.length < 6) {
    lines.forEach((l) => {
      const m = l.match(/^\*\*(.+?)\*\*\s*[:\-\u2014]?\s*(.{18,})$/) || l.match(/^\u201c(.+?)\u201d\s*[:\-]?\s*(.{18,})$/);
      if (m) add(m[1], m[2]);
    });
  }

  /* a short heading line, then a longer line under it */
  if (out.length < 6) {
    for (let i = 0; i < lines.length - 1; i++) {
      const head = lines[i], body = lines[i + 1];
      const short = head.length <= 52 && head.split(/\s+/).length <= 6 && !/[.!?]$/.test(head);
      if (short && body.length > 40) { add(head, body); i++; }
    }
  }

  return out.slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Deck builder                                                       */
/* ------------------------------------------------------------------ */

function Builder({ onBuilt, onManual, onSettings }) {
  const [tab, setTab] = useState("file");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [script, setScript] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState("");
  const [err, setErr] = useState("");
  const [hot, setHot] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef(null);

  const readAsText = (f) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = () => rej(new Error("That file wouldn't open."));
    r.readAsText(f);
  });

  const build = async () => {
    setErr(""); setNote(""); setBusy(true);
    try {
      let body = "", title = "", extra = {}, timed = false;

      if (tab === "file") {
        if (!file) throw new Error("Pick a file first.");
        title = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").slice(0, 60);
        const isPdf = /\.pdf$/i.test(file.name) || file.type === "application/pdf";
        if (isPdf) {
          setStep("Reading the PDF…");
          body = await pdfToText(file, (p, total) => setStep(`Reading page ${p} of ${total}…`));
        } else {
          body = await readAsText(file);
        }
        if (body.trim().length < 120) throw new Error("There's barely any text in that file. If it's a scan, the words are pictures — try pasting them instead.");
      } else if (tab === "video") {
        if (script.trim().length < 200) throw new Error("Paste the transcript underneath the link — a couple of minutes' worth at least.");
        const parsed = parseTranscript(script);
        body = parsed.body; timed = parsed.timed;
        title = (link.trim() ? "Video" : "Lecture") + (parsed.minutes ? ` · ${parsed.minutes} min` : "");
        extra = { source: link.trim() || undefined };
      } else {
        if (text.trim().length < 120) throw new Error("Paste a bit more — a few paragraphs at least.");
        body = text;
        title = text.trim().split("\n")[0].slice(0, 60) || "Pasted notes";
      }

      const source = { kind: "text", data: body, timed };
      let all = [];
      let aiFailed = null;

      try {
        for (let p = 0; p < PARTS.length; p++) {
          setStep(`Claude is reading, pass ${p + 1} of 3 · ${all.length} cards so far`);
          const got = await askForCards(source, PARTS[p], all.map((c) => c.t));
          for (const c of got) if (!all.some((x) => norm(x.t) === norm(c.t))) all.push(c);
        }
      } catch (e) {
        aiFailed = e;
      }

      if (all.length < 4) {
        setStep("Pulling out the terms myself…");
        const mine = localCards(body);
        if (mine.length >= 4) {
          all = mine;
          setNote(
            aiFailed instanceof NoAI || !aiReady()
              ? `Made ${mine.length} cards without Claude. Connect Claude in Settings for better ones.`
              : `Claude didn't answer, so I pulled ${mine.length} cards out myself.`
          );
        } else if (aiFailed) {
          throw aiFailed;
        } else {
          throw new Error("Couldn't find clear terms in that. Try 'Term: definition' on each line, or write the cards yourself.");
        }
      }

      onBuilt({ id: "d" + Date.now(), title, note: `${all.length} cards`, cards: all, ...extra });
      setFile(null); setText(""); setScript("");
    } catch (e) {
      setErr(e instanceof NoAI
        ? "Claude isn't connected to this site. Open Settings to paste an API key, or write cards yourself."
        : e.message || "Something went wrong building the deck.");
    } finally {
      setBusy(false); setStep("");
    }
  };

  const importCode = () => {
    const d = decodeDeck(code);
    if (!d || !d.cards.length) { setErr("That deck code didn't read properly."); return; }
    setErr(""); setCode("");
    onBuilt(d);
  };

  return (
    <div className="panel rounded-2xl p-5">
      <AIBanner what="Smarter card writing" onConnect={onSettings} />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[["file", "Upload a file"], ["text", "Paste text"], ["video", "From a video"], ["code", "Deck code"]].map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setErr(""); }}
            className={"chip rounded-full px-3 py-1 text-sm " + (tab === id ? "chip-on" : "")}>{label}</button>
        ))}
      </div>

      {tab === "file" && (
        <div className="mb-4">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.txt,.md,.markdown,application/pdf,text/plain,text/markdown"
            onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) { setFile(f); setErr(""); } }}
            style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
          />
          <div
            className={"drop rounded-xl p-5 text-center " + (hot ? "hot" : "")}
            onDragOver={(e) => { e.preventDefault(); setHot(true); }}
            onDragLeave={() => setHot(false)}
            onDrop={(e) => {
              e.preventDefault(); setHot(false);
              const f = e.dataTransfer.files && e.dataTransfer.files[0];
              if (f) { setFile(f); setErr(""); }
            }}
          >
            <div className="font-medium mb-1">{file ? file.name : "Drop a file here"}</div>
            <div className="dim text-sm mb-3">{file ? `${Math.round(file.size / 1024)} KB · ready` : "PDF, txt or markdown"}</div>
            <button type="button" onClick={() => inputRef.current && inputRef.current.click()} className="btn rounded-xl px-4 py-2">
              {file ? "Pick a different file" : "Choose a file"}
            </button>
          </div>
        </div>
      )}

      {tab === "text" && (
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
          placeholder="Paste your notes, a chapter, a study guide…" className="field rounded-xl p-4 w-full mb-4" />
      )}

      {tab === "video" && (
        <div className="mb-4">
          <input value={link} onChange={(e) => setLink(e.target.value)}
            placeholder="Video link (optional, but lets cards jump back to the moment)"
            className="field rounded-xl px-4 py-3 w-full mb-3" />
          <textarea value={script} onChange={(e) => setScript(e.target.value)} rows={6}
            placeholder="Paste the transcript here"
            className="field rounded-xl p-4 w-full mb-2" />
          <div className="dim text-xs" style={{ lineHeight: 1.5 }}>
            On YouTube: the … under the video → Show transcript → select it all and copy. Lecture recorders
            like Panopto and Echo360 have the same thing. Timestamps are welcome — cards keep them so you can
            jump straight back to the bit you got wrong.
            {script.trim().length > 100 && (() => { const p = parseTranscript(script); return ` Read ${p.words} words${p.timed ? " with timestamps" : ""}.`; })()}
          </div>
        </div>
      )}

      {tab === "code" && (
        <div className="mb-4">
          <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={4}
            placeholder="Paste a DECK1- code a classmate sent you"
            className="field rounded-xl p-4 w-full mb-3" style={{ fontSize: 11, fontFamily: "monospace" }} />
          <button onClick={importCode} className="btn-go rounded-xl py-3 w-full">Add this deck</button>
        </div>
      )}

      {tab !== "code" && (
        <button onClick={build} disabled={busy} className="btn-go rounded-xl py-3 w-full">
          {busy ? step || "Building…" : "Build a deck"}
        </button>
      )}

      {note && <div className="text-sm mt-3" style={{ color: "var(--a1)" }}>{note}</div>}
      {err && (
        <div className="mt-3">
          <div className="text-sm mb-2" style={{ color: "var(--bad)" }}>{err}</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={onManual} className="btn rounded-lg px-3 py-1 text-sm">Write the cards myself</button>
            <button onClick={onSettings} className="btn rounded-lg px-3 py-1 text-sm">Connect Claude</button>
          </div>
        </div>
      )}
      {!err && !busy && (
        <div className="dim text-xs mt-3">
          Three passes gets you about thirty cards, each tagged with a topic so Speed Sort and Boss Exam know what's hard.
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared shop pieces                                                 */
/* ------------------------------------------------------------------ */

const priceLabel = (it) => {
  if (it.quest) return "Task reward";
  if (it.ticket && !it.price) return `${it.ticket}🎟`;
  if (it.ticket) return `${it.price} + ${it.ticket}🎟`;
  return `${it.price}`;
};

function useHistory(initial) {
  const [past, setPast] = useState([]);
  const [now, setNow] = useState(initial);
  const [future, setFuture] = useState([]);

  const set = (next) => {
    setPast((p) => [...p.slice(-40), now]);
    setNow(next);
    setFuture([]);
  };
  const undo = () => {
    if (!past.length) return;
    setFuture((f) => [now, ...f]);
    setNow(past[past.length - 1]);
    setPast((p) => p.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    setPast((p) => [...p, now]);
    setNow(future[0]);
    setFuture((f) => f.slice(1));
  };
  return { now, set, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}

function UndoBar({ h, onReset }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button onClick={h.undo} disabled={!h.canUndo} className="btn rounded-xl px-4 py-2 text-sm"
        style={!h.canUndo ? { opacity: .4 } : undefined} aria-label="Undo">↶ Undo</button>
      <button onClick={h.redo} disabled={!h.canRedo} className="btn rounded-xl px-4 py-2 text-sm"
        style={!h.canRedo ? { opacity: .4 } : undefined} aria-label="Redo">↷ Redo</button>
      <span style={{ flex: 1 }} />
      <button onClick={onReset} className="dim text-xs">Start over</button>
    </div>
  );
}

function ItemGrid({ slot, current, prog, onPick, onBuy, onPeek, peek, questNames }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {slot.items.map((it) => {
        const key = slot.key + ":" + it.id;
        const free = !it.price && !it.quest;
        const has = free || prog.owned.includes(key);
        const on = current === it.id;
        const afford = prog.coins >= (it.price || 0) && (prog.tickets || 0) >= (it.ticket || 0);
        return (
          <button
            key={it.id}
            onClick={() => (has ? onPick(slot.key, it.id) : onPeek(slot.key, it.id, it))}
            className={"btn rounded-xl p-3 text-left " + (on ? "eq " : "") + (peek === it.id ? "eq " : "") + (has ? "" : "locked")}
          >
            <div className="flex items-center gap-2">
              {slot.color && <span style={{ width: 18, height: 18, borderRadius: 6, background: it.c, border: "1px solid var(--line)", flexShrink: 0 }} />}
              <span className="font-medium" style={{ fontSize: 14, lineHeight: 1.2 }}>{it.name}</span>
            </div>
            <div className="dim text-xs mt-1">
              {has ? (on ? "Wearing" : "Tap to use")
                : it.quest ? `Task: ${questNames[it.quest] || "locked"}`
                : <span className={afford ? "coin" : ""}>{priceLabel(it)} · try it</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CharStudio({ prog, onSave, onBuy, onQuit, firstRun }) {
  const h = useHistory({ ...DEFAULT_AVATAR, ...(prog.avatar || {}) });
  const a = h.now;
  const setA = (fn) => h.set(typeof fn === "function" ? fn(h.now) : fn);
  const [peek, setPeek] = useState(null);
  const [tab, setTab] = useState(CHAR_SLOTS[0].key);
  const slot = CHAR_SLOTS.find((s) => s.key === tab);
  const questNames = useMemo(() => Object.fromEntries(QUESTS.map((q) => [q.id, q.name])), []);
  const pick = (k, id) => { setPeek(null); setA((v) => ({ ...v, [k]: id })); };
  const tryOn = (k, id, it) => setPeek({ slot: k, id, it, key: k + ":" + id });
  const buyPeek = () => { onBuy(peek.key, peek.it); const { slot, id } = peek; setPeek(null); setA((v) => ({ ...v, [slot]: id })); };
  const shown = peek ? { ...a, [peek.slot]: peek.id } : a;

  const randomise = () => {
    const next = { ...a };
    CHAR_SLOTS.forEach((s) => {
      const open = s.items.filter((it) => (!it.price && !it.quest) || prog.owned.includes(s.key + ":" + it.id));
      if (open.length) next[s.key] = open[Math.floor(Math.random() * open.length)].id;
    });
    setA(next);
  };

  return (
    <div>
      <PageHead eyebrow={firstRun ? "First things first" : "Wardrobe"}
        title={firstRun ? "Make your guy" : "Your character"}
        sub={firstRun ? "Change any of it later, whenever" : `${prog.coins.toLocaleString()} coins · ${prog.tickets || 0} tickets`} />

      <div className="panel2 rounded-2xl p-4 mb-3 flex flex-col items-center justify-center">
        <Avatar a={shown} size={210} />
        {titleOf(shown) && <div className="disp mt-2" style={{ fontSize: 20, color: "var(--a1)" }}>{titleOf(shown)}</div>}
      </div>
      <UndoBar h={h} onReset={() => setA({ ...DEFAULT_AVATAR })} />
      <button onClick={randomise} className="btn rounded-lg px-3 py-1 text-sm mb-4">Shuffle what I own</button>

      <div className="scroller flex gap-2 mb-3 pb-1">
        {CHAR_SLOTS.map((s) => (
          <button key={s.key} onClick={() => setTab(s.key)} className={"chip rounded-full px-3 py-1 text-sm " + (tab === s.key ? "chip-on" : "")} style={{ whiteSpace: "nowrap" }}>
            {s.name}
          </button>
        ))}
      </div>

      {peek && (
        <div className="panel2 rounded-2xl p-4 mb-4 fadein">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Trying on {peek.it.name}</div>
              <div className="dim text-xs mt-1">
                {peek.it.quest ? "Locked behind a task" : `Costs ${priceLabel(peek.it)} · you have ${prog.coins.toLocaleString()}`}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPeek(null)} className="btn rounded-lg px-3 py-1 text-sm">Take off</button>
              {!peek.it.quest && (
                <button onClick={buyPeek}
                  disabled={prog.coins < (peek.it.price || 0) || (prog.tickets || 0) < (peek.it.ticket || 0)}
                  className="btn-go rounded-lg px-3 py-1 text-sm"
                  style={prog.coins < (peek.it.price || 0) || (prog.tickets || 0) < (peek.it.ticket || 0) ? { opacity: 0.45 } : undefined}>
                  Buy it
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {TINT_SLOTS[slot.key] && a[slot.key] !== "none" && (
        <TintStrip label={TINT_SLOTS[slot.key]} value={(a.tint || {})[slot.key]}
          onPick={(id) => setA((v) => ({ ...v, tint: { ...(v.tint || {}), [slot.key]: id } }))} />
      )}

      <div className="mb-5">
        <ItemGrid slot={slot} current={a[slot.key]} prog={prog} onPick={pick} onBuy={buyPeek}
          onPeek={tryOn} peek={peek && peek.slot === slot.key ? peek.id : null} questNames={questNames} />
      </div>

      <button onClick={() => onSave(a)} className="btn-go rounded-xl py-3 w-full">
        {firstRun ? "That's me — let's go" : "Save look"}
      </button>
    </div>
  );
}

function RoomStudio({ prog, due, score, onSave, onBuy, onQuit }) {
  const h = useHistory({ ...DEFAULT_ROOM, ...(prog.room || {}) });
  const r = h.now;
  const setR = (fn) => h.set(typeof fn === "function" ? fn(h.now) : fn);
  const [peek, setPeek] = useState(null);
  const [tab, setTab] = useState(ROOM_SLOTS[0].key);
  const slot = ROOM_SLOTS.find((s) => s.key === tab);
  const questNames = useMemo(() => Object.fromEntries(QUESTS.map((q) => [q.id, q.name])), []);
  const pick = (k, id) => { setPeek(null); setR((v) => ({ ...v, [k]: id })); };
  const tryOn = (k, id, it) => setPeek({ slot: k, id, it, key: k + ":" + id });
  const buyPeek = () => { onBuy(peek.key, peek.it); const { slot, id } = peek; setPeek(null); setR((v) => ({ ...v, [slot]: id })); };
  const shown = peek ? { ...r, [peek.slot]: peek.id } : r;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "clamp(28px,6vw,44px)" }}>Your room</h1>
          <div className="dim text-sm">{prog.coins.toLocaleString()} coins · {prog.tickets || 0} tickets</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <div className="rounded-2xl overflow-hidden mb-3" style={{ border: "1px solid var(--line)", position: "relative" }}>
        <Room r={shown} glow="var(--a4)" due={due} score={score} />
        <div style={{ position: "absolute", left: "7%", bottom: "2%", width: "15%" }}>
          <Avatar a={prog.avatar} fluid />
        </div>
      </div>

      <UndoBar h={h} onReset={() => setR({ ...DEFAULT_ROOM })} />

      <div className="scroller flex gap-2 mb-3 pb-1">
        {ROOM_SLOTS.map((s) => (
          <button key={s.key} onClick={() => setTab(s.key)} className={"chip rounded-full px-3 py-1 text-sm " + (tab === s.key ? "chip-on" : "")} style={{ whiteSpace: "nowrap" }}>
            {s.name}
          </button>
        ))}
      </div>

      {peek && (
        <div className="panel2 rounded-2xl p-4 mb-4 fadein">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Previewing {peek.it.name}</div>
              <div className="dim text-xs mt-1">
                {peek.it.quest ? "Locked behind a task" : `Costs ${priceLabel(peek.it)} · you have ${prog.coins.toLocaleString()}`}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPeek(null)} className="btn rounded-lg px-3 py-1 text-sm">Clear</button>
              {!peek.it.quest && (
                <button onClick={buyPeek}
                  disabled={prog.coins < (peek.it.price || 0) || (prog.tickets || 0) < (peek.it.ticket || 0)}
                  className="btn-go rounded-lg px-3 py-1 text-sm"
                  style={prog.coins < (peek.it.price || 0) || (prog.tickets || 0) < (peek.it.ticket || 0) ? { opacity: 0.45 } : undefined}>
                  Buy it
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {ROOM_TINT_SLOTS[slot.key] && r[slot.key] !== "none" && (
        <TintStrip label={ROOM_TINT_SLOTS[slot.key]} value={(r.tint || {})[slot.key]}
          onPick={(id) => setR((v) => ({ ...v, tint: { ...(v.tint || {}), [slot.key]: id } }))} />
      )}

      <div className="mb-5">
        <ItemGrid slot={slot} current={r[slot.key]} prog={prog} onPick={pick} onBuy={buyPeek}
          onPeek={tryOn} peek={peek && peek.slot === slot.key ? peek.id : null} questNames={questNames} />
      </div>

      <button onClick={() => onSave(r)} className="btn-go rounded-xl py-3 w-full">Save room</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shop (look and sound)                                              */
/* ------------------------------------------------------------------ */
/*  Nudge shown where Claude is needed but missing                     */
/* ------------------------------------------------------------------ */

function AIBanner({ onConnect, what }) {
  if (aiReady()) return null;
  return (
    <div className="panel2 rounded-2xl p-4 mb-4" style={{ borderColor: "var(--a1)" }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">{what} needs Claude</div>
          <div className="dim text-xs mt-1">One key, pasted once, stays in this browser.</div>
        </div>
        <button onClick={onConnect} className="btn-go rounded-lg px-3 py-1 text-sm" style={{ whiteSpace: "nowrap" }}>Connect</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings — connecting Claude                                       */
/* ------------------------------------------------------------------ */

function Settings({ onQuit }) {
  const [key, setKeyVal] = useState(getKey());
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);
  const proxy = typeof window !== "undefined" && window.RECALL_API && !PROXY_DEAD;

  const test = async () => {
    setBusy(true); setState(null);
    setKey(key.trim());
    try {
      await askClaude([{ role: "user", content: "Reply with the single word: ready" }]);
      setState({ ok: true, msg: "Connected. Deck building, the tutor and explanations all work now." });
    } catch (e) {
      setState({ ok: false, msg: e instanceof NoAI ? "No key saved yet." : "That didn't work. Check the key and try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: "clamp(30px,7vw,48px)" }}>Settings</h1>
          <div className="dim text-sm">Three features need Claude. Everything else works without it.</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <div className="panel rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="font-semibold">Claude connection</div>
          <span className="pill rounded-full px-3 py-1" style={{ color: proxy || getKey() ? "var(--good)" : "var(--dim)" }}>
            {proxy ? "server key" : getKey() ? "your key" : "not connected"}
          </span>
        </div>
        <p className="dim text-sm mb-4" style={{ lineHeight: 1.5 }}>
          Building decks from a PDF, the Tutor, and "Why was that wrong?" all ask Claude.
          If this site has a server key set up, it's already handled. Otherwise paste your own below —
          it stays in this browser and is never uploaded with your save.
        </p>
        <input
          value={key}
          onChange={(e) => setKeyVal(e.target.value.trim())}
          placeholder="sk-ant-..."
          type="password"
          className="field rounded-xl px-4 py-3 w-full mb-3"
          style={{ fontFamily: "monospace", fontSize: 13 }}
        />
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setKey(""); setKeyVal(""); setState({ ok: false, msg: "Key removed." }); }}
            className="btn rounded-xl py-3">Clear</button>
          <button onClick={test} disabled={busy} className="btn-go rounded-xl py-3">
            {busy ? "Testing…" : "Save and test"}
          </button>
        </div>
        {state && <div className="text-sm mt-3" style={{ color: state.ok ? "var(--good)" : "var(--bad)" }}>{state.msg}</div>}
        <p className="dim text-xs mt-3">
          Keys come from console.anthropic.com. A browser key is fine for your own use;
          for a site other people use, put the key on the server instead so nobody can read it.
        </p>
      </div>

      <div className="panel2 rounded-2xl p-4">
        <div className="font-semibold mb-1">Works with no connection at all</div>
        <p className="dim text-sm" style={{ lineHeight: 1.5 }}>
          Uploads still work — PDFs are read right here in your browser, and anything shaped like
          "term — definition" becomes cards without asking Claude anything. Every game mode, your
          character, the room, the shop and mastery are all fully offline.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rich text — renders the light markdown Claude sends back           */
/* ------------------------------------------------------------------ */

function RichText({ children, size = 14 }) {
  const raw = String(children || "");
  const blocks = raw.split(/\n{2,}/);

  const inline = (line, key) => {
    const bits = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return (
      <span key={key}>
        {bits.map((b, n) =>
          b.startsWith("**") && b.endsWith("**")
            ? <strong key={n}>{b.slice(2, -2)}</strong>
            : <span key={n}>{b.replace(/\*/g, "")}</span>
        )}
      </span>
    );
  };

  return (
    <div style={{ fontSize: size, lineHeight: 1.55 }}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        const bulleted = lines.length > 0 && lines.every((l) => /^\s*[-*•]\s+/.test(l));
        if (bulleted) {
          return (
            <ul key={i} style={{ margin: "0 0 12px", paddingLeft: 18 }}>
              {lines.map((l, n) => (
                <li key={n} style={{ marginBottom: 5 }}>{inline(l.replace(/^\s*[-*•]\s+/, ""), n)}</li>
              ))}
            </ul>
          );
        }
        const heading = lines.length === 1 && /^#{1,3}\s+/.test(lines[0]);
        if (heading) {
          return (
            <div key={i} className="font-semibold" style={{ fontSize: size + 3, margin: "14px 0 6px" }}>
              {inline(lines[0].replace(/^#{1,3}\s+/, ""), 0)}
            </div>
          );
        }
        return (
          <p key={i} style={{ margin: "0 0 12px" }}>
            {lines.map((l, n) => <span key={n}>{inline(l, n)}{n < lines.length - 1 ? " " : ""}</span>)}
          </p>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dictation                                                          */
/* ------------------------------------------------------------------ */

const TRANSCRIBE_URL = "/api/transcribe";
const SEG_MS = 150000;           /* upload every two and a half minutes */

function speechSupport() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/* Records audio and posts it up in segments. For devices whose browser
   can't transcribe on its own, which mostly means iPhones. */
function useAudioNotes() {
  const [text, setText] = useState("");
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(0);
  const [err, setErr] = useState("");
  const rec = useRef(null);
  const chunks = useRef([]);
  const stream = useRef(null);
  const timer = useRef(null);
  const textRef = useRef("");

  const mimeFor = () => {
    const want = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac"];
    for (const m of want) {
      if (window.MediaRecorder && window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(m)) return m;
    }
    return "";
  };

  const send = useCallback(async (blob, mime) => {
    if (!blob || blob.size < 2000) return;
    setBusy((n) => n + 1);
    try {
      const b64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result).split(",")[1]);
        r.onerror = () => rej(new Error("read failed"));
        r.readAsDataURL(blob);
      });
      const out = await fetch(TRANSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: b64, mime }),
      });
      if (!out.ok) {
        const e = await out.json().catch(() => ({}));
        throw new Error(e.error || "That segment didn't go through.");
      }
      const data = await out.json();
      if (data.text) { textRef.current += data.text.trim() + " "; setText(textRef.current); }
    } catch (e) {
      setErr(e.message || "A segment didn't go through.");
    } finally {
      setBusy((n) => Math.max(0, n - 1));
    }
  }, []);

  const flush = useCallback((mime) => {
    if (!chunks.current.length) return;
    const blob = new Blob(chunks.current, { type: mime });
    chunks.current = [];
    send(blob, mime);
  }, [send]);

  const start = useCallback(async () => {
    setErr("");
    if (!navigator.mediaDevices || !window.MediaRecorder) { setErr("This browser can't record audio."); return; }
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = mimeFor();
      const r = new window.MediaRecorder(stream.current, mime ? { mimeType: mime } : undefined);
      rec.current = r;
      r.ondataavailable = (e) => { if (e.data && e.data.size) chunks.current.push(e.data); };
      r.start(4000);
      setOn(true);
      timer.current = setInterval(() => flush(mime || "audio/webm"), SEG_MS);
    } catch (e) {
      setErr(e && e.name === "NotAllowedError"
        ? "Microphone access was blocked. Allow it in your browser settings."
        : "Couldn't open the microphone.");
    }
  }, [flush]);

  const stop = useCallback(() => {
    const mime = rec.current ? rec.current.mimeType : "audio/webm";
    try { if (rec.current && rec.current.state !== "inactive") rec.current.stop(); } catch (e) {}
    try { if (stream.current) stream.current.getTracks().forEach((t) => t.stop()); } catch (e) {}
    if (timer.current) clearInterval(timer.current);
    setOn(false);
    setTimeout(() => flush(mime), 300);
  }, [flush]);

  const reset = useCallback(() => { textRef.current = ""; setText(""); chunks.current = []; }, []);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    try { if (stream.current) stream.current.getTracks().forEach((t) => t.stop()); } catch (e) {}
  }, []);

  return {
    text, on, busy, err, start, stop, reset, clear: reset,
    supported: typeof window !== "undefined" && Boolean(window.MediaRecorder && navigator.mediaDevices),
  };
}

function useDictation() {
  const Engine = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const [on, setOn] = useState(false);
  const [text, setText] = useState("");
  const [live, setLive] = useState("");
  const [err, setErr] = useState("");
  const rec = useRef(null);
  const want = useRef(false);

  const stop = useCallback(() => {
    want.current = false;
    setOn(false);
    setLive("");
    try { if (rec.current) rec.current.stop(); } catch (e) {}
  }, []);

  const start = useCallback(() => {
    if (!Engine) { setErr("This browser can't listen. Chrome, Edge or Safari can."); return; }
    setErr("");
    want.current = true;
    const build = () => {
      const r = new Engine();
      r.continuous = true;
      r.interimResults = true;
      r.lang = (typeof navigator !== "undefined" && navigator.language) || "en-US";
      r.onresult = (e) => {
        let add = "", interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const chunk = e.results[i][0].transcript;
          if (e.results[i].isFinal) add += chunk + " ";
          else interim += chunk;
        }
        if (add) setText((t) => (t + add).slice(-60000));
        setLive(interim);
      };
      r.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setErr("Microphone blocked. Allow it in your browser's site settings.");
          want.current = false;
          setOn(false);
        } else if (e.error === "audio-capture") {
          setErr("No microphone found.");
          want.current = false;
          setOn(false);
        }
      };
      r.onend = () => {
        /* browsers cut the stream on silence — pick it straight back up */
        if (want.current) { try { r.start(); } catch (e) { setTimeout(() => { try { r.start(); } catch (e2) {} }, 400); } }
        else setOn(false);
      };
      return r;
    };
    try {
      rec.current = build();
      rec.current.start();
      setOn(true);
    } catch (e) {
      setErr("Couldn't start listening. Try again.");
    }
  }, [Engine]);

  useEffect(() => () => { want.current = false; try { if (rec.current) rec.current.stop(); } catch (e) {} }, []);

  return { supported: Boolean(Engine), on, text, live, err, start, stop, clear: () => { setText(""); setLive(""); } };
}

/* ------------------------------------------------------------------ */
/*  Notes                                                              */
/* ------------------------------------------------------------------ */

const isPro = (prog) => Boolean(prog.pro);
const PRO_TICKETS = 3;
const PRO_COINS = 7000;

async function makeNotes(transcript, title) {
  const body = transcript.slice(0, 14000);
  return askClaude([{
    role: "user",
    content:
      `Here is a rough transcript of a lecture or study session. It has no punctuation to speak of and ` +
      `probably has mistakes from the speech recogniser — read through those.\n\n` +
      `TRANSCRIPT:\n${body}\n\n` +
      `Write study notes${title ? ` titled "${title}"` : ""} in this shape, using markdown:\n` +
      `A two sentence summary of what was covered. Then "## Key points" with 4-8 bullets. ` +
      `Then "## Terms" with each term and a short definition as bullets in the form **Term** — meaning. ` +
      `Then "## Worth checking" with 1-3 bullets on anything that sounded garbled or unclear. ` +
      `Stay under 400 words and keep it plain.`,
  }]);
}

function Recorder({ prog, onSave, onDeck, onUnlock, onQuit }) {
  const live = useDictation();
  const cloud = useAudioNotes();
  const [engine, setEngine] = useState(() => (speechSupport() ? "live" : "cloud"));
  const d = engine === "live"
    ? live
    : { text: cloud.text, live: "", on: cloud.on, err: cloud.err, start: cloud.start, stop: cloud.stop,
        reset: cloud.reset, supported: cloud.supported };
  const [secs, setSecs] = useState(0);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (!d.on) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [d.on]);

  useEffect(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [d.text, d.live]);

  const engines = [
    { id: "live", name: "Live", ok: Boolean(speechSupport()), note: "Words appear as they're said. Chrome and Edge." },
    { id: "cloud", name: "Upload", ok: cloud.supported, note: "Records audio and sends it up in chunks. Works on iPhone." },
  ];

  const words = d.text.trim() ? d.text.trim().split(/\s+/).length : 0;

  const write = async () => {
    setBusy(true); setErr("");
    try {
      const out = await makeNotes(d.text, title);
      setNotes(out);
    } catch (e) {
      setErr(e instanceof NoAI
        ? "Claude isn't connected. Open Settings to fix that — your transcript is safe here meanwhile."
        : "Couldn't write the notes. Try again.");
    } finally { setBusy(false); }
  };

  if (!isPro(prog)) {
    const canTickets = (prog.tickets || 0) >= PRO_TICKETS;
    const canCoins = prog.coins >= PRO_COINS;
    return (
      <div>
        <TopBar label="Back" left="Lecture recorder" right="" onQuit={onQuit} />
        <div className="hero mb-5">
          <div className="disp" style={{ fontSize: 30, lineHeight: 1.1 }}>Record the lecture.<br />Get the notes.</div>
          <p style={{ opacity: .85, marginTop: 10, lineHeight: 1.5, fontSize: 15 }}>
            Hit record at the start of class. It listens, keeps the transcript, and turns it into
            proper notes — summary, key points, every term defined — then builds a deck out of it.
          </p>
        </div>

        <div className="card2 p-5 mb-4">
          <div className="font-semibold mb-2">What you get</div>
          <ul className="dim" style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
            <li>Live transcript while someone's talking</li>
            <li>Notes written up automatically when you stop</li>
            <li>A deck built from the same recording, one tap</li>
            <li>Everything saved, nothing uploaded anywhere</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => onUnlock("tickets")} disabled={!canTickets}
            className="btn-go rounded-xl py-3" style={!canTickets ? { opacity: .45 } : undefined}>
            Unlock · {PRO_TICKETS}🎟
          </button>
          <button onClick={() => onUnlock("coins")} disabled={!canCoins}
            className="btn rounded-xl py-3" style={!canCoins ? { opacity: .45 } : undefined}>
            Unlock · {PRO_COINS.toLocaleString()} coins
          </button>
        </div>
        <p className="dim text-xs mt-3">
          You hold {(prog.coins || 0).toLocaleString()} coins and {prog.tickets || 0} tickets.
          Tickets come from mastering decks and beating the hard modes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <TopBar
        label="Back"
        left={d.on ? <span style={{ color: "var(--bad)" }}>● recording · {stamp(secs)}</span> : `${words} words`}
        right={<span className="dim text-sm">{d.on ? "listening" : secs ? stamp(secs) : ""}</span>}
        onQuit={() => { d.stop(); onQuit(); }}
      />

      <div className="card2 p-4 mb-4">
        <div className="dim text-xs mb-2">How should it listen?</div>
        <div className="seg" style={{ marginBottom: 10 }}>
          {engines.map((e) => (
            <button key={e.id} onClick={() => !d.on && e.ok && setEngine(e.id)}
              className={engine === e.id ? "on" : ""}
              style={!e.ok ? { opacity: .4 } : undefined}>
              {e.name}
            </button>
          ))}
        </div>
        <div className="dim text-xs" style={{ lineHeight: 1.5 }}>
          {(engines.find((e) => e.id === engine) || {}).note}
          {engine === "cloud" && cloud.busy > 0 && (
            <span style={{ color: "var(--a3)" }}> · sending {cloud.busy} segment{cloud.busy === 1 ? "" : "s"}…</span>
          )}
        </div>
      </div>

      {!d.supported && (
        <div className="card2 p-4 mb-4" style={{ borderColor: "var(--bad)" }}>
          <div className="font-semibold mb-1" style={{ color: "var(--bad)" }}>This device can't do that one</div>
          <p className="dim text-sm">Try the other option above, or paste a transcript on the Decks tab.</p>
        </div>
      )}

      <div className="card2 p-4 mb-4">
        <input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 60))}
          placeholder="What's this lecture? (optional)" className="field rounded-xl px-4 py-3 w-full mb-3" />

        <div
          ref={endRef}
          className="field rounded-xl p-4 mb-3"
          style={{ height: 220, overflowY: "auto", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}
        >
          {d.text || <span className="dim">
            Nothing yet. Hit record and start talking, or put your phone near the lecturer.
            {engine === "cloud" ? " Words arrive in batches every couple of minutes." : ""}
          </span>}
          {d.live && <span className="dim"> {d.live}</span>}
        </div>

        {d.err && <div className="text-sm mb-3" style={{ color: "var(--bad)" }}>{d.err}</div>}

        <div className="grid grid-cols-2 gap-3">
          {d.on ? (
            <button onClick={d.stop} className="btn rounded-xl py-3" style={{ borderColor: "var(--bad)", color: "var(--bad)" }}>
              Stop
            </button>
          ) : (
            <button onClick={d.start} disabled={!d.supported} className="btn-go rounded-xl py-3"
              style={!d.supported ? { opacity: .45 } : undefined}>
              {words ? "Keep going" : "Start recording"}
            </button>
          )}
          <button onClick={() => { (d.clear || d.reset)(); setNotes(""); setSecs(0); }} disabled={!words} className="btn rounded-xl py-3"
            style={!words ? { opacity: .45 } : undefined}>
            Clear
          </button>
        </div>
      </div>

      {words > 30 && !d.on && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button onClick={write} disabled={busy} className="btn-go rounded-xl py-3">
            {busy ? "Writing them up…" : "Write my notes"}
          </button>
          <button onClick={() => onDeck(d.text, title)} className="btn rounded-xl py-3">Build a deck from this</button>
        </div>
      )}

      {err && <div className="text-sm mb-3" style={{ color: "var(--bad)" }}>{err}</div>}

      {notes && (
        <div className="card2 p-5 mb-4 fadein">
          <div className="font-semibold mb-2">{title || "Your notes"}</div>
          <RichText>{notes}</RichText>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={() => { onSave({ title: title || "Lecture notes", body: notes, transcript: d.text }); }}
              className="btn-go rounded-xl py-3">Save these notes</button>
            <button onClick={() => onDeck(d.text, title)} className="btn rounded-xl py-3">Make a deck too</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Notes({ prog, onOpen, onDelete, onRecord, onDeck, onQuit }) {
  const list = prog.notes || [];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "clamp(28px,6vw,44px)" }}>Notes</h1>
          <div className="dim text-sm">{list.length ? `${list.length} saved` : "Nothing saved yet"}</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <button onClick={onRecord} className="bigbtn mb-5">Record a lecture</button>

      <div className="flex flex-col gap-3">
        {list.map((n) => (
          <div key={n.id} className="card2 p-4">
            <button onClick={() => onOpen(n)} className="text-left w-full">
              <div className="font-semibold" style={{ fontSize: 16 }}>{n.title}</div>
              <div className="dim text-sm mt-1">{n.date} · {n.body.split(/\s+/).length} words</div>
            </button>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => onDeck(n.transcript || n.body, n.title)}
                className="btn-go rounded-lg px-3 py-1 text-sm">Make a deck</button>
              <button onClick={() => onOpen(n)} className="btn rounded-lg px-3 py-1 text-sm">Read</button>
              <span style={{ flex: 1 }} />
              <button onClick={() => onDelete(n.id)} className="dim text-xs">Delete</button>
            </div>
          </div>
        ))}
        {!list.length && (
          <div className="card2 p-5 dim" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Record a class and the notes land here. Works with your phone on the desk, or talking
            through something yourself to see if you actually know it.
          </div>
        )}
      </div>
    </div>
  );
}

function NoteView({ note, onDeck, onQuit }) {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "clamp(24px,5vw,36px)" }}>{note.title}</h1>
          <div className="dim text-sm">{note.date}</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <div className="card2 p-5 mb-4">
        <RichText size={15}>{note.body}</RichText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <button onClick={() => onDeck(note.transcript || note.body, note.title)} className="btn-go rounded-xl py-3">
          Build a deck from this
        </button>
        {note.transcript && (
          <button onClick={() => setShowRaw(!showRaw)} className="btn rounded-xl py-3">
            {showRaw ? "Hide transcript" : "Show transcript"}
          </button>
        )}
      </div>

      {showRaw && (
        <div className="field rounded-xl p-4" style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
          {note.transcript}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Leaderboard                                                        */
/* ------------------------------------------------------------------ */

const boardOn = () => typeof window !== "undefined" && Boolean(window.RECALL_SCORES);

const BOARD_MODES = [
  { id: "survival", name: "Survival" },
  { id: "rush", name: "Recall Rush" },
  { id: "boss", name: "Boss Exam" },
  { id: "ladder", name: "Ladder" },
  { id: "quiz", name: "Quiz" },
];

function Board({ prog, onQuit }) {
  const [mode, setMode] = useState("survival");
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let live = true;
    setRows(null); setErr("");
    if (!boardOn()) { setRows([]); return; }
    window.RECALL_SCORES.top(mode)
      .then((r) => { if (live) setRows(r); })
      .catch(() => { if (live) { setRows([]); setErr("Couldn't load the board."); } });
    return () => { live = false; };
  }, [mode]);

  return (
    <div>
      <PageHead eyebrow="Everyone playing" title="Leaderboard"
        sub={boardOn() ? "Your best run in each mode, against everyone else's" : "Needs accounts turned on"} />

      <div className="scroller flex gap-2 mb-4 pb-1">
        {BOARD_MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={"chip rounded-full px-4 py-1 text-sm " + (mode === m.id ? "chip-on" : "")}
            style={{ whiteSpace: "nowrap" }}>{m.name}</button>
        ))}
      </div>

      {!boardOn() && (
        <div className="card2 p-5 dim" style={{ lineHeight: 1.6 }}>
          The leaderboard runs on the same accounts that sync progress between devices.
          Once those are switched on, everyone's best run shows up here.
        </div>
      )}

      {boardOn() && rows === null && <div className="card2 p-5 dim">Loading…</div>}
      {err && <div className="text-sm mb-3" style={{ color: "var(--bad)" }}>{err}</div>}

      {boardOn() && rows && rows.length === 0 && (
        <div className="card2 p-5 dim">Nobody's posted a score here yet. Be first.</div>
      )}

      {boardOn() && rows && rows.length > 0 && (
        <div className="flex flex-col gap-2">
          {rows.map((r) => (
            <div key={r.user_id + r.rank} className={"card2 p-3 flex items-center gap-3 " + (r.mine ? "eq" : "")}>
              <span className="disp" style={{
                fontSize: 18, width: 34, textAlign: "center",
                color: r.rank === 1 ? "var(--a1)" : r.rank === 2 ? "#C9C9D2" : r.rank === 3 ? "#C77A3A" : "var(--dim)",
              }}>{r.rank}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-semibold" style={{ fontSize: 15 }}>
                  {r.name}{r.mine ? " · you" : ""}
                </div>
                {r.deck && <div className="dim text-xs mt-1" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.deck}</div>}
              </div>
              <span className="disp" style={{ fontSize: 17 }}>{(r.score || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={onQuit} className="btn rounded-xl py-3 w-full mt-5">Back</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Item shop                                                          */
/* ------------------------------------------------------------------ */

const PATTERNS = [
  { id: "none", name: "Clean", price: 0, note: "Flat panels" },
  { id: "grain", name: "Grain", price: 1200, note: "Fine dot grid" },
  { id: "dotted", name: "Polka", price: 2000, note: "Bigger dots" },
  { id: "striped", name: "Diagonal", price: 3000, note: "Barber stripes" },
];

const SHAPES = [
  { id: "soft", name: "Soft", price: 0, note: "Default rounding" },
  { id: "sq", name: "Sharp", price: 900, note: "Tight corners" },
  { id: "round", name: "Pill", price: 900, note: "Very round" },
];

const RARITY = [
  { min: 6000, name: "Mythic", c: "#FF3B6B", g: ["#6B1030", "#2A0714"] },
  { min: 3000, name: "Legendary", c: "#F0A93A", g: ["#6B4410", "#2A1A06"] },
  { min: 1600, name: "Epic", c: "#A855F7", g: ["#3F1A6B", "#1B0A2E"] },
  { min: 800, name: "Rare", c: "#3B82F6", g: ["#12346B", "#07172E"] },
  { min: 0, name: "Common", c: "#8E96A8", g: ["#2A3044", "#141824"] },
];

const rarityOf = (it) => {
  if (it.ticket) return { name: "Vault", c: "#25D0C0", g: ["#0B4A46", "#04211F"] };
  return RARITY.find((r) => (it.price || 0) >= r.min) || RARITY[RARITY.length - 1];
};

function Countdown() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const end = new Date();
      end.setHours(24, 0, 0, 0);
      let s = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      setT(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="shopclock">{t}</span>;
}

/* what the tile actually shows */
function TileArt({ kind, slot, it }) {
  if (kind === "char") {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "62%" }}>
          <Avatar a={{ ...DEFAULT_AVATAR, top: "tee", [slot]: it.id }} fluid />
        </div>
      </div>
    );
  }
  if (kind === "room") {
    return (
      <div style={{ width: "100%", borderRadius: 8, overflow: "hidden", transform: "scale(1.25)" }}>
        <Room r={{ ...DEFAULT_ROOM, [slot]: it.id }} width="100%" />
      </div>
    );
  }
  if (kind === "theme") {
    const v = it.vars;
    return (
      <div style={{ width: "82%", borderRadius: 10, overflow: "hidden", border: "2px solid rgba(255,255,255,.25)" }}>
        <div style={{ background: v["--ink"], padding: 10 }}>
          <div style={{ height: 8, width: "70%", background: v["--text"], borderRadius: 99, marginBottom: 6, opacity: .9 }} />
          <div style={{ height: 6, width: "45%", background: v["--dim"], borderRadius: 99, marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 4 }}>
            {["--a1", "--a2", "--a3", "--a4"].map((k) => (
              <div key={k} style={{ flex: 1, height: 26, background: v[k], borderRadius: 6 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === "font") {
    return <div style={{ fontFamily: it.css + ", sans-serif", fontSize: 54, fontWeight: 800, lineHeight: 1 }}>Aa</div>;
  }
  if (kind === "pattern" || kind === "shape") {
    return (
      <div className={kind === "pattern" && it.id !== "none" ? it.id : ""}
        style={{
          width: "72%", height: 74, background: "rgba(255,255,255,.08)",
          border: "2px solid rgba(255,255,255,.3)",
          borderRadius: kind === "shape" ? (it.id === "sq" ? 4 : it.id === "round" ? 36 : 14) : 12,
        }} />
    );
  }
  if (kind === "sfx" || kind === "station") {
    return (
      <svg viewBox="0 0 100 60" style={{ width: "72%" }}>
        {[...Array(13)].map((_, n) => {
          const h = 8 + Math.abs(Math.sin((n + it.id.length) * 1.3)) * 40;
          return <rect key={n} x={n * 7.6 + 2} y={30 - h / 2} width="4.4" height={h} rx="2.2" fill="rgba(255,255,255,.85)" />;
        })}
      </svg>
    );
  }
  if (kind === "power") {
    const glyph = { life: "♥", fifty: "½", hint: "Aa", shield: "▲", double: "2×" }[it.id] || "★";
    return <div style={{ fontSize: 46, fontWeight: 800 }}>{glyph}</div>;
  }
  return null;
}

function ShopTile({ entry, prog, big, onOpen }) {
  const { kind, slot, it } = entry;
  const r = rarityOf(it);
  const key = (slot || kind) + ":" + it.id;
  const has = kind === "power" ? false : (!it.price && !it.ticket) || prog.owned.includes(key);
  const held = kind === "power" ? holdOf(prog, it.id) : 0;

  return (
    <button onClick={() => onOpen(entry)} className="shoptile" style={{ borderColor: r.c }}>
      <div className="shopart" style={{ background: `linear-gradient(165deg, ${r.g[0]} 0%, ${r.g[1]} 100%)`, height: big ? 190 : 138 }}>
        <TileArt kind={kind} slot={slot} it={it} />
        {has && <span className="shopowned">Owned</span>}
        {held > 0 && <span className="shopowned">×{held}</span>}
      </div>
      <div className="shoprarity" style={{ background: r.c }} />
      <div className="shopfoot">
        <div className="shopname" style={{ fontSize: big ? 14 : 12 }}>{it.name}</div>
        <div className="shopprice">
          {has ? <span className="dim" style={{ fontSize: 11 }}>in your locker</span>
            : it.quest ? <span className="dim" style={{ fontSize: 11 }}>task reward</span>
              : (
                <>
                  {it.was && <span style={{ textDecoration: "line-through", opacity: .5, marginRight: 5 }}>{it.was}</span>}
                  <span className={it.ticket ? "ticket" : "coin"}>{it.ticket ? `${it.ticket}🎟` : it.price}</span>
                </>
              )}
        </div>
      </div>
    </button>
  );
}

function ShopDetail({ entry, prog, onBuy, onEquip, onPower, onClose }) {
  const { kind, slot, it } = entry;
  const r = rarityOf(it);
  const key = (slot || kind) + ":" + it.id;
  const equipKind = ["theme", "font", "pattern", "shape", "sfx", "station"].includes(kind);
  const has = kind === "power" ? false : (!it.price && !it.ticket) || prog.owned.includes(key);
  const afford = prog.coins >= (it.price || 0) && (prog.tickets || 0) >= (it.ticket || 0);
  const where = kind === "char" ? "Wear it from Character." : kind === "room" ? "Place it from your Room." : "";

  return (
    <div className="shopmodal" onClick={onClose}>
      <div className="shopsheet" onClick={(e) => e.stopPropagation()}>
        <div className="shopart" style={{ background: `linear-gradient(165deg, ${r.g[0]} 0%, ${r.g[1]} 100%)`, height: 230, borderRadius: 14 }}>
          <TileArt kind={kind} slot={slot} it={it} />
        </div>
        <div className="flex items-center gap-2 mt-3 mb-1">
          <span className="shoptag" style={{ background: r.c }}>{r.name}</span>
          <span className="dim text-xs">{entry.label || kind}</span>
        </div>
        <div className="disp" style={{ fontSize: 24 }}>{it.name}</div>
        {it.note && <div className="dim text-sm mt-1">{it.note}</div>}
        {where && !has && <div className="dim text-xs mt-2">{where}</div>}

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={onClose} className="btn rounded-xl py-3">Close</button>
          {kind === "power" ? (
            <button onClick={() => { onPower(it); onClose(); }} disabled={prog.coins < it.price}
              className="btn-go rounded-xl py-3" style={prog.coins < it.price ? { opacity: .45 } : undefined}>
              Buy · {it.price}
            </button>
          ) : has && equipKind ? (
            <button onClick={() => { onEquip(kind, it.id); onClose(); }} className="btn-go rounded-xl py-3">
              {kind === "station" ? "Play it" : "Use it"}
            </button>
          ) : has ? (
            <button disabled className="btn rounded-xl py-3" style={{ opacity: .5 }}>Already yours</button>
          ) : it.quest ? (
            <button disabled className="btn rounded-xl py-3" style={{ opacity: .5 }}>Locked behind a task</button>
          ) : (
            <button onClick={() => { onBuy(key, it, kind === "char" || kind === "room" ? slot : kind, it.id); onClose(); }}
              disabled={!afford} className="btn-go rounded-xl py-3" style={!afford ? { opacity: .45 } : undefined}>
              Buy · {priceLabel(it)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Shop({ prog, onBuy, onEquip, onFreeze, onPower, music, onQuit }) {
  const [open, setOpen] = useState(null);
  const [tab, setTab] = useState("featured");

  const featured = useMemo(
    () => dailyStock(prog).map((e) => ({ kind: CHAR_SLOTS.some((s) => s.key === e.slot) ? "char" : "room", slot: e.slot, it: e.it, label: e.label })),
    [prog.owned.length]
  );

  const vault = useMemo(() => {
    const out = [];
    CHAR_SLOTS.forEach((sl) => sl.items.forEach((it) => { if (it.ticket) out.push({ kind: "char", slot: sl.key, it, label: sl.name }); }));
    ROOM_SLOTS.forEach((sl) => sl.items.forEach((it) => { if (it.ticket) out.push({ kind: "room", slot: sl.key, it, label: sl.name }); }));
    return out;
  }, []);

  const looks = [
    ...THEMES.map((it) => ({ kind: "theme", it, label: "Theme" })),
    ...FONTS.map((it) => ({ kind: "font", it, label: "Display type" })),
    ...PATTERNS.map((it) => ({ kind: "pattern", it, label: "Texture" })),
    ...SHAPES.map((it) => ({ kind: "shape", it, label: "Corners" })),
  ];
  const sounds = [
    ...STATIONS.map((it) => ({ kind: "station", it, label: "Music" })),
    ...SFX_PACKS.map((it) => ({ kind: "sfx", it, label: "Effects" })),
  ];
  const powers = POWERUPS.map((it) => ({ kind: "power", it, label: "Power-up" }));

  const TABS = [
    ["featured", "Featured"],
    ["vault", "Vault"],
    ["look", "Look"],
    ["sound", "Sound"],
    ["power", "Power-ups"],
  ];

  const shown = { featured, vault, look: looks, sound: sounds, power: powers }[tab];

  return (
    <div>
      <PageHead eyebrow="Spend it" title="Item Shop"
        sub={`${(prog.coins || 0).toLocaleString()} coins · ${prog.tickets || 0} tickets`} />

      <div className="scroller flex gap-2 mb-5 pb-1">
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={"chip rounded-full px-4 py-1 text-sm " + (tab === id ? "chip-on" : "")} style={{ whiteSpace: "nowrap" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "featured" && (
        <div className="flex items-baseline gap-3 mb-3">
          <h2 className="disp" style={{ fontSize: 20, letterSpacing: "0.08em" }}>FEATURED</h2>
          <Countdown />
        </div>
      )}
      {tab === "vault" && (
        <p className="dim text-sm mb-3">
          Ticket only. Coins don't open these — master a deck or beat the hard modes.
        </p>
      )}
      {tab === "power" && (
        <p className="dim text-sm mb-3">Consumable. Spent the moment they help you.</p>
      )}

      <div className="shopgrid">
        {shown.map((e, n) => (
          <ShopTile key={(e.slot || e.kind) + ":" + e.it.id + n} entry={e} prog={prog}
            big={tab === "featured"} onOpen={setOpen} />
        ))}
        {!shown.length && <div className="panel rounded-2xl p-5 dim">Nothing here right now. Check back tomorrow.</div>}
      </div>

      {tab === "power" && (
        <div className="panel rounded-2xl p-4 mt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Streak freeze</div>
              <div className="dim text-xs">Skip a day without losing your run · you hold {prog.freezes || 0}</div>
            </div>
            <button onClick={onFreeze} disabled={prog.coins < 1200} className="btn-go rounded-lg px-3 py-1 text-sm"
              style={prog.coins < 1200 ? { opacity: .45 } : undefined}>1200</button>
          </div>
        </div>
      )}

      {open && (
        <ShopDetail entry={open} prog={prog} onBuy={onBuy} onEquip={onEquip} onPower={onPower} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Redeem codes                                                       */
/* ------------------------------------------------------------------ */

function everyItemKey() {
  const keys = [];
  CHAR_SLOTS.forEach((s) => s.items.forEach((it) => { if (it.price || it.ticket || it.quest) keys.push(s.key + ":" + it.id); }));
  ROOM_SLOTS.forEach((s) => s.items.forEach((it) => { if (it.price || it.ticket || it.quest) keys.push(s.key + ":" + it.id); }));
  THEMES.forEach((t) => keys.push("theme:" + t.id));
  FONTS.forEach((f) => keys.push("font:" + f.id));
  PATTERNS.forEach((p) => keys.push("pattern:" + p.id));
  SHAPES.forEach((p) => keys.push("shape:" + p.id));
  SFX_PACKS.forEach((p) => keys.push("sfx:" + p.id));
  STATIONS.forEach((p) => keys.push("station:" + p.id));
  return keys;
}

const CODES = [
  { code: "BADTA", name: "the whole shop", all: true, coins: 250000, tickets: 250 },
  { code: "GHOSTED", name: "Ghost theme and a holographic aura", grant: ["theme:ghost", "aura:holo"], coins: 500 },
  { code: "1OF1", name: "The GOAT title", grant: ["title:goat"] },
  { code: "UNSPOKEN", name: "Sunset theme and gold plating", grant: ["theme:sunset", "plate:gold"] },
  { code: "ALLNIGHTER", name: "coffee, an energy drink and 8am eyes", grant: ["hand:coffee", "hand:energy", "eyes:dead"], coins: 400 },
  { code: "PIGEON", name: "a pigeon friend", grant: ["hat:pigeon"] },
  { code: "LOCKEDIN", name: "Deep focus station and a lava lamp", grant: ["station:drone", "lamp:lava"] },
  { code: "FRESHMAN", name: "a starter pile of coins", coins: 2000 },
  { code: "GOODLUCK", name: "two tickets", tickets: 2 },
  { code: "TREX", name: "the inflatable T-rex", grant: ["hat:trex"] },
];

function redeem(prog, raw) {
  const code = (raw || "").trim().toUpperCase();
  if (!code) return { ok: false, msg: "Type a code first." };
  const found = CODES.find((c) => c.code === code);
  if (!found) return { ok: false, msg: "That code isn't one of ours." };
  if ((prog.codes || []).includes(code)) return { ok: false, msg: "You've already used that one." };
  const owned = new Set(prog.owned);
  (found.all ? everyItemKey() : found.grant || []).forEach((k) => owned.add(k));
  return {
    ok: true,
    msg: `${code} — unlocked ${found.name}`,
    next: {
      ...prog,
      owned: [...owned],
      coins: prog.coins + (found.coins || 0),
      tickets: (prog.tickets || 0) + (found.tickets || 0),
      codes: [...(prog.codes || []), code],
    },
  };
}

function Codes({ prog, onRedeem, onQuit }) {
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState(null);
  const [ok, setOk] = useState(false);

  const go = () => {
    const res = onRedeem(val);
    setMsg(res.msg);
    setOk(res.ok);
    if (res.ok) setVal("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: "clamp(30px,7vw,48px)" }}>Codes</h1>
          <div className="dim text-sm">Found one somewhere? Put it in.</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>

      <div className="panel rounded-2xl p-5 mb-5">
        <div className="flex gap-2 mb-3">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value.toUpperCase())}
            onKeyDown={(e) => { if (e.key === "Enter") go(); }}
            placeholder="ENTER CODE"
            className="field rounded-xl px-4 py-3 w-full"
            style={{ fontSize: 18, letterSpacing: "0.12em" }}
          />
          <button onClick={go} className="btn-go rounded-xl px-5">Redeem</button>
        </div>
        {msg && (
          <div className="text-sm" style={{ color: ok ? "var(--good)" : "var(--bad)" }}>{msg}</div>
        )}
      </div>

      <div className="panel2 rounded-2xl p-4 mb-5">
        <div className="font-semibold mb-1">Codes you've used</div>
        {(prog.codes || []).length ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {(prog.codes || []).map((c) => (
              <span key={c} className="pill rounded-full px-3 py-1" style={{ letterSpacing: "0.08em" }}>{c}</span>
            ))}
          </div>
        ) : (
          <div className="dim text-sm">None yet. Each one works once per profile.</div>
        )}
      </div>

      <p className="dim text-sm" style={{ lineHeight: 1.5 }}>
        Codes are hidden in the app, handed out, and occasionally guessable if you know the person who built it.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Deck picker — packs on a shelf                                     */
/* ------------------------------------------------------------------ */

const PACK_SKINS = [
  { a: "#7C3BE0", b: "#3B1E7A", c: "#FFD166" },
  { a: "#1FA9A0", b: "#0C4C56", c: "#B8F5D0" },
  { a: "#E0533B", b: "#7A1F2C", c: "#FFD9A0" },
  { a: "#3B6FE0", b: "#152C6B", c: "#9FD8F0" },
  { a: "#D93B8C", b: "#5C1246", c: "#FFE0F0" },
  { a: "#5CA83B", b: "#1E4A20", c: "#EAF7C0" },
];

const skinFor = (id) => {
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) % 997;
  return PACK_SKINS[n % PACK_SKINS.length];
};

function Pack({ deck, prog, front, onClick }) {
  const sk = skinFor(deck.id);
  const pct = masteryPct(prog, deck);
  const left = deck.exam ? daysBetween(deck.exam) : null;
  return (
    <button
      onClick={onClick}
      aria-label={deck.title}
      style={{
        width: "100%", height: "100%", borderRadius: 16, overflow: "hidden",
        border: "3px solid " + (front ? sk.c : "rgba(255,255,255,0.18)"),
        background: `linear-gradient(160deg, ${sk.a} 0%, ${sk.b} 100%)`,
        boxShadow: front ? "0 18px 40px rgba(0,0,0,0.45)" : "0 10px 24px rgba(0,0,0,0.35)",
        position: "relative", padding: 12, textAlign: "left", color: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.22 }}>
        {[...Array(9)].map((_, n) => (
          <div key={n} style={{
            position: "absolute", left: `${(n * 37) % 86}%`, top: `${(n * 53) % 80}%`,
            width: 26, height: 26, borderRadius: 99, border: "3px solid #fff", opacity: 0.5,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.85, fontWeight: 700 }}>RECALL DECK</span>
        <span style={{ fontSize: 10, fontWeight: 800, background: "rgba(0,0,0,0.35)", borderRadius: 6, padding: "2px 6px" }}>
          {deck.cards.length}
        </span>
      </div>

      <div style={{ position: "relative", textAlign: "center", padding: "6px 2px" }}>
        <div className="disp" style={{ fontSize: front ? 19 : 15, lineHeight: 1.1, textShadow: "0 2px 10px rgba(0,0,0,.5)" }}>
          {deck.title.length > 42 ? deck.title.slice(0, 40) + "…" : deck.title}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        {left !== null && left >= 0 && (
          <div style={{ fontSize: 10, fontWeight: 700, background: sk.c, color: "#1A1424", borderRadius: 99, padding: "2px 8px", display: "inline-block", marginBottom: 6 }}>
            {left === 0 ? "EXAM TODAY" : `${left}d TO EXAM`}
          </div>
        )}
        <div style={{ height: 6, borderRadius: 99, background: "rgba(0,0,0,0.35)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: sk.c }} />
        </div>
        <div style={{ fontSize: 10, marginTop: 4, opacity: 0.85 }}>{pct}% mastered</div>
      </div>
    </button>
  );
}

function DeckPicker({ decks, deckId, prog, onSelect, onNew, onEdit, onRemove }) {
  const [shared, setShared] = useState("");
  const [confirmDel, setConfirmDel] = useState(null);
  const idx = Math.max(0, decks.findIndex((d) => d.id === deckId));
  const deck = decks[idx] || decks[0];

  const step = (dir) => {
    const n = (idx + dir + decks.length) % decks.length;
    onSelect(decks[n].id);
  };

  return (
    <div>
      <div style={{ position: "relative", height: 250, marginBottom: 10 }}>
        {decks.map((d, n) => {
          let off = n - idx;
          if (decks.length > 3) {
            if (off > decks.length / 2) off -= decks.length;
            if (off < -decks.length / 2) off += decks.length;
          }
          if (Math.abs(off) > 2) return null;
          const front = off === 0;
          return (
            <div
              key={d.id}
              style={{
                position: "absolute", left: "50%", top: 0,
                width: 158, height: 232,
                transform: `translateX(-50%) translateX(${off * 96}px) scale(${front ? 1 : 0.84}) rotate(${off * 5}deg) translateY(${front ? 0 : 16}px)`,
                zIndex: 10 - Math.abs(off),
                opacity: front ? 1 : 0.75,
                transition: "transform .35s cubic-bezier(.3,.9,.4,1), opacity .25s ease",
                filter: front ? "none" : "saturate(0.75) brightness(0.8)",
              }}
            >
              <Pack deck={d} prog={prog} front={front} onClick={() => (front ? null : onSelect(d.id))} />
            </div>
          );
        })}

        {decks.length > 1 && (
          <>
            <button onClick={() => step(-1)} aria-label="Previous deck" className="btn rounded-full"
              style={{ position: "absolute", left: 0, top: 96, width: 40, height: 40, zIndex: 20 }}>‹</button>
            <button onClick={() => step(1)} aria-label="Next deck" className="btn rounded-full"
              style={{ position: "absolute", right: 0, top: 96, width: 40, height: 40, zIndex: 20 }}>›</button>
          </>
        )}
      </div>

      <div className="text-center mb-3">
        <div className="font-semibold" style={{ fontSize: 16 }}>{deck.title}</div>
        <div className="dim text-sm">
          {deck.cards.length} cards · {dueCount(prog, deck, Date.now())} due
          {decks.length > 1 ? ` · deck ${idx + 1} of ${decks.length}` : ""}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={onNew} className="btn rounded-lg px-3 py-1 text-sm">New deck</button>
        <button onClick={onEdit} className="btn rounded-lg px-3 py-1 text-sm">Edit cards</button>
        <button onClick={() => { const c = encodeDeck(deck); setShared(c); try { navigator.clipboard.writeText(c); } catch (e) {} }} className="btn rounded-lg px-3 py-1 text-sm">{shared ? "Code copied" : "Share deck"}</button>
        {!deck.builtin && (
          confirmDel === deck.id ? (
            <>
              <button onClick={() => { onRemove(deck.id); setConfirmDel(null); }}
                className="btn rounded-lg px-3 py-1 text-sm" style={{ color: "var(--bad)", borderColor: "var(--bad)" }}>
                Delete {deck.cards.length} cards
              </button>
              <button onClick={() => setConfirmDel(null)} className="btn rounded-lg px-3 py-1 text-sm">Keep it</button>
            </>
          ) : (
            <button onClick={() => setConfirmDel(deck.id)} className="btn rounded-lg px-3 py-1 text-sm">Remove</button>
          )
        )}
      </div>
      {shared && (
        <textarea readOnly value={shared} rows={3} onFocus={(e) => e.target.select()}
          className="field rounded-xl p-3 w-full mt-3" style={{ fontSize: 10, fontFamily: "monospace" }} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Music panel                                                        */
/* ------------------------------------------------------------------ */

function MusicPanel({ music, prog, onClose }) {
  return (
    <div className="panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold">Background sound</span>
        <button onClick={onClose} className="dim text-sm">Close</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {STATIONS.map((s) => {
          const has = s.price === 0 || prog.owned.includes("station:" + s.id);
          const on = music.station === s.id;
          return (
            <button key={s.id} onClick={() => (has ? (on ? music.stop() : music.play(s.id)) : null)}
              className={"btn rounded-xl p-3 text-left " + (on ? "eq" : "") + (has ? "" : " locked")}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{s.name}</span>
                {!has && <span className="coin text-xs">{priceLabel(s)}</span>}
                {on && <span className="text-xs" style={{ color: "var(--a3)" }}>playing</span>}
              </div>
              <div className="dim text-xs mt-1">{has ? s.note : "Unlock in the shop"}</div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <span className="dim text-sm">Volume</span>
        <input type="range" min="0" max="1" step="0.02" value={music.vol}
          onChange={(e) => music.setVol(parseFloat(e.target.value))} className="w-full" style={{ accentColor: "var(--a3)" }} />
        {music.station && <button onClick={music.stop} className="btn rounded-lg px-3 py-1 text-sm">Stop</button>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Daily bonus + battle pass                                          */
/* ------------------------------------------------------------------ */

function DailyCard({ prog, onClaim }) {
  const l = prog.login || { last: "", day: 0 };
  const nextDay = l.last === yesterStr() ? (l.day % 7) + 1 : 1;
  return (
    <div className="panel rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="disp" style={{ fontSize: 24 }}>Daily bonus</div>
          <div className="dim text-sm">Day {nextDay} of 7 · miss a day and it resets</div>
        </div>
        <button onClick={onClaim} className="btn-go rounded-xl px-4 py-2">Claim</button>
      </div>
      <div className="scroller flex gap-2">
        {DAILY.map((d) => (
          <div key={d.day} className={"tier panel2 rounded-xl p-2 text-center " + (d.day < nextDay ? "got" : d.day === nextDay ? "now" : "")}>
            <div className="dim text-xs">Day {d.day}</div>
            <div className="font-semibold coin" style={{ fontSize: 13 }}>{d.coins || 0}</div>
            {d.tickets && <div className="ticket text-xs">{d.tickets}🎟</div>}
            {d.item && <div className="dim text-xs">{d.itemName}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Pass({ prog, onQuit }) {
  const { tier, into, need } = passState(prog);
  const tiers = [...Array(40)].map((_, n) => n + 1);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "clamp(32px,7vw,54px)" }}>Study pass</h1>
          <div className="dim text-sm">Tier {tier} · {into} / {need} XP to the next one</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>
      <div className="xpbar mb-6"><i style={{ width: `${(into / need) * 100}%` }} /></div>
      <p className="dim text-sm mb-4">
        XP comes from studying, not spending. Every card you see pays a little, every card you get right pays more,
        and pushing a card up a level pays most.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tiers.map((n) => {
          const r = tierReward(n);
          const got = n <= tier;
          return (
            <div key={n} className={"panel rounded-xl p-3 " + (got ? "got" : n === tier + 1 ? "now" : "locked")} style={{ borderWidth: 1 }}>
              <div className="dim text-xs mb-1">Tier {n}</div>
              {r.kind === "item" ? <div className="font-medium" style={{ fontSize: 13, lineHeight: 1.25 }}>{r.name}</div>
                : r.kind === "tickets" ? <div className="ticket font-semibold" style={{ fontSize: 14 }}>{r.amount} tickets</div>
                  : <div className="coin font-semibold" style={{ fontSize: 14 }}>{r.amount} coins</div>}
              {got && <div className="text-xs mt-1" style={{ color: "var(--good)" }}>Collected</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tasks({ prog, onClaim, onQuit }) {
  const ready = claimable(prog);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: "clamp(32px,7vw,54px)" }}>Tasks</h1>
          <div className="dim text-sm">{ready > 0 ? `${ready} ready to claim` : "Rewards land in your room and closet"}</div>
        </div>
        <button onClick={onQuit} className="btn rounded-lg px-3 py-1 text-sm">Back</button>
      </div>
      <div className="flex flex-col gap-3">
        {QUESTS.map((q) => {
          const { have, done, claimed } = questState(q, prog);
          return (
            <div key={q.id} className={"panel rounded-2xl p-4 " + (done && !claimed ? "eq" : claimed ? "locked" : "")}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold" style={{ fontSize: 16 }}>{q.name}</div>
                  <div className="dim text-sm">{q.desc}</div>
                </div>
                {claimed ? <span className="dim text-sm">Claimed</span>
                  : done ? <button onClick={() => onClaim(q)} className="btn-go rounded-lg px-3 py-1 text-sm">Claim</button>
                    : <span className="dim text-sm" style={{ whiteSpace: "nowrap" }}>{have.toLocaleString()} / {q.goal.toLocaleString()}</span>}
              </div>
              <div className="meter mb-2"><i style={{ width: `${(have / q.goal) * 100}%` }} /></div>
              <div className="dim text-xs">
                <span className="coin">{q.coins} coins</span>
                {q.tickets ? <span className="ticket"> · {q.tickets} tickets</span> : null}
                {" · unlocks "}{q.rewardName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

const MODE_GROUPS = [
  {
    id: "learn", name: "Learn it", note: "Best when the material is still new",
    modes: [
      { id: "cards", name: "Flashcards", blurb: "Flip through at your own pace." },
      { id: "quiz", name: "Quiz", blurb: "Four choices with a clock. Explains every miss." },
      { id: "match", name: "Match", blurb: "Pair each term with its definition." },
    ],
  },
  {
    id: "test", name: "Test it", note: "No hints. Find out what actually stuck",
    modes: [
      { id: "type", name: "Type it", blurb: "Read the definition, name the term." },
      { id: "sort", name: "Speed Sort", blurb: "Throw each term into the right pile." },
      { id: "leap", name: "Leap", blurb: "Your character jumps to the answer you pick." },
    ],
  },
  {
    id: "push", name: "Push it", note: "Scored, timed, and unforgiving",
    modes: [
      { id: "survival", name: "Survival", blurb: "Three lives, power-ups, one second chance." },
      { id: "boss", name: "Boss Exam", blurb: "Fight the midterm using your weakest cards." },
      { id: "rush", name: "Recall Rush", blurb: "Sixty seconds. As many as you can take." },
      { id: "ladder", name: "Ladder", blurb: "Climb for more, or bank it and walk." },
    ],
  },
  {
    id: "lounge", name: "Lounge", note: "Nothing scored, nothing timed",
    modes: [
      { id: "drift", name: "Drift", blurb: "Cards turn themselves over, read aloud if you want." },
      { id: "browse", name: "Browse", blurb: "Read the deck and get any card explained." },
      { id: "tutor", name: "Tutor", blurb: "Ask questions, answered from your own deck." },
    ],
  },
];

const PLAY_MODES = MODE_GROUPS.filter((g) => g.id !== "lounge").flatMap((g) => g.modes);
const LOUNGE_MODES = MODE_GROUPS.find((g) => g.id === "lounge").modes;

const ALL_MODES = [...PLAY_MODES, ...LOUNGE_MODES];
const NAV_SCREENS = ["home", "decks", "study", "char", "room", "shop"];
const LENGTHS = [10, 20, 0];
const BLANK_STATS = { rounds: 0, perfect: 0, correct: 0, bestSurvival: 0, modes: [], drift: 0, asks: 0, built: 0, bosses: 0, survivalClears: 0, ladderTops: 0, today: 0, day: "" };
const BLANK_WALLET = {
  coins: 0, tickets: 0, xp: 0, owned: [], claimed: [], login: { last: "", day: 0 },
  equip: { theme: "twilight", font: "bricolage", pattern: "none", shape: "soft", sfx: "soft" },
  bonus: "", avatar: null, room: null, stats: BLANK_STATS,
};

export default function App() {
  const [decks, setDecks] = useState(STARTER_DECKS);
  const [prog, setProg] = useState({ ...BLANK_PROGRESS, ...BLANK_WALLET });
  const [deckId, setDeckId] = useState("psc205");
  const [len, setLen] = useState(10);
  const [order, setOrder] = useState("smart");
  const [screen, setScreen] = useState("boot");
  const [mode, setMode] = useState("quiz");
  const [playCards, setPlayCards] = useState([]);
  const [result, setResult] = useState(null);
  const [earned, setEarned] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [musicOpen, setMusicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [me, setMe] = useState(null);
  const [storageOk, setStorageOk] = useState(true);
  const [savedAt, setSavedAt] = useState(0);
  const [pending, setPending] = useState(null);
  const [dblArmed, setDblArmed] = useState(false);
  const booting = useRef(true);
  const nextScreen = useRef(null);
  const [tab, setTab] = useState("home");
  const [note, setNote] = useState(null);
  const [hunt, setHunt] = useState("");
  const music = useMusic();

  const deck = decks.find((d) => d.id === deckId) || decks[0];
  const theme = THEMES.find((t) => t.id === prog.equip.theme) || THEMES[0];
  const font = FONTS.find((f) => f.id === prog.equip.font) || FONTS[0];
  const rootVars = { ...theme.vars, "--disp": font.css };
  const pat = prog.equip.pattern && prog.equip.pattern !== "none" ? " " + prog.equip.pattern : "";
  const shape = prog.equip.shape && prog.equip.shape !== "soft" ? " " + prog.equip.shape : "";
  const sfx = prog.equip.sfx || "soft";

  useEffect(() => {
    let live = true;
    (async () => {
      const list = await loadProfiles();
      const last = await storeGet(LAST_KEY);
      if (!live) return;
      setProfiles(list);
      setLoaded(true);
      if (list.length && last && list.some((p) => p.id === last)) {
        const p = list.find((x) => x.id === last);
        if (!p.pin) openProfile(p);
        else { setPending(p); goOrHold("profiles"); }
      }
    })();
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => { live = false; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hydrate = (raw) => {
    const base = { ...BLANK_PROGRESS, ...BLANK_WALLET, ...(raw || {}) };
    base.equip = { ...BLANK_WALLET.equip, ...(base.equip || {}) };
    base.stats = { ...BLANK_STATS, ...(base.stats || {}) };
    if (base.stats.day !== todayStr()) { base.stats.today = 0; base.stats.day = todayStr(); }
    base.owned = base.owned || [];
    base.claimed = base.claimed || [];
    base.login = base.login || { last: "", day: 0 };
    base.examDone = base.examDone || {};
    base.examCount = base.examCount || {};
    return rollWeek(touchStreak(base));
  };

  const goOrHold = (target) => {
    if (booting.current) nextScreen.current = target;
    else setScreen(target);
  };

  const openProfile = async (p) => {
    const data = await storeGet(saveKeyFor(p.id));
    const saved = (data && data.decks) || [];
    const ids = new Set(saved.map((d) => d.id));
    setDecks([...STARTER_DECKS.filter((d) => !ids.has(d.id)), ...saved]);
    setDeckId((saved[0] && saved[0].id) || "psc205");
    const hydrated = hydrate(data && data.prog);
    setProg(hydrated);
    setMe(p);
    await storeSet(LAST_KEY, p.id);
    goOrHold(hydrated.avatar ? "home" : "create");
  };

  const createProfile = async (name, pin) => {
    const p = { id: "p" + Date.now(), name, pin, avatar: DEFAULT_AVATAR };
    const list = [...profiles, p];
    setProfiles(list);
    const ok = await saveProfiles(list);
    setStorageOk(ok);
    setDecks(STARTER_DECKS);
    setDeckId("psc205");
    setProg(hydrate(null));
    setMe(p);
    await storeSet(LAST_KEY, p.id);
    setScreen("create");
  };

  const deleteProfile = async (p) => {
    const list = profiles.filter((x) => x.id !== p.id);
    setProfiles(list);
    await saveProfiles(list);
    await storeSet(saveKeyFor(p.id), null);
    if (me && me.id === p.id) {
      setMe(null);
      setDecks(STARTER_DECKS);
      setDeckId("psc205");
      setProg({ ...BLANK_PROGRESS, ...BLANK_WALLET });
      setScreen("profiles");
    }
  };

  const restoreCode = (code) => {
    const data = decodeSave(code);
    if (!data || !data.prog) return false;
    const p = { id: "p" + Date.now(), name: data.name || "Restored", pin: "", avatar: (data.prog && data.prog.avatar) || DEFAULT_AVATAR };
    const list = [...profiles, p];
    setProfiles(list);
    saveProfiles(list);
    const saved = data.decks || [];
    const ids = new Set(saved.map((d) => d.id));
    setDecks([...STARTER_DECKS.filter((d) => !ids.has(d.id)), ...saved]);
    setProg(hydrate(data.prog));
    setMe(p);
    storeSet(LAST_KEY, p.id);
    storeSet(saveKeyFor(p.id), { decks: saved, prog: data.prog });
    setScreen("home");
    say("Save restored");
    return true;
  };

  const persist = async (nextDecks, nextProg) => {
    if (!me) return;
    const ok = await storeSet(saveKeyFor(me.id), {
      decks: (nextDecks || decks).filter((d) => !d.builtin),
      prog: nextProg || prog,
    });
    setStorageOk(ok);
    if (ok) setSavedAt(Date.now());
  };

  const saveDecks = (list) => { setDecks(list); persist(list, null); };
  const saveProg = (p) => { setProg(p); persist(null, p); };

  const say = (msg, action) => {
    setToast({ msg, action });
    setTimeout(() => setToast((t) => (t && t.msg === msg ? null : t)), action ? 7000 : 2600);
  };


  const addDeck = (d) => {
    saveDecks([...decks, d]);
    setDeckId(d.id);
    saveProg({ ...prog, stats: { ...prog.stats, built: (prog.stats.built || 0) + 1 } });
  };

  const removeDeck = (id) => {
    const gone = decks.find((d) => d.id === id);
    const next = decks.filter((d) => d.id !== id);
    const safe = next.length ? next : STARTER_DECKS;
    saveDecks(safe);
    if (deckId === id) setDeckId(safe[0].id);
    if (gone) say(`${gone.title} deleted`, () => { saveDecks([...safe.filter((d) => d.id !== gone.id), gone]); setDeckId(gone.id); });
  };

  const saveEdited = (edited) => {
    const exists = decks.some((d) => d.id === edited.id);
    saveDecks(exists ? decks.map((d) => (d.id === edited.id ? edited : d)) : [...decks, edited]);
    setDeckId(edited.id);
    setScreen("home");
  };

  const newDeck = () => {
    const d = { id: "d" + Date.now(), title: "New deck", note: "", cards: [{ t: "", d: "" }] };
    setDecks([...decks, d]);
    setDeckId(d.id);
    setScreen("editor");
  };

  const flagCard = (card) => {
    const m = { ...prog.mastery };
    m[ckey(deck.id, card)] = { ...recOf(prog, deck.id, card), lvl: 0, due: 0 };
    saveProg({ ...prog, mastery: m });
  };

  const buy = (id, it, kind, refId) => {
    const price = it.price || 0, tick = it.ticket || 0;
    if (prog.coins < price || (prog.tickets || 0) < tick || prog.owned.includes(id)) return;
    const next = {
      ...prog, coins: prog.coins - price, tickets: (prog.tickets || 0) - tick,
      owned: [...prog.owned, id],
    };
    if (["theme", "font", "pattern", "shape", "sfx"].includes(kind)) next.equip = { ...next.equip, [kind]: refId };
    saveProg(next);
    playSfx(sfx, "coin");
    if (kind === "station") music.play(refId);
  };

  const equip = (kind, refId) => {
    if (kind === "station") { music.play(refId); return; }
    saveProg({ ...prog, equip: { ...prog.equip, [kind]: refId } });
    if (kind === "sfx") playSfx(refId, "right");
  };

  const claim = (q) => {
    if (prog.claimed.includes(q.id)) return;
    saveProg({
      ...prog, coins: prog.coins + q.coins, tickets: (prog.tickets || 0) + (q.tickets || 0),
      claimed: [...prog.claimed, q.id],
      owned: prog.owned.includes(q.reward) ? prog.owned : [...prog.owned, q.reward],
    });
    playSfx(sfx, "level");
    say(`${q.coins} coins and ${q.rewardName} unlocked`);
  };

  const setExam = (id, date) => {
    saveDecks(decks.map((d) => (d.id === id ? { ...d, exam: date || undefined } : d)));
    say(date ? "Exam date set" : "Exam countdown off");
  };

  const claimWeek = (c) => {
    const wk = prog.week || { id: weekId(), base: {}, claimed: [] };
    if ((wk.claimed || []).includes(c.id)) return;
    saveProg({ ...prog, coins: prog.coins + c.coins, week: { ...wk, claimed: [...(wk.claimed || []), c.id] } });
    playSfx(sfx, "coin");
    say(`${c.name} — ${c.coins} coins`);
  };

  const unlockPro = (how) => {
    if (prog.pro) return;
    if (how === "tickets") {
      if ((prog.tickets || 0) < PRO_TICKETS) return;
      saveProg({ ...prog, pro: true, tickets: prog.tickets - PRO_TICKETS });
    } else {
      if (prog.coins < PRO_COINS) return;
      saveProg({ ...prog, pro: true, coins: prog.coins - PRO_COINS });
    }
    playSfx(sfx, "level");
    say("Lecture recorder unlocked");
  };

  const saveNote = (n) => {
    const entry = { ...n, id: "n" + Date.now(), date: new Date().toLocaleDateString() };
    saveProg({ ...prog, notes: [entry, ...(prog.notes || [])].slice(0, 40) });
    say("Notes saved");
    setNote(entry);
    setScreen("note");
  };

  const deckFromText = async (text, title) => {
    setScreen("decks");
    say("Building a deck from that…");
    try {
      const all = [];
      for (let p = 0; p < PARTS.length; p++) {
        const got = await askForCards({ kind: "text", data: text }, PARTS[p], all.map((c) => c.t));
        for (const c of got) if (!all.some((x) => norm(x.t) === norm(c.t))) all.push(c);
      }
      const cards = all.length >= 4 ? all : localCards(text);
      if (!cards.length) { say("Couldn't find clear terms in that one."); return; }
      addDeck({ id: "d" + Date.now(), title: (title || "From a lecture").slice(0, 60), note: `${cards.length} cards`, cards });
      say(`${cards.length} cards added`);
    } catch (e) {
      const cards = localCards(text);
      if (cards.length) {
        addDeck({ id: "d" + Date.now(), title: (title || "From a lecture").slice(0, 60), note: `${cards.length} cards`, cards });
        say(`${cards.length} cards added without Claude`);
      } else say("Couldn't build a deck from that.");
    }
  };

  const buyPower = (p) => {
    if (prog.coins < p.price) return;
    saveProg(givePower({ ...prog, coins: prog.coins - p.price }, p.id));
    playSfx(sfx, "coin");
    say(`${p.name} added to your bag`);
  };

  const claimTicket = (key, tickets, label) => {
    if (prog.claimed.includes(key)) return;
    saveProg({ ...prog, tickets: (prog.tickets || 0) + tickets, claimed: [...prog.claimed, key] });
    playSfx(sfx, "level");
    say(`${label} — ${tickets} ticket${tickets === 1 ? "" : "s"}`);
  };

  const takeDaily = () => {
    const { next, reward, day } = claimDaily(prog);
    saveProg(next);
    playSfx(sfx, "coin");
    say(`Day ${day}: ${reward.coins || 0} coins${reward.tickets ? ` and ${reward.tickets} tickets` : ""}${reward.item ? ` and a ${reward.itemName}` : ""}`);
  };

  const start = (m, subset, deckOverride) => {
    const from = deckOverride || deck;
    const src = subset && subset.length ? { ...from, cards: subset } : from;
    if (!src.cards.length) { say("That deck has no cards yet. Add some first."); return; }
    if (m === "match" && src.cards.length < 2) { say("Match needs at least two cards."); return; }
    const lounge = ["drift", "browse", "tutor"].includes(m);
    let picked = lounge ? src.cards : pickCards(src, prog, len, order);
    if (m === "boss") {
      const hard = src.cards.filter((c) => (c.x || 2) >= 3);
      const base = hard.length >= 8 ? { ...src, cards: hard } : src;
      picked = pickCards(base, prog, Math.max(12, len), "smart");
    }
    if (m === "rush") picked = pickCards(src, prog, 0, order);
    if (m === "sort") picked = src.cards;
    let after = prog;
    if (m === "survival" && holdOf(prog, "life") > 0) after = spendPower(after, "life");
    if (m === "boss" && holdOf(prog, "shield") > 0) after = spendPower(after, "shield");
    if (m === "drift") after = { ...after, stats: { ...after.stats, drift: (after.stats.drift || 0) + 1 } };
    if (after !== prog) saveProg(after);
    setMenuOpen(false);
    setPlayCards(picked);
    setMode(m);
    setResult(null);
    setScreen(m);
  };

  const finish = (r) => {
    const seen = r.seen || playCards;
    const missSet = new Set(r.missed.map((c) => norm(c.t)));
    const levelUps = seen.map((c) => {
      const from = recOf(prog, deck.id, c).lvl;
      const to = missSet.has(norm(c.t)) ? 0 : Math.min(5, from + 1);
      return { from, to };
    });
    let coins = payout(prog, r, mode, levelUps);
    const doubled = holdOf(prog, "double") > 0 && dblArmed;
    if (doubled) coins *= 2;
    const gainedXp = xpFor(r, levelUps);
    const before = passState(prog).tier;

    const base = doubled ? spendPower(prog, "double") : prog;
    const withCards = applyResult(base, deck.id, seen, r.missed);
    const k = deck.id + ":" + mode;
    const st = prog.stats;
    if (doubled) setDblArmed(false);
    const nextProg = {
      ...withCards,
      coins: (prog.coins || 0) + coins,
      xp: (prog.xp || 0) + gainedXp,
      best: { ...withCards.best, [k]: Math.max(prog.best[k] || 0, r.score || 0) },
      stats: {
        ...st,
        day: todayStr(),
        today: (st.day === todayStr() ? st.today : 0) + 1,
        rounds: st.rounds + 1,
        correct: st.correct + (r.correct || 0),
        perfect: st.perfect + (r.total && r.correct === r.total ? 1 : 0),
        bosses: st.bosses + (mode === "boss" && r.won ? 1 : 0),
        survivalClears: (st.survivalClears || 0) + (mode === "survival" && r.cutscene === "clear" ? 1 : 0),
        ladderTops: (st.ladderTops || 0) + (mode === "ladder" && r.extra === "topped the ladder" ? 1 : 0),
        bestSurvival: mode === "survival" ? Math.max(st.bestSurvival, r.score || 0) : st.bestSurvival,
        modes: st.modes.includes(mode) ? st.modes : [...st.modes, mode],
      },
    };

    const d = dayOf(prog);
    nextProg.daily = {
      ...d,
      day: todayStr(),
      cards: d.cards + seen.length,
      rounds: d.rounds + 1,
      fixed: d.fixed + r.missed.length,
    };

    // exam countdown: count cards that reached level 4 today
    const newlyReady = levelUps.filter((u) => u.to >= 4 && u.from < 4).length;
    if (deck.exam && newlyReady) {
      const ec = { ...(prog.examCount || {}) };
      const cur = ec[deck.id] && ec[deck.id].day === todayStr() ? ec[deck.id].n : 0;
      ec[deck.id] = { day: todayStr(), n: cur + newlyReady };
      nextProg.examCount = ec;
      const plan = examPlan(prog, deck);
      const already = (prog.examDone || {})[deck.id] === todayStr();
      if (plan && !already && ec[deck.id].n >= plan.perDay) {
        nextProg.examDone = { ...(prog.examDone || {}), [deck.id]: todayStr() };
        nextProg.coins += 200;
        nextProg.xp += 40;
        setTimeout(() => say("Daily exam target hit — 200 coins"), 400);
      }
    }

    const after = passState(nextProg).tier;
    if (after > before) {
      for (let t = before + 1; t <= after; t++) {
        const rw = tierReward(t);
        if (rw.kind === "coins") nextProg.coins += rw.amount;
        else if (rw.kind === "tickets") nextProg.tickets = (nextProg.tickets || 0) + rw.amount;
        else if (rw.kind === "item" && !nextProg.owned.includes(rw.id)) nextProg.owned = [...nextProg.owned, rw.id];
      }
      playSfx(sfx, "level");
      say(`Pass tier ${after} — reward unlocked`);
    }

    saveProg(nextProg);
    if (boardOn() && (r.score || 0) > (prog.best[k] || 0)) {
      try { window.RECALL_SCORES.submit(mode, r.score || 0, me ? me.name : "Anon", deck.title); } catch (e) {}
    }

    setEarned(coins);
    setResult(r);
    setScreen(r.cutscene ? "cutscene" : "results");
  };

  const modeName = (ALL_MODES.find((m) => m.id === mode) || {}).name;
  const due = dueCount(prog, deck, now);
  const mast = masteryPct(prog, deck);
  const bestFor = (m) => prog.best[deck.id + ":" + m] || 0;
  const totalCards = decks.reduce((a, d) => a + d.cards.length, 0);
  const ready = claimable(prog);
  const plan = examPlan(prog, deck);
  const trouble = troubleCards(prog, deck);
  const examSoon = plan && plan.left !== null && plan.left >= 0
    ? `${plan.left} day${plan.left === 1 ? "" : "s"} to ${deck.title.slice(0, 14)}` : "";
  const tWaiting = ticketsWaiting(prog, decks);
  const alerts = ready + tWaiting;
  const pass = passState(prog);
  const dailyOn = loaded && dailyReady(prog);

  const ModeGrid = ({ list }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {list.map((m) => (
        <button key={m.id} onClick={() => start(m.id)} className={"btn rounded-2xl p-5 text-left" + pat + shape}>
          <div className="flex items-baseline justify-between gap-2">
            <span className="disp" style={{ fontSize: 24 }}>{m.name}</span>
            {bestFor(m.id) > 0 && <span className="dim text-xs">best {bestFor(m.id).toLocaleString()}</span>}
          </div>
          <div className="dim text-sm mt-1" style={{ lineHeight: 1.4 }}>{m.blurb}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="rc min-h-screen w-full" style={rootVars}>
      <style>{CSS}</style>
      <style>{EXTRA_CSS}</style>

      {NAV_SCREENS.includes(screen) && menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 54 }} />
          <div className="sheet fadein">
            <div className="sheetinner">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "notes", label: "Notes", note: prog.pro ? `${(prog.notes || []).length} saved` : "Record a lecture" },
                  { id: "goals", label: "Goals", note: examSoon || "Exams and challenges" },
                  { id: "mastery", label: "Mastery", note: tWaiting ? `${tWaiting} tickets ready` : "Decks and achievements" },
                  { id: "tasks", label: "Tasks", note: ready ? `${ready} ready` : "Coin goals" },
                  { id: "pass", label: "Study pass", note: `Tier ${pass.tier}` },

                  { id: "board", label: "Leaderboard", note: boardOn() ? "See where you rank" : "Needs accounts" },
                  { id: "codes", label: "Codes", note: "Redeem something" },
                  { id: "settings", label: "Settings", note: aiReady() ? "Claude connected" : "Connect Claude" },
                  { id: "account", label: me ? me.name : "Account", note: storageOk ? "Saved on this device" : "Saving blocked" },
                ].map((b) => (
                  <button key={b.id}
                    onClick={() => {
                      setMenuOpen(false);
                      setScreen(b.id);
                    }}
                    className="btn rounded-xl p-3 text-left">
                    <div className="font-semibold" style={{ fontSize: 14 }}>{b.label}</div>
                    <div className="dim text-xs mt-1">{b.note}</div>
                  </button>
                ))}
                <button onClick={() => { setMenuOpen(false); setMusicOpen(!musicOpen); }} className="btn rounded-xl p-3 text-left">
                  <div className="font-semibold" style={{ fontSize: 14 }}>Sound{music.station ? " · on" : ""}</div>
                  <div className="dim text-xs mt-1">Music and volume</div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {NAV_SCREENS.includes(screen) && (
        <div className="dockwrap">
          <div className="wallet">
            <span className="wpill wcoin"><i>◎</i>{(prog.coins || 0).toLocaleString()}</span>
            <span className="wpill wtick"><i>✦</i>{prog.tickets || 0}</span>
            <span className="wpill wfire"><i>▲</i>{prog.streak.days}d</span>
          </div>
          <div className="tabbar">
            <div className="tabinner">
              {[
                ["home", "Home", "\u2302"],
                ["decks", "Decks", "\u25A4"],
                ["study", "Study", "\u25B6"],
                ["char", "You", "\u263A"],
                ["room", "Room", "\u25F0"],
                ["shop", "Shop", "\u25C6"],
              ].map(([id, label, glyph]) => (
                <button
                  key={id}
                  onClick={() => { setMenuOpen(false); setScreen(id); }}
                  className={"tab" + (screen === id ? " on" : "")}
                >
                  <em>{glyph}</em>
                  {label}
                  {id === "study" && due > 0 && <span className="dot" style={{ background: "var(--a3)" }} />}
                  {id === "shop" && alerts > 0 && <span className="dot" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fadein" style={{ position: "fixed", left: 0, right: 0, bottom: 18, display: "flex", justifyContent: "center", zIndex: 40, pointerEvents: "none" }}>
          <div className="panel2 rounded-full px-5 py-2 flex items-center gap-3"
            style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.35)", pointerEvents: "auto" }}>
            <span>{toast.msg}</span>
            {toast.action && (
              <button onClick={() => { toast.action(); setToast(null); }}
                className="btn-go rounded-full px-3 py-1 text-sm">Undo</button>
            )}
          </div>
        </div>
      )}

      {NAV_SCREENS.includes(screen) && (
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          className={"menubtn" + (menuOpen ? " open" : "")}>
          <span className="bars"><i /><i /><i /></span>
          {alerts > 0 && !menuOpen && <span className="dot" />}
        </button>
      )}

      <div className="mx-auto px-4 py-6" style={{ maxWidth: 880, paddingBottom: NAV_SCREENS.includes(screen) ? 150 : 24 }}>
        {musicOpen && screen !== "boot" && screen !== "profiles" && screen !== "create" && (
          <MusicPanel music={music} prog={prog} onClose={() => setMusicOpen(false)} />
        )}
        {NAV_SCREENS.includes(screen) && <div style={{ height: 4 }} />}

        {screen === "boot" && (
          <Intro terms={SAMPLE_TERMS} onDone={() => {
            booting.current = false;
            setScreen(nextScreen.current || (me ? (prog.avatar ? "home" : "create") : "profiles"));
          }} />
        )}

        {screen === "profiles" && (
          <Profiles
            profiles={profiles} cards={SAMPLE_TERMS} pending={pending} onClearPending={() => setPending(null)}
            onPick={openProfile} onCreate={createProfile} onRestore={restoreCode} onDelete={deleteProfile}
          />
        )}

        {screen === "account" && me && (
          <Account
            profile={me} decks={decks} prog={prog} storageOk={storageOk}
            onRename={(n) => { const p = { ...me, name: n }; setMe(p); const l = profiles.map((x) => (x.id === p.id ? p : x)); setProfiles(l); saveProfiles(l); say("Name saved"); }}
            onPin={(pin) => { const p = { ...me, pin }; setMe(p); const l = profiles.map((x) => (x.id === p.id ? p : x)); setProfiles(l); saveProfiles(l); say(pin ? "PIN set" : "PIN removed"); }}
            onSwitch={() => { setMe(null); setScreen("profiles"); }}
            onQuit={() => setScreen("home")}
          />
        )}

        {screen === "settings" && <Settings onQuit={() => setScreen("home")} />}

        {screen === "record" && (
          <Recorder prog={prog} onSave={saveNote} onDeck={deckFromText} onUnlock={unlockPro}
            onQuit={() => setScreen("notes")} />
        )}

        {screen === "notes" && (
          <Notes prog={prog} onRecord={() => setScreen("record")} onDeck={deckFromText}
            onOpen={(n) => { setNote(n); setScreen("note"); }}
            onDelete={(id) => {
              const gone = (prog.notes || []).find((x) => x.id === id);
              const kept = (prog.notes || []).filter((x) => x.id !== id);
              saveProg({ ...prog, notes: kept });
              if (gone) say("Note deleted", () => saveProg({ ...prog, notes: [gone, ...kept] }));
            }}
            onQuit={() => setScreen("home")} />
        )}

        {screen === "note" && note && (
          <NoteView note={note} onDeck={deckFromText} onQuit={() => setScreen("notes")} />
        )}

        {screen === "board" && <Board prog={prog} onQuit={() => setScreen("home")} />}

        {screen === "codes" && (
          <Codes prog={prog} onQuit={() => setScreen("home")}
            onRedeem={(v) => { const res = redeem(prog, v); if (res.ok) { saveProg(res.next); playSfx(sfx, "level"); } return res; }} />
        )}

        {screen === "goals" && (
          <Goals
            prog={prog} decks={decks} deck={deck}
            onExam={setExam} onClaimWeek={claimWeek}
            onDrill={(id, cards) => { const d = decks.find((x) => x.id === id); setDeckId(id); start("quiz", cards, d); }}
            onQuit={() => setScreen("home")}
          />
        )}

        {screen === "connect" && (
          <div>
            <h1 className="mb-2" style={{ fontSize: "clamp(28px,6vw,44px)" }}>One last thing</h1>
            <p className="dim mb-5" style={{ maxWidth: "52ch", lineHeight: 1.5 }}>
              Recall can read your PDFs and explain what you got wrong, which needs an API key.
              You can skip this — uploads still work, they're just rougher.
            </p>
            <Settings onQuit={() => setScreen("home")} />
            <button onClick={() => setScreen("home")} className="btn rounded-xl py-3 w-full mt-3">Skip for now</button>
          </div>
        )}

        {screen === "create" && loaded && (
          <CharStudio prog={prog} firstRun onBuy={buy}
            onSave={(a) => {
              const next = { ...prog, avatar: a, room: prog.room || DEFAULT_ROOM };
              saveProg(next);
              if (me) { const p = { ...me, avatar: a }; setMe(p); const l = profiles.map((x) => (x.id === p.id ? p : x)); setProfiles(l); saveProfiles(l); }
              setScreen(aiReady() ? "home" : "connect");
              say("Saved. It'll be here next time.");
            }}
            onQuit={() => setScreen("home")} />
        )}

        {screen === "home" && (
          <div className="fadein">
            <div className="greet">
              <div className="dim" style={{ fontSize: 13 }}>{greeting()}</div>
              <div className="disp" style={{ fontSize: 28, lineHeight: 1.1 }}>{me ? me.name : "Ready when you are"}</div>
            </div>

            <button onClick={() => setScreen("room")} className="roomcard mb-5">
              <Room r={prog.room} glow="var(--a4)" due={due} score={bestFor("quiz")}
                trophies={decks.filter((d) => masteryPct(prog, d) >= 100).length} />
              <span className="roomme"><Avatar a={prog.avatar} fluid /></span>
              <span className="roomtag">Your room · tap to decorate</span>
            </button>

            <div className="strip2 mb-5">
              <div className="s2">
                <b style={{ color: "var(--a2)" }}>{prog.streak.days}</b>
                <span>day streak</span>
              </div>
              <div className="s2">
                <b style={{ color: "var(--a3)" }}>{pass.into}<small>/{pass.need}</small></b>
                <span>XP · tier {pass.tier}</span>
              </div>
              <div className="s2">
                <b className="coin">{(prog.coins || 0).toLocaleString()}</b>
                <span>coins</span>
              </div>
            </div>

            {plan ? (
              <button onClick={() => setScreen("goals")} className="hero w-full text-left mb-4">
                <div className="disp" style={{ fontSize: 44, lineHeight: 1 }}>
                  {plan.left < 0 ? "Past" : plan.left === 0 ? "Today" : plan.left}
                  {plan.left > 0 && <span style={{ fontSize: 20, marginLeft: 6 }}>day{plan.left === 1 ? "" : "s"}</span>}
                </div>
                <div style={{ opacity: .85, marginTop: 4 }}>until {deck.title}</div>
                <div style={{ fontSize: 13, opacity: .7, marginTop: 10 }}>
                  {plan.done ? "Today's target is done. Nice." : `${plan.todayCount} of ${plan.perDay} locked in today`}
                </div>
                <div className="meter" style={{ marginTop: 10, background: "rgba(0,0,0,.3)" }}>
                  <i style={{ width: `${(plan.ready / Math.max(1, plan.total)) * 100}%` }} />
                </div>
              </button>
            ) : (
              <button onClick={() => setScreen("goals")} className="hero w-full text-left mb-4">
                <div className="disp" style={{ fontSize: 40, lineHeight: 1 }}>{mast}%</div>
                <div style={{ opacity: .85, marginTop: 4 }}>of {deck.title} locked in</div>
                <div style={{ fontSize: 13, opacity: .7, marginTop: 10 }}>
                  Got an exam coming? Set a date and I'll pace it for you.
                </div>
                <div className="meter" style={{ marginTop: 10, background: "rgba(0,0,0,.3)" }}>
                  <i style={{ width: `${mast}%` }} />
                </div>
              </button>
            )}

            <div className="card2 p-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Today's goals</span>
                <span className="dim text-sm">{goalsDone(prog)}/3</span>
              </div>
              {todayGoals(prog).map((g) => {
                const done = g.have >= g.goal;
                return (
                  <div key={g.id} className="goal">
                    <span className={"tick" + (done ? " on" : "")}>{done ? "✓" : ""}</span>
                    <span style={{ flex: 1, fontSize: 15 }}>{g.name}</span>
                    <span className="dim text-sm">{g.have} / {g.goal}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => start("quiz")} className="card2 p-4 text-left">
                <div className="disp" style={{ fontSize: 26 }}>{due}</div>
                <div className="dim text-sm mt-1">cards ready</div>
              </button>
              <button onClick={() => (dailyOn ? takeDaily() : setScreen("tasks"))} className="card2 p-4 text-left">
                <div className="disp" style={{ fontSize: 18, color: dailyOn ? "var(--a1)" : undefined }}>
                  {dailyOn ? "Daily reward" : `${ready} tasks`}
                </div>
                <div className="dim text-sm mt-1">{dailyOn ? "ready to claim" : "on the go"}</div>
              </button>
            </div>

            <button onClick={() => setScreen("pass")} className="card2 p-4 w-full text-left mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-semibold">Study pass · Tier {pass.tier}</span>
                <span className="dim text-sm">{pass.into} / {pass.need} XP</span>
              </div>
              <div className="xpbar"><i style={{ width: `${(pass.into / pass.need) * 100}%` }} /></div>
              <div className="dim text-xs mt-2">
                Next: {(() => { const r = tierReward(pass.tier + 1); return r.kind === "item" ? r.name : `${r.amount} ${r.kind}`; })()}
              </div>
            </button>

            {trouble.length >= 3 && (
              <button onClick={() => start("quiz", trouble)} className="card2 p-4 w-full text-left mb-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold">{trouble.length} trouble cards</div>
                    <div className="dim text-sm mt-1">The ones you keep missing</div>
                  </div>
                  <span className="badge">{trouble.length}</span>
                </div>
              </button>
            )}

            <div className="dim text-sm mb-2">Active deck</div>
            <button onClick={() => setScreen("decks")} className="card2 p-4 w-full text-left mb-4 flex items-center gap-3">
              <div style={{ width: 54, flexShrink: 0 }}><Avatar a={prog.avatar} fluid /></div>
              <div style={{ flex: 1 }}>
                <div className="font-semibold" style={{ fontSize: 16 }}>{deck.title}</div>
                <div className="dim text-sm mt-1">{deck.cards.length} cards · {due} due · {mast}% mastered</div>
              </div>
              <span className="dim">›</span>
            </button>

            <button onClick={() => setScreen("study")} className="bigbtn mb-6">Start studying</button>
          </div>
        )}

        {screen === "decks" && (
          <div className="fadein">
            <PageHead eyebrow="Library" title="Your decks"
              sub={`${decks.length} deck${decks.length === 1 ? "" : "s"} · ${decks.reduce((a, d) => a + d.cards.length, 0)} cards in total`} />
            <div className="mb-8">
              <DeckPicker decks={decks} deckId={deckId} prog={prog} onSelect={setDeckId}
                onNew={newDeck} onEdit={() => setScreen("editor")} onRemove={removeDeck} />
            </div>
            <div className="rule my-6" />
            <h2 className="mb-1" style={{ fontSize: 20 }}>Find a card</h2>
            <p className="dim text-sm mb-3">Searches every deck you have.</p>
            <input value={hunt} onChange={(e) => setHunt(e.target.value)}
              placeholder="Type a term or part of a definition"
              className="field rounded-xl px-4 py-3 w-full mb-3" />
            {hunt.trim().length > 1 && (
              <div className="flex flex-col gap-2 mb-8">
                {(() => {
                  const q = hunt.trim().toLowerCase();
                  const hits = [];
                  decks.forEach((d) => d.cards.forEach((c) => {
                    if (hits.length < 12 && (c.t + " " + c.d).toLowerCase().includes(q)) hits.push({ c, d });
                  }));
                  if (!hits.length) return <div className="card2 p-4 dim">Nothing matches that.</div>;
                  return hits.map((h, n) => (
                    <button key={n} onClick={() => { setDeckId(h.d.id); start("cards", [h.c], h.d); }}
                      className="card2 p-3 text-left">
                      <div className="font-semibold" style={{ fontSize: 15 }}>{h.c.t}</div>
                      <div className="dim text-sm mt-1" style={{ lineHeight: 1.4 }}>{h.c.d}</div>
                      <div className="dim text-xs mt-2">
                        {h.d.title} · level {recOf(prog, h.d.id, h.c).lvl}/5
                      </div>
                    </button>
                  ));
                })()}
              </div>
            )}

            <div className="rule my-6" />
            <h2 className="mb-3" style={{ fontSize: 20 }}>Add material</h2>
            <Builder onBuilt={addDeck} onManual={newDeck} onSettings={() => setScreen("settings")} />
          </div>
        )}

        {screen === "study" && (
          <div className="fadein">
            <PageHead eyebrow={deck.title} title="Study" sub={`${due} due now · ${mast}% mastered`} />

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="dim text-sm">Round</span>
              {LENGTHS.map((n) => (
                <button key={n} onClick={() => setLen(n)}
                  className={"chip rounded-full px-3 py-1 text-sm " + (len === n ? "chip-on" : "")}>
                  {n === 0 ? `All ${deck.cards.length}` : `${n} cards`}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="dim text-sm">Cards</span>
              <button onClick={() => setOrder("smart")} className={"chip rounded-full px-3 py-1 text-sm " + (order === "smart" ? "chip-on" : "")}>Weakest first</button>
              <button onClick={() => setOrder("random")} className={"chip rounded-full px-3 py-1 text-sm " + (order === "random" ? "chip-on" : "")}>Random</button>
            </div>

            <button onClick={() => setScreen(prog.pro ? "record" : "record")} className="card2 p-4 w-full text-left mb-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold" style={{ fontSize: 16 }}>
                    Record a lecture {!prog.pro && <span className="pill rounded-full px-2 py-1 ml-1" style={{ color: "var(--a1)" }}>Pro</span>}
                  </div>
                  <div className="dim text-sm mt-1">Listens in class, writes the notes, builds the deck</div>
                </div>
                <span style={{ fontSize: 22 }}>●</span>
              </div>
            </button>

            {MODE_GROUPS.map((g) => (
              <div key={g.id} className="mb-7">
                <h2 style={{ fontSize: 19 }}>{g.name}</h2>
                <p className="dim text-sm mb-3">{g.note}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {g.modes.map((m) => (
                    <button key={m.id} onClick={() => start(m.id)} className="card2 p-4 text-left">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="disp" style={{ fontSize: 21 }}>{m.name}</span>
                        {bestFor(m.id) > 0 && <span className="dim text-xs">{bestFor(m.id).toLocaleString()}</span>}
                      </div>
                      <div className="dim text-sm mt-1" style={{ lineHeight: 1.4 }}>{m.blurb}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === "quiz" && (
          <Quiz cards={playCards} pool={deck.cards} avatar={prog.avatar} deckTitle={deck.title} sfx={sfx}
            fifties={holdOf(prog, "fifty")} onFifty={() => saveProg(spendPower(prog, "fifty"))}
            onDone={finish} onQuit={() => setScreen("home")} />
        )}
        {screen === "leap" && (
          <Leap cards={playCards} pool={deck.cards} avatar={prog.avatar} deckTitle={deck.title} sfx={sfx}
            onDone={finish} onQuit={() => setScreen("home")} />
        )}
        {screen === "match" && <Match cards={playCards} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "cards" && <Cards cards={playCards} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "type" && <TypeIt cards={playCards} sfx={sfx} deckTitle={deck.title} hints={holdOf(prog, "hint")} onHint={() => saveProg(spendPower(prog, "hint"))} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "survival" && (
          <Survival cards={playCards} pool={deck.cards} best={bestFor("survival")} sfx={sfx}
            coins={prog.coins} avatar={prog.avatar} spare={holdOf(prog, "life") > 0}
            onSpend={(n) => { if (prog.coins < n) return false; saveProg({ ...prog, coins: prog.coins - n }); return true; }}
            onDone={finish} onQuit={() => setScreen("home")} />
        )}
        {screen === "boss" && <Boss cards={playCards} pool={deck.cards} sfx={sfx} deckTitle={deck.title} shield={holdOf(prog, "shield") > 0} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "rush" && <Rush cards={playCards} pool={deck.cards} sfx={sfx} deckTitle={deck.title} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "sort" && <Sort cards={playCards} sfx={sfx} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "ladder" && <Ladder cards={playCards} pool={deck.cards} sfx={sfx} deckTitle={deck.title} onDone={finish} onQuit={() => setScreen("home")} />}
        {screen === "drift" && <Drift cards={playCards} onQuit={() => setScreen("home")} />}
        {screen === "browse" && <Browse deck={deck} prog={prog} onFlag={flagCard} onSettings={() => setScreen("settings")} onQuit={() => setScreen("home")} />}
        {screen === "tutor" && (
          <Tutor deck={deck} onSettings={() => setScreen("settings")} onAsk={() => saveProg({ ...prog, stats: { ...prog.stats, asks: (prog.stats.asks || 0) + 1 } })} onQuit={() => setScreen("home")} />
        )}
        {screen === "editor" && <Editor deck={deck} onSave={saveEdited} onQuit={() => setScreen("home")} />}
        {screen === "shop" && <Shop prog={prog} onBuy={buy} onEquip={equip} music={music} onPower={buyPower} onFreeze={() => { if (prog.coins < 1200) return; saveProg({ ...prog, coins: prog.coins - 1200, freezes: (prog.freezes || 0) + 1 }); playSfx(sfx, "coin"); say("Streak freeze bought"); }} onQuit={() => setScreen("home")} />}
        {screen === "tasks" && <Tasks prog={prog} onClaim={claim} onQuit={() => setScreen("home")} />}
        {screen === "mastery" && <Mastery prog={prog} decks={decks} onClaim={claimTicket} onQuit={() => setScreen("home")} />}
        {screen === "pass" && <Pass prog={prog} onQuit={() => setScreen("home")} />}
        {screen === "char" && (
          <CharStudio prog={prog} onBuy={buy} onSave={(a) => {
            saveProg({ ...prog, avatar: a });
            if (me) { const p = { ...me, avatar: a }; setMe(p); const l = profiles.map((x) => (x.id === p.id ? p : x)); setProfiles(l); saveProfiles(l); }
            say("Look saved");
          }} onQuit={() => setScreen("home")} />
        )}

        {screen === "room" && (
          <RoomStudio prog={prog} due={due} score={bestFor("quiz")} onBuy={buy}
            onSave={(r) => { saveProg({ ...prog, room: r }); say("Room saved"); }}
            onQuit={() => setScreen("home")} />
        )}

        {screen === "cutscene" && result && (
          <Cutscene
            kind={result.cutscene} avatar={prog.avatar} score={result.score || 0} coins={earned}
            question={result.killer} misses={result.missed} deckTitle={deck.title}
            onDrill={result.missed.length ? () => start(mode, result.missed) : null}
            onAgain={() => start(mode)}
            onHome={() => setScreen("home")}
          />
        )}

        {screen === "results" && result && (
          <Results result={result} modeName={modeName} coins={earned} deckTitle={deck.title} source={deck.source}
            onDrill={() => start(mode, result.missed)} onAgain={() => start(mode)} onHome={() => setScreen("home")} />
        )}
      </div>
    </div>
  );
}

