import type { Metadata } from 'next';
import { ARTWORKS } from '@/data/artworks';
import WallArtCategoryGrid from '@/components/WallArtCategoryGrid';

export const metadata: Metadata = {
  title: "Shop — Brad's Art Gallery",
};

// Prints only, full page — the paint-splash welcome intro now lives on Home.
// Category tabs (Canvas / Fine Art Paper / Acrylic / Metal) filter by the
// print mediums each piece actually offers, same grouping as the FinerWorks
// virtual inventory.
export default function ShopPage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 py-24 pt-24 sm:pt-32">
        <WallArtCategoryGrid artworks={ARTWORKS} />
      </section>
    </main>
  );
}
