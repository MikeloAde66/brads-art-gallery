import type { Metadata } from 'next';
import { ARTWORKS } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: "Shop — Brad's Art Gallery",
};

export default function ShopPage() {
  return (
    <main className="relative flex-1">
      {/* Temporary full-page background video — picture-in-picture test, not final */}
      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src="/video/shop-bg-temp.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed inset-0 -z-10 bg-black/50" />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:pt-32">
        {/* Header intentionally left empty for now */}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <GalleryGrid artworks={ARTWORKS} />
      </section>
    </main>
  );
}
