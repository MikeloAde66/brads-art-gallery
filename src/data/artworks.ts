export interface ArtworkVariant {
  id: string;
  size: string;
  substrate: 'paper' | 'canvas';
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
    slug: 'dancer-in-white',
    title: 'Dancer in White',
    theme: 'impasto',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-1a',
        size: '16x20"',
        substrate: 'paper',
        sku: 'AP106926P681228',
        wholesalePrice: 47.50,
        retailPrice: 120.00,
      },
      {
        id: 'var-1b',
        size: '16x20"',
        substrate: 'canvas',
        sku: 'AP106926P681227',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'autumn-path',
    title: 'Autumn Path',
    theme: 'coastal',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-2a',
        size: '20x20"',
        substrate: 'canvas',
        sku: 'AP106926P681226',
        wholesalePrice: 100.00,
        retailPrice: 240.00,
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'white-horse-study',
    title: 'White Horse Study',
    theme: 'monochrome',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-3a',
        size: '16x20"',
        substrate: 'canvas',
        sku: 'AP106926P681224',
        wholesalePrice: 80.00,
        retailPrice: 190.00,
      },
    ],
  },
  {
    id: 'art-4',
    slug: 'reflective-pond',
    title: 'Reflective Pond',
    theme: 'chiaroscuro',
    image: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-4a',
        size: '20x20"',
        substrate: 'canvas',
        sku: 'AP106926P681225',
        wholesalePrice: 100.00,
        retailPrice: 240.00,
      },
    ],
  },
];
