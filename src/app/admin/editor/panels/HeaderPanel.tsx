'use client';

import type { HeroConfig } from '@/lib/siteConfig';

interface HeaderPanelProps {
  value: HeroConfig;
  onChange: (value: HeroConfig) => void;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600';
const labelClasses = 'text-xs uppercase tracking-widest text-neutral-500';

export default function HeaderPanel({ value, onChange }: HeaderPanelProps) {
  return (
    <div className="space-y-4 border-b border-neutral-800 p-6">
      <h3 className="font-serif text-lg text-neutral-100">Header &amp; Collection</h3>

      <div>
        <label className={labelClasses}>Subtitle</label>
        <input
          type="text"
          value={value.subtitle}
          onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div>
        <label className={labelClasses}>Title</label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className={`mt-1 ${inputClasses}`}
        />
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={3}
          className={`mt-1 ${inputClasses}`}
        />
      </div>
    </div>
  );
}
