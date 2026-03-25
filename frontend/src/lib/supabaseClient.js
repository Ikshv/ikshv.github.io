import { createClient } from '@supabase/supabase-js';

const url = (process.env.REACT_APP_SUPABASE_URL || '').trim();
const anonKey = (process.env.REACT_APP_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env missing: set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (see frontend/.env.example). ' +
      'For Vercel: Project Settings → Environment Variables → Production, then redeploy.'
  );
}

/** Null when env vars were not present at build time (e.g. missing Vercel env). */
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
