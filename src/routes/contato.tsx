import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contato")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:px-6">
      <div>
        <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Fala com a gente</p>
        <h1 className="font-display mt-2 text-5xl tracking-[0.06em]">Contato</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Tamanho, oz, prazo, pedido corporativo para academia. Resposta em horário comercial,
          horário de Brasília.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-subtle">E-mail</dt>
            <dd>contato@gingpai.com.br</dd>
          </div>
          <div>
            <dt className="text-subtle">WhatsApp</dt>
            <dd>(11) 90000-0000</dd>
          </div>
          <div>
            <dt className="text-subtle">Atendimento</dt>
            <dd>Seg–sex, 9h–18h</dd>
          </div>
        </dl>
      </div>
      {sent ? (
        <p className="self-center text-sm text-muted">
          Mensagem enviada — nesta loja demo ela não vai a lugar nenhum, mas o formulário
          funciona.
        </p>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Nome</span>
            <input required className="h-11 w-full border border-border bg-surface px-3 text-sm outline-none focus:border-fg/40" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">E-mail</span>
            <input type="email" required className="h-11 w-full border border-border bg-surface px-3 text-sm outline-none focus:border-fg/40" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Mensagem</span>
            <textarea required rows={5} className="w-full border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-fg/40" />
          </label>
          <Button className="rounded-sm" type="submit">
            Enviar
          </Button>
        </form>
      )}
    </div>
  );
}
