import React, { useState } from 'react';
import { usePortfolioProjects } from '../hooks/usePortfolioProjects';
import { syncGitHubPortfolioProjects } from '../lib/githubProjectSync';
import { supabase } from '../lib/supabaseClient';

function isMissingPortfolioTable(msg) {
  if (!msg || typeof msg !== 'string') return false;
  const m = msg.toLowerCase();
  return (
    m.includes('portfolio_projects') &&
    (m.includes('schema cache') ||
      m.includes('does not exist') ||
      m.includes('could not find'))
  );
}

function DashboardProjectAdmin() {
  const { rows, loading, error, refetch } = usePortfolioProjects({
    includeDrafts: true,
    highlightsOnly: false,
    orderBy: 'github_repo',
  });
  const [syncMsg, setSyncMsg] = useState('');
  const [syncErr, setSyncErr] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [busyId, setBusyId] = useState(null);

  async function updateRow(id, patch) {
    setBusyId(id);
    setSyncErr('');
    const { error: uErr } = await supabase
      .from('portfolio_projects')
      .update(patch)
      .eq('id', id);
    setBusyId(null);
    if (uErr) {
      setSyncErr(uErr.message);
      refetch();
      return;
    }
    refetch();
  }

  const tableError = [syncErr, error].find((m) => isMissingPortfolioTable(m));

  const handleSyncGitHub = async () => {
    setSyncing(true);
    setSyncMsg('');
    setSyncErr('');
    try {
      const r = await syncGitHubPortfolioProjects();
      setSyncMsg(
        r.message ||
          `Synced ${r.upserted} repo(s). Visibility and featured toggles were kept where rows already existed.`
      );
      await refetch();
    } catch (e) {
      setSyncErr(e.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="border-t border-white/10 pt-6 mt-6">
      <h2 className="text-xl font-semibold mb-2">Projects (Supabase)</h2>
      <p className="text-gray-300 text-sm mb-4">
        <strong>Sync from GitHub</strong> imports <em>every</em> repo on your account (paginated).
        Names and descriptions come from GitHub; if a repo has a root{' '}
        <code className="text-gray-200">project.json</code>, that can override title, blurb, tags, and
        demo link. New repos start with <strong>On site</strong> off—turn it on for anything you want
        on <span className="text-white">/projects</span> or the home grid. <strong>Featured</strong>{' '}
        picks up to three for the home row (lowest sort order first).
      </p>

      <button
        type="button"
        disabled={syncing}
        onClick={handleSyncGitHub}
        className="mb-4 px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-sm font-medium transition"
      >
        {syncing ? 'Syncing from GitHub…' : 'Sync from GitHub'}
      </button>

      {syncMsg && <p className="text-emerald-200 text-sm mb-2">{syncMsg}</p>}

      {tableError && (
        <div
          className="mb-4 rounded-lg border border-amber-500/50 bg-amber-950/40 p-4 text-sm text-amber-100"
          role="alert"
        >
          <p className="font-semibold text-amber-50 mb-2">Create the table in Supabase first</p>
          <p className="mb-2 text-amber-100/90">
            The app is talking to Supabase, but <code className="text-white">public.portfolio_projects</code>{' '}
            is not there yet (or the API cache is stale).
          </p>
          <ol className="list-decimal list-inside space-y-1 text-amber-100/90 mb-3">
            <li>
              Open your project at{' '}
              <a
                href="https://supabase.com/dashboard"
                className="text-blue-300 underline"
                target="_blank"
                rel="noreferrer"
              >
                supabase.com/dashboard
              </a>
              — use the <strong>same</strong> project as <code className="text-white">REACT_APP_SUPABASE_URL</code>.
            </li>
            <li>
              <strong>SQL Editor</strong> → New query → paste the full file{' '}
              <code className="text-white">supabase/migrations/20260325120000_portfolio_projects.sql</code> from
              this repo → <strong>Run</strong>.
            </li>
            <li>
              If the error persists, run once:{' '}
              <code className="block mt-1 bg-black/40 p-2 rounded text-white text-xs">
                NOTIFY pgrst, &apos;reload schema&apos;;
              </code>
            </li>
          </ol>
          <p className="text-xs text-amber-200/70">
            Raw message: {syncErr || error}
          </p>
        </div>
      )}

      {(syncErr || error) && !tableError && (
        <p className="text-red-300 text-sm mb-2" role="alert">
          {syncErr || error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading projects…</p>
      ) : tableError ? null : rows.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No rows yet. Use <strong>Sync from GitHub</strong> to import all your repos (set{' '}
          <code className="text-gray-300">REACT_APP_GITHUB_USER</code> if your login is not{' '}
          <code className="text-gray-300">ikshv</code>), then enable <strong>On site</strong> for each
          project you want public.
        </p>
      ) : (
        <ul className="space-y-3 text-sm">
          {rows.map((p) => (
            <li
              key={p.id}
              className="bg-black/20 border border-white/15 rounded-lg p-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <div className="font-medium text-white">{p.title}</div>
                <div className="text-gray-500 text-xs truncate">{p.github_repo}</div>
              </div>
              <div className="flex flex-wrap gap-3 items-center sm:justify-end">
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-200">
                  <input
                    type="checkbox"
                    checked={p.displayed_on_site}
                    disabled={busyId === p.id}
                    onChange={(e) =>
                      updateRow(p.id, { displayed_on_site: e.target.checked })
                    }
                  />
                  On site
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-200">
                  <input
                    type="checkbox"
                    checked={p.is_highlight}
                    disabled={busyId === p.id}
                    onChange={(e) => updateRow(p.id, { is_highlight: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-1.5 text-gray-200">
                  <span className="text-xs text-gray-400">Order</span>
                  <input
                    type="number"
                    className="w-16 rounded bg-black/40 border border-white/20 px-2 py-1 text-white"
                    defaultValue={p.highlight_sort}
                    key={`${p.id}-${p.highlight_sort}`}
                    disabled={busyId === p.id}
                    onBlur={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (Number.isNaN(v) || v === p.highlight_sort) return;
                      updateRow(p.id, { highlight_sort: v });
                    }}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardProjectAdmin;
