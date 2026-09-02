'use client';

import { ARTWORKS } from '@/data/artworks';
import type { SiteConfig } from '@/lib/siteConfig';
import HeroText from '@/components/HeroText';
import VideoBox from '@/components/VideoBox';
import ShowcaseWork from '@/components/ShowcaseWork';
import TypewriterNarration from '@/components/TypewriterNarration';

const FEATURED_SLUGS = ['red-sea-dance'];

interface LivePreviewProps {
  config: SiteConfig;
}

export default function LivePreview({ config }: LivePreviewProps) {
  const featured = ARTWORKS.filter((a) => FEATURED_SLUGS.includes(a.slug));

  return (
    <div className="h-full overflow-y-auto bg-neutral-950">
      <div className="min-h-full">
        <HeroText {...config.hero} />
        <VideoBox {...config.video} />
        {featured[0] && <ShowcaseWork artwork={featured[0]} config={config.showcase} />}
        <TypewriterNarration {...config.narration} />
      </div>
    </div>
  );
}
