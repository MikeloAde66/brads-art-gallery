import type { Metadata } from 'next';
import { ARTWORKS, type OriginalMedium } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: "Media — Brad's Art Gallery",
};

const MEDIUM_SECTIONS: Array<{ id: OriginalMedium; label: string }> = [
  { id: 'charcoal', label: 'Charcoal' },
  { id: 'acrylic', label: 'Acrylic' },
  { id: 'liquid-lead', label: 'Liquid Lead' },
  { id: 'oil', label: 'Oil' },
];

export default function MediaPage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 text-center sm:pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Original Mediums</p>
        <h1 className="mt-4 font-serif text-3xl text-neutral-50">Charcoal · Acrylic · Liquid Lead · Oil</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
          Browse originals grouped by how they were made.
        </p>
      </section>

      {MEDIUM_SECTIONS.map(({ id, label }) => {
        const pieces = ARTWORKS.filter((a) => a.originalMedium === id);
        return (
          <section key={id} className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="font-serif text-xl text-neutral-100">{label}</h2>
            {pieces.length > 0 ? (
              <div className="mt-6">
                <GalleryGrid artworks={pieces} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">
                No pieces tagged as {label} yet — add{' '}
                <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-400">
                  originalMedium: &apos;{id}&apos;
                </code>{' '}
                to a piece in <code className="text-neutral-400">src/data/artworks.ts</code> to show it here.
              </p>
            )}
          </section>
        );
      })}
    </main>
  );
}
