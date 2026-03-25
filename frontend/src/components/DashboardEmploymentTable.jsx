import React, { useState, useCallback } from 'react';
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

function emptyProjectDraft() {
  return {
    name: '',
    summary: '',
    technologies: '',
    highlights: '',
    show_on_site: true,
  };
}

function rowToEditorDraft(row) {
  const projects = Array.isArray(row.projects) ? row.projects : [];
  return {
    rowId: row.id,
    job_title: row.job_title || '',
    company_name: row.company_name || '',
    start_date: row.start_date || '',
    end_date: row.end_date ?? '',
    description: row.description || '',
    projects: projects.map((p) => ({
      name: p.name || '',
      summary: p.summary || '',
      technologies: (p.technologies || []).join(', '),
      highlights: (p.highlights || []).join('\n'),
      show_on_site: p.show_on_site !== false,
    })),
  };
}

function draftToProjectsPayload(draftProjects) {
  return draftProjects
    .map((p) => {
      const name = p.name.trim();
      const summary = p.summary.trim();
      const technologies = p.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const highlights = p.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);
      const out = { name, summary, technologies, highlights };
      if (p.show_on_site === false) {
        out.show_on_site = false;
      }
      return out;
    })
    .filter(
      (p) =>
        p.name ||
        p.summary ||
        p.technologies.length > 0 ||
        p.highlights.length > 0
    );
}

const fieldRowClass = 'grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-3 items-start py-1.5 border-b border-white/5';

