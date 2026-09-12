import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections, featuredSlugs, getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useCart, useUi } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: Home });

const marquee = [
  "BOXE",
  "MMA",
  "MUAY THAI",
  "KICKBOXING",
  "SANDA",
  "SPARRING",
  "SACO",
  "PADS",
];

function Home() {
  const add = useCart((s) => s.add);
  const setCart = useUi((s) => s.setCartOpen);
  const featured = featuredSlugs.map((s) => getProduct(s)).filter((p) => p != null);

  return (
    <div>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img
          src="/images/hero-ring.jpg"
          alt="Ringue de boxe vazio sob holofotes"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="grain absolute inset-0 bg-[linear-gradient(to_top,rgb(9_9_8)_0%,rgb(9_9_8/0.55)_42%,rgb(9_9_8/0.25)_100%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <p className="text-[11px] tracking-[0.32em] text-bone/80 uppercase">
            Gingpai Boxing · cinco estrelas
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.88] tracking-[0.04em] text-fg">
            No ringue
            <br />
            não tem atalho.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/85 md:text-base">
            Equipamento de combate para boxe, MMA e Muay Thai. Luvas, caneleiras e
            proteção que aguentam o round extra.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-sm" asChild>
              <Link to="/loja">
                Comprar agora
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-sm border-fg/40 text-fg" asChild>
              <Link to="/guia-de-tamanhos">Guia de tamanhos</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-surface">
        <div className="marquee-track flex w-max gap-10 py-3.5">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display text-2xl tracking-[0.18em] text-muted"
            >
              {t} <span className="text-accent">·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Disciplinas</p>
            <h2 className="font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl">
              Treina o quê?
            </h2>
          </div>
          <Link to="/loja" className="hidden text-sm text-muted hover:text-fg md:inline">
            Ver tudo
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {collections.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to="/colecao/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-[3/4] overflow-hidden bg-elevated"
            >
              <img
                src={c.image}
                alt={c.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-3xl tracking-[0.08em]">{c.name}</p>
                <p className="mt-1 text-xs text-muted">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Catálogo</p>
            <h2 className="font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl">
              O corner da semana
            </h2>
          </div>
          <Link to="/loja" className="text-sm text-muted hover:text-fg">
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {featured.map((p) => (
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
      </section>

      <section className="mt-8 grid md:grid-cols-2">
        <div className="relative min-h-[52vh] overflow-hidden">
          <img
            src="/images/lifestyle-wraps.jpg"
            alt="Atleta enrolando bandagens"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-surface px-6 py-16 md:px-14">
          <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">A marca</p>
          <h2 className="font-display mt-3 text-4xl tracking-[0.06em] md:text-5xl">
            Feito para quem sobe.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            GINGPAI nasceu no chão de fábrica de Qingzhou e chegou nas academias
            brasileiras por quem já rasgou luva barata no gancho curto. Couro PU de
            grão fechado, espuma que não achata no terceiro round, velcro que ainda
            pega depois de um ano de suor.
          </p>
          <Button className="mt-8 w-fit rounded-sm" variant="outline" asChild>
            <Link to="/sobre">A história</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Prova de ringue</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              q: "Terceiro par da GINGPAI. Costura firme, punho não abre no gancho. Uso 14 oz no sparring — ainda novas depois de quatro meses.",
              a: "Rafael M.",
              g: "Nação do Boxe · SP",
            },
            {
              q: "Já queimei duas marcas baratas que rodavam no chute. Essas caneleiras ficam no lugar. Peito do pé realmente protegido.",
              a: "Leticia A.",
              g: "Thai Brasil · PR",
            },
            {
              q: "Seguro essas pads 4 horas por dia. Punho não dói, alvo ainda visível. Já rasguei outras em dois meses.",
              a: "Coach Henrique",
              g: "Corner 9 · Salvador",
            },
          ].map((t) => (
            <blockquote key={t.a} className="border border-border bg-surface p-6">
              <p className="text-sm leading-relaxed text-fg">“{t.q}”</p>
              <footer className="mt-5 text-xs text-muted">
                {t.a}
                <span className="block text-subtle">{t.g}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
          {[
            ["Frete grátis", "Acima de R$ 299 para todo o Brasil"],
            ["12× sem juros", "Ou 5% off no PIX na hora"],
            ["Troca em 30 dias", "Tamanho errado? A gente resolve"],
            ["Guia de oz", "Escolhe a luva certa pelo seu peso"],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-1 text-xs text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
