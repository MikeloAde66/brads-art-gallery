'use client';

import { useState } from 'react';
import Image from 'next/image';
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

      {/* Temporary: video preview + stacked static teaser slots underneath, all same box size. Not final — these can become real links/gates later, one can hold a small ad, and each has reserved space above it for H1/H2 copy to come. */}
      <div className="mt-16 flex max-w-sm flex-col gap-20">
        <div>
          <div className="mb-6 space-y-2">
            <div className="h-6 w-2/3 bg-neutral-900" />
            <div className="h-4 w-1/2 bg-neutral-900" />
          </div>
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

        {/* Teaser slot — static image for now, silent hype, no copy */}
        {artworks[1] && (
          <div>
            <div className="mb-6 space-y-2">
              <div className="h-6 w-2/3 bg-neutral-900" />
              <div className="h-4 w-1/2 bg-neutral-900" />
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <Image
                src={artworks[1].image}
                alt=""
                width={640}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Teaser slot — reserved for a small ad later */}
        {artworks[2] && (
          <div>
            <div className="mb-6 space-y-2">
              <div className="h-6 w-2/3 bg-neutral-900" />
              <div className="h-4 w-1/2 bg-neutral-900" />
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <Image
                src={artworks[2].image}
                alt=""
                width={640}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <ProductModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </>
  );
}
