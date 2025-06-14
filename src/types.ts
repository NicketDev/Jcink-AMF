import type EventEmitter from "./lib/EventEmitter";

export type Details = {
	rootFrame: HTMLIFrameElement;
	rootWindow: Window;
	menuFrame: HTMLIFrameElement;
	menuWindow: Window;
	contentFrame: HTMLIFrameElement;
	contentWindow: Window;
};

export interface MenuLink {
	title: string;
	href: string;
	bold?: boolean;
}

export interface MenuCategory {
	id?: string;
	title: string;
	description: string;
	links: MenuLink[];
}

export interface AMF extends EventEmitter {
	menu: MenuCategory[];
	plugin: (
		name: string,
		plugin?:
			| string
			| (() => void)
			| {
					init?: () => Promise<any> | any;
					run: () => Promise<void> | void;
			  }
	) => void;
	createPage: (
		options:
			| string
			| {
					name: string;
					act?: string;
					headline?: string;
					slug?: string;
			  },
		callback: (
			details: Details & {
				url: URL;
				window: Window;
				document: Document;
				body: HTMLDivElement;
				originalBody: HTMLDivElement;
			}
		) => void
	) => string;
	openAcp: () => void;
}
