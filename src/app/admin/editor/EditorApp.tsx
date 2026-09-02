'use client';

import { useState, useTransition } from 'react';
import type { SiteConfig } from '@/lib/siteConfig';
import { publishSiteConfig, uploadMedia, logoutAdmin } from './actions';
import HeaderPanel from './panels/HeaderPanel';
import VideoPanel from './panels/VideoPanel';
import ShowcasePanel from './panels/ShowcasePanel';
import NarrationPanel from './panels/NarrationPanel';
import NavPanel from './panels/NavPanel';
import LivePreview from './LivePreview';

interface EditorAppProps {
  initialConfig: SiteConfig;
}

export default function EditorApp({ initialConfig }: EditorAppProps) {
  const [draft, setDraft] = useState<SiteConfig>(initialConfig);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const hasUnsavedChanges = JSON.stringify(draft) !== JSON.stringify(initialConfig);

  const handlePublish = () => {
    startTransition(async () => {
      const result = await publishSiteConfig(draft);
      if (result.success) {
        setStatus({ type: 'success', message: 'Published — changes are live.' });
      } else {
        setStatus({ type: 'error', message: result.error });
      }
    });
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-neutral-100">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-6 py-4">
        <h1 className="font-serif text-lg tracking-wide">Page Editor</h1>
        <div className="flex items-center gap-4">
          {status && (
            <p className={`text-xs ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {status.message}
            </p>
          )}
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending || !hasUnsavedChanges}
            className="rounded-full bg-neutral-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white disabled:opacity-40"
          >
            {isPending ? 'Publishing…' : 'Publish Changes'}
          </button>
          <button
            type="button"
            onClick={() => logoutAdmin()}
            className="text-xs uppercase tracking-wide text-neutral-500 hover:text-neutral-200"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-full max-w-md shrink-0 overflow-y-auto border-r border-neutral-800">
          <HeaderPanel value={draft.hero} onChange={(hero) => setDraft((d) => ({ ...d, hero }))} />
          <VideoPanel
            value={draft.video}
            onChange={(video) => setDraft((d) => ({ ...d, video }))}
            onUpload={uploadMedia}
          />
          <ShowcasePanel
            value={draft.showcase}
            onChange={(showcase) => setDraft((d) => ({ ...d, showcase }))}
            onUpload={uploadMedia}
          />
          <NarrationPanel
            value={draft.narration}
            onChange={(narration) => setDraft((d) => ({ ...d, narration }))}
            onUpload={uploadMedia}
          />
          <NavPanel value={draft.nav} onChange={(nav) => setDraft((d) => ({ ...d, nav }))} />
        </div>

        <div className="flex-1 overflow-hidden">
          <LivePreview config={draft} />
        </div>
      </div>
    </div>
  );
}
