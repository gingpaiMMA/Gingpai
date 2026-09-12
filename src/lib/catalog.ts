export type BadgeKind = "novo" | "mais-vendido" | "promocao";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type ProductSize = {
  id: string;
  label: string;
  hint?: string;
};

export type Review = {
  author: string;
  gym?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAt?: number;
  collections: string[];
  image: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge?: BadgeKind;
  rating: number;
  reviewCount: number;
  features: string[];
  specs: { label: string; value: string }[];
  sku: string;
  reviews: Review[];
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "boxe",
    name: "Boxe",
    tagline: "Luvas, bandagens e o round extra",
    description:
      "Equipamento de boxe para saco, focus e sparring. Espuma de alta densidade e couro PU que aguenta academia pesada.",
    image: "/images/gloves-black.jpg",
  },
  {
    slug: "mma",
    name: "MMA",
    tagline: "Grappling e striking no mesmo round",
    description:
      "Luvas abertas, caneleiras e proteção para treino misto. Mobilidade de grappling, impacto de striking.",
    image: "/images/mma-gloves.jpg",
  },
  {
    slug: "muay-thai",
    name: "Muay Thai",
    tagline: "Canela, clinch e oito armas",
    description:
      "Caneleiras com proteção de peito do pé, manoplas e luvas pensadas para clinch e low kick.",
    image: "/images/shin-guards.jpg",
  },
  {
    slug: "protecao",
    name: "Proteção",
    tagline: "Cabeça, canela, punho — intactos",
    description:
      "Protetores de cabeça, caneleiras e bandagens. O treino continua amanhã quando o equipamento faz o trabalho dele.",
    image: "/images/head-guard.jpg",
  },
  {
    slug: "treino",
    name: "Treino",
    tagline: "Alvos, pads e o que o coach pede",
    description:
      "Manoplas de foco, aparadores e kits para quem monta o canto da academia em casa.",
    image: "/images/mitts.jpg",
  },
];

const ozSizes: ProductSize[] = [
  { id: "10oz", label: "10 oz", hint: "Até 60 kg · saco e pads" },
  { id: "12oz", label: "12 oz", hint: "60–75 kg · treino geral" },
  { id: "14oz", label: "14 oz", hint: "75–90 kg · sparring" },
  { id: "16oz", label: "16 oz", hint: "90 kg+ · sparring pesado" },
];

const sml: ProductSize[] = [
  { id: "s", label: "P", hint: "Até 1,65 m" },
  { id: "m", label: "M", hint: "1,65–1,80 m" },
  { id: "l", label: "G", hint: "1,80 m+" },
];

const unico: ProductSize[] = [{ id: "unico", label: "Único" }];

const reviewsGloves: Review[] = [
  {
    author: "Rafael M.",
    gym: "Nação do Boxe · SP",
    rating: 5,
    date: "2026-07-12",
    title: "Aguenta saco 6 dias por semana",
    body: "Terceiro par da GINGPAI. Costura firme, punho não abre no gancho. Uso 14 oz no sparring e 12 oz no saco — os dois ainda novos depois de quatro meses.",
  },
  {
    author: "Camila T.",
    gym: "Fight House · RJ",
    rating: 5,
    date: "2026-06-03",
    title: "Melhor custo-benefício que já usei",
    body: "Troquei de uma marca cara e não senti diferença de proteção. Velcro segura, palma transpirando menos do que eu esperava.",
  },
  {
    author: "Diego S.",
    gym: "Academia Central · BH",
    rating: 4,
    date: "2026-05-18",
    title: "Ótima no saco, um pouco rígida no começo",
    body: "Amaciou depois de duas semanas. Cheiro de PU sai rápido. Recomendo 16 oz se você é pesado no sparring.",
  },
];

