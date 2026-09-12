import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { collections, products, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { useCart, useUi } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loja")({ component: LojaPage });

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function LojaPage() {
  const [sort, setSort] = useState<Sort>("featured");
  const [col, setCol] = useState<string>("all");
  const add = useCart((s) => s.add);
  const setCart = useUi((s) => s.setCartOpen);

  const list = useMemo(() => {
    let next: Product[] =
      col === "all" ? [...products] : products.filter((p) => p.collections.includes(col));
    if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
    if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
    return next;
  }, [sort, col]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Catálogo</p>
      <h1 className="font-display mt-2 text-5xl tracking-[0.06em] md:text-6xl">Tudo GINGPAI</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Luvas, caneleiras, proteção e treino. Filtra por disciplina e ordena como quiser.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip active={col === "all"} onClick={() => setCol("all")}>
          Tudo
        </FilterChip>
        {collections.map((c) => (
          <FilterChip key={c.slug} active={col === c.slug} onClick={() => setCol(c.slug)}>
            {c.name}
          </FilterChip>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-y border-border py-3">
        <p className="text-xs text-muted">
          {list.length} {list.length === 1 ? "peça" : "peças"}
        </p>
        <label className="flex items-center gap-2 text-xs text-muted">
          Ordenar
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 border border-border bg-surface px-2 text-xs text-fg"
          >
            <option value="featured">Destaques</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="rating">Melhor avaliado</option>
          </select>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5">
        {list.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            onQuickAdd={(prod) => {
              add({
                slug: prod.slug,
                colorId: prod.colors[0].id,
                sizeId: prod.sizes[0].id,
              });
              toast("Adicionado ao carrinho", { description: prod.name });
              setCart(true);
            }}
          />
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-subtle">
        Não achou o tamanho?{" "}
        <Link to="/guia-de-tamanhos" className="text-fg underline-offset-2 hover:underline">
          Abre o guia
        </Link>
        .
      </p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 px-3.5 text-xs tracking-wide",
        active ? "bg-fg text-bg" : "border border-border text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
