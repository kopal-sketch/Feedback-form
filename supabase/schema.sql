-- Run this in the Supabase SQL Editor to create the feedback table.
-- Form and admin connect directly from the browser using the Supabase client.

create table if not exists public.feedback (
  id text primary key default gen_random_uuid()::text,
  overall_rating integer not null check (overall_rating >= 1 and overall_rating <= 5),
  service text not null,
  sentiment text not null,
  what_delighted_or_wrong text,
  other_text text,
  bugs_issues text,
  suggestions text,
  custom_question_answer text,
  submitted_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Allow anyone to insert (form submissions from the browser)
create policy "Allow insert for feedback"
  on public.feedback
  for insert
  with check (true);

-- Allow anyone to read (for admin page). Tighten with auth later if needed.
create policy "Allow read for feedback"
  on public.feedback
  for select
  using (true);

comment on table public.feedback is 'POP app feedback submissions';
