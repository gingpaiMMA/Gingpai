import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as pixPrice, h as getProduct, l as useCart, o as formatBRL } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carrinho-D_MHxTCF.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const lines = useCart((s) => s.lines);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const detailed = lines.map((l) => {
		const product = getProduct(l.slug);
		if (!product) return null;
		const color = product.colors.find((c) => c.id === l.colorId) ?? product.colors[0];
		const size = product.sizes.find((s) => s.id === l.sizeId) ?? product.sizes[0];
		return {
			...l,
			product,
			color,
			size
		};
	}).filter((x) => x !== null);
	const subtotal = detailed.reduce((n, l) => n + l.product.price * l.qty, 0);
	const shipping = subtotal >= 299 || subtotal === 0 ? 0 : 24.9;
	const total = subtotal + shipping;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl tracking-[0.06em]",
			children: "Carrinho"
		}), detailed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nada aqui ainda."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 rounded-sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					children: "Ir para a loja"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-10 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-6 lg:col-span-7",
				children: detailed.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4 border-b border-border pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/produto/$slug",
						params: { slug: l.product.slug },
						className: "size-28 shrink-0 overflow-hidden bg-elevated sm:size-32",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: l.color.image,
							alt: "",
							className: "size-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: l.product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									l.color.name,
									" · ",
									l.size.label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tab-nums mt-2 text-sm",
								children: formatBRL(l.product.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-10 items-center border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-10",
											onClick: () => setQty(l.id, l.qty - 1),
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tab-nums w-6 text-center text-sm",
											children: l.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-10",
											onClick: () => setQty(l.id, l.qty + 1),
											children: "+"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-subtle underline-offset-2 hover:text-fg hover:underline",
									onClick: () => remove(l.id),
									children: "Remover"
								})]
							})
						]
					})]
				}, l.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit border border-border bg-surface p-6 lg:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-[0.1em]",
						children: "Resumo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tab-nums",
									children: formatBRL(subtotal)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Frete"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tab-nums",
									children: shipping === 0 ? "Grátis" : formatBRL(shipping)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t border-border pt-3 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tab-nums",
									children: formatBRL(total)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-subtle",
						children: [formatBRL(pixPrice(total)), " no PIX"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 rounded-sm",
						width: "full",
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							children: "Finalizar compra"
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { CartPage as component };
