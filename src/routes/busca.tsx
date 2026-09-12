import { createFileRoute } from "@tanstack/react-router";
import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { useCart, useUi } from "@/lib/store";
import { toast } from "sonner";

type Search = { q?: string };

export const Route = createFileRoute("/busca")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const list = searchProducts(q);
  const add = useCart((s) => s.add);
  const setCart = useUi((s) => s.setCartOpen);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Busca</p>
      <h1 className="font-display mt-2 text-4xl tracking-[0.06em]">
        {q ? `“${q}”` : "Buscar"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {list.length} {list.length === 1 ? "resultado" : "resultados"}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
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
    </div>
  );
}
