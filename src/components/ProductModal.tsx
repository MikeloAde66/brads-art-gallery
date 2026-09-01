'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { Artwork } from '@/data/artworks';
import PrintConfigurator from './PrintConfigurator';

interface ProductModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ProductModal({ artwork, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {artwork && (
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

            {artwork.variants.length > 0 ? (
              <PrintConfigurator key={artwork.id} artwork={artwork} />
            ) : (
              <>
                <div className="relative aspect-square sm:aspect-auto">
                  <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">{artwork.theme}</p>
                  <h2 className="mt-1 text-2xl font-serif text-neutral-100">{artwork.title}</h2>
                  <p className="mt-6 text-sm text-neutral-400">
                    Display only — not currently available as a print.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
