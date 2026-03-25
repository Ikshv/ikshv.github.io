-- Run once if you have duplicate or mixed-case github_repo values after changing sync behavior.
-- If two rows collide after lower(), delete the duplicate manually first.

update public.portfolio_projects
set github_repo = lower(github_repo)
where github_repo <> lower(github_repo);

notify pgrst, 'reload schema';
