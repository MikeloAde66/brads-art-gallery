'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '@/data/artworks';
import { ARTWORKS } from '@/data/artworks';
import Header from '@/components/Header';
import ArtworkCard from '@/components/ArtworkCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <Header onOpenCart={() => setIsCartOpen(true)} />

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

        {/* Gallery grid */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
            {ARTWORKS.slice(0, 8).map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onSelect={setSelectedArtwork}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 px-6 py-8 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Brad&apos;s Art Gallery. Prints fulfilled by FinerWorks.
      </footer>

      <ProductModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
