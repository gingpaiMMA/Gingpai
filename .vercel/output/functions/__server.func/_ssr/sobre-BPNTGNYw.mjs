import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-BF5qa9tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sobre-BPNTGNYw.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate h-[50vh] min-h-72 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero-ring.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] text-bone/70 uppercase",
					children: "A marca"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-5xl tracking-[0.06em] md:text-7xl",
					children: "GINGPAI"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-16 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed text-fg",
				children: "GINGPAI Boxing é equipamento de combate — luvas, caneleiras, proteção — feito para treino de verdade, não para vitrine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm leading-relaxed text-muted",
				children: "A marca nasceu em Qingzhou, na China, como Jingpai Sport Goods. O nome que o ringue conhece é GINGPAI: cinco estrelas no punho, couro PU de grão fechado, espuma que não achata no terceiro round. Chegou nas academias brasileiras por quem já rasgou luva barata no gancho curto e não quer repetir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm leading-relaxed text-muted",
				children: "Esta loja é a vitrine oficial GINGPAI no Brasil. Boxe, MMA, Muay Thai, kickboxing e sanda. Mesmo padrão de fábrica, atendimento em português, PIX, parcelamento e troca em 30 dias."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-3 gap-4 border-y border-border py-8 text-center",
				children: [
					["2014", "Primeiro par fora da China"],
					["5★", "Marca registrada GINGPAI BOXING"],
					["30d", "Para trocar se o oz não serviu"]
				].map(([n, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl tracking-wide",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted",
					children: d
				})] }, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-10 rounded-sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loja",
					children: "Ver o catálogo"
				})
			})
		]
	})] });
}
//#endregion
export { AboutPage as component };
