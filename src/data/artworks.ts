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
  {
    id: 'art-5',
    slug: 'charleston-cobblestone-alley',
    title: 'Charleston Cobblestone Alley',
    theme: 'chiaroscuro',
    image: '/images/works/charleston-cobblestone-alley.jpg',
    variants: [
      {
        id: 'var-5a',
        medium: 'canvas',
        sizeId: '20x16',
        matId: 'none',
        sku: 'AP106926P681214',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-6',
    slug: 'lowcountry-marsh',
    title: 'Lowcountry Marsh',
    theme: 'coastal',
    image: '/images/works/lowcountry-marsh.jpg',
    variants: [
      {
        id: 'var-6a',
        medium: 'canvas',
        sizeId: '20x16',
        matId: 'none',
        sku: 'AP106926P681209',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-7',
    slug: 'trumpet-player',
    title: 'Trumpet Player',
    theme: 'impasto',
    image: '/images/works/trumpet-player.jpg',
    variants: [
      {
        id: 'var-7a',
        medium: 'canvas',
        sizeId: '13x18.71',
        matId: 'none',
        sku: 'AP106926P681196',
        wholesalePrice: 60.00,
        retailPrice: 145.00,
      },
    ],
  },
  {
    id: 'art-8',
    slug: 'boat-harbor',
    title: 'Boat Harbor',
    theme: 'coastal',
    image: '/images/works/boat-harbor.jpg',
    variants: [
      {
        id: 'var-8a',
        medium: 'canvas',
        sizeId: '13x19',
        matId: 'none',
        sku: 'AP106926P681159',
        wholesalePrice: 60.00,
        retailPrice: 145.00,
      },
    ],
  },
  {
    id: 'art-9',
    slug: 'horse-carriage',
    title: 'Horse Carriage',
    theme: 'chiaroscuro',
    image: '/images/works/horse-carriage.jpg',
    variants: [
      {
        id: 'var-9a',
        medium: 'canvas',
        sizeId: '20x16',
        matId: 'none',
        sku: 'AP106926P681213',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-10',
    slug: 'three-horses',
    title: 'Three Horses',
    theme: 'impasto',
    image: '/images/works/three-horses.jpg',
    variants: [
      {
        id: 'var-10a',
        medium: 'canvas',
        sizeId: '20x16',
        matId: 'none',
        sku: 'AP106926P681217',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-11',
    slug: 'dune-path-view-1',
    title: 'Dune Path View 1',
    theme: 'coastal',
    image: '/images/works/dune-path-view-1.jpg',
    variants: [
      {
        id: 'var-11a',
        medium: 'canvas',
        sizeId: '20x16',
        matId: 'none',
        sku: 'AP106926P681215',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-12',
    slug: 'historic-cabin-meadow',
    title: 'Historic Cabin Meadow',
    theme: 'chiaroscuro',
    image: '/images/works/historic-cabin-meadow.jpg',
    variants: [
      {
        id: 'var-12a',
        medium: 'canvas',
        sizeId: '16x20',
        matId: 'none',
        sku: 'AP106926P681211',
        wholesalePrice: 95.00,
        retailPrice: 230.00,
      },
    ],
  },
  {
    id: 'art-13',
    slug: 'aerial-city-grid',
    title: 'Aerial City Grid',
    theme: 'chiaroscuro',
    image: '/images/works/aerial-city-grid.jpg',
    variants: [
      {
        id: 'var-13a',
        medium: 'canvas',
        sizeId: '20x20',
        matId: 'none',
        sku: 'AP106926P681219',
        wholesalePrice: 100.00,
        retailPrice: 240.00,
      },
    ],
  },
];
