'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { NavItem } from '@/lib/siteConfig';
import CartDrawer from './CartDrawer';

const DEFAULT_PRODUCTS_MENU: NavItem[] = [
  { label: 'Wall Art', href: '/shop', description: 'Canvas, framed, and paper prints' },
  { label: 'Media', href: '/products/media', description: 'Charcoal, Acrylic, Liquid Lead, Oil' },
  { label: 'Rooms', href: '/products/rooms', description: 'Room mockup previews' },
  { label: 'Collections', href: '/collections/new-earth', description: 'Curated series like "New Earth"' },
];

interface HeaderProps {
  navConfig?: NavItem[];
}

export default function Header({ navConfig }: HeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const menuItems = navConfig && navConfig.length > 0 ? navConfig : DEFAULT_PRODUCTS_MENU;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-lg tracking-[0.2em] text-neutral-100 uppercase">
          Brad&apos;s Art Gallery
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
          >
            Shop
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsProductsOpen((v) => !v)}
              aria-expanded={isProductsOpen}
              className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
            >
              Products
              <ChevronDown className="h-3 w-3" />
            </button>

            {isProductsOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-xl border border-neutral-800 bg-neutral-950 p-2 shadow-xl">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsProductsOpen(false)}
                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-neutral-900"
                  >
                    <p className="text-xs uppercase tracking-wide text-neutral-100">{item.label}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">{item.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
