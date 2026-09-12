import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as HeadContent, g as createFileRoute, h as lazyRouteComponent, m as Outlet, p as createRouter, u as Scripts, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search, i as ShoppingBag, n as TriangleAlert, o as Menu, s as Heart, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BF5qa9tl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo({ className, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex flex-col leading-none text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[1.55em] tracking-[0.14em]",
			children: "GINGPAI"
		}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-0.5 flex items-center gap-1.5 text-[0.52em] font-medium tracking-[0.42em] text-muted",
			children: ["BOXING", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex gap-[3px]",
				"aria-hidden": true,
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-accent" }, i))
			})]
		}) : null]
	});
}
var collections = [
	{
		slug: "boxe",
		name: "Boxe",
		tagline: "Luvas, bandagens e o round extra",
		description: "Equipamento de boxe para saco, focus e sparring. Espuma de alta densidade e couro PU que aguenta academia pesada.",
		image: "/images/gloves-black.jpg"
	},
	{
		slug: "mma",
		name: "MMA",
		tagline: "Grappling e striking no mesmo round",
		description: "Luvas abertas, caneleiras e proteção para treino misto. Mobilidade de grappling, impacto de striking.",
		image: "/images/mma-gloves.jpg"
	},
	{
		slug: "muay-thai",
		name: "Muay Thai",
		tagline: "Canela, clinch e oito armas",
		description: "Caneleiras com proteção de peito do pé, manoplas e luvas pensadas para clinch e low kick.",
		image: "/images/shin-guards.jpg"
	},
	{
		slug: "protecao",
		name: "Proteção",
		tagline: "Cabeça, canela, punho — intactos",
		description: "Protetores de cabeça, caneleiras e bandagens. O treino continua amanhã quando o equipamento faz o trabalho dele.",
		image: "/images/head-guard.jpg"
	},
	{
		slug: "treino",
		name: "Treino",
		tagline: "Alvos, pads e o que o coach pede",
		description: "Manoplas de foco, aparadores e kits para quem monta o canto da academia em casa.",
		image: "/images/mitts.jpg"
	}
];
var ozSizes = [
	{
		id: "10oz",
		label: "10 oz",
		hint: "Até 60 kg · saco e pads"
	},
	{
		id: "12oz",
		label: "12 oz",
		hint: "60–75 kg · treino geral"
	},
	{
		id: "14oz",
		label: "14 oz",
		hint: "75–90 kg · sparring"
	},
	{
		id: "16oz",
		label: "16 oz",
		hint: "90 kg+ · sparring pesado"
	}
];
var sml = [
	{
		id: "s",
		label: "P",
		hint: "Até 1,65 m"
	},
	{
		id: "m",
		label: "M",
		hint: "1,65–1,80 m"
	},
	{
		id: "l",
		label: "G",
		hint: "1,80 m+"
	}
];
var unico = [{
	id: "unico",
	label: "Único"
}];
var reviewsGloves = [
	{
		author: "Rafael M.",
		gym: "Nação do Boxe · SP",
		rating: 5,
		date: "2026-07-12",
		title: "Aguenta saco 6 dias por semana",
		body: "Terceiro par da GINGPAI. Costura firme, punho não abre no gancho. Uso 14 oz no sparring e 12 oz no saco — os dois ainda novos depois de quatro meses."
	},
	{
		author: "Camila T.",
		gym: "Fight House · RJ",
		rating: 5,
		date: "2026-06-03",
		title: "Melhor custo-benefício que já usei",
		body: "Troquei de uma marca cara e não senti diferença de proteção. Velcro segura, palma transpirando menos do que eu esperava."
	},
	{
		author: "Diego S.",
		gym: "Academia Central · BH",
		rating: 4,
		date: "2026-05-18",
		title: "Ótima no saco, um pouco rígida no começo",
		body: "Amaciou depois de duas semanas. Cheiro de PU sai rápido. Recomendo 16 oz se você é pesado no sparring."
	}
];
var products = [
	{
		slug: "luvas-boxe-pro",
		name: "Luvas de Boxe Pro Series",
		subtitle: "Sparring e saco · 10–16 oz",
		description: "A luva que a GINGPAI mandou para o Brasil. Couro PU de grão fechado, três camadas de espuma EVA e punho largo com velcro industrial. Feita para saco, pads e sparring — sem desmontar no gancho curto.",
		price: 289,
		compareAt: 349,
		collections: ["boxe", "treino"],
		image: "/images/gloves-black.jpg",
		gallery: [
			"/images/gloves-black.jpg",
			"/images/lifestyle-wraps.jpg",
			"/images/gloves-red.jpg"
		],
		colors: [
			{
				id: "preto",
				name: "Preto matte",
				hex: "#1a1a1a",
				image: "/images/gloves-black.jpg"
			},
			{
				id: "vermelho",
				name: "Carmesim",
				hex: "#9b1c2e",
				image: "/images/gloves-red.jpg"
			},
			{
				id: "branco",
				name: "Osso",
				hex: "#e8e2d4",
				image: "/images/gloves-white.jpg"
			}
		],
		sizes: ozSizes,
		badge: "mais-vendido",
		rating: 4.8,
		reviewCount: 214,
		features: [
			"Três camadas de EVA de alta densidade",
			"Punho 10 cm com velcro industrial",
			"Palma em malha para ventilação",
			"Indicada para saco, pads e sparring"
		],
		specs: [
			{
				label: "Material",
				value: "Couro PU + EVA"
			},
			{
				label: "Fecho",
				value: "Velcro"
			},
			{
				label: "Uso",
				value: "Treino e sparring"
			},
			{
				label: "Origem",
				value: "GINGPAI Boxing"
			}
		],
		sku: "GP-BOX-PRO",
		reviews: reviewsGloves
	},
	{
		slug: "luvas-sparring-elite",
		name: "Luvas Sparring Elite",
		subtitle: "Mais volume no punho · 12–16 oz",
		description: "Perfil mais cheio na cabeça do soco e punho extra para quem sparra pesado. A Elite é a luva que o corner pede quando o round vai além do técnico.",
		price: 349,
		collections: ["boxe"],
		image: "/images/gloves-red.jpg",
		gallery: [
			"/images/gloves-red.jpg",
			"/images/gloves-black.jpg",
			"/images/hero-ring.jpg"
		],
		colors: [{
			id: "vermelho",
			name: "Carmesim",
			hex: "#9b1c2e",
			image: "/images/gloves-red.jpg"
		}, {
			id: "preto",
			name: "Preto matte",
			hex: "#1a1a1a",
			image: "/images/gloves-black.jpg"
		}],
		sizes: ozSizes.filter((s) => s.id !== "10oz"),
		badge: "novo",
		rating: 4.9,
		reviewCount: 86,
		features: [
			"Cabeça do soco mais volumosa",
			"Punho reforçado para ganchos",
			"Forro que seca rápido entre rounds"
		],
		specs: [
			{
				label: "Material",
				value: "PU premium + látex"
			},
			{
				label: "Fecho",
				value: "Velcro extra-largo"
			},
			{
				label: "Uso",
				value: "Sparring"
			}
		],
		sku: "GP-BOX-ELT",
		reviews: reviewsGloves.slice(0, 2)
	},
	{
		slug: "luvas-treino-saco",
		name: "Luvas de Saco Compact",
		subtitle: "Leves para volume · 10–12 oz",
		description: "Perfil mais baixo, mais velocidade. A Compact é a luva de saco e pads — não substitui sparring, mas faz o round de volume sem pesar no ombro.",
		price: 199,
		collections: ["boxe", "treino"],
		image: "/images/gloves-white.jpg",
		gallery: ["/images/gloves-white.jpg", "/images/gloves-black.jpg"],
		colors: [{
			id: "branco",
			name: "Osso",
			hex: "#e8e2d4",
			image: "/images/gloves-white.jpg"
		}, {
			id: "preto",
			name: "Preto matte",
			hex: "#1a1a1a",
			image: "/images/gloves-black.jpg"
		}],
		sizes: [{
			id: "10oz",
			label: "10 oz",
			hint: "Saco e pads"
		}, {
			id: "12oz",
			label: "12 oz",
			hint: "Volume pesado"
		}],
		rating: 4.6,
		reviewCount: 131,
		features: [
			"Leve para rounds longos de saco",
			"Palma ventilada",
			"Costura reforçada na articulação"
		],
		specs: [{
			label: "Material",
			value: "PU + EVA"
		}, {
			label: "Uso",
			value: "Saco e pads — sem sparring"
		}],
		sku: "GP-BAG-CMP",
		reviews: [reviewsGloves[2]]
	},
	{
		slug: "luvas-mma-strike",
		name: "Luvas MMA Strike",
		subtitle: "Open finger · grappling + striking",
		description: "Dedos livres para pegar guarda, palma fechada para bater. Espuma no metacarpo, punho firme. A luva de treino misto que não atrapalha o grappling.",
		price: 219,
		collections: ["mma"],
		image: "/images/mma-gloves.jpg",
		gallery: ["/images/mma-gloves.jpg", "/images/lifestyle-wraps.jpg"],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/mma-gloves.jpg"
		}],
		sizes: [
			{
				id: "s",
				label: "P",
				hint: "Mão pequena"
			},
			{
				id: "m",
				label: "M",
				hint: "Padrão"
			},
			{
				id: "l",
				label: "G",
				hint: "Mão larga"
			}
		],
		badge: "mais-vendido",
		rating: 4.7,
		reviewCount: 97,
		features: [
			"Open finger para grappling",
			"Espuma no metacarpo",
			"Velcro que não abre na queda"
		],
		specs: [{
			label: "Material",
			value: "PU + neoprene"
		}, {
			label: "Uso",
			value: "MMA, grappling com striking"
		}],
		sku: "GP-MMA-STK",
		reviews: [{
			author: "Bruno K.",
			gym: "CT Recife",
			rating: 5,
			date: "2026-04-22",
			title: "Não atrapalha a passagem de guarda",
			body: "Usei no treino misto o mês inteiro. Dedos livres de verdade, e o punho não cede quando segura underhook."
		}]
	},
	{
		slug: "caneleiras-muay-thai",
		name: "Caneleiras Muay Thai Pro",
		subtitle: "Canela + peito do pé",
		description: "Proteção contínua da canela ao peito do pé, três tiras de velcro e forro que não escorrega com suor. Feita para low kick de verdade — não para pose de foto.",
		price: 329,
		collections: [
			"muay-thai",
			"protecao",
			"mma"
		],
		image: "/images/shin-guards.jpg",
		gallery: ["/images/shin-guards.jpg", "/images/head-guard.jpg"],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/shin-guards.jpg"
		}],
		sizes: sml,
		badge: "mais-vendido",
		rating: 4.8,
		reviewCount: 162,
		features: [
			"Proteção contínua até o peito do pé",
			"Três tiras de velcro",
			"Interior antideslizante"
		],
		specs: [{
			label: "Material",
			value: "PU + EVA denso"
		}, {
			label: "Uso",
			value: "Muay Thai, kickboxing, MMA"
		}],
		sku: "GP-SHN-PRO",
		reviews: [{
			author: "Leticia A.",
			gym: "Thai Brasil · PR",
			rating: 5,
			date: "2026-08-01",
			title: "Não gira na canela",
			body: "Já queimei duas marcas baratas que rodavam no chute. Essas ficam no lugar. Peito do pé realmente protegido."
		}]
	},
	{
		slug: "protetor-cabeca",
		name: "Protetor de Cabeça Guard",
		subtitle: "Bochecha, queixo e têmpora",
		description: "Campo de visão limpo, cobertura de bochecha e queixo, fivela na nuca. Para sparring técnico — não deixa o treino virar acidente.",
		price: 279,
		collections: [
			"protecao",
			"boxe",
			"mma"
		],
		image: "/images/head-guard.jpg",
		gallery: ["/images/head-guard.jpg", "/images/shin-guards.jpg"],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/head-guard.jpg"
		}],
		sizes: sml,
		rating: 4.5,
		reviewCount: 74,
		features: [
			"Visão periférica ampla",
			"Proteção de queixo e bochecha",
			"Ajuste na nuca"
		],
		specs: [{
			label: "Material",
			value: "PU + espuma laminada"
		}, {
			label: "Uso",
			value: "Sparring de boxe e MMA"
		}],
		sku: "GP-HDG-01",
		reviews: [{
			author: "Marcos P.",
			gym: "Team Nova · DF",
			rating: 4,
			date: "2026-03-09",
			title: "Bom campo de visão",
			body: "Não fecha tanto quanto os baratos. Ajuste na nuca é o que segura. Recomendo o M se você usa 56–58 de cabeça."
		}]
	},
	{
		slug: "bandagens-elasticas",
		name: "Bandagens Elásticas 5 m",
		subtitle: "Par · punho e knucles",
		description: "Algodão com elastano, 5 metros, velcro que realmente pega. A base de qualquer treino de impacto — se a bandagem está mal feita, a luva não salva o punho.",
		price: 49,
		collections: [
			"boxe",
			"mma",
			"treino"
		],
		image: "/images/wraps.jpg",
		gallery: ["/images/wraps.jpg", "/images/lifestyle-wraps.jpg"],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/wraps.jpg"
		}],
		sizes: unico,
		badge: "promocao",
		rating: 4.9,
		reviewCount: 340,
		features: [
			"5 metros por mão",
			"Algodão com elastano",
			"Velcro de alta aderência"
		],
		specs: [
			{
				label: "Comprimento",
				value: "5 m × 5 cm"
			},
			{
				label: "Material",
				value: "Algodão elástico"
			},
			{
				label: "Incluso",
				value: "1 par"
			}
		],
		sku: "GP-WRP-5M",
		reviews: [{
			author: "Ana C.",
			gym: "Boxe Livre · POA",
			rating: 5,
			date: "2026-07-28",
			title: "Não afrouxa no terceiro round",
			body: "Comprei três pares. Lavo e volto. O velcro ainda pega depois de meses — isso que diferencia das de R$ 20."
		}]
	},
	{
		slug: "manoplas-foco",
		name: "Manoplas de Foco",
		subtitle: "Par · pads de precisão",
		description: "Alvo firme, curva que abraça o soco, alça de pulso para o coach. A manopla GINGPAI é o que o corner segura quando o treino precisa de precisão, não de volume cego.",
		price: 189,
		collections: [
			"treino",
			"boxe",
			"muay-thai"
		],
		image: "/images/mitts.jpg",
		gallery: ["/images/mitts.jpg", "/images/lifestyle-wraps.jpg"],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/mitts.jpg"
		}],
		sizes: unico,
		rating: 4.7,
		reviewCount: 58,
		features: [
			"Alvo com curva anatômica",
			"Alça de pulso para o coach",
			"Espuma que não 'mata' o soco"
		],
		specs: [{
			label: "Incluso",
			value: "1 par"
		}, {
			label: "Uso",
			value: "Pads de boxe e Muay Thai"
		}],
		sku: "GP-MIT-FOC",
		reviews: [{
			author: "Coach Henrique",
			gym: "Corner 9 · Salvador",
			rating: 5,
			date: "2026-05-02",
			title: "Meu par de treino diário",
			body: "Seguro essas pads 4 horas por dia. Punho não dói, alvo ainda visível. Já rasguei outras em dois meses."
		}]
	},
	{
		slug: "kit-iniciante-boxe",
		name: "Kit Iniciante Boxe",
		subtitle: "Luvas 12 oz + bandagens 5 m",
		description: "O primeiro equipamento certo. Luvas Pro Series 12 oz e bandagens 5 m — o combo que a gente mandaria para quem entra na academia amanhã.",
		price: 319,
		compareAt: 338,
		collections: ["boxe", "treino"],
		image: "/images/gloves-black.jpg",
		gallery: [
			"/images/gloves-black.jpg",
			"/images/wraps.jpg",
			"/images/lifestyle-wraps.jpg"
		],
		colors: [{
			id: "preto",
			name: "Preto",
			hex: "#1a1a1a",
			image: "/images/gloves-black.jpg"
		}, {
			id: "vermelho",
			name: "Carmesim",
			hex: "#9b1c2e",
			image: "/images/gloves-red.jpg"
		}],
		sizes: [{
			id: "12oz",
			label: "12 oz",
			hint: "Kit padrão"
		}],
		badge: "promocao",
		rating: 4.8,
		reviewCount: 203,
		features: [
			"Luvas Pro Series 12 oz",
			"Bandagens elásticas 5 m",
			"Economia frente à compra separada"
		],
		specs: [{
			label: "Incluso",
			value: "Luvas + 1 par de bandagens"
		}, {
			label: "Nível",
			value: "Iniciante ao intermediário"
		}],
		sku: "GP-KIT-INIC",
		reviews: reviewsGloves.slice(0, 1)
	},
	{
		slug: "luvas-pro-brancas",
		name: "Luvas Pro Osso",
		subtitle: "Edição clara · 10–16 oz",
		description: "A mesma Pro Series em couro osso com punho preto. Suja mais — e por isso mesmo mostra quem treina. A luva de quem não esconde o giz da academia.",
		price: 299,
		collections: ["boxe"],
		image: "/images/gloves-white.jpg",
		gallery: ["/images/gloves-white.jpg", "/images/hero-ring.jpg"],
		colors: [{
			id: "branco",
			name: "Osso",
			hex: "#e8e2d4",
			image: "/images/gloves-white.jpg"
		}],
		sizes: ozSizes,
		badge: "novo",
		rating: 4.6,
		reviewCount: 41,
		features: [
			"Mesma construção da Pro Series",
			"Acabamento osso + punho preto",
			"Fácil de limpar com pano úmido"
		],
		specs: [{
			label: "Material",
			value: "PU + EVA"
		}, {
			label: "Uso",
			value: "Treino e sparring"
		}],
		sku: "GP-BOX-BONE",
		reviews: [reviewsGloves[1]]
	}
];
var featuredSlugs = [
	"luvas-boxe-pro",
	"caneleiras-muay-thai",
	"luvas-mma-strike",
	"kit-iniciante-boxe",
	"protetor-cabeca",
	"manoplas-foco",
	"bandagens-elasticas",
	"luvas-sparring-elite"
];
function getProduct(slug) {
	return products.find((p) => p.slug === slug);
}
function getCollection(slug) {
	return collections.find((c) => c.slug === slug);
}
function productsIn(collectionSlug) {
	return products.filter((p) => p.collections.includes(collectionSlug));
}
function relatedTo(slug, n = 4) {
	const p = getProduct(slug);
	if (!p) return products.slice(0, n);
	const set = new Set(p.collections);
	return products.filter((x) => x.slug !== slug && x.collections.some((c) => set.has(c))).slice(0, n);
}
function searchProducts(q) {
	const s = q.trim().toLowerCase();
	if (!s) return [];
	return products.filter((p) => [
		p.name,
		p.subtitle,
		p.description,
		p.collections.join(" "),
		p.sku
	].join(" ").toLowerCase().includes(s));
}
function lineId(slug, colorId, sizeId) {
	return `${slug}__${colorId}__${sizeId}`;
}
var useCart = create()(persist((set, get) => ({
	hydrated: false,
	lines: [],
	setHydrated: () => set({ hydrated: true }),
	add: ({ slug, colorId, sizeId, qty = 1 }) => {
		const id = lineId(slug, colorId, sizeId);
		if (get().lines.find((l) => l.id === id)) set({ lines: get().lines.map((l) => l.id === id ? {
			...l,
			qty: l.qty + qty
		} : l) });
		else set({ lines: [...get().lines, {
			id,
			slug,
			colorId,
			sizeId,
			qty
		}] });
	},
	setQty: (id, qty) => {
		if (qty <= 0) {
			set({ lines: get().lines.filter((l) => l.id !== id) });
			return;
		}
		set({ lines: get().lines.map((l) => l.id === id ? {
			...l,
			qty
		} : l) });
	},
	remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
	clear: () => set({ lines: [] })
}), {
	name: "gingpai-cart",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({ lines: s.lines })
}));
var useWishlist = create()(persist((set, get) => ({
	slugs: [],
	toggle: (slug) => {
		set({ slugs: get().slugs.includes(slug) ? get().slugs.filter((s) => s !== slug) : [...get().slugs, slug] });
	},
	has: (slug) => get().slugs.includes(slug)
}), {
	name: "gingpai-wish",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true
}));
var useUi = create((set) => ({
	cartOpen: false,
	searchOpen: false,
	navOpen: false,
	setCartOpen: (cartOpen) => set({
		cartOpen,
		navOpen: false,
		searchOpen: false
	}),
	setSearchOpen: (searchOpen) => set({
		searchOpen,
		navOpen: false,
		cartOpen: false
	}),
	setNavOpen: (navOpen) => set({
		navOpen,
		cartOpen: false,
		searchOpen: false
	})
}));
var nav = [
	{
		href: "/loja",
		label: "Loja",
		slug: null
	},
	...collections.slice(0, 4).map((c) => ({
		href: "/colecao/$slug",
		label: c.name,
		slug: c.slug
	})),
	{
		href: "/sobre",
		label: "A marca",
		slug: null
	}
];
function AnnouncementBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-2.5 text-center text-[11px] tracking-[0.16em] text-muted uppercase",
			children: "Frete grátis acima de R$ 299 · 12× sem juros · 5% off no PIX"
		})
	});
}
function Header() {
	const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
	const wishes = useWishlist((s) => s.slugs.length);
	const { cartOpen, searchOpen, navOpen, setCartOpen, setSearchOpen, setNavOpen } = useUi();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:h-18 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center md:hidden",
						"aria-label": navOpen ? "Fechar menu" : "Abrir menu",
						onClick: () => setNavOpen(!navOpen),
						children: navOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mr-auto md:mr-8",
						onClick: () => setNavOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-6 md:flex",
						children: nav.map((item) => item.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/colecao/$slug",
							params: { slug: item.slug },
							className: "text-[13px] tracking-wide text-muted transition-colors hover:text-fg",
							children: item.label
						}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: "text-[13px] tracking-wide text-muted transition-colors hover:text-fg",
							children: item.label
						}, item.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Buscar",
								className: "flex size-11 items-center justify-center text-fg",
								onClick: () => setSearchOpen(!searchOpen),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "size-4",
									strokeWidth: 1.7
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Favoritos",
								className: "relative flex size-11 items-center justify-center text-fg",
								onClick: () => navigate({ to: "/favoritos" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "size-4",
									strokeWidth: 1.7
								}), wishes > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-1.5 size-1.5 rounded-full bg-accent" }) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Carrinho",
								className: "relative flex size-11 items-center justify-center text-fg",
								onClick: () => setCartOpen(!cartOpen),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									className: "size-4",
									strokeWidth: 1.7
								}), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-fg",
									children: count
								}) : null]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("overflow-hidden border-t border-border bg-bg md:hidden", "transition-[max-height,opacity] duration-300 ease-out", navOpen ? "max-h-[80vh] opacity-100" : "max-h-0 border-t-0 opacity-0"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col px-4 py-3",
					children: [
						nav.map((item) => item.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/colecao/$slug",
							params: { slug: item.slug },
							className: "flex h-12 items-center text-sm tracking-wide",
							onClick: () => setNavOpen(false),
							children: item.label
						}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							className: "flex h-12 items-center text-sm tracking-wide",
							onClick: () => setNavOpen(false),
							children: item.label
						}, item.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guia-de-tamanhos",
							className: "flex h-12 items-center text-sm tracking-wide",
							onClick: () => setNavOpen(false),
							children: "Guia de tamanhos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contato",
							className: "flex h-12 items-center text-sm tracking-wide",
							onClick: () => setNavOpen(false),
							children: "Contato"
						})
					]
				})
			})
		]
	});
}
function Footer() {
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-12 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-[1.15rem]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
						children: "Equipamento de combate para boxe, MMA e Muay Thai. GINGPAI no Brasil — o par que aguenta o round extra."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 flex max-w-sm gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							setDone(true);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "nl",
								children: "E-mail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "nl",
								type: "email",
								required: true,
								placeholder: "Seu e-mail",
								className: "h-11 flex-1 border border-border bg-bg px-3 text-sm text-fg placeholder:text-subtle outline-none focus:border-fg/40"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "h-11 bg-fg px-4 text-xs font-semibold tracking-wide text-bg uppercase",
								children: done ? "Ok" : "Entrar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-subtle",
						children: "Lançamentos e o drop da semana. Sem spam."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-subtle uppercase",
						children: "Loja"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2.5 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/loja",
							className: "hover:text-fg",
							children: "Ver tudo"
						}) }), collections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/colecao/$slug",
							params: { slug: c.slug },
							className: "hover:text-fg",
							children: c.name
						}) }, c.slug))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-subtle uppercase",
						children: "Ajuda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2.5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/guia-de-tamanhos",
								className: "hover:text-fg",
								children: "Guia de tamanhos"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contato",
								className: "hover:text-fg",
								children: "Contato"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sobre",
								className: "hover:text-fg",
								children: "A marca"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/carrinho",
								className: "hover:text-fg",
								children: "Carrinho"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.18em] text-subtle uppercase",
						children: "Compra"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2.5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "PIX com 5% off" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "12× sem juros" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Frete grátis acima de R$ 299" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Troca em 30 dias" })
						]
					})] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[11px] text-subtle md:flex-row md:items-center md:justify-between md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" GINGPAI Boxing. Todos os direitos reservados."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CNPJ 00.000.000/0001-00 · Loja demonstração" })]
			})
		})]
	});
}
function formatBRL(value) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(value);
}
function installmentOf(value, n = 12) {
	return formatBRL(Math.round(value / n * 100) / 100);
}
function pixPrice(value) {
	return value * .95;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-fg text-bg hover:bg-bone",
			accent: "bg-accent text-accent-fg hover:brightness-110",
			outline: "border border-fg/25 bg-transparent text-fg hover:border-fg/60 hover:bg-fg/5",
			ghost: "bg-transparent text-fg hover:bg-fg/8",
			inverse: "bg-bg text-fg hover:bg-elevated"
		},
		size: {
			sm: "h-10 px-3.5 text-xs tracking-wide",
			md: "h-11 px-5 text-sm",
			lg: "h-12 px-6 text-sm tracking-wide",
			icon: "size-11"
		},
		width: {
			auto: "w-auto",
			full: "w-full"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
		width: "auto"
	}
});
function Button({ className, variant, size, width, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			width
		}), className),
		...props
	});
}
function CartDrawer() {
	const open = useUi((s) => s.cartOpen);
	const setOpen = useUi((s) => s.setCartOpen);
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
	const remaining = Math.max(0, 299 - subtotal);
	const progress = Math.min(1, subtotal / 299);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-0 z-50 bg-bg/60 backdrop-blur-[2px] transition-opacity duration-200", open ? "opacity-100" : "pointer-events-none opacity-0"),
		onClick: () => setOpen(false)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-border", "transition-transform duration-300 ease-out", open ? "translate-x-0" : "translate-x-full"),
		"aria-hidden": !open,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center justify-between border-b border-border px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-[0.12em]",
					children: "Carrinho"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center",
					"aria-label": "Fechar",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 overflow-hidden bg-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-accent transition-[width] duration-200",
						style: { width: `${progress * 100}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: remaining === 0 ? "Frete grátis liberado." : `Faltam ${formatBRL(remaining)} para o frete grátis.`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-5 py-4",
				children: detailed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Seu canto ainda está vazio."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 rounded-sm",
						onClick: () => setOpen(false),
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/loja",
							children: "Ir para a loja"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-5",
					children: detailed.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/produto/$slug",
							params: { slug: l.product.slug },
							onClick: () => setOpen(false),
							className: "size-24 shrink-0 overflow-hidden bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: l.color.image,
								alt: "",
								className: "size-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: l.product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										l.color.name,
										" · ",
										l.size.label
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tab-nums mt-1 text-sm",
									children: formatBRL(l.product.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex h-9 items-center border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "size-9 text-lg",
												onClick: () => setQty(l.id, l.qty - 1),
												"aria-label": "Diminuir",
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tab-nums w-6 text-center text-sm",
												children: l.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "size-9 text-lg",
												onClick: () => setQty(l.id, l.qty + 1),
												"aria-label": "Aumentar",
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
				})
			}),
			detailed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Subtotal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-nums font-semibold",
							children: formatBRL(subtotal)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-subtle",
						children: [formatBRL(pixPrice(subtotal)), " no PIX · 5% off"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 rounded-sm",
						width: "full",
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							onClick: () => setOpen(false),
							children: "Finalizar compra"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 rounded-sm",
						variant: "ghost",
						width: "full",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/carrinho",
							onClick: () => setOpen(false),
							children: "Ver carrinho"
						})
					})
				]
			}) : null
		]
	})] });
}
function SearchDialog() {
	const open = useUi((s) => s.searchOpen);
	const setOpen = useUi((s) => s.setSearchOpen);
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const results = (0, import_react.useMemo)(() => searchProducts(q).slice(0, 6), [q]);
	(0, import_react.useEffect)(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 40);
		else setQ("");
	}, [open]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-sm", "transition-opacity duration-200", open ? "opacity-100" : "pointer-events-none opacity-0"),
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("w-full max-w-lg overflow-hidden border border-border bg-surface shadow-border", "origin-top transition-[transform,opacity] duration-250 ease-out", open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"),
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Busca",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-center gap-2 border-b border-border px-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!q.trim()) return;
					setOpen(false);
					navigate({
						to: "/busca",
						search: { q: q.trim() }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Buscar luvas, caneleiras, kits…",
						className: "h-14 flex-1 bg-transparent text-sm text-fg placeholder:text-subtle outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-11 items-center justify-center",
						"aria-label": "Fechar",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-80 overflow-y-auto",
				children: q.trim() && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 py-8 text-center text-sm text-muted",
					children: [
						"Nada encontrado para “",
						q,
						"”."
					]
				}) : results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/produto/$slug",
					params: { slug: p.slug },
					onClick: () => setOpen(false),
					className: "flex items-center gap-3 px-4 py-3 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: "",
						className: "size-14 object-cover bg-elevated"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tab-nums text-xs text-muted",
							children: formatBRL(p.price)
						})]
					})]
				}, p.slug))
			})]
		})
	});
}
function StoreShell({ children }) {
	(0, import_react.useEffect)(() => {
		useCart.persist.rehydrate();
		useWishlist.persist.rehydrate();
		useCart.getState().setHydrated();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-center",
				toastOptions: { style: {
					background: "#1b1b18",
					border: "1px solid #2a2a26",
					color: "#f3efe6"
				} }
			})
		]
	});
}
var styles_default = "/assets/styles-BWiqgrUX.css";
var APP_NAME = "GINGPAI";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#090908"
			},
			{
				name: "description",
				content: "GINGPAI — equipamento de combate para boxe, MMA e Muay Thai. Luvas, caneleiras e proteção profissional."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-ek9EBRXU.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./busca-B2D1PoN1.mjs");
var Route$9 = createFileRoute("/busca")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : "" }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./carrinho-D_MHxTCF.mjs");
var Route$8 = createFileRoute("/carrinho")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./checkout-DdZhPmqM.mjs");
var Route$7 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./contato-5RqZ7l7M.mjs");
var Route$6 = createFileRoute("/contato")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./favoritos-BANmHY2H.mjs");
var Route$5 = createFileRoute("/favoritos")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./guia-de-tamanhos-DHEyQ5q-.mjs");
var Route$4 = createFileRoute("/guia-de-tamanhos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./loja-DFzfvYoM.mjs");
var Route$3 = createFileRoute("/loja")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sobre-BPNTGNYw.mjs");
var Route$2 = createFileRoute("/sobre")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./colecao._slug-C2JlROyJ.mjs");
var Route$1 = createFileRoute("/colecao/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./produto._slug-CPCIJiIL.mjs");
var Route = createFileRoute("/produto/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	BuscaRoute: Route$9.update({
		id: "/busca",
		path: "/busca",
		getParentRoute: () => Route$11
	}),
	CarrinhoRoute: Route$8.update({
		id: "/carrinho",
		path: "/carrinho",
		getParentRoute: () => Route$11
	}),
	CheckoutRoute: Route$7.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$11
	}),
	ContatoRoute: Route$6.update({
		id: "/contato",
		path: "/contato",
		getParentRoute: () => Route$11
	}),
	FavoritosRoute: Route$5.update({
		id: "/favoritos",
		path: "/favoritos",
		getParentRoute: () => Route$11
	}),
	GuiaDeTamanhosRoute: Route$4.update({
		id: "/guia-de-tamanhos",
		path: "/guia-de-tamanhos",
		getParentRoute: () => Route$11
	}),
	LojaRoute: Route$3.update({
		id: "/loja",
		path: "/loja",
		getParentRoute: () => Route$11
	}),
	SobreRoute: Route$2.update({
		id: "/sobre",
		path: "/sobre",
		getParentRoute: () => Route$11
	}),
	ColecaoSlugRoute: Route$1.update({
		id: "/colecao/$slug",
		path: "/colecao/$slug",
		getParentRoute: () => Route$11
	}),
	ProdutoSlugRoute: Route.update({
		id: "/produto/$slug",
		path: "/produto/$slug",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-7xl tracking-wide text-accent",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-[0.08em]",
				children: "Round encerrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted",
				children: "Essa página não existe — ou foi nocauteada. Volta para a loja."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 inline-flex h-11 items-center bg-fg px-5 text-sm font-medium text-bg",
				children: "Voltar ao início"
			})
		]
	});
}
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { productsIn as _, Button as a, cn as b, pixPrice as c, useWishlist as d, collections as f, products as g, getProduct as h, Route$9 as i, useCart as l, getCollection as m, Route as n, formatBRL as o, featuredSlugs as p, Route$1 as r, installmentOf as s, router_exports as t, useUi as u, relatedTo as v, searchProducts as y };
