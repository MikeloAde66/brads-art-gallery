'use client';

import type { VideoConfig } from '@/lib/siteConfig';

export default function VideoBox({ enabled, url, autoplay, loop, muted, aspectRatio }: VideoConfig) {
  if (!enabled || !url) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="w-full overflow-hidden rounded-2xl bg-neutral-900" style={{ aspectRatio }}>
        <video
          src={url}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline
          controls={!autoplay}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
