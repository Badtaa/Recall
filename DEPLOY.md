# Getting Recall online with AI working

End result: a link like `recall-yourname.vercel.app` that you can send to
anyone. They open it, everything works, and they never see or need a key —
because your key sits on the server, not in the page.

Time: about 20 minutes. Cost: hosting free, AI roughly a tenth of a cent
per deck someone builds.

You need three free accounts: GitHub, Vercel, Anthropic.

---

## Step 1 — Get an API key (3 min)

1. Go to **console.anthropic.com** and sign up.
2. Billing → add a card, put **$5** on it. That's hundreds of decks.
3. **Limits** → set a monthly spend cap. Do this now, not later. It's the
   thing that stops a stranger running up a bill.
4. **API Keys** → Create Key → copy it. Starts with `sk-ant-`.
   Copy it somewhere safe — the site shows it once and never again.

## Step 2 — Put the code on GitHub (5 min)

Phone or laptop, no terminal needed.

1. Unzip `recall-project.zip`. You'll have a folder called `recall-site`.
2. Go to **github.com** → New repository → name it `recall` → Create.
3. On the empty repo page, click **uploading an existing file**.
4. Drag in everything *inside* `recall-site` — the `src` folder, `api`,
   `public`, and the loose files like `package.json` and `index.html`.
   Do not drag the `recall-site` folder itself, and skip `dist` if it's there.
5. Commit changes.

## Step 3 — Deploy (5 min)

1. Go to **vercel.com** → Sign up with GitHub.
2. **Add New → Project** → find your `recall` repo → **Import**.
3. Leave every setting alone. Vercel reads `vercel.json` and knows what to do.
4. Click **Deploy**. Wait about a minute.

You now have a live URL. The AI features won't work yet — one more step.

## Step 4 — Give it your key (2 min)

1. In your Vercel project: **Settings → Environment Variables**.
2. Name: `ANTHROPIC_API_KEY`
   Value: the `sk-ant-...` key from step 1.
   Leave all three environments ticked. **Add**.
3. Go to **Deployments** → the top one → **⋯ → Redeploy**.

Environment variables only load at build time, so the redeploy is what
actually switches the AI on. Skipping it is the single most common mistake.

## Step 5 — Check it (1 min)

Open your URL, make a profile, then **Menu → Settings**. The badge should
read **server key**. If it does, you're done — try building a deck from a PDF.

If it reads **not connected**, one of these is true:
- You didn't redeploy after adding the variable.
- The variable name has a typo, or you named it `VITE_ANTHROPIC_API_KEY`.
  It must be exactly `ANTHROPIC_API_KEY` with no prefix.
- The key was pasted with a space or a line break on the end.

---

## Making it yours

**Custom domain** — Vercel → Settings → Domains → add the one you bought.
Buy from Namecheap or Cloudflare, about $10 a year.

**Rename the URL** — Settings → Domains → edit the `.vercel.app` name.
Do it before you share the link: progress is stored per-domain, so changing
it later means people start over.

**Updating it** — edit any file in GitHub's web editor, hit Commit, and
Vercel redeploys in about 40 seconds. Works from your phone. Nobody loses
their progress when you push an update.

---

## Optional: accounts that follow people between devices

Without this, someone's coins and decks live in whatever browser they used.
With it, they log in by email anywhere and it all follows.

1. **supabase.com** → new project.
2. **SQL Editor** → paste `schema.sql` from this folder → Run.
3. **Settings → API** → copy the Project URL and the anon key.
4. In Vercel → Environment Variables, add two more:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Redeploy.

A sign-in screen now appears before the app. The anon key is safe in the
browser — the policy in `schema.sql` means people can only ever read and
write their own rows.

---

## Watching the money

Anthropic console → Usage shows spend per day. Each deck build is three
short calls; the Tutor and explanations are one each. If it ever climbs
faster than you expect, lower the cap in Limits — it cuts off cleanly and
the app falls back to building decks without AI.