function DashboardEmploymentTable() {
  const { rows, loading, error, refetch } = useEmploymentPositions({ includeDrafts: true });
  const [expandedId, setExpandedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [updateErr, setUpdateErr] = useState('');

  const tableError = isMissingEmploymentTable(error) || isMissingEmploymentTable(updateErr);

  const openEditor = useCallback((row) => {
    setExpandedId(row.id);
    setDraft(rowToEditorDraft(row));
    setUpdateErr('');
  }, []);

  const closeEditor = useCallback(() => {
    setExpandedId(null);
    setDraft(null);
  }, []);

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
      return false;
    }
    await refetch();
    return true;
  }

  async function saveEmploymentDetail() {
    if (!draft) return;
    setUpdateErr('');
    const projects = draftToProjectsPayload(draft.projects);
    const ok = await updateRow(draft.rowId, {
      job_title: draft.job_title.trim(),
      company_name: draft.company_name.trim(),
      start_date: draft.start_date.trim(),
      end_date: draft.end_date.trim() === '' ? null : draft.end_date.trim(),
      description: draft.description.trim(),
      projects,
    });
    if (ok) closeEditor();
  }

  function updateDraftField(key, value) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  }

  function updateProjectDraft(i, key, value) {
    setDraft((d) => {
      if (!d) return d;
      const next = [...d.projects];
      next[i] = { ...next[i], [key]: value };
      return { ...d, projects: next };
    });
  }

  function addProject() {
    setDraft((d) => (d ? { ...d, projects: [...d.projects, emptyProjectDraft()] } : d));
  }

  function removeProject(i) {
    setDraft((d) => {
      if (!d) return d;
      return { ...d, projects: d.projects.filter((_, j) => j !== i) };
    });
  }

  return (
    <div className="flex flex-col h-full min-h-[280px] max-h-[70vh] lg:max-h-none rounded-xl border border-white/20 bg-black/25 backdrop-blur-md shadow-lg overflow-hidden">
      <div className="shrink-0 px-4 py-3 border-b border-white/10 space-y-2">
        <div>
          <h2 className="text-lg font-semibold text-white">Employment</h2>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            About → Experience. <strong className="text-gray-300">Edit detail</strong> per role; toggle{' '}
            <strong className="text-gray-300">Show project on About</strong> inside the editor.{' '}
            <strong className="text-gray-300">Save</strong> writes to Supabase.
          </p>
        </div>

        {tableError && (
          <div
            className="rounded-lg border border-amber-500/50 bg-amber-950/40 p-3 text-xs text-amber-100 max-h-36 overflow-y-auto"
            role="alert"
          >
            <p className="font-semibold text-amber-50 mb-1">Create the employment table in Supabase</p>
            <p className="mb-1 text-amber-100/90 text-[11px]">
              Run <code className="text-white">supabase/migrations/20260325200000_employment_positions.sql</code>
              , then optionally{' '}
              <code className="text-white">supabase/optional_seed_employment_positions.sql</code>.
            </p>
            <p className="text-[11px] text-amber-200/70">Message: {error || updateErr}</p>
          </div>
        )}

        {!loading && !tableError && error && (
          <p className="text-red-300 text-xs" role="alert">
            {error}
          </p>
        )}

        {!loading && !tableError && rows.length === 0 && (
          <p className="text-gray-400 text-xs">
            No rows yet. Run the migration and optional seed, or insert positions in Supabase.
          </p>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3">
        {loading && <p className="text-gray-400 text-sm">Loading employment rows…</p>}

        {!loading && !tableError && rows.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-white/15">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="sticky top-0 z-[1] bg-neutral-950/95 backdrop-blur-sm text-xs uppercase text-gray-400 border-b border-white/10">
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
                          expandedId === row.id ? closeEditor() : openEditor(row)
                        }
                      >
                        {expandedId === row.id ? 'Close editor' : 'Edit detail'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === row.id && draft && draft.rowId === row.id && (
                    <tr className="border-t border-white/5 bg-black/25">
                      <td colSpan={7} className="px-3 py-4 text-xs align-top">
                        <div className="max-w-full space-y-6">
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-2">Role (About page)</h3>
                            <div className="rounded-md border border-white/10 bg-black/20 p-3 space-y-0">
                              <div className={fieldRowClass}>
                                <label className="text-gray-400 pt-2">Company</label>
                                <input
                                  className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                  value={draft.company_name}
                                  onChange={(e) => updateDraftField('company_name', e.target.value)}
                                />
                              </div>
                              <div className={fieldRowClass}>
                                <label className="text-gray-400 pt-2">Job title</label>
                                <input
                                  className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                  value={draft.job_title}
                                  onChange={(e) => updateDraftField('job_title', e.target.value)}
                                />
                              </div>
                              <div className={fieldRowClass}>
                                <label className="text-gray-400 pt-2">Start date</label>
                                <input
                                  className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                  value={draft.start_date}
                                  onChange={(e) => updateDraftField('start_date', e.target.value)}
                                  placeholder="e.g. Jan 2022"
                                />
                              </div>
                              <div className={fieldRowClass}>
                                <label className="text-gray-400 pt-2">End date</label>
                                <input
                                  className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                  value={draft.end_date}
                                  onChange={(e) => updateDraftField('end_date', e.target.value)}
                                  placeholder="Leave empty for Present"
                                />
                              </div>
                              <div className={fieldRowClass}>
                                <label className="text-gray-400 pt-2">Summary</label>
                                <textarea
                                  className="w-full min-h-[72px] rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                  value={draft.description}
                                  onChange={(e) => updateDraftField('description', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h3 className="text-sm font-semibold text-white">Projects in this role</h3>
                              <button
                                type="button"
                                onClick={addProject}
                                className="text-xs px-2 py-1 rounded bg-white/15 hover:bg-white/25 text-white"
                              >
                                Add project
                              </button>
                            </div>
                            <p className="text-gray-500 text-xs mb-3">
                              Technologies: comma-separated. Highlights: one bullet per line.
                            </p>
                            <div className="space-y-4">
                              {draft.projects.map((proj, i) => (
                                <div
                                  key={i}
                                  className="rounded-md border border-white/15 bg-black/20 p-3 space-y-0"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10 mb-2">
                                    <span className="text-gray-400 text-xs font-medium">
                                      Project {i + 1}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-3">
                                      <label className="flex items-center gap-1.5 text-gray-200 text-xs cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={proj.show_on_site}
                                          onChange={(e) =>
                                            updateProjectDraft(i, 'show_on_site', e.target.checked)
                                          }
                                        />
                                        Show project on About
                                      </label>
                                      <button
                                        type="button"
                                        className="text-xs text-red-300 hover:text-red-200"
                                        onClick={() => removeProject(i)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                  <div className={fieldRowClass}>
                                    <label className="text-gray-400 pt-2">Name</label>
                                    <input
                                      className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                      value={proj.name}
                                      onChange={(e) => updateProjectDraft(i, 'name', e.target.value)}
                                    />
                                  </div>
                                  <div className={fieldRowClass}>
                                    <label className="text-gray-400 pt-2">Summary</label>
                                    <textarea
                                      className="w-full min-h-[56px] rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                      value={proj.summary}
                                      onChange={(e) => updateProjectDraft(i, 'summary', e.target.value)}
                                    />
                                  </div>
                                  <div className={fieldRowClass}>
                                    <label className="text-gray-400 pt-2">Technologies</label>
                                    <input
                                      className="w-full rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm"
                                      value={proj.technologies}
                                      onChange={(e) =>
                                        updateProjectDraft(i, 'technologies', e.target.value)
                                      }
                                      placeholder="React, TypeScript, Node"
                                    />
                                  </div>
                                  <div className={fieldRowClass}>
                                    <label className="text-gray-400 pt-2">Highlights</label>
                                    <textarea
                                      className="w-full min-h-[80px] rounded bg-black/40 border border-white/20 px-2 py-1.5 text-white text-sm font-mono"
                                      value={proj.highlights}
                                      onChange={(e) =>
                                        updateProjectDraft(i, 'highlights', e.target.value)
                                      }
                                      placeholder="One line per bullet"
                                    />
                                  </div>
                                </div>
                              ))}
                              {draft.projects.length === 0 && (
                                <p className="text-gray-500 text-sm">No projects. Click Add project.</p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <button
                              type="button"
                              disabled={busyId === row.id}
                              onClick={saveEmploymentDetail}
                              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm text-white font-medium"
                            >
                              {busyId === row.id ? 'Saving…' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={closeEditor}
                              className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
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
    </div>
  );
}

export default DashboardEmploymentTable;
