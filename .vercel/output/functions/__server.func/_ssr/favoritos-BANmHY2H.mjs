import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, d as useWishlist, h as getProduct } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-BANmHY2H.js
var import_jsx_runtime = require_jsx_runtime();
function WishPage() {
	const list = useWishlist((s) => s.slugs).map(getProduct).filter((p) => p != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl tracking-[0.06em]",
			children: "Favoritos"
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nada salvo ainda."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 rounded-sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					children: "Ver a loja"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
		})]
	});
}
//#endregion
export { WishPage as component };
