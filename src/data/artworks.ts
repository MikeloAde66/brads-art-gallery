import type { Medium } from './printOptions';

export interface ArtworkVariant {
  id: string;
  medium: Medium;
  sizeId: string;
  /** References MAT_OPTIONS — part of this variant's identity, since FinerWorks
   *  prices mat/mounting as part of one all-in SKU, not a separate add-on. */
  matId: string;
  sku: string;
  wholesalePrice: number;
  retailPrice: number;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  theme: 'impasto' | 'monochrome' | 'coastal' | 'chiaroscuro';
  image: string;
  variants: ArtworkVariant[];
}

export const ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    slug: 'red-sea-dance',
    title: 'Red Sea Dance',
    theme: 'impasto',
    image: '/images/works/red-sea-dance.jpg',
    variants: [
      {
        id: 'var-1a',
        medium: 'paper',
        sizeId: '16x20',
        matId: 'none',
        sku: 'AP106926P681228',
        wholesalePrice: 47.50,
        retailPrice: 120.00,
      },
      {
        id: 'var-1b',
        medium: 'canvas',
        sizeId: '16x20',
        matId: 'none',
        sku: 'AP106926P681227',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'pond-at-the-landing',
    title: 'Pond at the Landing',
    theme: 'coastal',
    image: '/images/works/pond-at-the-landing.jpg',
    variants: [
      {
        id: 'var-2a',
        medium: 'canvas',
        sizeId: '20x20',
        matId: 'none',
        sku: 'AP106926P681226',
        wholesalePrice: 100.00,
        retailPrice: 240.00,
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'queenie',
    title: 'Queenie',
    theme: 'monochrome',
    image: '/images/works/queenie.jpg',
    variants: [
      {
        id: 'var-3a',
        medium: 'canvas',
        sizeId: '16x20',
        matId: 'none',
        sku: 'AP106926P681224',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-4',
    slug: 'charles-town-landing',
    title: 'Charles Town Landing',
    theme: 'chiaroscuro',
    image: '/images/works/charles-town-landing.jpg',
    variants: [],
  },
];
