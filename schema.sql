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
