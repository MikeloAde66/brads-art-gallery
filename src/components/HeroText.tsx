'use client';

import { motion } from 'framer-motion';
import type { HeroConfig } from '@/lib/siteConfig';

export default function HeroText({ subtitle, title, description }: HeroConfig) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-6 pb-20 pt-24 sm:pt-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.25em] text-neutral-500"
      >
        {subtitle}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-400"
      >
        {description}
      </motion.p>
    </section>
  );
}
