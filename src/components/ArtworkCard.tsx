'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onSelect: (artwork: Artwork) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ArtworkCard({ artwork, index, onSelect }: ArtworkCardProps) {
  const startingPrice =
    artwork.variants.length > 0
      ? Math.min(...artwork.variants.map((v) => v.retailPrice))
      : null;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(artwork)}
      className="group text-left"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={cardVariants}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-sm tracking-wide text-neutral-100">{artwork.title}</h3>
        <span className="text-xs text-neutral-500">
          {startingPrice !== null ? `from $${startingPrice.toFixed(0)}` : 'Display only'}
        </span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-neutral-600">{artwork.theme}</p>
    </motion.button>
  );
}
