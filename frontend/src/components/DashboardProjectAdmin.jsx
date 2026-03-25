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
    <div className="flex flex-col h-full min-h-[280px] max-h-[70vh] lg:max-h-none rounded-xl border border-white/20 bg-black/25 backdrop-blur-md shadow-lg overflow-hidden">
      <div className="shrink-0 px-4 py-3 border-b border-white/10 space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-white">GitHub projects</h2>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            Sync loads all repos. Turn on <strong className="text-gray-300">On site</strong> for /projects;
            <strong className="text-gray-300"> Featured</strong> for the home row (lower sort first).
            Optional root <code className="text-gray-300">project.json</code> enriches fields.
          </p>
        </div>

        <button
          type="button"
          disabled={syncing}
          onClick={handleSyncGitHub}
          className="w-full sm:w-auto px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-sm font-medium transition"
        >
          {syncing ? 'Syncing from GitHub…' : 'Sync from GitHub'}
        </button>

        {syncMsg && <p className="text-emerald-200 text-xs">{syncMsg}</p>}

        {tableError && (
          <div
            className="rounded-lg border border-amber-500/50 bg-amber-950/40 p-3 text-xs text-amber-100 max-h-40 overflow-y-auto"
            role="alert"
          >
          <p className="font-semibold text-amber-50 mb-1">Create the table in Supabase first</p>
          <p className="mb-2 text-amber-100/90 text-[11px]">
            The app is talking to Supabase, but <code className="text-white">public.portfolio_projects</code>{' '}
            is not there yet (or the API cache is stale).
          </p>
          <ol className="list-decimal list-inside space-y-1 text-amber-100/90 mb-2 text-[11px]">
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
          <p className="text-red-300 text-xs" role="alert">
            {syncErr || error}
          </p>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3">
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
          <ul className="space-y-3 text-sm pb-2">
            {rows.map((p) => (
              <li
                key={p.id}
                className="bg-black/30 border border-white/15 rounded-lg p-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">{p.title}</div>
                  <div className="text-gray-500 text-xs truncate">{p.github_repo}</div>
                </div>
                <div className="flex flex-wrap gap-3 items-center sm:justify-end">
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-200 text-xs">
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
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-200 text-xs">
                    <input
                      type="checkbox"
                      checked={p.is_highlight}
                      disabled={busyId === p.id}
                      onChange={(e) => updateRow(p.id, { is_highlight: e.target.checked })}
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-1.5 text-gray-200 text-xs">
                    <span className="text-gray-400">Order</span>
                    <input
                      type="number"
                      className="w-14 rounded bg-black/40 border border-white/20 px-1.5 py-1 text-white text-xs"
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
    </div>
  );
}

export default DashboardProjectAdmin;
