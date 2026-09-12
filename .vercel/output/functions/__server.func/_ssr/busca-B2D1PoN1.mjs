import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$9, l as useCart, u as useUi, y as searchProducts } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/busca-B2D1PoN1.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q = "" } = Route$9.useSearch();
	const list = searchProducts(q);
	const add = useCart((s) => s.add);
	const setCart = useUi((s) => s.setCartOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Busca"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-[0.06em]",
				children: q ? `“${q}”` : "Buscar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					list.length,
					" ",
					list.length === 1 ? "resultado" : "resultados"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5",
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
			})
		]
	});
}
//#endregion
export { SearchPage as component };
