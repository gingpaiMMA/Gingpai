import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, productsIn } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { useCart, useUi } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/colecao/$slug")({
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const col = getCollection(slug);
  if (!col) throw notFound();
  const list = productsIn(slug);
  const add = useCart((s) => s.add);
  const setCart = useUi((s) => s.setCartOpen);

  return (
    <div>
      <section className="relative isolate h-[42vh] min-h-64 overflow-hidden">
        <img src={col.image} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 md:px-6">
          <p className="text-[11px] tracking-[0.22em] text-bone/70 uppercase">Coleção</p>
          <h1 className="font-display mt-2 text-5xl tracking-[0.06em] md:text-7xl">{col.name}</h1>
          <p className="mt-2 max-w-lg text-sm text-bone/80">{col.description}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <p className="text-xs text-muted">
          {list.length} {list.length === 1 ? "peça" : "peças"}
        </p>
        {list.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted">
            Nada nesta coleção ainda.{" "}
            <Link to="/loja" className="text-fg underline">
              Ver a loja
            </Link>
          </p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
