-- Prompts table
create table prompts (
  id text primary key,        -- "YYYY-MM-DD"
  text text not null
);

-- Submissions table
create table submissions (
  id uuid default gen_random_uuid() primary key,
  prompt_id text references prompts(id) not null,
  word text not null,
  created_at timestamptz default now()
);

-- Boards table (computed at reveal time)
create table boards (
  prompt_id text references prompts(id) primary key,
  entries jsonb not null,     -- [{ word, count }, ...]
  total_submissions int not null,
  revealed_at timestamptz default now()
);

-- RLS policies

-- Prompts: anyone can read
alter table prompts enable row level security;
create policy "public read prompts"
  on prompts for select using (true);

-- Submissions: anyone can insert, nobody can read raw rows
alter table submissions enable row level security;
create policy "public insert submissions"
  on submissions for insert with check (true);

-- Boards: anyone can read after reveal
alter table boards enable row level security;
create policy "public read boards"
  on boards for select using (true);

-- Seed today's prompt
insert into prompts (id, text) values
  ('2026-05-19', 'What your 9am meeting actually is');
