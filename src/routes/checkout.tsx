import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getProduct, FREE_SHIPPING_FROM } from "@/lib/catalog";
import { formatBRL, pixPrice } from "@/lib/format";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [pay, setPay] = useState<"pix" | "card">("pix");
  const [cep, setCep] = useState("");
  const [done, setDone] = useState(false);

  const detailed = lines
    .map((l) => {
      const product = getProduct(l.slug);
      if (!product) return null;
      return { ...l, product };
    })
    .filter((x) => x !== null);

  const subtotal = detailed.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : 24.9;
  const raw = subtotal + shipping;
  const total = pay === "pix" ? pixPrice(raw) : raw;

  const eta = useMemo(() => {
    const d = cep.replace(/\D/g, "");
    if (d.length < 8) return null;
    const n = Number(d.slice(0, 2));
    const days = n <= 19 ? "3–5" : n <= 39 ? "4–7" : "6–10";
    return `${days} dias úteis`;
  }, [cep]);

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-[11px] tracking-[0.22em] text-accent uppercase">Pedido confirmado</p>
        <h1 className="font-display mt-3 text-5xl tracking-[0.06em]">Sino tocou.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Pedido de demonstração — nenhum pagamento foi cobrado. Seu corner fictício já está
          separado no estoque.
        </p>
        <Button className="mt-8 rounded-sm" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-[0.08em]">Carrinho vazio</h1>
        <Button className="mt-8 rounded-sm" asChild>
          <Link to="/loja">Ir para a loja</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-12 md:px-6 md:py-14">
      <form
        className="md:col-span-7"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setDone(true);
        }}
      >
        <h1 className="font-display text-5xl tracking-[0.06em]">Checkout</h1>
        <p className="mt-2 text-sm text-muted">Loja demonstração — nenhum cartão é cobrado.</p>

        <fieldset className="mt-8 space-y-3">
          <legend className="text-xs tracking-[0.18em] text-subtle uppercase">Contato</legend>
          <Field label="Nome" name="name" required />
          <Field label="E-mail" name="email" type="email" required />
        </fieldset>

        <fieldset className="mt-8 space-y-3">
          <legend className="text-xs tracking-[0.18em] text-subtle uppercase">Entrega</legend>
          <Field
            label="CEP"
            name="cep"
            required
            value={cep}
            onChange={(v) => setCep(v.replace(/\D/g, "").slice(0, 8))}
            placeholder="00000-000"
          />
          {eta ? <p className="text-xs text-muted">Prazo estimado: {eta}</p> : null}
          <Field label="Endereço" name="address" required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Número" name="n" required />
            <Field label="Complemento" name="comp" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cidade" name="city" required />
            <Field label="UF" name="uf" required />
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-xs tracking-[0.18em] text-subtle uppercase">Pagamento</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <PayChip active={pay === "pix"} onClick={() => setPay("pix")} label="PIX · 5% off" />
            <PayChip active={pay === "card"} onClick={() => setPay("card")} label="Cartão · 12×" />
          </div>
        </fieldset>

        <Button className="mt-8 rounded-sm" width="full" size="lg" type="submit">
          Confirmar pedido · {formatBRL(total)}
        </Button>
      </form>

      <aside className="h-fit border border-border bg-surface p-6 md:col-span-5">
        <h2 className="font-display text-2xl tracking-[0.1em]">Pedido</h2>
        <ul className="mt-4 space-y-3">
          {detailed.map((l) => (
            <li key={l.id} className="flex justify-between gap-3 text-sm">
              <span className="text-muted">
                {l.product.name} × {l.qty}
              </span>
              <span className="tab-nums">{formatBRL(l.product.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm font-semibold">
          <span>Total</span>
          <span className="tab-nums">{formatBRL(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="h-11 w-full border border-border bg-bg px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-fg/40"
      />
    </label>
  );
}

function PayChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 text-sm",
        active ? "bg-fg text-bg" : "border border-border text-muted",
      )}
    >
      {label}
    </button>
  );
}
