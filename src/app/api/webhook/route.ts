import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { FinerWorksLineItem } from '@/lib/pricing';
import { dispatchFinerWorksOrder } from '@/lib/finerworks';

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    console.error('STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook is not configured yet.' }, { status: 500 });
  }
  const stripe = new Stripe(stripeSecretKey);

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  // Signature verification needs the exact raw bytes Stripe signed — never
  // parse this as JSON first.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const chunkCount = Number(session.metadata?.finerworks_order_count ?? '0');
    const lineItems: FinerWorksLineItem[] = [];

    for (let i = 0; i < chunkCount; i++) {
      const chunk = session.metadata?.[`finerworks_order_${i}`];
      if (!chunk) continue;
      try {
        lineItems.push(...(JSON.parse(chunk) as FinerWorksLineItem[]));
      } catch (err) {
        console.error(`Failed to parse finerworks_order_${i} metadata chunk:`, err);
      }
    }

    try {
      await dispatchFinerWorksOrder({
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        lineItems,
      });
    } catch (err) {
      // The stub can't really fail, but guard anyway so a future real
      // implementation's errors can't crash the webhook response.
      console.error('dispatchFinerWorksOrder threw:', err);
    }
  }

  // Always 200 for now — dispatchFinerWorksOrder is a stub that cannot really
  // fail. Once it makes a real FinerWorks call, reconsider returning 500 on
  // failure so Stripe retries delivery.
  return NextResponse.json({ received: true });
}
