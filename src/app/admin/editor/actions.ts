'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAuthed, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth';
import { supabaseAdmin, SITE_CONFIG_TABLE, SITE_CONFIG_ROW_ID, MEDIA_BUCKET } from '@/lib/supabaseAdmin';
import type { SiteConfig } from '@/lib/siteConfig';

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_MIME_PREFIXES = ['video/', 'audio/', 'image/'];

export async function publishSiteConfig(config: SiteConfig): Promise<{ success: true } | { success: false; error: string }> {
  if (!(await isAuthed())) {
    return { success: false, error: 'Unauthorized' };
  }

  const { error } = await supabaseAdmin
    .from(SITE_CONFIG_TABLE)
    .upsert({ id: SITE_CONFIG_ROW_ID, data: config, updated_at: new Date().toISOString() });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}

export async function uploadMedia(formData: FormData): Promise<{ url: string } | { error: string }> {
  if (!(await isAuthed())) {
    return { error: 'Unauthorized' };
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return { error: 'No file provided.' };
  }
  if (!ALLOWED_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix))) {
    return { error: 'File must be a video, audio, or image.' };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: 'File is too large (50MB max).' };
  }

  const path = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabaseAdmin.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect('/admin/login');
}
