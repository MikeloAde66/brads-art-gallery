'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface HeroVideoRevealProps {
  videoSrc: string;
  imageSrc: string;
  imageAlt: string;
}

// Experimental hero: plays a short video once on landing, then cross-fades
// into a still image when the video ends. Brad just wants to see how this
// feels — not committed to using it anywhere yet.
export default function HeroVideoReveal({ videoSrc, imageSrc, imageAlt }: HeroVideoRevealProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
          videoEnded ? 'opacity-0' : 'opacity-100'
        }`}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
      />
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={`object-cover transition-opacity duration-[1200ms] ease-out ${
          videoEnded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
