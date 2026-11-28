import Image from 'next/image';
import Link from 'next/link';
import ShopIntro from '@/components/ShopIntro';

// Front door: full-bleed gallery-entrance photo as the background, with a
// single "enter" link through to the Shop. Per Brad's reference screenshot —
// the whole viewport below the header is the photo, no card or copy block
// boxing it in. The paint-splash welcome intro sits over the top-left of the
// photo rather than its own section.
export default function HomePage() {
  return (
    <main className="relative flex-1">
      <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden">
        <Image
          src="/images/site/home-hero.png"
          alt="Gallery entrance"
          fill
          priority
          className="object-cover"
        />
        {/* Darken slightly for text legibility without flattening the photo */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-x-0 top-0 px-6 pt-10 sm:px-12 sm:pt-16">
          <ShopIntro />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/shop"
            className="font-serif text-2xl italic text-amber-300 transition-colors hover:text-amber-200 sm:text-3xl"
          >
            enter
          </Link>
        </div>

        <p className="absolute bottom-8 right-6 max-w-xs text-right font-serif text-lg italic text-violet-200 drop-shadow sm:bottom-12 sm:right-12 sm:text-xl">
          It only takes a second to imagine
        </p>
      </section>
    </main>
  );
}
