import { createHmac } from 'crypto';

// Deliberately free of any 'next/headers'/'next/server' imports — this
// file is imported by proxy.ts, and pulling in next/headers here (even
// unused by proxy's own code) drags it into the proxy bundle, where
// cookies() isn't valid since proxy never renders through the RSC
// context that API depends on. isAuthed() (which needs cookies()) lives
// in src/lib/adminSession.ts instead, imported only by Server
// Components/Actions, never by proxy.ts.

export const ADMIN_SESSION_COOKIE = 'admin_session';

// Shared by proxy.ts (magic-link entry) and the login Server Action
// (password-form entry) so both set the cookie identically.
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export function verifyPassword(candidate: string): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && candidate === process.env.ADMIN_PASSWORD;
}

// One shared password, no per-session randomness needed — the cookie value
// is deterministic from two server-only secrets, so any request can be
// verified without a session store.
//
// Returns null if either secret is unset, rather than hashing empty
// strings — HMAC('', '') is a fixed, publicly-computable value, and
// without this guard someone could forge that exact cookie to bypass the
// gate on a deployment where these env vars were never configured.
export function getSessionCookieValue(): string | null {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return null;
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(process.env.ADMIN_PASSWORD)
    .digest('hex');
}
