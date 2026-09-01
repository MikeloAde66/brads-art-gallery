export type Medium = 'paper' | 'canvas' | 'acrylic' | 'metal';

export interface SizePreset {
  id: string;
  label: string;
  widthIn: number;
  heightIn: number;
}

export const SIZE_PRESETS: SizePreset[] = [
  { id: '8x10', label: '8" x 10"', widthIn: 8, heightIn: 10 },
  { id: '11x14', label: '11" x 14"', widthIn: 11, heightIn: 14 },
  { id: '16x20', label: '16" x 20"', widthIn: 16, heightIn: 20 },
  { id: '20x20', label: '20" x 20"', widthIn: 20, heightIn: 20 },
  { id: '24x36', label: '24" x 36"', widthIn: 24, heightIn: 36 },
];

export interface FrameStyle {
  id: string;
  label: string;
  colorHex: string;
  /** Visual thickness for the live preview only — not a real physical spec. */
  previewBorderWidthPx: number;
  /** FinerWorks catalog code. `null` means no frame add-on. TBD-prefixed until real codes are supplied. */
  sku: string | null;
  surcharge: number;
}

export const FRAME_STYLES: FrameStyle[] = [
  { id: 'none', label: 'No Frame', colorHex: '#000000', previewBorderWidthPx: 0, sku: null, surcharge: 0 },
  { id: 'black-wood', label: 'Black Wood', colorHex: '#111111', previewBorderWidthPx: 14, sku: 'TBD-FRAME-BLACKWOOD', surcharge: 45 },
  { id: 'walnut', label: 'Walnut', colorHex: '#5b3a29', previewBorderWidthPx: 16, sku: 'TBD-FRAME-WALNUT', surcharge: 55 },
  { id: 'silver-metal', label: 'Silver Metal', colorHex: '#c7c9cc', previewBorderWidthPx: 10, sku: 'TBD-FRAME-SILVERMETAL', surcharge: 50 },
];

// Mat is NOT an independent, separately-priced add-on: FinerWorks prices a
// mat/mounting choice as part of one fully-specified, all-in SKU (e.g.
// "Canvas + Matboard Mounted Thin + 16x20" is a single $80 product, not a
// base canvas price plus a mat surcharge). So MAT_OPTIONS is purely a
// display/label/preview-swatch catalog — every ArtworkVariant carries its
// own `matId` referencing this for labeling, and its own real, all-in
// `sku`/`retailPrice` for that exact medium+size+mat combination.
export interface MatOption {
  id: string;
  label: string;
  colorHex: string;
  /** Real inches, used to scale the live preview's padding. */
  widthIn: number;
}

export const MAT_OPTIONS: MatOption[] = [
  { id: 'none', label: 'No Mat', colorHex: '#000000', widthIn: 0 },
  { id: 'white-2in', label: 'White', colorHex: '#f5f5f0', widthIn: 2 },
  { id: 'black-2in', label: 'Black', colorHex: '#0a0a0a', widthIn: 2 },
  { id: 'cream-3in', label: 'Cream', colorHex: '#efe6d8', widthIn: 3 },
];

export function getSizePreset(id: string): SizePreset | undefined {
  return SIZE_PRESETS.find((s) => s.id === id);
}

export function getFrameStyle(id: string): FrameStyle | undefined {
  return FRAME_STYLES.find((f) => f.id === id);
}

export function getMatOption(id: string): MatOption | undefined {
  return MAT_OPTIONS.find((m) => m.id === id);
}
