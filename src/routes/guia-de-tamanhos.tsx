import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guia-de-tamanhos")({ component: SizeGuide });

function SizeGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="text-[11px] tracking-[0.22em] text-subtle uppercase">Antes de pedir</p>
      <h1 className="font-display mt-2 text-5xl tracking-[0.06em]">Guia de tamanhos</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Oz de luva não é número da mão — é peso do atleta e tipo de treino. Caneleira segue
        altura. Se ficar na dúvida, manda o peso e a modalidade no contato.
      </p>

      <h2 className="font-display mt-12 text-3xl tracking-[0.08em]">Luvas de boxe</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs tracking-wide text-subtle uppercase">
            <th className="py-3 font-medium">Oz</th>
            <th className="py-3 font-medium">Peso do atleta</th>
            <th className="py-3 font-medium">Uso</th>
          </tr>
        </thead>
        <tbody className="text-muted">
          {[
            ["10 oz", "Até 60 kg", "Saco e pads"],
            ["12 oz", "60–75 kg", "Treino geral"],
            ["14 oz", "75–90 kg", "Sparring"],
            ["16 oz", "90 kg+", "Sparring pesado"],
          ].map((r) => (
            <tr key={r[0]} className="border-b border-border">
              {r.map((c) => (
                <td key={c} className="py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-display mt-12 text-3xl tracking-[0.08em]">Caneleiras</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs tracking-wide text-subtle uppercase">
            <th className="py-3 font-medium">Tam.</th>
            <th className="py-3 font-medium">Altura</th>
          </tr>
        </thead>
        <tbody className="text-muted">
          {[
            ["P", "Até 1,65 m"],
            ["M", "1,65–1,80 m"],
            ["G", "1,80 m+"],
          ].map((r) => (
            <tr key={r[0]} className="border-b border-border">
              {r.map((c) => (
                <td key={c} className="py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-8 text-sm text-muted">
        Bandagens: tamanho único, 5 metros. Manoplas: tamanho único.
      </p>
      <Button className="mt-8 rounded-sm" asChild>
        <Link to="/loja">Escolher equipamento</Link>
      </Button>
    </div>
  );
}
