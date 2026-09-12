import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({ component: AboutPage });

function AboutPage() {
  return (
    <div>
      <section className="relative isolate h-[50vh] min-h-72 overflow-hidden">
        <img
          src="/images/hero-ring.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/25" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 md:px-6">
          <p className="text-[11px] tracking-[0.22em] text-bone/70 uppercase">A marca</p>
          <h1 className="font-display mt-2 text-5xl tracking-[0.06em] md:text-7xl">GINGPAI</h1>
        </div>
      </section>
      <article className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <p className="text-lg leading-relaxed text-fg">
          GINGPAI Boxing é equipamento de combate — luvas, caneleiras, proteção — feito para
          treino de verdade, não para vitrine.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          A marca nasceu em Qingzhou, na China, como Jingpai Sport Goods. O nome que o ringue
          conhece é GINGPAI: cinco estrelas no punho, couro PU de grão fechado, espuma que não
          achata no terceiro round. Chegou nas academias brasileiras por quem já rasgou luva
          barata no gancho curto e não quer repetir.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          Esta loja é a vitrine oficial GINGPAI no Brasil. Boxe, MMA, Muay Thai, kickboxing e
          sanda. Mesmo padrão de fábrica, atendimento em português, PIX, parcelamento e troca
          em 30 dias.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-8 text-center">
          {[
            ["2014", "Primeiro par fora da China"],
            ["5★", "Marca registrada GINGPAI BOXING"],
            ["30d", "Para trocar se o oz não serviu"],
          ].map(([n, d]) => (
            <div key={n}>
              <p className="font-display text-3xl tracking-wide">{n}</p>
              <p className="mt-1 text-[11px] text-muted">{d}</p>
            </div>
          ))}
        </div>
        <Button className="mt-10 rounded-sm" asChild>
          <Link to="/loja">Ver o catálogo</Link>
        </Button>
      </article>
    </div>
  );
}
