import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

/**
 * @param {{ includeDrafts?: boolean, highlightsOnly?: boolean, limit?: number, orderBy?: 'published' | 'github_repo' }} [options]
 */
export function usePortfolioProjects(options = {}) {
  const {
    includeDrafts = false,
    highlightsOnly = false,
    limit = null,
    orderBy = 'published',
  } = options;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      setError(
        'Supabase is not configured for this build (set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY when building, then redeploy).'
      );
      setRows([]);
      setLoading(false);
      return;
    }

    let q = supabase.from('portfolio_projects').select('*');

    if (!includeDrafts) {
      q = q.eq('displayed_on_site', true);
    }

    if (highlightsOnly) {
      q = q.eq('is_highlight', true);
      q = q.order('highlight_sort', { ascending: true });
      q = q.order('title', { ascending: true });
      if (limit != null) q = q.limit(limit);
    } else if (orderBy === 'github_repo') {
      q = q.order('github_repo', { ascending: true });
    } else {
      q = q.order('published_at', { ascending: false, nullsFirst: false });
      q = q.order('title', { ascending: true });
    }

    const { data, error: qErr } = await q;

    if (qErr) {
      setError(qErr.message);
      setRows([]);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  }, [includeDrafts, highlightsOnly, limit, orderBy]);

  useEffect(() => {
    load();
  }, [load]);

  return { rows, loading, error, refetch: load };
}
