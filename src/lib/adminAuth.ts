import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'admin_session';

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

// Called independently inside every gated page and every Server Action
// under /admin — the proxy-level gate alone is not treated as sufficient.
export async function isAuthed(): Promise<boolean> {
  const expected = getSessionCookieValue();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === expected;
}
