// One-of-a-kind original paintings — a different product line from the
// print catalog in artworks.ts. These are sold individually (not in grid
// cards), priced for collectors/investors, and each listing is removed from
// sale once it's gone.
//
// IMPORTANT — no database backs this yet: `sold` is a plain data flag. After
// a purchase, the webhook (api/webhook/route.ts) logs the sale but cannot
// flip this flag itself (static data, read-only at runtime on Vercel). Brad
// needs to manually set `sold: true` here and redeploy once a piece sells,
// or this needs real persistence (Supabase row, KV, etc.) added later.
export interface OriginalWork {
  id: string;
  slug: string;
  title: string;
  image: string;
  medium: string;
  dimensions: string;
  /** All-in price in cents — the only price Stripe ever sees comes from here, never the client. */
  priceCents: number;
  sold: boolean;
}

export const ORIGINAL_WORKS: OriginalWork[] = [
  {
    id: 'orig-1',
    slug: 'red-sea-dance-original',
    title: 'Red Sea Dance',
    image: '/images/works/red-sea-dance.jpg',
    medium: 'Oil on canvas, original',
    dimensions: '24" x 36"',
    priceCents: 1250000,
    sold: false,
  },
  {
    id: 'orig-2',
    slug: 'queenie-original',
    title: 'Queenie',
    image: '/images/works/queenie.jpg',
    medium: 'Oil on canvas, original',
    dimensions: '20" x 24"',
    priceCents: 950000,
    sold: false,
  },
  {
    id: 'orig-3',
    slug: 'trumpet-player-original',
    title: 'Trumpet Player',
    image: '/images/works/trumpet-player.jpg',
    medium: 'Oil on canvas, original',
    dimensions: '24" x 30"',
    priceCents: 1495000,
    sold: false,
  },
];

export function getOriginalWork(id: string): OriginalWork | undefined {
  return ORIGINAL_WORKS.find((w) => w.id === id);
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
