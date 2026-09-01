import { ARTWORKS, type Artwork, type ArtworkVariant } from '@/data/artworks';
import { getFrameStyle, getMatOption, type FrameStyle, type MatOption } from '@/data/printOptions';

export interface PrintConfiguration {
  artworkId: string;
  variantId: string;
  frameId: string;
  matId: string;
}

export interface ResolvedConfiguration {
  artwork: Artwork;
  variant: ArtworkVariant;
  frame: FrameStyle;
  mat: MatOption;
}

export interface PriceBreakdown {
  basePrice: number;
  frameSurcharge: number;
  matSurcharge: number;
  total: number;
}

export interface FinerWorksLineItem {
  printSku: string;
  frameSku: string | null;
  matSku: string | null;
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

  const mat = getMatOption(config.matId);
  if (!mat) return null;

  return { artwork, variant, frame, mat };
}

export function priceConfiguration(config: PrintConfiguration): PriceBreakdown | null {
  const resolved = resolveConfiguration(config);
  if (!resolved) return null;

  const basePrice = resolved.variant.retailPrice;
  const frameSurcharge = resolved.frame.surcharge;
  const matSurcharge = resolved.mat.surcharge;

  return {
    basePrice,
    frameSurcharge,
    matSurcharge,
    total: basePrice + frameSurcharge + matSurcharge,
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
    matSku: resolved.mat.sku,
    quantity,
    title: resolved.artwork.title,
  };
}
