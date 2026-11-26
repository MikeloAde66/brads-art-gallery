'use client';

import { useState } from 'react';

interface OriginalWorkPurchaseProps {
  workId: string;
  sold: boolean;
}

export default function OriginalWorkPurchase({ workId, sold }: OriginalWorkPurchaseProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-original', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong starting checkout.');
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Something went wrong starting checkout.');
      setLoading(false);
    }
  }

  if (sold) {
    return (
      <span className="inline-block rounded-full border border-neutral-700 px-6 py-2.5 text-xs uppercase tracking-wide text-neutral-500">
        Sold
      </span>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handlePurchase}
        disabled={loading}
        className="rounded-full bg-neutral-100 px-6 py-2.5 text-xs uppercase tracking-wide text-neutral-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Starting checkout…' : 'Purchase Original'}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
