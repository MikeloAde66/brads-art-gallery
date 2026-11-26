'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HEADLINE = "Welcome to Brad's Art Gallery";
const SUBTEXT =
  "Come explore and discover beautiful pieces of art — from the Lowcountry, to the dazzling beauty of the Landing, the pop-up venues, and Market Street. It's all captured here. Enjoy.";

const splashVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -15 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ShopIntro() {
  const [typed, setTyped] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(HEADLINE.slice(0, i));
      if (i >= HEADLINE.length) {
        clearInterval(interval);
        setTimeout(() => setShowSubtext(true), 150);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [startTyping]);

  return (
    <div className="relative min-h-[14rem]">
      {/* Paint splashes — splash in on load, then resolve into the headline */}
      <svg
        viewBox="0 0 600 220"
        className="pointer-events-none absolute -left-6 -top-10 h-56 w-full max-w-xl opacity-90 sm:-top-14"
        aria-hidden="true"
      >
        <motion.path
          d="M60 90c-18-22 4-55 34-58 21-2 30 16 52 10 27-7 49 14 44 39-4 21-28 24-32 44-4 22-30 30-48 18-17-11-14-33-33-38-20-5-33-13-17-15z"
          fill="#b3341f"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={splashVariants}
          onAnimationComplete={() => setStartTyping(true)}
        />
        <motion.path
          d="M300 40c14-16 42-10 48 10 5 16-8 24-2 40 7 19-9 38-29 36-17-2-20-20-37-24-19-5-28-24-13-37 11-10 24-13 33-25z"
          fill="#d97a2b"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={splashVariants}
        />
        <motion.path
          d="M470 110c-10-20 10-42 32-38 19 3 22 23 39 28 20 6 24 30 6 41-16 10-30-2-47 3-19 6-35-6-33-25 1-4 2-6 3-9z"
          fill="#8a6b2f"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={splashVariants}
        />
        <motion.circle
          cx="200"
          cy="150"
          r="7"
          fill="#b3341f"
          custom={1.5}
          initial="hidden"
          animate="visible"
          variants={splashVariants}
        />
        <motion.circle
          cx="420"
          cy="60"
          r="5"
          fill="#d97a2b"
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={splashVariants}
        />
      </svg>

      <div className="relative pt-16 sm:pt-20">
        <h1 className="font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">
          {typed}
          <span className="ml-1 inline-block w-[2px] animate-pulse bg-neutral-100 align-middle" style={{ height: '0.9em', opacity: typed.length < HEADLINE.length ? 1 : 0 }} />
        </h1>

        <motion.p
          className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={showSubtext ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {SUBTEXT}
        </motion.p>
      </div>
    </div>
  );
}
