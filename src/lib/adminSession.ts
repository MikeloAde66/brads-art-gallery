import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, getSessionCookieValue } from './adminAuth';

// Called independently inside every gated page and every Server Action
// under /admin — the proxy-level gate alone is not treated as sufficient.
// Only ever imported from Server Components/Server Actions, never from
// proxy.ts (see the note in adminAuth.ts for why that split matters).
export async function isAuthed(): Promise<boolean> {
  const expected = getSessionCookieValue();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === expected;
}
