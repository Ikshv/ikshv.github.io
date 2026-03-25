import { supabase } from './supabaseClient';

const DEFAULT_OWNER = process.env.REACT_APP_GITHUB_USER || 'ikshv';

function normalizeTags(j) {
  if (!j) return [];
  if (Array.isArray(j.tags)) return j.tags.filter(Boolean).map(String);
  if (typeof j.tags === 'string' && j.tags.trim()) return [j.tags.trim()];
  return [];
}

/** Title from repo name: "my-cool-app" -> "My Cool App" */
function titleFromRepoName(name) {
  if (!name) return '';
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

async function fetchAllUserRepos(login) {
  const all = [];
  let page = 1;
  const perPage = 100;

  for (;;) {
    const url = `https://api.github.com/users/${encodeURIComponent(
      login
    )}/repos?per_page=${perPage}&page=${page}&sort=updated&type=owner`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub list repos failed (${res.status}): ${text.slice(0, 200)}`);
    }
    const chunk = await res.json();
    if (!Array.isArray(chunk)) {
      throw new Error('Unexpected GitHub API response');
    }
    all.push(...chunk);
    if (chunk.length < perPage) break;
    page += 1;
    if (page > 50) break; // safety cap (5000 repos)
  }

  return all;
}

async function tryFetchProjectJson(repo) {
  const login = repo.owner?.login || DEFAULT_OWNER;
  const branch = repo.default_branch || 'main';
  const rawUrl = `https://raw.githubusercontent.com/${login}/${repo.name}/${branch}/project.json`;
  try {
    const fileRes = await fetch(rawUrl);
    if (!fileRes.ok) return null;
    const j = await fileRes.json();
    return j && typeof j === 'object' ? j : null;
  } catch {
    return null;
  }
}

/**
 * Upserts one row per GitHub repo (public list). Optional root project.json enriches
 * title, description, tags, homepage when present.
 * Preserves displayed_on_site, is_highlight, highlight_sort for existing rows.
 * New repos default to hidden on the public site until you enable "On site".
 */
export async function syncGitHubPortfolioProjects(ownerLogin = DEFAULT_OWNER) {
  if (!supabase) {
    throw new Error('Supabase is not configured (missing REACT_APP_* at build time).');
  }

  const repos = await fetchAllUserRepos(ownerLogin);

  const { data: existingRows, error: existingErr } = await supabase
    .from('portfolio_projects')
    .select('github_repo,is_highlight,highlight_sort,displayed_on_site');

  if (existingErr) throw existingErr;

  const existing = new Map(
    (existingRows || []).map((r) => [
      r.github_repo.toLowerCase(),
      {
        is_highlight: r.is_highlight,
        highlight_sort: r.highlight_sort,
        displayed_on_site: r.displayed_on_site,
      },
    ])
  );

  const now = new Date().toISOString();
  const upserts = [];

  for (const repo of repos) {
    const fullName = (repo.full_name || `${ownerLogin}/${repo.name}`).toLowerCase();
    const j = await tryFetchProjectJson(repo);

    const prev = existing.get(fullName) || {};

    const title = j
      ? (typeof j.title === 'string' && j.title.trim()) ||
        (typeof j.name === 'string' && j.name.trim()) ||
        titleFromRepoName(repo.name)
      : titleFromRepoName(repo.name);

    const description = j
      ? (typeof j.description === 'string' && j.description.trim()) ||
        (repo.description && String(repo.description).trim()) ||
        ''
      : (repo.description && String(repo.description).trim()) || '';

    const homepage = j
      ? (typeof j.homepage === 'string' && j.homepage.trim()) ||
        (typeof j.demo === 'string' && j.demo.trim()) ||
        (repo.homepage && String(repo.homepage).trim()) ||
        null
      : (repo.homepage && String(repo.homepage).trim()) || null;

    const slug =
      (j && typeof j.slug === 'string' && j.slug.trim()) || repo.name;

    const tags = j ? normalizeTags(j) : [];

    const hasPrev = Object.keys(prev).length > 0;
    const displayed_on_site = hasPrev
      ? prev.displayed_on_site
      : false;

    const pushedAt = repo.pushed_at ? new Date(repo.pushed_at).toISOString() : null;

    upserts.push({
      github_repo: fullName,
      slug,
      title,
      description,
      tags,
      homepage,
      github_url: repo.html_url || `https://github.com/${fullName}`,
      displayed_on_site,
      is_highlight: hasPrev ? prev.is_highlight : false,
      highlight_sort: hasPrev ? prev.highlight_sort : 0,
      published_at: pushedAt,
      last_synced_at: now,
    });
  }

  if (upserts.length === 0) {
    return { upserted: 0, message: 'No repositories returned from GitHub.' };
  }

  const { error } = await supabase.from('portfolio_projects').upsert(upserts, {
    onConflict: 'github_repo',
  });

  if (error) throw error;
  return {
    upserted: upserts.length,
    message:
      `Synced ${upserts.length} repo(s). New ones stay off the public site until you turn on On site.`,
  };
}
