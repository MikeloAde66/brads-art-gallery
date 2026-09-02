'use client';

import { useState } from 'react';
import type { ShowcaseConfig } from '@/lib/siteConfig';

interface ShowcasePanelProps {
  value: ShowcaseConfig;
  onChange: (value: ShowcaseConfig) => void;
  onUpload: (formData: FormData) => Promise<{ url: string } | { error: string }>;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600';
const labelClasses = 'text-xs uppercase tracking-widest text-neutral-500';

export default function ShowcasePanel({ value, onChange, onUpload }: ShowcasePanelProps) {
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
      onChange({ ...value, imageUrl: result.url });
    }
  };

  return (
    <div className="space-y-4 border-b border-neutral-800 p-6">
      <h3 className="font-serif text-lg text-neutral-100">Showcase Work</h3>

      <div>
        <label className={labelClasses}>Image (overrides the artwork&apos;s default photo)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mt-1 w-full text-xs text-neutral-400"
        />
        {isUploading && <p className="mt-1 text-xs text-neutral-500">Uploading…</p>}
        {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
      </div>

      <div>
        <label className={labelClasses}>Or Image URL</label>
        <input
          type="text"
          value={value.imageUrl}
          onChange={(e) => onChange({ ...value, imageUrl: e.target.value })}
          placeholder="Leave blank to use the artwork's own photo"
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClasses}>Dimensions</label>
          <input
            type="text"
            value={value.dimensions}
            onChange={(e) => onChange({ ...value, dimensions: e.target.value })}
            placeholder='16×20"'
            className={`mt-1 ${inputClasses}`}
          />
        </div>
        <div>
          <label className={labelClasses}>Medium</label>
          <input
            type="text"
            value={value.medium}
            onChange={(e) => onChange({ ...value, medium: e.target.value })}
            placeholder="Oil on Linen/Canvas"
            className={`mt-1 ${inputClasses}`}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={value.showPricing}
          onChange={(e) => onChange({ ...value, showPricing: e.target.checked })}
        />
        Show pricing / allow purchase
      </label>

      <label className="flex items-center gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={value.showAcquisitionNote}
          onChange={(e) => onChange({ ...value, showAcquisitionNote: e.target.checked })}
        />
        Show acquisition note
      </label>

      {value.showAcquisitionNote && (
        <textarea
          value={value.acquisitionNoteText}
          onChange={(e) => onChange({ ...value, acquisitionNoteText: e.target.value })}
          rows={3}
          placeholder="Acquisition note text…"
          className={inputClasses}
        />
      )}
    </div>
  );
}
