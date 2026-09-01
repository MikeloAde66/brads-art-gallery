'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-serif text-lg tracking-[0.2em] text-neutral-100 uppercase">
          Brad&apos;s Art Gallery
        </span>
        <button
          type="button"
          onClick={onOpenCart}
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
    </header>
  );
}
