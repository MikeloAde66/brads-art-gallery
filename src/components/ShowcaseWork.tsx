'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Artwork } from '@/data/artworks';
import type { ShowcaseConfig } from '@/lib/siteConfig';
import ProductModal from './ProductModal';

interface ShowcaseWorkProps {
  artwork: Artwork;
  config: ShowcaseConfig;
}

export default function ShowcaseWork({ artwork, config }: ShowcaseWorkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayImage = config.imageUrl || artwork.image;
  const hasPrints = artwork.variants.length > 0;
  const clickable = config.showPricing;

  const content = (
    <>
      <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-neutral-900">
        <Image
          src={displayImage}
          alt={artwork.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain transition-opacity duration-500"
        />
      </div>

      <div className="mt-6 max-w-md">
        <h2 className="font-serif text-xl text-neutral-100">{artwork.title}</h2>
        {(config.dimensions || config.medium) && (
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-neutral-500">
            {[config.dimensions, config.medium].filter(Boolean).join(' — ')}
          </p>
        )}

        {clickable ? (
          <>
            <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-300">
              Original Work Available <span className="text-neutral-600">·</span> Inquire for Private Acquisition
            </p>
            {hasPrints && (
              <p className="mt-1 text-xs text-neutral-500">Archival Prints Available from $180</p>
            )}
          </>
        ) : (
          <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-500">Not Currently Available</p>
        )}

        {config.showAcquisitionNote && config.acquisitionNoteText && (
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{config.acquisitionNoteText}</p>
        )}
      </div>
    </>
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {clickable ? (
        <button type="button" onClick={() => setIsModalOpen(true)} className="group block w-full text-left">
          {content}
        </button>
      ) : (
        <div className="block w-full cursor-default text-left">{content}</div>
      )}

      {clickable && (
        <ProductModal artwork={isModalOpen ? artwork : null} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
