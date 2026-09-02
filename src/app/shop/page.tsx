import type { Metadata } from 'next';
import { ARTWORKS } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: "Shop — Brad's Art Gallery",
};

export default function ShopPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Full Collection</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">Shop</h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <GalleryGrid artworks={ARTWORKS} />
      </section>
    </main>
  );
}
