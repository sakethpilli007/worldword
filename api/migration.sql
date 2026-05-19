-- Drop existing tables and recreate with new schema
drop table if exists boards cascade;
drop table if exists submissions cascade;
drop table if exists prompts cascade;

-- Prompts: 5 per day, id format "YYYY-MM-DD-N"
create table prompts (
  id text primary key,       -- e.g. "2026-05-19-1"
  day text not null,         -- e.g. "2026-05-19"
  position int not null,     -- 1–5
  text text not null
);

-- Submissions
create table submissions (
  id uuid default gen_random_uuid() primary key,
  prompt_id text references prompts(id) not null,
  word text not null,
  created_at timestamptz default now()
);

-- Boards (computed at reveal time)
create table boards (
  prompt_id text references prompts(id) primary key,
  entries jsonb not null,
  total_submissions int not null,
  revealed_at timestamptz default now()
);

-- RLS
alter table prompts enable row level security;
create policy "public read prompts" on prompts for select using (true);

alter table submissions enable row level security;
create policy "public insert submissions" on submissions for insert with check (true);

alter table boards enable row level security;
create policy "public read boards" on boards for select using (true);

-- Grants
grant usage on schema public to anon;
grant select on prompts to anon;
grant insert on submissions to anon;
grant select on boards to anon;

-- Functions
create or replace function get_submission_count(p_prompt_id text)
returns int language plpgsql security definer as $$
declare cnt int;
begin
  select count(*) into cnt from submissions where prompt_id = p_prompt_id;
  return cnt;
end;
$$;

create or replace function get_board(p_prompt_id text)
returns jsonb language plpgsql security definer as $$
declare result jsonb;
begin
  select jsonb_agg(row_to_json(t)) into result
  from (
    select word, count(*)::int as count
    from submissions
    where prompt_id = p_prompt_id
    group by word
    order by count desc
    limit 10
  ) t;
  return result;
end;
$$;

grant execute on function get_submission_count(text) to anon;
grant execute on function get_board(text) to anon;

-- Seed today's 5 prompts
insert into prompts (id, day, position, text) values
  ('2026-05-19-1', '2026-05-19', 1, 'What your 9am meeting actually is'),
  ('2026-05-19-2', '2026-05-19', 2, 'One word for how Sunday night feels'),
  ('2026-05-19-3', '2026-05-19', 3, 'What you tell yourself before skipping the gym'),
  ('2026-05-19-4', '2026-05-19', 4, 'One word for checking your phone at 3am'),
  ('2026-05-19-5', '2026-05-19', 5, 'What ''I''ll start Monday'' actually means');
