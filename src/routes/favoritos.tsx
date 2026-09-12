import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favoritos")({ component: WishPage });

function WishPage() {
  const slugs = useWishlist((s) => s.slugs);
  const list = slugs.map(getProduct).filter((p) => p != null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-5xl tracking-[0.06em]">Favoritos</h1>
      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted">Nada salvo ainda.</p>
          <Button className="mt-6 rounded-sm" asChild>
            <Link to="/loja">Ver a loja</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
