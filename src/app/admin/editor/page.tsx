import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/adminSession';
import { getSiteConfig } from '@/lib/siteConfig';
import EditorApp from './EditorApp';

// Must always run per-request — never statically prerendered. Without this,
// whether Next detects the cookies() read inside isAuthed() (and therefore
// classifies this route as dynamic) can depend on whether ADMIN_PASSWORD/
// ADMIN_SESSION_SECRET happen to be set at build time, which is fragile.
export const dynamic = 'force-dynamic';

export default async function AdminEditorPage() {
  if (!(await isAuthed())) {
    redirect('/admin/login');
  }

  const config = await getSiteConfig();

  return <EditorApp initialConfig={config} />;
}
