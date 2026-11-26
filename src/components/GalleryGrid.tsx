'use client';

import { useState } from 'react';
import type { Artwork } from '@/data/artworks';
import ArtworkCard from './ArtworkCard';
import ProductModal from './ProductModal';

interface GalleryGridProps {
  artworks: Artwork[];
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [featured, ...rest] = artworks;

  return (
    <>
      {featured && (
        <div className="mb-16">
          {/* Temporary: featured slot shows the same bg video, picture-in-picture style. Not final — text/labels to come later. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 sm:aspect-video">
            <video
              className="h-full w-full object-cover"
              src="/video/shop-bg-temp.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {rest.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index + 1}
              onSelect={setSelectedArtwork}
              compact
            />
          ))}
        </div>
      )}

      <ProductModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </>
  );
}
