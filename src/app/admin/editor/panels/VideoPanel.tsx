'use client';

import { useState } from 'react';
import type { VideoConfig } from '@/lib/siteConfig';

interface VideoPanelProps {
  value: VideoConfig;
  onChange: (value: VideoConfig) => void;
  onUpload: (formData: FormData) => Promise<{ url: string } | { error: string }>;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600';
const labelClasses = 'text-xs uppercase tracking-widest text-neutral-500';

export default function VideoPanel({ value, onChange, onUpload }: VideoPanelProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('file', file);
    const result = await onUpload(formData);
    setIsUploading(false);

    if ('error' in result) {
      setUploadError(result.error);
    } else {
      onChange({ ...value, url: result.url });
    }
  };

  return (
    <div className="space-y-4 border-b border-neutral-800 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-neutral-100">Video Box</h3>
        <label className="flex items-center gap-2 text-xs text-neutral-400">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
          />
          Visible
        </label>
      </div>

      <div>
        <label className={labelClasses}>Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mt-1 w-full text-xs text-neutral-400"
        />
        {isUploading && <p className="mt-1 text-xs text-neutral-500">Uploading…</p>}
        {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
      </div>

      <div>
        <label className={labelClasses}>Or Video URL</label>
        <input
          type="text"
          value={value.url}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
          placeholder="https://…"
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.autoplay}
            onChange={(e) => onChange({ ...value, autoplay: e.target.checked })}
          />
          Autoplay
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.loop}
            onChange={(e) => onChange({ ...value, loop: e.target.checked })}
          />
          Loop
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.muted}
            onChange={(e) => onChange({ ...value, muted: e.target.checked })}
          />
          Muted by default
        </label>
      </div>

      <div>
        <label className={labelClasses}>Aspect Ratio</label>
        <select
          value={value.aspectRatio}
          onChange={(e) => onChange({ ...value, aspectRatio: e.target.value })}
          className={`mt-1 ${inputClasses}`}
        >
          <option value="16/9">16:9 (widescreen)</option>
          <option value="9/16">9:16 (vertical)</option>
          <option value="1/1">1:1 (square)</option>
          <option value="4/3">4:3</option>
        </select>
      </div>
    </div>
  );
}
