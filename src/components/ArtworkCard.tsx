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

const MEDIUM_LABELS: Record<string, string> = {
  paper: 'Fine Art Paper',
  canvas: 'Canvas',
  acrylic: 'Acrylic',
  metal: 'Metal',
};

function uniqueInOrder<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export default function ArtworkCard({ artwork, index, onSelect }: ArtworkCardProps) {
  const hasPrints = artwork.variants.length > 0;
  const mediumLabel = uniqueInOrder(artwork.variants.map((v) => MEDIUM_LABELS[v.medium] ?? v.medium)).join(' & ');

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
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-6 max-w-md">
        <h3 className="font-serif text-xl text-neutral-100">{artwork.title}</h3>
        {mediumLabel && <p className="mt-1 text-xs uppercase tracking-[0.15em] text-neutral-500">{mediumLabel}</p>}

        <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-300">
          Original Work Available <span className="text-neutral-600">·</span> Inquire for Private Acquisition
        </p>

        {hasPrints && (
          <p className="mt-1 text-xs text-neutral-500">Archival Prints Available from $180</p>
        )}
      </div>
    </motion.button>
  );
}
