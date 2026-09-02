import { ARTWORKS } from '@/data/artworks';
import { getSiteConfig } from '@/lib/siteConfig';
import HeroText from '@/components/HeroText';
import VideoBox from '@/components/VideoBox';
import ShowcaseWork from '@/components/ShowcaseWork';
import TypewriterNarration from '@/components/TypewriterNarration';

const FEATURED_SLUGS = ['red-sea-dance'];

export default async function Home() {
  const config = await getSiteConfig();
  const featured = ARTWORKS.filter((a) => FEATURED_SLUGS.includes(a.slug));

  return (
    <main className="flex-1">
      <HeroText {...config.hero} />
      <VideoBox {...config.video} />
      {featured[0] && <ShowcaseWork artwork={featured[0]} config={config.showcase} />}
      <TypewriterNarration {...config.narration} />
    </main>
  );
}
