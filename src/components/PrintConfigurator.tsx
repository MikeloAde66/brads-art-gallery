'use client';

import { useState } from 'react';
import type { Artwork, ArtworkVariant } from '@/data/artworks';
import { FRAME_STYLES, MAT_OPTIONS, getSizePreset } from '@/data/printOptions';
import { priceConfiguration } from '@/lib/pricing';
import { useCartStore } from '@/store/useCartStore';
import PrintPreview from './PrintPreview';

interface PrintConfiguratorProps {
  artwork: Artwork;
}

const MEDIUM_LABELS: Record<string, string> = {
  paper: 'Fine Art Paper',
  canvas: 'Stretched Canvas',
  acrylic: 'Acrylic',
  metal: 'Metal',
};

function uniqueInOrder<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

const pillClasses = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition-colors ${
    active
      ? 'border-neutral-100 bg-neutral-100 text-black'
      : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
  }`;

export default function PrintConfigurator({ artwork }: PrintConfiguratorProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Mat is part of a variant's identity (FinerWorks prices medium+size+mat as
  // one all-in SKU), so it cascades the same way size cascades from medium.
  const sizeOptionsFor = (m: string) =>
    uniqueInOrder(artwork.variants.filter((v) => v.medium === m).map((v) => v.sizeId));
  const matOptionsFor = (m: string, s: string) =>
    uniqueInOrder(artwork.variants.filter((v) => v.medium === m && v.sizeId === s).map((v) => v.matId));

  const mediumOptions = uniqueInOrder(artwork.variants.map((v) => v.medium));
  const [medium, setMedium] = useState(mediumOptions[0]);
  const [sizeId, setSizeId] = useState(sizeOptionsFor(medium)[0]);
  const [matId, setMatId] = useState(matOptionsFor(medium, sizeOptionsFor(medium)[0])[0]);
  const [frameId, setFrameId] = useState('none');
  const [justAdded, setJustAdded] = useState(false);

  const sizeOptions = sizeOptionsFor(medium);
  const matOptions = matOptionsFor(medium, sizeId);

  const handleMediumChange = (nextMedium: string) => {
    const nextSizeId = sizeOptionsFor(nextMedium)[0];
    setMedium(nextMedium as typeof medium);
    setSizeId(nextSizeId);
    setMatId(matOptionsFor(nextMedium, nextSizeId)[0]);
  };

  const handleSizeChange = (nextSizeId: string) => {
    setSizeId(nextSizeId);
    setMatId(matOptionsFor(medium, nextSizeId)[0]);
  };

  const variant: ArtworkVariant | undefined = artwork.variants.find(
    (v) => v.medium === medium && v.sizeId === sizeId && v.matId === matId
  );
  const sizePreset = variant ? getSizePreset(variant.sizeId) : undefined;
  const frame = FRAME_STYLES.find((f) => f.id === frameId) ?? FRAME_STYLES[0];
  const mat = MAT_OPTIONS.find((m) => m.id === matId) ?? MAT_OPTIONS[0];

  const breakdown = variant
    ? priceConfiguration({ artworkId: artwork.id, variantId: variant.id, frameId })
    : null;

  const handleAddToCart = () => {
    if (!variant) return;
    addItem(artwork, { variantId: variant.id, frameId });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <>
      <div className="relative aspect-square sm:aspect-auto">
        {sizePreset && (
          <PrintPreview
            imageSrc={artwork.image}
            alt={artwork.title}
            sizePreset={sizePreset}
            frame={frame}
            mat={mat}
          />
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">{artwork.theme}</p>
        <h2 className="mt-1 text-2xl font-serif text-neutral-100">{artwork.title}</h2>

        {mediumOptions.length > 1 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-neutral-500">Medium</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {mediumOptions.map((m) => (
                <button key={m} type="button" onClick={() => handleMediumChange(m)} className={pillClasses(medium === m)}>
                  {MEDIUM_LABELS[m] ?? m}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Size</p>
          {sizeOptions.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {sizeOptions.map((id) => (
                <button key={id} type="button" onClick={() => handleSizeChange(id)} className={pillClasses(sizeId === id)}>
                  {getSizePreset(id)?.label ?? id}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-neutral-200">{sizePreset?.label}</p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Mat</p>
          {matOptions.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {matOptions.map((id) => (
                <button key={id} type="button" onClick={() => setMatId(id)} className={pillClasses(matId === id)}>
                  {MAT_OPTIONS.find((m) => m.id === id)?.label ?? id}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-neutral-200">{mat.label}</p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Frame</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FRAME_STYLES.map((f) => (
              <button key={f.id} type="button" onClick={() => setFrameId(f.id)} className={pillClasses(frameId === f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-3xl font-serif text-neutral-100">
            ${breakdown ? breakdown.total.toFixed(2) : '—'}
          </span>
          {variant && <span className="text-xs text-neutral-600">SKU {variant.sku}</span>}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!variant}
          className="mt-8 w-full rounded-full bg-neutral-100 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white disabled:opacity-50"
        >
          {justAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </>
  );
}
