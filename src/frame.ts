import type { Details } from "./types";

export function generateDetailsObject(iframe: HTMLIFrameElement): Details {
	const rootFrame = iframe;
	const rootWindow = iframe.contentWindow as Window;
	const rootUrl = new URL(rootWindow.location.href);
	const menuFrame = rootWindow.document.querySelector(
		`frame[name="menu"]`
	) as HTMLIFrameElement;
	const menuWindow = menuFrame?.contentWindow as Window;
	const menuUrl = menuWindow ? new URL(menuWindow.location.href) : null;
	const contentFrame = rootWindow.document.querySelector(
		`frame[name="body"]`
	) as HTMLIFrameElement;
	const contentWindow = contentFrame?.contentWindow as Window;
	const contentUrl = contentWindow
		? new URL(contentWindow.location.href)
		: null;
	return {
		rootFrame,
		rootWindow,
		rootUrl,
		menuFrame,
		menuWindow,
		menuUrl,
		contentFrame,
		contentWindow,
		contentUrl
	};
}
