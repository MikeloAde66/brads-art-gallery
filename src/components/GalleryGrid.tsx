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

  const selectedIndex = selectedArtwork ? artworks.findIndex((a) => a.id === selectedArtwork.id) : -1;
  const handlePrev =
    selectedIndex > 0 ? () => setSelectedArtwork(artworks[selectedIndex - 1]) : undefined;
  const handleNext =
    selectedIndex >= 0 && selectedIndex < artworks.length - 1
      ? () => setSelectedArtwork(artworks[selectedIndex + 1])
      : undefined;

  return (
    <>
      {/* Temporary: no hero slot for now — keeping the top clean while we test the bg video. */}
      {artworks.length > 0 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onSelect={setSelectedArtwork}
              compact
            />
          ))}
        </div>
      )}

      {/* Video preview box — kept per Brad; only the two static image teaser
          slots below it were removed. */}
      <div className="mt-16 max-w-sm">
        <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
          <video
            className="h-full w-full object-cover"
            src="https://res.cloudinary.com/dgz8wscjl/video/upload/v1795714535/compressed_ykysqw.mp4"
            controls
            playsInline
            disablePictureInPicture
          />
        </div>
      </div>

      <ProductModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
