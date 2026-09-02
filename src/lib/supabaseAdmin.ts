import { createClient } from '@supabase/supabase-js';

// Server-only: uses the service-role key, which bypasses RLS entirely.
// Never import this file from a 'use client' component — the browser must
// never see this key. All Supabase access in this app goes through Server
// Components/Server Actions that use this singleton.
//
// createClient() throws synchronously if given an empty URL — before
// Supabase is configured, that would crash every page at build/import
// time instead of failing gracefully inside getSiteConfig()'s try/catch.
// A syntactically-valid placeholder defers the failure to the actual
// network call, where it's caught and falls back to DEFAULT_SITE_CONFIG.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key',
  { auth: { persistSession: false } }
);

export const SITE_CONFIG_TABLE = 'site_config';
export const SITE_CONFIG_ROW_ID = 1;
export const MEDIA_BUCKET = 'site-media';
