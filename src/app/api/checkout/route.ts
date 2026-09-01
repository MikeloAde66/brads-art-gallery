import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSizePreset } from '@/data/printOptions';
import {
  buildFinerWorksLineItem,
  priceConfiguration,
  resolveConfiguration,
  type FinerWorksLineItem,
  type PrintConfiguration,
} from '@/lib/pricing';

interface CheckoutRequestItem {
  configuration?: PrintConfiguration;
  quantity: number;
}

// Stripe caps each metadata value at 500 characters. A single unbounded JSON
// blob of every line item risks exceeding that once carts include frame/mat
// selections, so line items are packed into as few chunks as fit and spread
// across finerworks_order_0, finerworks_order_1, … instead.
const METADATA_VALUE_LIMIT = 500;

function chunkFinerWorksOrder(lineItems: FinerWorksLineItem[]): string[] {
  const chunks: string[] = [];
  let current: FinerWorksLineItem[] = [];

  for (const item of lineItems) {
    const candidate = [...current, item];
    if (JSON.stringify(candidate).length > METADATA_VALUE_LIMIT && current.length > 0) {
      chunks.push(JSON.stringify(current));
      current = [item];
    } else {
      current = candidate;
    }
  }
  if (current.length > 0) chunks.push(JSON.stringify(current));

  return chunks;
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

  // Resolve every line item's real price/SKU/title server-side against the
  // known artwork/print-option catalogs rather than trusting whatever the
  // client sends — a client could otherwise submit an arbitrary price, or a
  // frame/mat/size combination that isn't actually orderable.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const finerworksOrder: FinerWorksLineItem[] = [];

  for (const requested of requestedItems) {
    const quantity = Math.floor(Number(requested.quantity));
    const configuration = requested.configuration;

    const resolved = configuration ? resolveConfiguration(configuration) : null;
    const breakdown = configuration ? priceConfiguration(configuration) : null;

    if (!configuration || !resolved || !breakdown || !Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json(
        { error: `Invalid cart item: ${configuration?.artworkId ?? 'unknown'}.` },
        { status: 400 }
      );
    }

    const sizeLabel = getSizePreset(resolved.variant.sizeId)?.label ?? resolved.variant.sizeId;
    const mediumLabel = resolved.variant.medium === 'canvas' ? 'Canvas' : resolved.variant.medium === 'paper' ? 'Fine Art Paper' : resolved.variant.medium;
    const frameLabel = resolved.frame.id !== 'none' ? ` · ${resolved.frame.label}` : '';
    const matLabel = resolved.mat.id !== 'none' ? ` · ${resolved.mat.label}` : '';

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${resolved.artwork.title} — ${sizeLabel} ${mediumLabel}${frameLabel}${matLabel}`,
          images: [resolved.artwork.image],
          metadata: { finerworks_sku: resolved.variant.sku },
        },
        unit_amount: Math.round(breakdown.total * 100),
      },
      quantity,
    });

    const finerworksLineItem = buildFinerWorksLineItem(configuration, quantity);
    if (finerworksLineItem) finerworksOrder.push(finerworksLineItem);
  }

  const origin = request.nextUrl.origin;
  const chunks = chunkFinerWorksOrder(finerworksOrder);
  const metadata: Record<string, string> = {
    finerworks_order_count: String(chunks.length),
  };
  chunks.forEach((chunk, i) => {
    metadata[`finerworks_order_${i}`] = chunk;
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
