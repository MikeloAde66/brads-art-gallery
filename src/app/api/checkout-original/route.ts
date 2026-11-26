import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOriginalWork } from '@/data/originalWorks';

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is not configured.');
    return NextResponse.json({ error: 'Checkout is not configured yet.' }, { status: 500 });
  }
  const stripe = new Stripe(stripeSecretKey);

  let body: { workId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Resolve against the server-side catalog only — price, title, and
  // availability all come from here, never from the client.
  const work = body.workId ? getOriginalWork(body.workId) : undefined;
  if (!work) {
    return NextResponse.json({ error: 'Unknown original work.' }, { status: 400 });
  }
  if (work.sold) {
    return NextResponse.json({ error: 'This piece has already sold.' }, { status: 409 });
  }

  const origin = request.headers.get('origin') ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: work.priceCents,
          product_data: {
            name: `${work.title} — Original Work`,
            description: `${work.medium}, ${work.dimensions}. One-of-a-kind original painting.`,
            images: [`${origin}${work.image}`],
          },
        },
      },
    ],
    metadata: {
      original_work_id: work.id,
      original_work_title: work.title,
    },
    success_url: `${origin}/success?type=original`,
    cancel_url: `${origin}/originals`,
  });

  if (!session.url) {
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
