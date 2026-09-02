import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "New Earth Collection — Brad's Art Gallery",
};

export default function NewEarthCollectionPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Curated Series</p>
      <h1 className="mt-4 font-serif text-3xl text-neutral-50">The New Earth Collection</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
        A dedicated view of this series is coming soon.
      </p>
    </main>
  );
}
