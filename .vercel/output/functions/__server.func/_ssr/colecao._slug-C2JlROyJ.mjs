import { B as notFound, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as productsIn, l as useCart, m as getCollection, r as Route$1, u as useUi } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/colecao._slug-C2JlROyJ.js
var import_jsx_runtime = require_jsx_runtime();
function CollectionPage() {
	const { slug } = Route$1.useParams();
	const col = getCollection(slug);
	if (!col) throw notFound();
	const list = productsIn(slug);
	const add = useCart((s) => s.add);
	const setCart = useUi((s) => s.setCartOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate h-[42vh] min-h-64 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: col.image,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.22em] text-bone/70 uppercase",
						children: "Coleção"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-2 text-5xl tracking-[0.06em] md:text-7xl",
						children: col.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm text-bone/80",
						children: col.description
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				list.length,
				" ",
				list.length === 1 ? "peça" : "peças"
			]
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "py-20 text-center text-sm text-muted",
			children: [
				"Nada nesta coleção ainda.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					className: "text-fg underline",
					children: "Ver a loja"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
		})]
	})] });
}
//#endregion
export { CollectionPage as component };
