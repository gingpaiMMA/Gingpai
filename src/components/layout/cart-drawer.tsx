import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getProduct, FREE_SHIPPING_FROM } from "@/lib/catalog";
import { formatBRL, pixPrice } from "@/lib/format";
import { useCart, useUi } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const open = useUi((s) => s.cartOpen);
  const setOpen = useUi((s) => s.setCartOpen);
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
  const remaining = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_FROM);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-200",
          open
            ? "bg-bg/60 opacity-100 backdrop-blur-[2px]"
            : "pointer-events-none invisible opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-border",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="Carrinho"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <p className="font-display text-2xl tracking-[0.12em]">Carrinho</p>
          <button
            type="button"
            className="flex size-11 items-center justify-center"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="border-b border-border px-5 py-3">
          <div className="h-1 overflow-hidden bg-elevated">
            <div
              className="h-full bg-accent transition-[width] duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {remaining === 0
              ? "Frete grátis liberado."
              : `Faltam ${formatBRL(remaining)} para o frete grátis.`}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {detailed.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted">Seu canto ainda está vazio.</p>
              <Button
                className="mt-6 rounded-sm"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link to="/loja">Ir para a loja</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {detailed.map((l) => (
                <li key={l.id} className="flex gap-3">
                  <Link
                    to="/produto/$slug"
                    params={{ slug: l.product.slug }}
                    onClick={() => setOpen(false)}
                    className="size-24 shrink-0 overflow-hidden bg-elevated"
                  >
                    <img
                      src={l.color.image}
                      alt=""
                      className="size-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.product.name}</p>
                    <p className="text-xs text-muted">
                      {l.color.name} · {l.size.label}
                    </p>
                    <p className="tab-nums mt-1 text-sm">{formatBRL(l.product.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex h-9 items-center border border-border">
                        <button
                          type="button"
                          className="size-9 text-lg"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label="Diminuir"
                        >
                          −
                        </button>
                        <span className="tab-nums w-6 text-center text-sm">{l.qty}</span>
                        <button
                          type="button"
                          className="size-9 text-lg"
                          onClick={() => setQty(l.id, l.qty + 1)}
                          aria-label="Aumentar"
                        >
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
          )}
        </div>

        {detailed.length > 0 ? (
          <div className="border-t border-border px-5 py-5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="tab-nums font-semibold">{formatBRL(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-subtle">
              {formatBRL(pixPrice(subtotal))} no PIX · 5% off
            </p>
            <Button className="mt-4 rounded-sm" width="full" size="lg" asChild>
              <Link to="/checkout" onClick={() => setOpen(false)}>
                Finalizar compra
              </Link>
            </Button>
            <Button
              className="mt-2 rounded-sm"
              variant="ghost"
              width="full"
              asChild
            >
              <Link to="/carrinho" onClick={() => setOpen(false)}>
                Ver carrinho
              </Link>
            </Button>
          </div>
        ) : null}
      </aside>
    </>
  );
}
