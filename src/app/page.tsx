'use client';

import { motion } from 'framer-motion';
import { ARTWORKS } from '@/data/artworks';
import GalleryGrid from '@/components/GalleryGrid';

const FEATURED_SLUGS = ['red-sea-dance'];

export default function Home() {
  const featured = ARTWORKS.filter((a) => FEATURED_SLUGS.includes(a.slug));

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-20 pt-24 sm:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-neutral-500"
        >
          Original Works · Private Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl"
        >
          The New Earth Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-400"
        >
          Original works available for private acquisition. Archival reproductions offered
          in select configurations, fulfilled by FinerWorks and shipped directly to you.
        </motion.p>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <GalleryGrid artworks={featured} />
      </section>
    </main>
  );
}
