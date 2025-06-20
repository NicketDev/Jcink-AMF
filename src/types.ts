import type EventEmitter from "./lib/EventEmitter";

export type Details = {
	rootFrame: HTMLIFrameElement;
	rootWindow: Window;
	rootUrl: URL;
	menuFrame: HTMLIFrameElement;
	menuWindow: Window;
	menuUrl: URL | null;
	contentFrame: HTMLIFrameElement;
	contentWindow: Window;
	contentUrl: URL | null;
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
