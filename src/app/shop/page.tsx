import type { Metadata } from 'next';
import { ARTWORKS } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: "Shop — Brad's Art Gallery",
};

// Prints only, full page — the paint-splash welcome intro now lives on Home.
export default function ShopPage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 py-24 pt-24 sm:pt-32">
        <GalleryGrid artworks={ARTWORKS} />
      </section>
    </main>
  );
}
