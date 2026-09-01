import type { FinerWorksLineItem } from '@/lib/pricing';

export interface FinerWorksOrder {
  stripeSessionId: string;
  customerEmail: string | null;
  lineItems: FinerWorksLineItem[];
}

// TODO: Real implementation requires FinerWorks vendor API docs (request/response
// shape, auth flow) and real catalog SKU codes to replace the `TBD-*` placeholders
// in src/data/printOptions.ts. FINERWORKS_WEB_API_KEY and FINERWORKS_API_ENDPOINT
// already exist in .env.local (unused) for whenever that real call is built — e.g.
// POST to `${process.env.FINERWORKS_API_ENDPOINT}` authenticated with
// FINERWORKS_WEB_API_KEY.
//
// Until then this function makes NO network call of any kind — it only logs the
// order and reports success, so nothing downstream can mistake this for a working
// integration.
export async function dispatchFinerWorksOrder(
  order: FinerWorksOrder
): Promise<{ ok: true } | { ok: false; error: string }> {
  console.log('[FinerWorks STUB] would dispatch order:', JSON.stringify(order));
  return { ok: true };
}
