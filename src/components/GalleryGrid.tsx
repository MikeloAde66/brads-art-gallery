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
          <ArtworkCard artwork={featured} index={0} onSelect={setSelectedArtwork} />
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
