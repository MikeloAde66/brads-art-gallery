import { create } from 'zustand';
import { Artwork } from '@/data/artworks';
import { priceConfiguration, type PrintConfiguration } from '@/lib/pricing';

export interface PrintSelection {
  variantId: string;
  frameId: string;
}

export interface CartItem {
  cartItemId: string;
  artwork: Artwork;
  configuration: PrintConfiguration;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (artwork: Artwork, selection: PrintSelection) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (artwork, selection) => {
    const configuration: PrintConfiguration = { artworkId: artwork.id, ...selection };
    const cartItemId = `${artwork.id}-${selection.variantId}-${selection.frameId}`;
    set((state) => {
      const existing = state.items.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { cartItemId, artwork, configuration, quantity: 1 }] };
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
    get().items.reduce(
      (sum, item) => sum + (priceConfiguration(item.configuration)?.total ?? 0) * item.quantity,
      0
    ),
  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
