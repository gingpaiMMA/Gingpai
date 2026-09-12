import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contato-5RqZ7l7M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Fala com a gente"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-5xl tracking-[0.06em]",
				children: "Contato"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
				children: "Tamanho, oz, prazo, pedido corporativo para academia. Resposta em horário comercial, horário de Brasília."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 space-y-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "E-mail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "contato@gingpai.com.br" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "(11) 90000-0000" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-subtle",
						children: "Atendimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Seg–sex, 9h–18h" })] })
				]
			})
		] }), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "self-center text-sm text-muted",
			children: "Mensagem enviada — nesta loja demo ela não vai a lugar nenhum, mas o formulário funciona."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				setSent(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs text-muted",
						children: "Nome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						className: "h-11 w-full border border-border bg-surface px-3 text-sm outline-none focus:border-fg/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs text-muted",
						children: "E-mail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						required: true,
						className: "h-11 w-full border border-border bg-surface px-3 text-sm outline-none focus:border-fg/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs text-muted",
						children: "Mensagem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 5,
						className: "w-full border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-fg/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "rounded-sm",
					type: "submit",
					children: "Enviar"
				})
			]
		})]
	});
}
//#endregion
export { ContactPage as component };
