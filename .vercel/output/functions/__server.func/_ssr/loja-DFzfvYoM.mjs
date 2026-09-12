import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as cn, f as collections, g as products, l as useCart, u as useUi } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loja-DFzfvYoM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LojaPage() {
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [col, setCol] = (0, import_react.useState)("all");
	const add = useCart((s) => s.add);
	const setCart = useUi((s) => s.setCartOpen);
	const list = (0, import_react.useMemo)(() => {
		let next = col === "all" ? [...products] : products.filter((p) => p.collections.includes(col));
		if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
		if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
		if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
		return next;
	}, [sort, col]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-5xl tracking-[0.06em] md:text-6xl",
				children: "Tudo GINGPAI"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted",
				children: "Luvas, caneleiras, proteção e treino. Filtra por disciplina e ordena como quiser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: col === "all",
					onClick: () => setCol("all"),
					children: "Tudo"
				}), collections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: col === c.slug,
					onClick: () => setCol(c.slug),
					children: c.name
				}, c.slug))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-between gap-3 border-y border-border py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						list.length,
						" ",
						list.length === 1 ? "peça" : "peças"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-xs text-muted",
					children: ["Ordenar", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "h-10 border border-border bg-surface px-2 text-xs text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "featured",
								children: "Destaques"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-asc",
								children: "Menor preço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-desc",
								children: "Maior preço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "rating",
								children: "Melhor avaliado"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-12 text-center text-xs text-subtle",
				children: [
					"Não achou o tamanho?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/guia-de-tamanhos",
						className: "text-fg underline-offset-2 hover:underline",
						children: "Abre o guia"
					}),
					"."
				]
			})
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 px-3.5 text-xs tracking-wide", active ? "bg-fg text-bg" : "border border-border text-muted hover:text-fg"),
		children
	});
}
//#endregion
export { LojaPage as component };
