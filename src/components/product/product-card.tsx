import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type Product } from "@/lib/catalog";
import { formatBRL, installmentOf } from "@/lib/format";
import { useUi, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const badgeLabel: Record<NonNullable<Product["badge"]>, string> = {
  novo: "Novo",
  "mais-vendido": "Mais vendido",
  promocao: "Oferta",
};

export function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd?: (p: Product) => void;
}) {
  const wish = useWishlist((s) => s.slugs.includes(product.slug));
  const toggle = useWishlist((s) => s.toggle);
  const setCartOpen = useUi((s) => s.setCartOpen);

  return (
    <article className="group relative flex flex-col">
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-elevated"
      >
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {product.badge ? (
          <span className="absolute top-3 left-3 bg-bg/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-fg uppercase backdrop-blur-sm">
            {badgeLabel[product.badge]}
          </span>
        ) : null}
      </Link>
      <button
        type="button"
        aria-label={wish ? "Remover dos favoritos" : "Salvar nos favoritos"}
        onClick={() => toggle(product.slug)}
        className="absolute top-2.5 right-2.5 z-10 flex size-11 items-center justify-center text-fg"
      >
        <Heart
          className={cn("size-4", wish && "fill-accent text-accent")}
          strokeWidth={1.6}
        />
      </button>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <Link
          to="/produto/$slug"
          params={{ slug: product.slug }}
          className="text-sm font-medium tracking-tight text-fg hover:text-bone"
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted">{product.subtitle}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="tab-nums text-sm font-semibold">{formatBRL(product.price)}</span>
          {product.compareAt ? (
            <span className="tab-nums text-xs text-subtle line-through">
              {formatBRL(product.compareAt)}
            </span>
          ) : null}
        </div>
        <p className="text-[11px] text-subtle">
          ou 12× de {installmentOf(product.price)} sem juros
        </p>
        {onQuickAdd ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 rounded-sm opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
            onClick={() => {
              onQuickAdd(product);
              setCartOpen(true);
            }}
          >
            Adicionar
          </Button>
        ) : null}
      </div>
    </article>
  );
}
