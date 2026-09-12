import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { collections } from "@/lib/catalog";
import { useCart, useUi, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/loja" as const, label: "Loja", slug: null as string | null },
  ...collections.slice(0, 4).map((c) => ({
    href: "/colecao/$slug" as const,
    label: c.name,
    slug: c.slug as string | null,
  })),
  { href: "/sobre" as const, label: "A marca", slug: null as string | null },
];

export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-elevated">
      <p className="px-4 py-2.5 text-center text-[11px] tracking-[0.16em] text-muted uppercase">
        Frete grátis acima de R$ 299 · 12× sem juros · 5% off no PIX
      </p>
    </div>
  );
}

export function Header() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const wishes = useWishlist((s) => s.slugs.length);
  const { cartOpen, searchOpen, navOpen, setCartOpen, setSearchOpen, setNavOpen } = useUi();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md">
      <AnnouncementBar />
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:h-16 md:px-6">
        <button
          type="button"
          className="flex size-11 items-center justify-center md:hidden"
          aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="mr-auto md:mr-8" onClick={() => setNavOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) =>
            item.slug ? (
              <Link
                key={item.label}
                to="/colecao/$slug"
                params={{ slug: item.slug }}
                className="text-[13px] tracking-wide text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-[13px] tracking-wide text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            aria-label="Buscar"
            className="flex size-11 items-center justify-center text-fg"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="size-4" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            aria-label="Favoritos"
            className="relative flex size-11 items-center justify-center text-fg"
            onClick={() => navigate({ to: "/favoritos" })}
          >
            <Heart className="size-4" strokeWidth={1.7} />
            {wishes > 0 ? (
              <span className="absolute top-2 right-1.5 size-1.5 rounded-full bg-accent" />
            ) : null}
          </button>
          <button
            type="button"
            aria-label="Carrinho"
            className="relative flex size-11 items-center justify-center text-fg"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingBag className="size-4" strokeWidth={1.7} />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-fg">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-bg md:hidden",
          "transition-[max-height,opacity] duration-300 ease-out",
          navOpen ? "max-h-[80vh] opacity-100" : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-3">
          {nav.map((item) =>
            item.slug ? (
              <Link
                key={item.label}
                to="/colecao/$slug"
                params={{ slug: item.slug }}
                className="flex h-12 items-center text-sm tracking-wide"
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="flex h-12 items-center text-sm tracking-wide"
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/guia-de-tamanhos"
            className="flex h-12 items-center text-sm tracking-wide"
            onClick={() => setNavOpen(false)}
          >
            Guia de tamanhos
          </Link>
          <Link
            to="/contato"
            className="flex h-12 items-center text-sm tracking-wide"
            onClick={() => setNavOpen(false)}
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
