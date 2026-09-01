import { create } from 'zustand';
import { Artwork, ArtworkVariant } from '@/data/artworks';

export interface CartItem {
  cartItemId: string;
  artwork: Artwork;
  selectedVariant: ArtworkVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (artwork: Artwork, variant: ArtworkVariant) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (artwork, variant) => {
    const cartItemId = `${artwork.id}-${variant.id}`;
    set((state) => {
      const existing = state.items.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { cartItemId, artwork, selectedVariant: variant, quantity: 1 }] };
    });
  },
  removeItem: (cartItemId) =>
    set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) })),
  updateQuantity: (cartItemId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.cartItemId !== cartItemId)
          : state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.selectedVariant.retailPrice * item.quantity, 0),
  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
