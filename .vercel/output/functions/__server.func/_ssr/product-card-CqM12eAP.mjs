import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Heart } from "../_libs/lucide-react.mjs";
import { a as Button, b as cn, d as useWishlist, o as formatBRL, s as installmentOf, u as useUi } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-CqM12eAP.js
var import_jsx_runtime = require_jsx_runtime();
var badgeLabel = {
	novo: "Novo",
	"mais-vendido": "Mais vendido",
	promocao: "Oferta"
};
function ProductCard({ product, onQuickAdd }) {
	const wish = useWishlist((s) => s.slugs.includes(product.slug));
	const toggle = useWishlist((s) => s.toggle);
	const setCartOpen = useUi((s) => s.setCartOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/produto/$slug",
				params: { slug: product.slug },
				className: "relative block aspect-[4/5] overflow-hidden bg-elevated",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
				}), product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 left-3 bg-bg/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-fg uppercase backdrop-blur-sm",
					children: badgeLabel[product.badge]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": wish ? "Remover dos favoritos" : "Salvar nos favoritos",
				onClick: () => toggle(product.slug),
				className: "absolute top-2.5 right-2.5 z-10 flex size-11 items-center justify-center text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
					className: cn("size-4", wish && "fill-accent text-accent"),
					strokeWidth: 1.6
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-1 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/produto/$slug",
						params: { slug: product.slug },
						className: "text-sm font-medium tracking-tight text-fg hover:text-bone",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: product.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-nums text-sm font-semibold",
							children: formatBRL(product.price)
						}), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-nums text-xs text-subtle line-through",
							children: formatBRL(product.compareAt)
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-subtle",
						children: [
							"ou 12× de ",
							installmentOf(product.price),
							" sem juros"
						]
					}),
					onQuickAdd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-3 rounded-sm opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100",
						onClick: () => {
							onQuickAdd(product);
							setCartOpen(true);
						},
						children: "Adicionar"
					}) : null
				]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
