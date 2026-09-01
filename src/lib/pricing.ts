import { ARTWORKS, type Artwork, type ArtworkVariant } from '@/data/artworks';
import { getFrameStyle, getMatOption, MAT_OPTIONS, type FrameStyle, type MatOption } from '@/data/printOptions';

export interface PrintConfiguration {
  artworkId: string;
  variantId: string;
  frameId: string;
}

export interface ResolvedConfiguration {
  artwork: Artwork;
  variant: ArtworkVariant;
  frame: FrameStyle;
  /** Derived from variant.matId — mat is part of the variant's identity, not a separate choice. */
  mat: MatOption;
}

export interface PriceBreakdown {
  /** Already all-in for this variant's medium + size + mat combination. */
  basePrice: number;
  frameSurcharge: number;
  total: number;
}

export interface FinerWorksLineItem {
  printSku: string;
  frameSku: string | null;
  quantity: number;
  title: string;
}

/**
 * Looks up every id in a configuration against the known, curated catalogs.
 * Returns null if any id doesn't resolve — this is the enforcement point
 * that keeps a client from ever requesting a SKU combination that doesn't
 * really exist.
 */
export function resolveConfiguration(config: PrintConfiguration): ResolvedConfiguration | null {
  const artwork = ARTWORKS.find((a) => a.id === config.artworkId);
  if (!artwork) return null;

  const variant = artwork.variants.find((v) => v.id === config.variantId);
  if (!variant) return null;

  const frame = getFrameStyle(config.frameId);
  if (!frame) return null;

  // variant.matId is our own curated data, not client input — falls back to
  // the 'none' entry only as a defensive guard, never expected to miss.
  const mat = getMatOption(variant.matId) ?? MAT_OPTIONS[0];

  return { artwork, variant, frame, mat };
}

export function priceConfiguration(config: PrintConfiguration): PriceBreakdown | null {
  const resolved = resolveConfiguration(config);
  if (!resolved) return null;

  const basePrice = resolved.variant.retailPrice;
  const frameSurcharge = resolved.frame.surcharge;

  return {
    basePrice,
    frameSurcharge,
    total: basePrice + frameSurcharge,
  };
}

export function buildFinerWorksLineItem(
  config: PrintConfiguration,
  quantity: number
): FinerWorksLineItem | null {
  const resolved = resolveConfiguration(config);
  if (!resolved) return null;

  return {
    printSku: resolved.variant.sku,
    frameSku: resolved.frame.sku,
    quantity,
    title: resolved.artwork.title,
  };
}
