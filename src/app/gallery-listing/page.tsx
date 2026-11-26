import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery Listing — Brad's Art Gallery",
};

const SECTIONS = [
  { title: 'Entries', description: 'Submit your work for review and inclusion.' },
  { title: 'Contests', description: 'Open and upcoming art competitions.' },
  { title: 'Workshops', description: 'Live and recorded sessions from working artists.' },
  { title: 'Exhibitions', description: 'Gallery shows and where to see work in person.' },
  { title: 'Global Connect', description: 'Find and connect with artists worldwide.' },
];

export default function GalleryListingPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">For Artists</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">Gallery Listing</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          A place to search for entries, contests, workshops, exhibitions, and connect with artists globally.
          This page is a placeholder — content is coming soon.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <div key={section.title} className="border border-neutral-800 p-6">
              <h2 className="font-serif text-xl text-neutral-100">{section.title}</h2>
              <p className="mt-2 text-sm text-neutral-500">{section.description}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.15em] text-neutral-600">Coming Soon</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
