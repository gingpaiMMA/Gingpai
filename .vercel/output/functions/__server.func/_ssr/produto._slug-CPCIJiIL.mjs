import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { B as notFound, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Star, s as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, b as cn, c as pixPrice, d as useWishlist, h as getProduct, l as useCart, n as Route, o as formatBRL, s as installmentOf, u as useUi, v as relatedTo } from "./router-BF5qa9tl.mjs";
import { t as ProductCard } from "./product-card-CqM12eAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produto._slug-CPCIJiIL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const product = getProduct(slug);
	if (!product) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductView, {}, product.slug);
}
function ProductView() {
	const { slug } = Route.useParams();
	const product = getProduct(slug);
	if (!product) throw notFound();
	const [colorId, setColorId] = (0, import_react.useState)(product.colors[0].id);
	const [sizeId, setSizeId] = (0, import_react.useState)(product.sizes[0].id);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [photo, setPhoto] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)("desc");
	(0, import_react.useEffect)(() => {
		setColorId(product.colors[0].id);
		setSizeId(product.sizes[0].id);
		setQty(1);
		setPhoto(0);
	}, [product]);
	const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
	const images = (0, import_react.useMemo)(() => {
		const rest = product.gallery.filter((g) => g !== color.image);
		return [color.image, ...rest];
	}, [product, color]);
	const add = useCart((s) => s.add);
	const setCart = useUi((s) => s.setCartOpen);
	const wished = useWishlist((s) => s.slugs.includes(product.slug));
	const toggleWish = useWishlist((s) => s.toggle);
	const related = relatedTo(product.slug);
	const addToCart = () => {
		add({
			slug: product.slug,
			colorId,
			sizeId,
			qty
		});
		toast("Adicionado ao carrinho", { description: `${product.name} · ${color.name}` });
		setCart(true);
	};
	const sizeHint = product.sizes.find((s) => s.id === sizeId)?.hint;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-6 md:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square overflow-hidden bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images[photo],
					alt: product.name,
					className: "size-full object-cover"
				})
			}), images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-4 gap-2",
				children: images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPhoto(i),
					className: cn("aspect-square overflow-hidden bg-elevated", photo === i ? "ring-1 ring-fg" : "opacity-70 hover:opacity-100"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "size-full object-cover"
					})
				}, src + i))
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
					children: product.subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-4xl tracking-[0.06em] md:text-5xl",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-bone text-bone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-nums",
							children: product.rating.toFixed(1)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-subtle",
						children: [
							"(",
							product.reviewCount,
							" avaliações)"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tab-nums text-2xl font-semibold",
						children: formatBRL(product.price)
					}), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tab-nums text-sm text-subtle line-through",
						children: formatBRL(product.compareAt)
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"12× de ",
						installmentOf(product.price),
						" sem juros · ",
						formatBRL(pixPrice(product.price)),
						" no PIX"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-wide",
						children: ["Cor ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: ["· ", color.name]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2",
						children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": c.name,
							onClick: () => {
								setColorId(c.id);
								setPhoto(0);
							},
							className: cn("size-9 rounded-full border", colorId === c.id ? "border-fg ring-2 ring-fg/30" : "border-border"),
							style: { background: c.hex }
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide",
								children: "Tamanho"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/guia-de-tamanhos",
								className: "text-xs text-muted underline-offset-2 hover:text-fg hover:underline",
								children: "Guia"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSizeId(s.id),
								className: cn("h-11 min-w-14 px-3 text-sm", sizeId === s.id ? "bg-fg text-bg" : "border border-border text-fg hover:border-fg/40"),
								children: s.label
							}, s.id))
						}),
						sizeHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-subtle",
							children: sizeHint
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-12 items-center border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-12 text-lg",
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tab-nums w-6 text-center",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-12 text-lg",
									onClick: () => setQty((q) => q + 1),
									children: "+"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1 rounded-sm",
							size: "lg",
							onClick: addToCart,
							children: "Adicionar ao carrinho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Favoritar",
							onClick: () => toggleWish(product.slug),
							className: "flex size-12 items-center justify-center border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", wished && "fill-accent text-accent") })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-subtle",
					children: [
						"SKU ",
						product.sku,
						" · Envio em 1–2 dias úteis"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 divide-y divide-border border-y border-border",
					children: [
						{
							id: "desc",
							t: "Descrição",
							body: product.description
						},
						{
							id: "feat",
							t: "Detalhes",
							body: product.features.join(" · ")
						},
						{
							id: "spec",
							t: "Especificações",
							body: product.specs.map((s) => `${s.label}: ${s.value}`).join(" · ")
						}
					].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex h-14 w-full items-center justify-between text-left text-sm font-medium",
						onClick: () => setOpen(open === row.id ? "" : row.id),
						children: [row.t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: open === row.id ? "−" : "+"
						})]
					}), open === row.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pb-4 text-sm leading-relaxed text-muted",
						children: row.body
					}) : null] }, row.id))
				})
			] })]
		}),
		product.reviews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-14 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-[0.08em]",
					children: "Do chão da academia"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: product.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "border border-border bg-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle",
								children: [
									r.rating,
									"/5 · ",
									r.gym
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium",
								children: r.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: r.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
								className: "mt-3 text-xs text-subtle",
								children: r.author
							})
						]
					}, r.author + r.date))
				})]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-[0.08em]",
				children: "Quem leva isso também leva"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5",
				children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky bottom-0 z-20 border-t border-border bg-bg/95 p-3 backdrop-blur md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				width: "full",
				className: "rounded-sm",
				onClick: addToCart,
				children: ["Adicionar · ", formatBRL(product.price)]
			})
		})
	] });
}
//#endregion
export { ProductPage as component };
