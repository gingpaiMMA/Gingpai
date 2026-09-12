import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { collections } from "@/lib/catalog";
import { useState } from "react";

export function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <Logo className="text-[1.15rem]" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Equipamento de combate para boxe, MMA e Muay Thai. GINGPAI no Brasil —
            o par que aguenta o round extra.
          </p>
          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="nl">
              E-mail
            </label>
            <input
              id="nl"
              type="email"
              required
              placeholder="Seu e-mail"
              className="h-11 flex-1 border border-border bg-bg px-3 text-sm text-fg placeholder:text-subtle outline-none focus:border-fg/40"
            />
            <button
              type="submit"
              className="h-11 bg-fg px-4 text-xs font-semibold tracking-wide text-bg uppercase"
            >
              {done ? "Ok" : "Entrar"}
            </button>
          </form>
          <p className="mt-2 text-[11px] text-subtle">
            Lançamentos e o drop da semana. Sem spam.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">Loja</p>
            <ul className="mt-3 space-y-2.5 text-sm text-muted">
              <li>
                <Link to="/loja" className="hover:text-fg">
                  Ver tudo
                </Link>
              </li>
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/colecao/$slug"
                    params={{ slug: c.slug }}
                    className="hover:text-fg"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">Ajuda</p>
            <ul className="mt-3 space-y-2.5 text-sm text-muted">
              <li>
                <Link to="/guia-de-tamanhos" className="hover:text-fg">
                  Guia de tamanhos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-fg">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-fg">
                  A marca
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="hover:text-fg">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">Compra</p>
            <ul className="mt-3 space-y-2.5 text-sm text-muted">
              <li>PIX com 5% off</li>
              <li>12× sem juros</li>
              <li>Frete grátis acima de R$ 299</li>
              <li>Troca em 30 dias</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[11px] text-subtle md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} GINGPAI Boxing. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00 · Loja demonstração</p>
        </div>
      </div>
    </footer>
  );
}
