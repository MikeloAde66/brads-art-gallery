import ShopIntro from '@/components/ShopIntro';

// New front door — stripped down for now to just the paint-splash intro, per
// the site-architecture plan. Shop (full print grid) and Wall Art / Original
// Works / Products live on their own routes now.
export default function HomePage() {
  return (
    <main className="relative flex-1">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:pt-32">
        <ShopIntro />
      </section>
    </main>
  );
}
