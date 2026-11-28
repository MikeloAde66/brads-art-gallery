'use client';

import { useMemo, useState } from 'react';
import type { Artwork } from '@/data/artworks';
import type { Medium } from '@/data/printOptions';
import GalleryGrid from './GalleryGrid';

interface WallArtCategoryGridProps {
  artworks: Artwork[];
}

const CATEGORY_LABELS: Record<Medium, string> = {
  canvas: 'Canvas Prints',
  paper: 'Fine Art Paper Prints',
  acrylic: 'Acrylic Prints',
  metal: 'Metal Prints',
};

// Fixed display order — matches how FinerWorks groups the virtual inventory.
const CATEGORY_ORDER: Medium[] = ['canvas', 'paper', 'acrylic', 'metal'];

export default function WallArtCategoryGrid({ artworks }: WallArtCategoryGridProps) {
  const [active, setActive] = useState<Medium | 'all'>('all');

  // Only show category tabs for mediums that at least one piece actually offers.
  const availableCategories = useMemo(() => {
    const mediums = new Set<Medium>();
    for (const artwork of artworks) {
      for (const variant of artwork.variants) {
        mediums.add(variant.medium);
      }
    }
    return CATEGORY_ORDER.filter((m) => mediums.has(m));
  }, [artworks]);

  const filtered = useMemo(() => {
    if (active === 'all') return artworks;
    return artworks.filter((artwork) => artwork.variants.some((v) => v.medium === active));
  }, [artworks, active]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
            active === 'all'
              ? 'border-neutral-100 bg-neutral-100 text-neutral-950'
              : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
          }`}
        >
          All
        </button>
        {availableCategories.map((medium) => (
          <button
            key={medium}
            type="button"
            onClick={() => setActive(medium)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors ${
              active === medium
                ? 'border-neutral-100 bg-neutral-100 text-neutral-950'
                : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
          >
            {CATEGORY_LABELS[medium]}
          </button>
        ))}
      </div>

      <GalleryGrid artworks={filtered} />
    </div>
  );
}
