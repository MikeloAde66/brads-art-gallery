import type { Metadata } from 'next';
import { ARTWORKS } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: "New Earth Collection — Brad's Art Gallery",
};

const COLLECTION_ID = 'new-earth';

export default function NewEarthCollectionPage() {
  const pieces = ARTWORKS.filter((a) => a.collections?.includes(COLLECTION_ID));

  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 text-center sm:pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Curated Series</p>
        <h1 className="mt-4 font-serif text-3xl text-neutral-50">The New Earth Collection</h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {pieces.length > 0 ? (
          <GalleryGrid artworks={pieces} />
        ) : (
          <p className="text-center text-sm text-neutral-500">
            No pieces tagged for this collection yet — add{' '}
            <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-neutral-400">
              collections: [&apos;{COLLECTION_ID}&apos;]
            </code>{' '}
            to a piece in <code className="text-neutral-400">src/data/artworks.ts</code> to show it here.
          </p>
        )}
      </section>
    </main>
  );
}
