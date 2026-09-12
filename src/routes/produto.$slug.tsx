import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getProduct, relatedTo } from "@/lib/catalog";
import { formatBRL, installmentOf, pixPrice } from "@/lib/format";
import { useCart, useUi, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();

  return <ProductView key={product.slug} />;
}

function ProductView() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();

  const [colorId, setColorId] = useState(product.colors[0].id);
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const [open, setOpen] = useState<string>("desc");

  useEffect(() => {
    setColorId(product.colors[0].id);
    setSizeId(product.sizes[0].id);
    setQty(1);
    setPhoto(0);
  }, [product]);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const images = useMemo(() => {
    const rest = product.gallery.filter((g) => g !== color.image);
    return [color.image, ...rest];
  }, [product, color]);

  const add = useCart((s) => s.add);
  const setCart = useUi((s) => s.setCartOpen);
  const wished = useWishlist((s) => s.slugs.includes(product.slug));
  const toggleWish = useWishlist((s) => s.toggle);
  const related = relatedTo(product.slug);

  const addToCart = () => {
    add({ slug: product.slug, colorId, sizeId, qty });
    toast("Adicionado ao carrinho", { description: `${product.name} · ${color.name}` });
    setCart(true);
  };

  const sizeHint = product.sizes.find((s) => s.id === sizeId)?.hint;

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-6 md:py-12">
        <div>
          <div className="aspect-square overflow-hidden bg-elevated">
            <img src={images[photo]} alt={product.name} className="size-full object-cover" />
          </div>
          {images.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={cn(
                    "aspect-square overflow-hidden bg-elevated",
                    photo === i ? "ring-1 ring-fg" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">{product.subtitle}</p>
          <h1 className="font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-bone text-bone" />
              <span className="tab-nums">{product.rating.toFixed(1)}</span>
            </span>
            <span className="text-subtle">({product.reviewCount} avaliações)</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="tab-nums text-2xl font-semibold">{formatBRL(product.price)}</span>
            {product.compareAt ? (
              <span className="tab-nums text-sm text-subtle line-through">
                {formatBRL(product.compareAt)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted">
            12× de {installmentOf(product.price)} sem juros · {formatBRL(pixPrice(product.price))} no PIX
          </p>

          <div className="mt-8">
            <p className="text-xs font-medium tracking-wide">
              Cor <span className="text-muted">· {color.name}</span>
            </p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.name}
                  onClick={() => {
                    setColorId(c.id);
                    setPhoto(0);
                  }}
                  className={cn(
                    "size-9 rounded-full border",
                    colorId === c.id ? "border-fg ring-2 ring-fg/30" : "border-border",
                  )}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide">Tamanho</p>
              <Link
                to="/guia-de-tamanhos"
                className="text-xs text-muted underline-offset-2 hover:text-fg hover:underline"
              >
                Guia
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSizeId(s.id)}
                  className={cn(
                    "h-11 min-w-14 px-3 text-sm",
                    sizeId === s.id ? "bg-fg text-bg" : "border border-border text-fg hover:border-fg/40",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {sizeHint ? <p className="mt-2 text-xs text-subtle">{sizeHint}</p> : null}
          </div>

          <div className="mt-8 flex gap-2">
            <div className="flex h-12 items-center border border-border">
              <button
                type="button"
                className="size-12 text-lg"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="tab-nums w-6 text-center">{qty}</span>
              <button type="button" className="size-12 text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <Button className="flex-1 rounded-sm" size="lg" onClick={addToCart}>
              Adicionar ao carrinho
            </Button>
            <button
              type="button"
              aria-label="Favoritar"
              onClick={() => toggleWish(product.slug)}
              className="flex size-12 items-center justify-center border border-border"
            >
              <Heart className={cn("size-4", wished && "fill-accent text-accent")} />
            </button>
          </div>
          <p className="mt-3 text-xs text-subtle">SKU {product.sku} · Envio em 1–2 dias úteis</p>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {[
              { id: "desc", t: "Descrição", body: product.description },
              { id: "feat", t: "Detalhes", body: product.features.join(" · ") },
              {
                id: "spec",
                t: "Especificações",
                body: product.specs.map((s) => `${s.label}: ${s.value}`).join(" · "),
              },
            ].map((row) => (
              <div key={row.id}>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-between text-left text-sm font-medium"
                  onClick={() => setOpen(open === row.id ? "" : row.id)}
                >
                  {row.t}
                  <span className="text-muted">{open === row.id ? "−" : "+"}</span>
                </button>
                {open === row.id ? (
                  <p className="pb-4 text-sm leading-relaxed text-muted">{row.body}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {product.reviews.length > 0 ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
            <h2 className="font-display text-3xl tracking-[0.08em]">Do chão da academia</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {product.reviews.map((r) => (
                <blockquote key={r.author + r.date} className="border border-border bg-surface p-5">
                  <p className="text-xs text-subtle">
                    {r.rating}/5 · {r.gym}
                  </p>
                  <p className="mt-2 text-sm font-medium">{r.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                  <footer className="mt-3 text-xs text-subtle">{r.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-display text-3xl tracking-[0.08em]">Quem leva isso também leva</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 z-20 border-t border-border bg-bg/95 p-3 backdrop-blur md:hidden">
        <Button width="full" className="rounded-sm" onClick={addToCart}>
          Adicionar · {formatBRL(product.price)}
        </Button>
      </div>
    </div>
  );
}
