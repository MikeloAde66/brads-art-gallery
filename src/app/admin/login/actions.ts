'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyPassword, getSessionCookieValue, ADMIN_SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from '@/lib/adminAuth';

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (!verifyPassword(password)) {
    redirect('/admin/login?error=1');
  }

  const sessionValue = getSessionCookieValue();
  if (!sessionValue) {
    // ADMIN_SESSION_SECRET is missing even though ADMIN_PASSWORD matched —
    // a deployment misconfiguration, not a wrong-password case.
    redirect('/admin/login?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionValue, SESSION_COOKIE_OPTIONS);

  redirect('/admin/editor');
}
