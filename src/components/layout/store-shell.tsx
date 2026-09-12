import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchDialog } from "@/components/layout/search-dialog";
import { useCart, useUi, useWishlist } from "@/lib/store";
import { Toaster } from "sonner";

export function StoreShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void useCart.persist.rehydrate();
    void useWishlist.persist.rehydrate();
    useCart.getState().setHydrated();
  }, []);

  useEffect(() => {
    useUi.setState({ cartOpen: false, searchOpen: false, navOpen: false });
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useUi.setState({ cartOpen: false, searchOpen: false, navOpen: false });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchDialog />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          className: "border-border bg-elevated text-fg",
        }}
      />
    </div>
  );
}
