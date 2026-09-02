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

  return (
    <>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} onSelect={setSelectedArtwork} />
        ))}
      </div>
      <ProductModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </>
  );
}
