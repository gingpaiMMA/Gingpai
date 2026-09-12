import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartLine = {
  id: string;
  slug: string;
  colorId: string;
  sizeId: string;
  qty: number;
};

type CartState = {
  hydrated: boolean;
  lines: CartLine[];
  setHydrated: () => void;
  add: (line: Omit<CartLine, "id" | "qty"> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

function lineId(slug: string, colorId: string, sizeId: string) {
  return `${slug}__${colorId}__${sizeId}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      lines: [],
      setHydrated: () => set({ hydrated: true }),
      add: ({ slug, colorId, sizeId, qty = 1 }) => {
        const id = lineId(slug, colorId, sizeId);
        const existing = get().lines.find((l) => l.id === id);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === id ? { ...l, qty: l.qty + qty } : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, { id, slug, colorId, sizeId, qty }] });
        }
      },
      setQty: (id, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        });
      },
      remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "gingpai-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

type WishState = {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
};

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const has = get().slugs.includes(slug);
        set({
          slugs: has ? get().slugs.filter((s) => s !== slug) : [...get().slugs, slug],
        });
      },
      has: (slug) => get().slugs.includes(slug),
    }),
    {
      name: "gingpai-wish",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

type UiState = {
  cartOpen: boolean;
  searchOpen: boolean;
  navOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setNavOpen: (v: boolean) => void;
};

export const useUi = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  navOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen, navOpen: false, searchOpen: false }),
  setSearchOpen: (searchOpen) => set({ searchOpen, navOpen: false, cartOpen: false }),
  setNavOpen: (navOpen) => set({ navOpen, cartOpen: false, searchOpen: false }),
}));
