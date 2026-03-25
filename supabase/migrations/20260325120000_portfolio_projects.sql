-- Portfolio projects: single source for /projects, home highlights, and GitHub sync.
-- Run in Supabase SQL Editor or via `supabase db push` if you use the CLI.

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  github_repo text not null unique,
  slug text,
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  homepage text,
  github_url text not null,
  displayed_on_site boolean not null default true,
  is_highlight boolean not null default false,
  highlight_sort integer not null default 0,
  published_at timestamptz,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_portfolio_projects_highlight
  on public.portfolio_projects (is_highlight, highlight_sort);

create index if not exists idx_portfolio_projects_displayed
  on public.portfolio_projects (displayed_on_site);

alter table public.portfolio_projects enable row level security;

-- Visitors only see rows you publish; signed-in users see everything (manage drafts).
create policy "portfolio_projects_select"
  on public.portfolio_projects for select
  using (
    displayed_on_site = true
    or auth.role() = 'authenticated'
  );

create policy "portfolio_projects_insert"
  on public.portfolio_projects for insert
  with check (auth.role() = 'authenticated');

create policy "portfolio_projects_update"
  on public.portfolio_projects for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "portfolio_projects_delete"
  on public.portfolio_projects for delete
  using (auth.role() = 'authenticated');

create or replace function public.portfolio_projects_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_projects_updated_at on public.portfolio_projects;
create trigger portfolio_projects_updated_at
  before update on public.portfolio_projects
  for each row
  execute procedure public.portfolio_projects_set_updated_at();
