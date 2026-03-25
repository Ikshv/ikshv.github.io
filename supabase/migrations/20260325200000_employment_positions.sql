-- Employment / experience for About page. Nested "projects" stored as JSONB array.
-- Run in Supabase SQL Editor (same project as portfolio_projects).

create table if not exists public.employment_positions (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  displayed_on_site boolean not null default true,
  job_title text not null,
  company_name text not null,
  start_date text not null,
  end_date text,
  description text not null default '',
  projects jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint employment_positions_projects_array
    check (jsonb_typeof(projects) = 'array')
);

create index if not exists idx_employment_positions_sort
  on public.employment_positions (sort_order);

create index if not exists idx_employment_positions_displayed
  on public.employment_positions (displayed_on_site);

alter table public.employment_positions enable row level security;

drop policy if exists "employment_positions_select" on public.employment_positions;
drop policy if exists "employment_positions_insert" on public.employment_positions;
drop policy if exists "employment_positions_update" on public.employment_positions;
drop policy if exists "employment_positions_delete" on public.employment_positions;

create policy "employment_positions_select"
  on public.employment_positions for select
  using (
    displayed_on_site = true
    or auth.role() = 'authenticated'
  );

create policy "employment_positions_insert"
  on public.employment_positions for insert
  with check (auth.role() = 'authenticated');

create policy "employment_positions_update"
  on public.employment_positions for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "employment_positions_delete"
  on public.employment_positions for delete
  using (auth.role() = 'authenticated');

create or replace function public.employment_positions_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists employment_positions_updated_at on public.employment_positions;
create trigger employment_positions_updated_at
  before update on public.employment_positions
  for each row
  execute procedure public.employment_positions_set_updated_at();

notify pgrst, 'reload schema';
