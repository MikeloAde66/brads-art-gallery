'use client';

import { useState } from 'react';
import type { NarrationConfig } from '@/lib/siteConfig';

interface NarrationPanelProps {
  value: NarrationConfig;
  onChange: (value: NarrationConfig) => void;
  onUpload: (formData: FormData) => Promise<{ url: string } | { error: string }>;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600';
const labelClasses = 'text-xs uppercase tracking-widest text-neutral-500';

export default function NarrationPanel({ value, onChange, onUpload }: NarrationPanelProps) {
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
      onChange({ ...value, audioUrl: result.url });
    }
  };

  return (
    <div className="space-y-4 border-b border-neutral-800 p-6">
      <h3 className="font-serif text-lg text-neutral-100">Typewriter &amp; Audio Narration</h3>

      <div>
        <label className={labelClasses}>Curator Description (by Ade)</label>
        <textarea
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          rows={4}
          placeholder="Leave blank to hide this section"
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div>
        <label className={labelClasses}>Typewriter Speed (ms per character)</label>
        <input
          type="number"
          min={1}
          value={value.typewriterSpeedMs}
          onChange={(e) => onChange({ ...value, typewriterSpeedMs: Number(e.target.value) || 1 })}
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div>
        <label className={labelClasses}>Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mt-1 w-full text-xs text-neutral-400"
        />
        {isUploading && <p className="mt-1 text-xs text-neutral-500">Uploading…</p>}
        {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
      </div>

      <div>
        <label className={labelClasses}>Or Audio URL</label>
        <input
          type="text"
          value={value.audioUrl}
          onChange={(e) => onChange({ ...value, audioUrl: e.target.value })}
          placeholder="https://…"
          className={`mt-1 ${inputClasses}`}
        />
      </div>
    </div>
  );
}
