import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, f as collections, h as getProduct, l as useCart, p as featuredSlugs, u as useUi } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ek9EBRXU.js
var import_jsx_runtime = require_jsx_runtime();
var marquee = [
	"BOXE",
	"MMA",
	"MUAY THAI",
	"KICKBOXING",
	"SANDA",
	"SPARRING",
	"SACO",
	"PADS"
];
function Home() {
	const add = useCart((s) => s.add);
	const setCart = useUi((s) => s.setCartOpen);
	const featured = featuredSlugs.map((s) => getProduct(s)).filter((p) => p != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate min-h-[88vh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero-ring.jpg",
					alt: "Ringue de boxe vazio sob holofotes",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain absolute inset-0 bg-[linear-gradient(to_top,rgb(9_9_8)_0%,rgb(9_9_8/0.55)_42%,rgb(9_9_8/0.25)_100%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-bone/80 uppercase",
							children: "Gingpai Boxing · cinco estrelas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display mt-4 max-w-3xl text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.88] tracking-[0.04em] text-fg",
							children: [
								"No ringue",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"não tem atalho."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-sm leading-relaxed text-bone/85 md:text-base",
							children: "Equipamento de combate para boxe, MMA e Muay Thai. Luvas, caneleiras e proteção que aguentam o round extra."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "rounded-sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/loja",
									children: ["Comprar agora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "rounded-sm border-fg/40 text-fg",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/guia-de-tamanhos",
									children: "Guia de tamanhos"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "marquee-track flex w-max gap-10 py-3.5",
				children: [...marquee, ...marquee].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-2xl tracking-[0.18em] text-muted",
					children: [
						t,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "·"
						})
					]
				}, `${t}-${i}`))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
					children: "Disciplinas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl",
					children: "Treina o quê?"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					className: "hidden text-sm text-muted hover:text-fg md:inline",
					children: "Ver tudo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
				children: collections.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/colecao/$slug",
					params: { slug: c.slug },
					className: "group relative aspect-[3/4] overflow-hidden bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: c.name,
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl tracking-[0.08em]",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: c.tagline
							})]
						})
					]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-8 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
					children: "Catálogo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl",
					children: "O corner da semana"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					className: "text-sm text-muted hover:text-fg",
					children: "Ver todos"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					onQuickAdd: (prod) => {
						add({
							slug: prod.slug,
							colorId: prod.colors[0].id,
							sizeId: prod.sizes[0].id
						});
						toast("Adicionado ao carrinho", { description: prod.name });
						setCart(true);
					}
				}, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative min-h-[52vh] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/lifestyle-wraps.jpg",
					alt: "Atleta enrolando bandagens",
					className: "absolute inset-0 size-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center bg-surface px-6 py-16 md:px-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
						children: "A marca"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-4xl tracking-[0.06em] md:text-5xl",
						children: "Feito para quem sobe."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-sm leading-relaxed text-muted",
						children: "GINGPAI nasceu no chão de fábrica de Qingzhou e chegou nas academias brasileiras por quem já rasgou luva barata no gancho curto. Couro PU de grão fechado, espuma que não achata no terceiro round, velcro que ainda pega depois de um ano de suor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-8 w-fit rounded-sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sobre",
							children: "A história"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-20 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Prova de ringue"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					{
						q: "Terceiro par da GINGPAI. Costura firme, punho não abre no gancho. Uso 14 oz no sparring — ainda novas depois de quatro meses.",
						a: "Rafael M.",
						g: "Nação do Boxe · SP"
					},
					{
						q: "Já queimei duas marcas baratas que rodavam no chute. Essas caneleiras ficam no lugar. Peito do pé realmente protegido.",
						a: "Leticia A.",
						g: "Thai Brasil · PR"
					},
					{
						q: "Seguro essas pads 4 horas por dia. Punho não dói, alvo ainda visível. Já rasguei outras em dois meses.",
						a: "Coach Henrique",
						g: "Corner 9 · Salvador"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "border border-border bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-fg",
						children: [
							"“",
							t.q,
							"”"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-5 text-xs text-muted",
						children: [t.a, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-subtle",
							children: t.g
						})]
					})]
				}, t.a))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6",
				children: [
					["Frete grátis", "Acima de R$ 299 para todo o Brasil"],
					["12× sem juros", "Ou 5% off no PIX na hora"],
					["Troca em 30 dias", "Tamanho errado? A gente resolve"],
					["Guia de oz", "Escolhe a luva certa pelo seu peso"]
				].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: d
				})] }, t))
			})
		})
	] });
}
//#endregion
export { Home as component };
