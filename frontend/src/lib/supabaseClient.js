import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env missing: set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (see frontend/.env.example)'
  );
}

export const supabase = createClient(url || '', anonKey || '');
