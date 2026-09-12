import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct, FREE_SHIPPING_FROM } from "@/lib/catalog";
import { formatBRL, pixPrice } from "@/lib/format";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/carrinho")({ component: CartPage });

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const detailed = lines
    .map((l) => {
      const product = getProduct(l.slug);
      if (!product) return null;
      const color = product.colors.find((c) => c.id === l.colorId) ?? product.colors[0];
      const size = product.sizes.find((s) => s.id === l.sizeId) ?? product.sizes[0];
      return { ...l, product, color, size };
    })
    .filter((x) => x !== null);

  const subtotal = detailed.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : 24.9;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-5xl tracking-[0.06em]">Carrinho</h1>
      {detailed.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted">Nada aqui ainda.</p>
          <Button className="mt-6 rounded-sm" asChild>
            <Link to="/loja">Ir para a loja</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <ul className="space-y-6 lg:col-span-7">
            {detailed.map((l) => (
              <li key={l.id} className="flex gap-4 border-b border-border pb-6">
                <Link
                  to="/produto/$slug"
                  params={{ slug: l.product.slug }}
                  className="size-28 shrink-0 overflow-hidden bg-elevated sm:size-32"
                >
                  <img src={l.color.image} alt="" className="size-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{l.product.name}</p>
                  <p className="text-sm text-muted">
                    {l.color.name} · {l.size.label}
                  </p>
                  <p className="tab-nums mt-2 text-sm">{formatBRL(l.product.price)}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex h-10 items-center border border-border">
                      <button type="button" className="size-10" onClick={() => setQty(l.id, l.qty - 1)}>
                        −
                      </button>
                      <span className="tab-nums w-6 text-center text-sm">{l.qty}</span>
                      <button type="button" className="size-10" onClick={() => setQty(l.id, l.qty + 1)}>
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-subtle underline-offset-2 hover:text-fg hover:underline"
                      onClick={() => remove(l.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-border bg-surface p-6 lg:col-span-5">
            <h2 className="font-display text-2xl tracking-[0.1em]">Resumo</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tab-nums">{formatBRL(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Frete</dt>
                <dd className="tab-nums">{shipping === 0 ? "Grátis" : formatBRL(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-semibold">
                <dt>Total</dt>
                <dd className="tab-nums">{formatBRL(total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-subtle">{formatBRL(pixPrice(total))} no PIX</p>
            <Button className="mt-6 rounded-sm" width="full" size="lg" asChild>
              <Link to="/checkout">Finalizar compra</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
