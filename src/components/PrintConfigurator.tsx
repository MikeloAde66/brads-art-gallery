'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type { Artwork, ArtworkVariant } from '@/data/artworks';
import { FRAME_STYLES, MAT_OPTIONS, getSizePreset } from '@/data/printOptions';
import { priceConfiguration } from '@/lib/pricing';
import { useCartStore } from '@/store/useCartStore';
import PrintPreview from './PrintPreview';

interface PrintConfiguratorProps {
  artwork: Artwork;
  artistName: string;
  onPrev?: () => void;
  onNext?: () => void;
}

const MEDIUM_LABELS: Record<string, string> = {
  paper: 'Art Print',
  canvas: 'Canvas Print',
  acrylic: 'Acrylic Print',
  metal: 'Metal Print',
};

// Shown in catalog order regardless of what this particular piece offers —
// only the ones with real variants are selectable; the rest read "Coming
// Soon" rather than pretending to sell a product that isn't actually priced.
const ALL_MEDIUMS: Array<ArtworkVariant['medium']> = ['canvas', 'paper', 'metal', 'acrylic'];

function uniqueInOrder<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export default function PrintConfigurator({ artwork, artistName, onPrev, onNext }: PrintConfiguratorProps) {
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
  const [saved, setSaved] = useState(false);

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

  // Every price shown comes from this — never computed inline from the
  // selected options — so the UI can never drift from what checkout will
  // actually charge.
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

      <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
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
          <button type="button" onClick={() => setSaved((s) => !s)} aria-label="Save to favorites">
            <Heart className={`h-5 w-5 transition-colors ${saved ? 'fill-red-500 text-red-500' : 'text-neutral-500 hover:text-neutral-300'}`} />
          </button>
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.15em] text-neutral-500">{artwork.theme}</p>
        <h2 className="mt-1 text-2xl font-serif text-neutral-100">{artwork.title}</h2>
        <p className="mt-1 text-sm italic text-neutral-500">by {artistName}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-y border-neutral-900 py-4">
          <span className="text-3xl font-serif text-neutral-100">
            ${breakdown ? breakdown.total.toFixed(2) : '—'}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!variant}
            className="rounded-full bg-neutral-100 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white disabled:opacity-50"
          >
            {justAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Print Type</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ALL_MEDIUMS.map((m) => {
              const available = mediumOptions.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  disabled={!available}
                  onClick={() => available && handleMediumChange(m)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs uppercase tracking-wide transition-colors ${
                    medium === m
                      ? 'border-neutral-100 bg-neutral-100 text-black'
                      : available
                        ? 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
                        : 'cursor-not-allowed border-neutral-900 text-neutral-700'
                  }`}
                >
                  {MEDIUM_LABELS[m] ?? m}
                  {!available && <span className="mt-0.5 block text-[10px] normal-case text-neutral-600">Coming soon</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-4 rounded-xl border border-neutral-900 bg-neutral-900/40 p-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-500" htmlFor="print-size">
              Print Size
            </label>
            <select
              id="print-size"
              value={sizeId}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100"
            >
              {sizeOptions.map((id) => (
                <option key={id} value={id}>
                  {getSizePreset(id)?.label ?? id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-500" htmlFor="frame">
              Frame
            </label>
            <select
              id="frame"
              value={frameId}
              onChange={(e) => setFrameId(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100"
            >
              {FRAME_STYLES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                  {f.surcharge > 0 ? ` (+$${f.surcharge})` : ''}
                </option>
              ))}
            </select>
          </div>

          {matOptions.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500" htmlFor="mat">
                  Mat
                </label>
                <select
                  id="mat"
                  value={matId}
                  onChange={(e) => setMatId(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100"
                >
                  {matOptions.map((id) => (
                    <option key={id} value={id}>
                      {MAT_OPTIONS.find((m) => m.id === id)?.label ?? id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">Mat Width</p>
                <p className="mt-1 rounded-md border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-400">
                  {mat.widthIn > 0 ? `${mat.widthIn}"` : '—'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-neutral-900 pt-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Product Details</p>
          <p className="mt-2 text-sm text-neutral-400">
            {artwork.title} — {MEDIUM_LABELS[medium] ?? medium}
            {frame.id !== 'none' ? `, ${frame.label} frame` : ''}
            {mat.id !== 'none' ? `, ${mat.label} mat` : ''}. Printed and shipped by FinerWorks.
            {variant && <span className="block text-xs text-neutral-600">SKU {variant.sku}</span>}
          </p>
        </div>
      </div>
    </>
  );
}
