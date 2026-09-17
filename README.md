# Recall

Turn any lecture into a game people finish. This folder is the deployable
version: real accounts, working AI features, installable on a phone.

---

## The 15-minute setup

You need a free [Vercel](https://vercel.com) account, a free
[Supabase](https://supabase.com) account, and an
[Anthropic API key](https://console.anthropic.com).

### 1. Get it running locally

```bash
npm install
npm run dev
```

It opens on localhost and works right away, saving to your browser.
Sign-in and AI features arrive in the next two steps.

### 2. Turn on accounts (Supabase)

1. Create a project at supabase.com.
2. Open **SQL Editor**, paste the contents of `schema.sql`, run it.
3. Go to **Project Settings → API** and copy the Project URL and the anon key.
4. Make a file called `.env` in this folder:

```
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

5. In Supabase, go to **Authentication → Providers → Email** and make sure
   it's on. Nothing else to configure — sign-in is a link sent by email, so
   there are no passwords to store or reset.

Restart `npm run dev`. You'll get a sign-in screen. Enter your email, click
the link, and you're in. That account now carries your decks, coins,
character and streak to any device you open the link on.

The anon key is safe in the browser. The `schema.sql` policy means a signed-in
person can only ever read and write their own rows.

### 3. Turn on the AI features

Deck building from a PDF, the Tutor, and "Why was that wrong?" all call
Claude. The key must stay on the server, so `api/claude.js` proxies it.

Add your key as an environment variable **in your hosting dashboard**, not
in `.env`:

- Vercel: Project → Settings → Environment Variables → `ANTHROPIC_API_KEY`
- Netlify: Site configuration → Environment variables → `ANTHROPIC_API_KEY`

Never prefix it with `VITE_`. Anything starting with `VITE_` is shipped to
the browser, and a leaked key means a stranger spending your money.

The proxy caps tokens, allows one model, and rate limits to 20 requests a
minute per IP. Worth raising the limit only once you know people are hitting it.

### 4. Ship it

```bash
npm i -g vercel
vercel
```

Answer the prompts, and it gives you a live URL. Push to the same project
again and it redeploys. Add a custom domain in the Vercel dashboard when
you have one.

Netlify works too: `netlify.toml` and `netlify/functions/claude.js` are
already here, so connect the repo and it builds.

---

## Installing it as an app

Once it's on a URL, it installs like a native app because of
`public/manifest.webmanifest` and `public/sw.js`.

- **iPhone**: open in Safari → Share → Add to Home Screen. Opens fullscreen,
  no browser bars. Important: iOS deletes storage for sites you haven't
  opened in 7 days *unless* they're installed this way. Tell your users.
- **Android**: Chrome shows an "Install app" prompt automatically.
- **Desktop**: Chrome and Edge show an install icon in the address bar.

Swap `public/icon-192.png` and `icon-512.png` for your own artwork whenever
you like — anything square works.

---

## What's where

| File | What it does |
|---|---|
| `src/App.jsx` | The whole app. One file, ~6,500 lines. |
| `src/storage.js` | The only thing that touches saves. Cloud when signed in, browser when not. |
| `src/auth.jsx` | Email sign-in screen and the sign-out button. |
| `src/supabase.js` | Client setup. No keys? App runs in local-only mode. |
| `api/claude.js` | Server proxy holding your Anthropic key. |
| `schema.sql` | One table, one security policy. |

## If something breaks

**Sign-in screen never appears** — `.env` isn't being read. It must sit
next to `package.json`, and you must restart the dev server after making it.

**"AI features aren't set up on this site yet"** — `ANTHROPIC_API_KEY` is
missing from your hosting environment variables, or you added it and haven't
redeployed since.

**Progress vanished** — check whether you were signed in. Signed out, saves
live in that one browser. There's also a save code in Account that moves
everything by hand.

**Sign-in email never arrives** — Supabase's built-in email sender is rate
limited and lands in spam sometimes. For real usage, connect your own SMTP
under Authentication → Emails.
