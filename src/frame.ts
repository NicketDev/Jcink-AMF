import type { Details } from "./types";

export function generateDetailsObject(iframe: HTMLIFrameElement): Details {
	const rootFrame = iframe;
	const rootWindow = iframe.contentWindow as Window;
	const menuFrame = rootWindow.document.querySelector(
		`frame[name="menu"]`
	) as HTMLIFrameElement;
	const menuWindow = menuFrame?.contentWindow as Window;
	const contentFrame = rootWindow.document.querySelector(
		`frame[name="body"]`
	) as HTMLIFrameElement;
	const contentWindow = contentFrame?.contentWindow as Window;
	return {
		rootFrame,
		rootWindow,
		menuFrame,
		menuWindow,
		contentFrame,
		contentWindow
	};
}
