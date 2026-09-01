'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { Artwork, ArtworkVariant } from '@/data/artworks';
import { useCartStore } from '@/store/useCartStore';

interface ProductModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ProductModal({ artwork, onClose }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState<ArtworkVariant | null>(
    artwork?.variants[0] ?? null
  );
  const [justAdded, setJustAdded] = useState(false);

  // Reset the selected variant (and any "Added" confirmation state) every
  // time a different artwork is opened, rather than carrying over
  // whatever was selected on the previous one.
  useEffect(() => {
    setSelectedVariant(artwork?.variants[0] ?? null);
    setJustAdded(false);
  }, [artwork]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddToCart = () => {
    if (!artwork || !selectedVariant) return;
    addItem(artwork, selectedVariant);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      {artwork && selectedVariant && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:grid-cols-2"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-neutral-300 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-square sm:aspect-auto">
              <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">{artwork.theme}</p>
              <h2 className="mt-1 text-2xl font-serif text-neutral-100">{artwork.title}</h2>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-neutral-500">Substrate</p>
                <div className="mt-2 flex gap-2">
                  {artwork.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition-colors ${
                        selectedVariant.id === variant.id
                          ? 'border-neutral-100 bg-neutral-100 text-black'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      {variant.substrate === 'canvas' ? 'Stretched Canvas' : 'Fine Art Paper'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-neutral-500">Size</p>
                <p className="mt-2 text-sm text-neutral-200">{selectedVariant.size}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-serif text-neutral-100">
                  ${selectedVariant.retailPrice.toFixed(2)}
                </span>
                <span className="text-xs text-neutral-600">SKU {selectedVariant.sku}</span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-8 w-full rounded-full bg-neutral-100 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white disabled:opacity-50"
              >
                {justAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
