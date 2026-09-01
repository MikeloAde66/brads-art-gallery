import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ARTWORKS } from '@/data/artworks';

interface CheckoutRequestItem {
  artworkId: string;
  variantId: string;
  quantity: number;
}

// FinerWorks needs exactly which SKU + quantity to fulfill once payment
// succeeds. Stripe session metadata (checked by the checkout.session.completed
// webhook, not built yet here) carries the order as a JSON string — Stripe
// caps each metadata value at 500 characters, comfortably enough for a
// gallery-sized cart of a handful of prints.
interface FinerWorksLineItem {
  sku: string;
  quantity: number;
  title: string;
  size: string;
  substrate: string;
}

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is not configured.');
    return NextResponse.json({ error: 'Checkout is not configured yet.' }, { status: 500 });
  }
  const stripe = new Stripe(stripeSecretKey);

  let body: { items?: CheckoutRequestItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const requestedItems = body.items;
  if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }

  // Resolve every line item's real price/SKU/title server-side from
  // ARTWORKS rather than trusting whatever the client sends — a client
  // could otherwise submit an arbitrary price for a real SKU.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const finerworksOrder: FinerWorksLineItem[] = [];

  for (const requested of requestedItems) {
    const artwork = ARTWORKS.find((a) => a.id === requested.artworkId);
    const variant = artwork?.variants.find((v) => v.id === requested.variantId);
    const quantity = Math.floor(Number(requested.quantity));

    if (!artwork || !variant || !Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json(
        { error: `Invalid cart item: ${requested.artworkId ?? 'unknown'}.` },
        { status: 400 }
      );
    }

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${artwork.title} — ${variant.size} ${variant.substrate === 'canvas' ? 'Canvas' : 'Fine Art Paper'}`,
          images: [artwork.image],
          metadata: { finerworks_sku: variant.sku },
        },
        unit_amount: Math.round(variant.retailPrice * 100),
      },
      quantity,
    });

    finerworksOrder.push({
      sku: variant.sku,
      quantity,
      title: artwork.title,
      size: variant.size,
      substrate: variant.substrate,
    });
  }

  const origin = request.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
      metadata: {
        finerworks_order: JSON.stringify(finerworksOrder),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
