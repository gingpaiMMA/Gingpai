export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function installmentOf(value: number, n = 12) {
  return formatBRL(Math.round((value / n) * 100) / 100);
}

export function pixPrice(value: number) {
  return value * 0.95;
}
