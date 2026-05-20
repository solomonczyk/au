import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id?: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

interface CartState {
  items: CartItem[];
  isSyncing: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncFromServer: (serverItems: CartItem[]) => void;
  setSyncing: (syncing: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isSyncing: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.productId !== productId)
            : state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              ),
        })),

      clearCart: () => set({ items: [] }),

      syncFromServer: (serverItems) =>
        set((state) => {
          const merged = [...serverItems];
          for (const local of state.items) {
            if (!merged.some((s) => s.productId === local.productId)) {
              merged.push(local);
            }
          }
          return { items: merged, isSyncing: false };
        }),

      setSyncing: (syncing) => set({ isSyncing: syncing }),
    }),
    { name: "aurum-cart" }
  )
);

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
