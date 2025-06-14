import { generateDetailsObject } from "./frame";
import { createDeepProxy } from "./lib/createDeepProxy";
import EventEmitter from "./lib/EventEmitter";
import { parseMenu, renderMenu } from "./menu";
import slugify from "slugify";
import type { AMF } from "./types";

function loadScript(url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.addEventListener("load", () => {
			script.remove();
			resolve(undefined);
		});
		script.addEventListener("error", () => {
			script.remove();
			reject(new Error(`Failed to load script ${url}`));
		});
		script.src = url;
		script.async = true;
		document.head.appendChild(script);
	});
}

async function preloadScript(url: string) {
	try {
		const response = await fetch(url);
		const text = await response.text();
		const encoded = encodeURIComponent(text);
		return [`data:text/javascript;charset=utf-8,${encoded}`, url];
	} catch (error) {
		return [null, url];
	}
}

export function initializeAmf(): AMF {
	const AMF = new EventEmitter() as AMF;
	AMF.menu = [];

	const plugins: {
		name: string;
		init?: () => Promise<any> | any;
		initPromise?: Promise<any> | any;
		run: (initResult: any) => Promise<void> | void;
	}[] = [];

	AMF.plugin = (name, plugin) => {
		if (!plugin) plugin = name;
		if (typeof plugin === "string") {
			plugins.push({
				name,
				init: () => preloadScript(plugin),
				run: ([preloadedUrl, url]) =>
					preloadedUrl
						? loadScript(preloadedUrl).catch(() => loadScript(url))
						: loadScript(url)
			});
		} else if (typeof plugin === "function") {
			plugins.push({ name, run: plugin });
		} else if (typeof plugin === "object") {
			plugins.push({ name, ...plugin, initPromise: plugin.init?.() });
		}
	};

	const runPlugins = async () => {
		for (const plugin of plugins)
			try {
				await plugin.run(await plugin.initPromise);
			} catch (error) {
				console.error(`Error running plugin "${plugin.name}"`, error);
			}
	};

	AMF.openAcp = async () => {
		await runPlugins();
		const url = new URL(location.href);
		const adsess = url.searchParams.get("adsess");
		const iframe = document.createElement("iframe");
		iframe.src = "/admin.php" + (adsess ? "?adsess=" + adsess : "");
		Object.assign(iframe.style, {
			width: "100%",
			height: "100%",
			position: "fixed",
			top: "0",
			left: "0",
			zIndex: "1000",
			border: "none",
			overflow: "auto",
			borderRadius: "10px"
		});

		iframe.addEventListener("load", () => {
			const details = generateDetailsObject(iframe);
			const iframeUrl = new URL(details.rootWindow.location.href);

			if (iframeUrl.searchParams.has("adsess")) {
				let renderFrameId: number | null = null;
				AMF.menu = createDeepProxy(
					[...AMF.menu, ...parseMenu(iframe)],
					() => {
						if (renderFrameId) {
							cancelAnimationFrame(renderFrameId);
						}
						renderFrameId = requestAnimationFrame(() => {
							renderMenu(iframe);
						});
					}
				);

				AMF.on("menu-frame-load", () => renderMenu(iframe));

				AMF.emit("root-frame-load", details);

				const adSess = iframeUrl.searchParams.get("adsess");
				if (adSess) {
					url.searchParams.set("adsess", adSess);
				}
				history.replaceState(null, "", url.toString());

				details.contentFrame.addEventListener("load", () => {
					AMF.emit(
						"content-frame-load",
						generateDetailsObject(iframe)
					);
				});
				details.menuFrame.addEventListener("load", () => {
					AMF.emit("menu-frame-load", generateDetailsObject(iframe));
				});

				// These are loaded already initially due to us waiting for the iframe load event
				AMF.emit("content-frame-load", details);
				AMF.emit("menu-frame-load", details);
			} else {
				AMF.emit("login-frame-load", details);
			}
		});
		document.body.innerHTML = "";
		document.body.appendChild(iframe);
	};

	function parsePageOptions(options: Parameters<typeof AMF.createPage>[0]) {
		if (typeof options === "string") options = { name: options };
		if (!options.headline) options.headline = options.name;
		if (!options.slug) options.slug = slugify(options.name);
		if (!options.act) options.act = "index";
		return options;
	}
	AMF.createPage = (options, callback) => {
		options = parsePageOptions(options);
		AMF.on("content-frame-load", (details) => {
			const window = details.contentFrame.contentWindow;
			const url = new URL(window.location.href);
			if (url.searchParams.get("page") === options.slug) {
				const copyright = window.document
					.querySelector(".copy")
					.cloneNode(true);
				const jwrap = window.document
					.querySelector("#jwrap")
					.cloneNode(true);
				const submenu = window.document
					.querySelector("#submenu")
					.cloneNode(true);

				const originalBody = window.document.createElement("div");
				originalBody.id = "original-body";
				originalBody.style.display = "none";
				originalBody.innerHTML = window.document.body.innerHTML;

				window.document.body.innerHTML = `<div id="maintop">${options.headline}</div>`;
				window.document.body.appendChild(submenu);
				const body = document.createElement("div");
				body.id = "main";
				window.document.body.appendChild(body);
				window.document.body.appendChild(document.createElement("br"));
				window.document.body.appendChild(document.createElement("br"));
				window.document.body.appendChild(jwrap);
				window.document.body.appendChild(copyright);
				window.document.body.appendChild(originalBody);
				callback({
					...details,
					url,
					window,
					document: window.document,
					body,
					originalBody
				});
			}
		});
		const adsess = new URL(location.href).searchParams.get("adsess");
		return `/admin.php?adsess=${adsess}&act=${options.act}&page=${options.slug}`;
	};
	return AMF;
}
