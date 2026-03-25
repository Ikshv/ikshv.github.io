import React, { useState } from 'react';
import { usePortfolioProjects } from '../hooks/usePortfolioProjects';
import { syncGitHubPortfolioProjects } from '../lib/githubProjectSync';
import { supabase } from '../lib/supabaseClient';

function DashboardProjectAdmin() {
  const { rows, loading, error, refetch } = usePortfolioProjects({
    includeDrafts: true,
    highlightsOnly: false,
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

  const handleSyncGitHub = async () => {
    setSyncing(true);
    setSyncMsg('');
    setSyncErr('');
    try {
      const r = await syncGitHubPortfolioProjects();
      setSyncMsg(
        r.message ||
          `Synced ${r.upserted} repo(s) with project.json. Highlight settings were kept.`
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
        Home highlights and <span className="text-white">/projects</span> read from the same table.
        Sync pulls repos that contain a root <code className="text-gray-200">project.json</code> (same
        idea as your GitHub Action). Toggle <strong>Featured</strong> to show a project in the home
        &quot;Featured Projects&quot; row (up to three with lowest sort order).
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
      {(syncErr || error) && (
        <p className="text-red-300 text-sm mb-2" role="alert">
          {syncErr || error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading projects…</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No rows yet. Run the portfolio table migration in Supabase (empty table), configure GitHub
          username if needed, then use <strong>Sync from GitHub</strong> for a repo with{' '}
          <code className="text-gray-300">project.json</code>.
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
