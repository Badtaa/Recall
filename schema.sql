-- Run this once in the Supabase SQL editor.

create table if not exists public.saves (
  user_id uuid not null references auth.users on delete cascade,
  key text not null,
  value text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.saves enable row level security;

-- Each person can only ever touch their own rows.
drop policy if exists "own rows" on public.saves;
create policy "own rows" on public.saves
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Leaderboard. Everyone can read it; you can only write your own row.
create table if not exists public.scores (
  user_id uuid not null references auth.users on delete cascade,
  mode text not null,
  name text not null,
  score integer not null default 0,
  deck text,
  updated_at timestamptz not null default now(),
  primary key (user_id, mode)
);

alter table public.scores enable row level security;

drop policy if exists "read all scores" on public.scores;
create policy "read all scores" on public.scores for select using (true);

drop policy if exists "write own score" on public.scores;
create policy "write own score" on public.scores
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
