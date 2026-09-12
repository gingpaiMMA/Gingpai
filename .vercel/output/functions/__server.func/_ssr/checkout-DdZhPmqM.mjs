import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, b as cn, c as pixPrice, h as getProduct, l as useCart, o as formatBRL } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DdZhPmqM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const lines = useCart((s) => s.lines);
	const clear = useCart((s) => s.clear);
	const [pay, setPay] = (0, import_react.useState)("pix");
	const [cep, setCep] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const detailed = lines.map((l) => {
		const product = getProduct(l.slug);
		if (!product) return null;
		return {
			...l,
			product
		};
	}).filter((x) => x !== null);
	const subtotal = detailed.reduce((n, l) => n + l.product.price * l.qty, 0);
	const raw = subtotal + (subtotal >= 299 || subtotal === 0 ? 0 : 24.9);
	const total = pay === "pix" ? pixPrice(raw) : raw;
	const eta = (0, import_react.useMemo)(() => {
		const d = cep.replace(/\D/g, "");
		if (d.length < 8) return null;
		const n = Number(d.slice(0, 2));
		return `${n <= 19 ? "3–5" : n <= 39 ? "4–7" : "6–10"} dias úteis`;
	}, [cep]);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-accent uppercase",
				children: "Pedido confirmado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl tracking-[0.06em]",
				children: "Sino tocou."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "Pedido de demonstração — nenhum pagamento foi cobrado. Seu corner fictício já está separado no estoque."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8 rounded-sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Voltar ao início"
				})
			})
		]
	});
	if (detailed.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-[0.08em]",
			children: "Carrinho vazio"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-8 rounded-sm",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/loja",
				children: "Ir para a loja"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-12 md:px-6 md:py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "md:col-span-7",
			onSubmit: (e) => {
				e.preventDefault();
				clear();
				setDone(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl tracking-[0.06em]",
					children: "Checkout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Loja demonstração — nenhum cartão é cobrado."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "mt-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs tracking-[0.18em] text-subtle uppercase",
							children: "Contato"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome",
							name: "name",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail",
							name: "email",
							type: "email",
							required: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "mt-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-xs tracking-[0.18em] text-subtle uppercase",
							children: "Entrega"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CEP",
							name: "cep",
							required: true,
							value: cep,
							onChange: (v) => setCep(v.replace(/\D/g, "").slice(0, 8)),
							placeholder: "00000-000"
						}),
						eta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["Prazo estimado: ", eta]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Endereço",
							name: "address",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Número",
								name: "n",
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Complemento",
								name: "comp"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Cidade",
								name: "city",
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "UF",
								name: "uf",
								required: true
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-xs tracking-[0.18em] text-subtle uppercase",
						children: "Pagamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayChip, {
							active: pay === "pix",
							onClick: () => setPay("pix"),
							label: "PIX · 5% off"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayChip, {
							active: pay === "card",
							onClick: () => setPay("card"),
							label: "Cartão · 12×"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-8 rounded-sm",
					width: "full",
					size: "lg",
					type: "submit",
					children: ["Confirmar pedido · ", formatBRL(total)]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit border border-border bg-surface p-6 md:col-span-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-[0.1em]",
					children: "Pedido"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: detailed.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								l.product.name,
								" × ",
								l.qty
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-nums",
							children: formatBRL(l.product.price * l.qty)
						})]
					}, l.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-between border-t border-border pt-4 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tab-nums",
						children: formatBRL(total)
					})]
				})
			]
		})]
	});
}
function Field({ label, name, type = "text", required, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			required,
			value,
			placeholder,
			onChange: onChange ? (e) => onChange(e.target.value) : void 0,
			className: "h-11 w-full border border-border bg-bg px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-fg/40"
		})]
	});
}
function PayChip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-12 text-sm", active ? "bg-fg text-bg" : "border border-border text-muted"),
		children: label
	});
}
//#endregion
export { CheckoutPage as component };
