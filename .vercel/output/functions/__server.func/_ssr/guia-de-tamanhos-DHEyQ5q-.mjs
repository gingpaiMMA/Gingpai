import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guia-de-tamanhos-DHEyQ5q-.js
var import_jsx_runtime = require_jsx_runtime();
function SizeGuide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-14 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-subtle uppercase",
				children: "Antes de pedir"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-5xl tracking-[0.06em]",
				children: "Guia de tamanhos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "Oz de luva não é número da mão — é peso do atleta e tipo de treino. Caneleira segue altura. Se ficar na dúvida, manda o peso e a modalidade no contato."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl tracking-[0.08em]",
				children: "Luvas de boxe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-4 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs tracking-wide text-subtle uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 font-medium",
							children: "Oz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 font-medium",
							children: "Peso do atleta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 font-medium",
							children: "Uso"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "text-muted",
					children: [
						[
							"10 oz",
							"Até 60 kg",
							"Saco e pads"
						],
						[
							"12 oz",
							"60–75 kg",
							"Treino geral"
						],
						[
							"14 oz",
							"75–90 kg",
							"Sparring"
						],
						[
							"16 oz",
							"90 kg+",
							"Sparring pesado"
						]
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border",
						children: r.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: c
						}, c))
					}, r[0]))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-12 text-3xl tracking-[0.08em]",
				children: "Caneleiras"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-4 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs tracking-wide text-subtle uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 font-medium",
						children: "Tam."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 font-medium",
						children: "Altura"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "text-muted",
					children: [
						["P", "Até 1,65 m"],
						["M", "1,65–1,80 m"],
						["G", "1,80 m+"]
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border",
						children: r.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: c
						}, c))
					}, r[0]))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Bandagens: tamanho único, 5 metros. Manoplas: tamanho único."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8 rounded-sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					children: "Escolher equipamento"
				})
			})
		]
	});
}
//#endregion
export { SizeGuide as component };
