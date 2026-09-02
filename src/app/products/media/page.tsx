import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Media — Brad's Art Gallery",
};

export default function MediaPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Original Mediums</p>
      <h1 className="mt-4 font-serif text-3xl text-neutral-50">Charcoal · Acrylic · Liquid Lead · Oil</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
        Browsing originals by medium is coming soon.
      </p>
    </main>
  );
}
