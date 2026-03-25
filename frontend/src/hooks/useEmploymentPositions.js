import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * @param {{ includeDrafts?: boolean }} [options]
 */
export function useEmploymentPositions(options = {}) {
  const { includeDrafts = false } = options;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    let q = supabase.from('employment_positions').select('*');
    if (!includeDrafts) {
      q = q.eq('displayed_on_site', true);
    }
    q = q.order('sort_order', { ascending: true });

    const { data, error: qErr } = await q;

    if (qErr) {
      setError(qErr.message);
      setRows([]);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  }, [includeDrafts]);

  useEffect(() => {
    load();
  }, [load]);

  return { rows, loading, error, refetch: load };
}
