'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artwork } from '@/data/artworks';
import PrintConfigurator from './PrintConfigurator';

const ARTIST_NAME = 'Michael Bradley';

interface ProductModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  /** Lets the modal step through the full gallery without closing — undefined at either end. */
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ProductModal({ artwork, onClose, onPrev, onNext }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

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
            className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:grid-cols-[80px_1.3fr_1fr]"
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

            {/* Thumbnail rail — one piece per page, so this just echoes the main
                image, matching the strip look of a multi-photo product page. */}
            <div className="hidden border-r border-neutral-900 p-3 sm:flex sm:flex-col sm:items-center sm:gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded border-2 border-neutral-100">
                <Image src={artwork.image} alt="" fill className="object-cover" />
              </div>
            </div>

            {artwork.variants.length > 0 ? (
              <PrintConfigurator key={artwork.id} artwork={artwork} artistName={ARTIST_NAME} onPrev={onPrev} onNext={onNext} />
            ) : (
              <>
                <div className="relative aspect-square sm:aspect-auto">
                  <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!onPrev}
                      aria-label="Previous piece"
                      className="rounded-full border border-neutral-700 p-1.5 text-neutral-300 transition-colors hover:border-neutral-500 disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!onNext}
                      aria-label="Next piece"
                      className="rounded-full border border-neutral-700 p-1.5 text-neutral-300 transition-colors hover:border-neutral-500 disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-neutral-500">{artwork.theme}</p>
                  <h2 className="mt-1 text-2xl font-serif text-neutral-100">{artwork.title}</h2>
                  <p className="mt-1 text-sm italic text-neutral-500">by {ARTIST_NAME}</p>
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