export const products: Product[] = [
  {
    slug: "luvas-boxe-pro",
    name: "Luvas de Boxe Pro Series",
    subtitle: "Sparring e saco · 10–16 oz",
    description:
      "A luva que a GINGPAI mandou para o Brasil. Couro PU de grão fechado, três camadas de espuma EVA e punho largo com velcro industrial. Feita para saco, pads e sparring — sem desmontar no gancho curto.",
    price: 289,
    compareAt: 349,
    collections: ["boxe", "treino"],
    image: "/images/gloves-black.jpg",
    gallery: [
      "/images/gloves-black.jpg",
      "/images/lifestyle-wraps.jpg",
      "/images/gloves-red.jpg",
    ],
    colors: [
      { id: "preto", name: "Preto matte", hex: "#1a1a1a", image: "/images/gloves-black.jpg" },
      { id: "vermelho", name: "Carmesim", hex: "#9b1c2e", image: "/images/gloves-red.jpg" },
      { id: "branco", name: "Osso", hex: "#e8e2d4", image: "/images/gloves-white.jpg" },
    ],
    sizes: ozSizes,
    badge: "mais-vendido",
    rating: 4.8,
    reviewCount: 214,
    features: [
      "Três camadas de EVA de alta densidade",
      "Punho 10 cm com velcro industrial",
      "Palma em malha para ventilação",
      "Indicada para saco, pads e sparring",
    ],
    specs: [
      { label: "Material", value: "Couro PU + EVA" },
      { label: "Fecho", value: "Velcro" },
      { label: "Uso", value: "Treino e sparring" },
      { label: "Origem", value: "GINGPAI Boxing" },
    ],
    sku: "GP-BOX-PRO",
    reviews: reviewsGloves,
  },
  {
    slug: "luvas-sparring-elite",
    name: "Luvas Sparring Elite",
    subtitle: "Mais volume no punho · 12–16 oz",
    description:
      "Perfil mais cheio na cabeça do soco e punho extra para quem sparra pesado. A Elite é a luva que o corner pede quando o round vai além do técnico.",
    price: 349,
    collections: ["boxe"],
    image: "/images/gloves-red.jpg",
    gallery: ["/images/gloves-red.jpg", "/images/gloves-black.jpg", "/images/hero-ring.jpg"],
    colors: [
      { id: "vermelho", name: "Carmesim", hex: "#9b1c2e", image: "/images/gloves-red.jpg" },
      { id: "preto", name: "Preto matte", hex: "#1a1a1a", image: "/images/gloves-black.jpg" },
    ],
    sizes: ozSizes.filter((s) => s.id !== "10oz"),
    badge: "novo",
    rating: 4.9,
    reviewCount: 86,
    features: [
      "Cabeça do soco mais volumosa",
      "Punho reforçado para ganchos",
      "Forro que seca rápido entre rounds",
    ],
    specs: [
      { label: "Material", value: "PU premium + látex" },
      { label: "Fecho", value: "Velcro extra-largo" },
      { label: "Uso", value: "Sparring" },
    ],
    sku: "GP-BOX-ELT",
    reviews: reviewsGloves.slice(0, 2),
  },
  {
    slug: "luvas-treino-saco",
    name: "Luvas de Saco Compact",
    subtitle: "Leves para volume · 10–12 oz",
    description:
      "Perfil mais baixo, mais velocidade. A Compact é a luva de saco e pads — não substitui sparring, mas faz o round de volume sem pesar no ombro.",
    price: 199,
    collections: ["boxe", "treino"],
    image: "/images/gloves-white.jpg",
    gallery: ["/images/gloves-white.jpg", "/images/gloves-black.jpg"],
    colors: [
      { id: "branco", name: "Osso", hex: "#e8e2d4", image: "/images/gloves-white.jpg" },
      { id: "preto", name: "Preto matte", hex: "#1a1a1a", image: "/images/gloves-black.jpg" },
    ],
    sizes: [
      { id: "10oz", label: "10 oz", hint: "Saco e pads" },
      { id: "12oz", label: "12 oz", hint: "Volume pesado" },
    ],
    rating: 4.6,
    reviewCount: 131,
    features: [
      "Leve para rounds longos de saco",
      "Palma ventilada",
      "Costura reforçada na articulação",
    ],
    specs: [
      { label: "Material", value: "PU + EVA" },
      { label: "Uso", value: "Saco e pads — sem sparring" },
    ],
    sku: "GP-BAG-CMP",
    reviews: [reviewsGloves[2]],
  },
  {
    slug: "luvas-mma-strike",
    name: "Luvas MMA Strike",
    subtitle: "Open finger · grappling + striking",
    description:
      "Dedos livres para pegar guarda, palma fechada para bater. Espuma no metacarpo, punho firme. A luva de treino misto que não atrapalha o grappling.",
    price: 219,
    collections: ["mma"],
    image: "/images/mma-gloves.jpg",
    gallery: ["/images/mma-gloves.jpg", "/images/lifestyle-wraps.jpg"],
    colors: [{ id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/mma-gloves.jpg" }],
    sizes: [
      { id: "s", label: "P", hint: "Mão pequena" },
      { id: "m", label: "M", hint: "Padrão" },
      { id: "l", label: "G", hint: "Mão larga" },
    ],
    badge: "mais-vendido",
    rating: 4.7,
    reviewCount: 97,
    features: [
      "Open finger para grappling",
      "Espuma no metacarpo",
      "Velcro que não abre na queda",
    ],
    specs: [
      { label: "Material", value: "PU + neoprene" },
      { label: "Uso", value: "MMA, grappling com striking" },
    ],
    sku: "GP-MMA-STK",
    reviews: [
      {
        author: "Bruno K.",
        gym: "CT Recife",
        rating: 5,
        date: "2026-04-22",
        title: "Não atrapalha a passagem de guarda",
        body: "Usei no treino misto o mês inteiro. Dedos livres de verdade, e o punho não cede quando segura underhook.",
      },
    ],
  },
  {
    slug: "caneleiras-muay-thai",
    name: "Caneleiras Muay Thai Pro",
    subtitle: "Canela + peito do pé",
    description:
      "Proteção contínua da canela ao peito do pé, três tiras de velcro e forro que não escorrega com suor. Feita para low kick de verdade — não para pose de foto.",
    price: 329,
    collections: ["muay-thai", "protecao", "mma"],
    image: "/images/shin-guards.jpg",
    gallery: ["/images/shin-guards.jpg", "/images/head-guard.jpg"],
    colors: [{ id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/shin-guards.jpg" }],
    sizes: sml,
    badge: "mais-vendido",
    rating: 4.8,
    reviewCount: 162,
    features: [
      "Proteção contínua até o peito do pé",
      "Três tiras de velcro",
      "Interior antideslizante",
    ],
    specs: [
      { label: "Material", value: "PU + EVA denso" },
      { label: "Uso", value: "Muay Thai, kickboxing, MMA" },
    ],
    sku: "GP-SHN-PRO",
    reviews: [
      {
        author: "Leticia A.",
        gym: "Thai Brasil · PR",
        rating: 5,
        date: "2026-08-01",
        title: "Não gira na canela",
        body: "Já queimei duas marcas baratas que rodavam no chute. Essas ficam no lugar. Peito do pé realmente protegido.",
      },
    ],
  },
  {
    slug: "protetor-cabeca",
    name: "Protetor de Cabeça Guard",
    subtitle: "Bochecha, queixo e têmpora",
    description:
      "Campo de visão limpo, cobertura de bochecha e queixo, fivela na nuca. Para sparring técnico — não deixa o treino virar acidente.",
    price: 279,
    collections: ["protecao", "boxe", "mma"],
    image: "/images/head-guard.jpg",
    gallery: ["/images/head-guard.jpg", "/images/shin-guards.jpg"],
    colors: [{ id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/head-guard.jpg" }],
    sizes: sml,
    rating: 4.5,
    reviewCount: 74,
    features: [
      "Visão periférica ampla",
      "Proteção de queixo e bochecha",
      "Ajuste na nuca",
    ],
    specs: [
      { label: "Material", value: "PU + espuma laminada" },
      { label: "Uso", value: "Sparring de boxe e MMA" },
    ],
    sku: "GP-HDG-01",
    reviews: [
      {
        author: "Marcos P.",
        gym: "Team Nova · DF",
        rating: 4,
        date: "2026-03-09",
        title: "Bom campo de visão",
        body: "Não fecha tanto quanto os baratos. Ajuste na nuca é o que segura. Recomendo o M se você usa 56–58 de cabeça.",
      },
    ],
  },
  {
    slug: "bandagens-elasticas",
    name: "Bandagens Elásticas 5 m",
    subtitle: "Par · punho e knucles",
    description:
      "Algodão com elastano, 5 metros, velcro que realmente pega. A base de qualquer treino de impacto — se a bandagem está mal feita, a luva não salva o punho.",
    price: 49,
    collections: ["boxe", "mma", "treino"],
    image: "/images/wraps.jpg",
    gallery: ["/images/wraps.jpg", "/images/lifestyle-wraps.jpg"],
    colors: [
      { id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/wraps.jpg" },
    ],
    sizes: unico,
    badge: "promocao",
    rating: 4.9,
    reviewCount: 340,
    features: [
      "5 metros por mão",
      "Algodão com elastano",
      "Velcro de alta aderência",
    ],
    specs: [
      { label: "Comprimento", value: "5 m × 5 cm" },
      { label: "Material", value: "Algodão elástico" },
      { label: "Incluso", value: "1 par" },
    ],
    sku: "GP-WRP-5M",
    reviews: [
      {
        author: "Ana C.",
        gym: "Boxe Livre · POA",
        rating: 5,
        date: "2026-07-28",
        title: "Não afrouxa no terceiro round",
        body: "Comprei três pares. Lavo e volto. O velcro ainda pega depois de meses — isso que diferencia das de R$ 20.",
      },
    ],
  },
  {
    slug: "manoplas-foco",
    name: "Manoplas de Foco",
    subtitle: "Par · pads de precisão",
    description:
      "Alvo firme, curva que abraça o soco, alça de pulso para o coach. A manopla GINGPAI é o que o corner segura quando o treino precisa de precisão, não de volume cego.",
    price: 189,
    collections: ["treino", "boxe", "muay-thai"],
    image: "/images/mitts.jpg",
    gallery: ["/images/mitts.jpg", "/images/lifestyle-wraps.jpg"],
    colors: [{ id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/mitts.jpg" }],
    sizes: unico,
    rating: 4.7,
    reviewCount: 58,
    features: [
      "Alvo com curva anatômica",
      "Alça de pulso para o coach",
      "Espuma que não 'mata' o soco",
    ],
    specs: [
      { label: "Incluso", value: "1 par" },
      { label: "Uso", value: "Pads de boxe e Muay Thai" },
    ],
    sku: "GP-MIT-FOC",
    reviews: [
      {
        author: "Coach Henrique",
        gym: "Corner 9 · Salvador",
        rating: 5,
        date: "2026-05-02",
        title: "Meu par de treino diário",
        body: "Seguro essas pads 4 horas por dia. Punho não dói, alvo ainda visível. Já rasguei outras em dois meses.",
      },
    ],
  },
  {
    slug: "kit-iniciante-boxe",
    name: "Kit Iniciante Boxe",
    subtitle: "Luvas 12 oz + bandagens 5 m",
    description:
      "O primeiro equipamento certo. Luvas Pro Series 12 oz e bandagens 5 m — o combo que a gente mandaria para quem entra na academia amanhã.",
    price: 319,
    compareAt: 338,
    collections: ["boxe", "treino"],
    image: "/images/gloves-black.jpg",
    gallery: [
      "/images/gloves-black.jpg",
      "/images/wraps.jpg",
      "/images/lifestyle-wraps.jpg",
    ],
    colors: [
      { id: "preto", name: "Preto", hex: "#1a1a1a", image: "/images/gloves-black.jpg" },
      { id: "vermelho", name: "Carmesim", hex: "#9b1c2e", image: "/images/gloves-red.jpg" },
    ],
    sizes: [{ id: "12oz", label: "12 oz", hint: "Kit padrão" }],
    badge: "promocao",
    rating: 4.8,
    reviewCount: 203,
    features: [
      "Luvas Pro Series 12 oz",
      "Bandagens elásticas 5 m",
      "Economia frente à compra separada",
    ],
    specs: [
      { label: "Incluso", value: "Luvas + 1 par de bandagens" },
      { label: "Nível", value: "Iniciante ao intermediário" },
    ],
    sku: "GP-KIT-INIC",
    reviews: reviewsGloves.slice(0, 1),
  },
  {
    slug: "luvas-pro-brancas",
    name: "Luvas Pro Osso",
    subtitle: "Edição clara · 10–16 oz",
    description:
      "A mesma Pro Series em couro osso com punho preto. Suja mais — e por isso mesmo mostra quem treina. A luva de quem não esconde o giz da academia.",
    price: 299,
    collections: ["boxe"],
    image: "/images/gloves-white.jpg",
    gallery: ["/images/gloves-white.jpg", "/images/hero-ring.jpg"],
    colors: [
      { id: "branco", name: "Osso", hex: "#e8e2d4", image: "/images/gloves-white.jpg" },
    ],
    sizes: ozSizes,
    badge: "novo",
    rating: 4.6,
    reviewCount: 41,
    features: [
      "Mesma construção da Pro Series",
      "Acabamento osso + punho preto",
      "Fácil de limpar com pano úmido",
    ],
    specs: [
      { label: "Material", value: "PU + EVA" },
      { label: "Uso", value: "Treino e sparring" },
    ],
    sku: "GP-BOX-BONE",
    reviews: [reviewsGloves[1]],
  },
];

export const featuredSlugs = [
  "luvas-boxe-pro",
  "caneleiras-muay-thai",
  "luvas-mma-strike",
  "kit-iniciante-boxe",
  "protetor-cabeca",
  "manoplas-foco",
  "bandagens-elasticas",
  "luvas-sparring-elite",
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsIn(collectionSlug: string) {
  return products.filter((p) => p.collections.includes(collectionSlug));
}

export function relatedTo(slug: string, n = 4) {
  const p = getProduct(slug);
  if (!p) return products.slice(0, n);
  const set = new Set(p.collections);
  return products
    .filter((x) => x.slug !== slug && x.collections.some((c) => set.has(c)))
    .slice(0, n);
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products.filter((p) =>
    [p.name, p.subtitle, p.description, p.collections.join(" "), p.sku]
      .join(" ")
      .toLowerCase()
      .includes(s),
  );
}

export const FREE_SHIPPING_FROM = 299;
export const PIX_DISCOUNT = 0.05;
