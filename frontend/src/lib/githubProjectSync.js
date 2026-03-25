import { supabase } from './supabaseClient';

const DEFAULT_OWNER = process.env.REACT_APP_GITHUB_USER || 'ikshv';

function normalizeTags(j) {
  if (Array.isArray(j.tags)) return j.tags.filter(Boolean).map(String);
  if (typeof j.tags === 'string' && j.tags.trim()) return [j.tags.trim()];
  return [];
}

function parseDisplayed(j) {
  const v = j.live;
  if (v === false || v === 'false' || v === 'False') return false;
  return true;
}

/**
 * For each public repo with a root project.json, upsert a row in portfolio_projects.
 * Preserves is_highlight and highlight_sort for rows that already exist.
 */
export async function syncGitHubPortfolioProjects(owner = DEFAULT_OWNER) {
  const listRes = await fetch(
    `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&sort=updated&type=owner`
  );
  if (!listRes.ok) {
    const text = await listRes.text();
    throw new Error(
      `GitHub list repos failed (${listRes.status}): ${text.slice(0, 200)}`
    );
  }

  const repos = await listRes.json();
  if (!Array.isArray(repos)) {
    throw new Error('Unexpected GitHub API response');
  }

  const { data: existingRows, error: existingErr } = await supabase
    .from('portfolio_projects')
    .select('github_repo,is_highlight,highlight_sort');

  if (existingErr) throw existingErr;

  const existing = new Map(
    (existingRows || []).map((r) => [
      r.github_repo,
      { is_highlight: r.is_highlight, highlight_sort: r.highlight_sort },
    ])
  );

  const now = new Date().toISOString();
  const upserts = [];

  for (const repo of repos) {
    if (repo.fork) continue;

    const branch = repo.default_branch || 'main';
    const fullName = `${owner}/${repo.name}`;
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo.name}/${branch}/project.json`;

    let j;
    try {
      const fileRes = await fetch(rawUrl);
      if (!fileRes.ok) continue;
      j = await fileRes.json();
      if (!j || typeof j !== 'object') continue;
    } catch {
      continue;
    }

    const prev = existing.get(fullName) || {};
    const title =
      (typeof j.title === 'string' && j.title.trim()) ||
      (typeof j.name === 'string' && j.name.trim()) ||
      repo.name;
    const description =
      (typeof j.description === 'string' && j.description.trim()) ||
      (repo.description && String(repo.description).trim()) ||
      '';
    const homepage =
      (typeof j.homepage === 'string' && j.homepage.trim()) ||
      (typeof j.demo === 'string' && j.demo.trim()) ||
      (repo.homepage && String(repo.homepage).trim()) ||
      null;
    const slug =
      (typeof j.slug === 'string' && j.slug.trim()) || repo.name;

    upserts.push({
      github_repo: fullName,
      slug,
      title,
      description,
      tags: normalizeTags(j),
      homepage,
      github_url: `https://github.com/${fullName}`,
      displayed_on_site: parseDisplayed(j),
      is_highlight: prev.is_highlight ?? false,
      highlight_sort: prev.highlight_sort ?? 0,
      last_synced_at: now,
    });
  }

  if (upserts.length === 0) {
    return { upserted: 0, message: 'No repos with project.json found.' };
  }

  const { error } = await supabase.from('portfolio_projects').upsert(upserts, {
    onConflict: 'github_repo',
  });

  if (error) throw error;
  return { upserted: upserts.length };
}
