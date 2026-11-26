import type { Metadata } from 'next';
import Image from 'next/image';
import { ORIGINAL_WORKS, formatUsd } from '@/data/originalWorks';
import OriginalWorkPurchase from '@/components/OriginalWorkPurchase';

export const metadata: Metadata = {
  title: "Original Works — Brad's Art Gallery",
};

export default function OriginalsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Collector &amp; Investor Pieces</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">Original Works</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          One-of-a-kind paintings, each sold once. These are not prints — when a piece sells, it&apos;s gone.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-6 py-16">
        {ORIGINAL_WORKS.map((work) => (
          <article
            key={work.id}
            className="grid grid-cols-1 items-center gap-10 border-t border-neutral-900 pt-16 first:border-t-0 first:pt-0 md:grid-cols-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
              <Image src={work.image} alt={work.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-neutral-50 sm:text-3xl">{work.title}</h2>
              <p className="mt-2 text-sm text-neutral-400">{work.medium}</p>
              <p className="text-sm text-neutral-500">{work.dimensions}</p>
              <p className="mt-6 font-serif text-2xl text-neutral-100">{formatUsd(work.priceCents)}</p>
              <div className="mt-6">
                <OriginalWorkPurchase workId={work.id} sold={work.sold} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
