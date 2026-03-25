import React, { useState } from 'react';
import { useEmploymentPositions } from '../hooks/useEmploymentPositions';
import { supabase } from '../lib/supabaseClient';

function isMissingEmploymentTable(msg) {
  if (!msg || typeof msg !== 'string') return false;
  const m = msg.toLowerCase();
  return (
    m.includes('employment_positions') &&
    (m.includes('schema cache') || m.includes('does not exist') || m.includes('could not find'))
  );
}

function projectCount(projects) {
  return Array.isArray(projects) ? projects.length : 0;
}

function DashboardEmploymentTable() {
  const { rows, loading, error, refetch } = useEmploymentPositions({ includeDrafts: true });
  const [expandedId, setExpandedId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [updateErr, setUpdateErr] = useState('');

  const tableError = isMissingEmploymentTable(error) || isMissingEmploymentTable(updateErr);

  async function updateRow(id, patch) {
    setBusyId(id);
    setUpdateErr('');
    const { error: uErr } = await supabase
      .from('employment_positions')
      .update(patch)
      .eq('id', id);
    setBusyId(null);
    if (uErr) {
      setUpdateErr(uErr.message);
      refetch();
      return;
    }
    refetch();
  }

  return (
    <div className="border-t border-white/10 pt-6 mt-6">
      <h2 className="text-xl font-semibold mb-2">Employment (About / Experience)</h2>
      <p className="text-gray-300 text-sm mb-4">
        Same data as the <span className="text-white">Experience</span> block on the About page.
        Each row can include nested <strong>projects</strong> (JSON array: name, summary, technologies,
        highlights). Edit full JSON in the Supabase Table Editor, or adjust visibility and order here.
      </p>

      {tableError && (
        <div
          className="mb-4 rounded-lg border border-amber-500/50 bg-amber-950/40 p-4 text-sm text-amber-100"
          role="alert"
        >
          <p className="font-semibold text-amber-50 mb-2">Create the employment table in Supabase</p>
          <p className="mb-2 text-amber-100/90">
            Run <code className="text-white">supabase/migrations/20260325200000_employment_positions.sql</code>{' '}
            in the SQL Editor, then optionally{' '}
            <code className="text-white">supabase/optional_seed_employment_positions.sql</code> for sample
            rows.
          </p>
          <p className="text-xs text-amber-200/70">Message: {error || updateErr}</p>
        </div>
      )}

      {loading && <p className="text-gray-400 text-sm">Loading employment rows…</p>}

      {!loading && !tableError && error && (
        <p className="text-red-300 text-sm mb-2" role="alert">
          {error}
        </p>
      )}

      {!loading && !tableError && rows.length === 0 && (
        <p className="text-gray-400 text-sm">
          No rows yet. Run the migration and optional seed, or insert positions in Supabase.
        </p>
      )}

      {!loading && !tableError && rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-white/15">
          <table className="w-full text-left text-sm text-gray-200">
            <thead className="bg-black/30 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-3 py-2">Company</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Dates</th>
                <th className="px-3 py-2">Projects</th>
                <th className="px-3 py-2">On site</th>
                <th className="px-3 py-2">Sort</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className="border-t border-white/10 bg-black/10">
                    <td className="px-3 py-2 font-medium text-white">{row.company_name}</td>
                    <td className="px-3 py-2">{row.job_title}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {row.start_date}
                      {row.end_date != null && row.end_date !== '' ? ` – ${row.end_date}` : ''}
                    </td>
                    <td className="px-3 py-2">{projectCount(row.projects)}</td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={row.displayed_on_site}
                        disabled={busyId === row.id}
                        onChange={(e) =>
                          updateRow(row.id, { displayed_on_site: e.target.checked })
                        }
                        aria-label={`Show ${row.company_name} on About page`}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        className="w-14 rounded bg-black/40 border border-white/20 px-1 py-0.5 text-white text-xs"
                        defaultValue={row.sort_order}
                        key={`${row.id}-${row.sort_order}`}
                        disabled={busyId === row.id}
                        onBlur={(e) => {
                          const v = parseInt(e.target.value, 10);
                          if (Number.isNaN(v) || v === row.sort_order) return;
                          updateRow(row.id, { sort_order: v });
                        }}
                        aria-label="Sort order"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="text-blue-300 hover:text-blue-200 text-xs"
                        onClick={() =>
                          setExpandedId((id) => (id === row.id ? null : row.id))
                        }
                      >
                        {expandedId === row.id ? 'Hide detail' : 'View detail'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === row.id && (
                    <tr className="border-t border-white/5 bg-black/20">
                      <td colSpan={7} className="px-3 py-3 text-xs">
                        <p className="text-gray-300 mb-2">{row.description}</p>
                        <p className="text-gray-500 mb-1">projects (JSON)</p>
                        <pre className="max-h-48 overflow-auto rounded bg-black/40 p-2 text-gray-400 whitespace-pre-wrap break-words">
                          {JSON.stringify(row.projects, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DashboardEmploymentTable;
