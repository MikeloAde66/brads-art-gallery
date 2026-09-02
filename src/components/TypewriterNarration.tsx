'use client';

import { useEffect, useState } from 'react';
import type { NarrationConfig } from '@/lib/siteConfig';

export default function TypewriterNarration({ text, typewriterSpeedMs, audioUrl }: NarrationConfig) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    setVisibleChars(0);
    if (!text) return;

    const interval = setInterval(() => {
      setVisibleChars((count) => {
        if (count >= text.length) {
          clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, Math.max(1, typewriterSpeedMs));

    return () => clearInterval(interval);
  }, [text, typewriterSpeedMs]);

  if (!text) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Ade</p>
      <p className="mt-4 min-h-[3em] text-sm leading-relaxed text-neutral-300">
        {text.slice(0, visibleChars)}
        <span className="animate-pulse">|</span>
      </p>
      {audioUrl && (
        <audio src={audioUrl} controls className="mx-auto mt-6" />
      )}
    </section>
  );
}
