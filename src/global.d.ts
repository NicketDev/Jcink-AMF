import type { AMF } from "./types";

declare global {
	interface Window {
		AMF: AMF;
	}
}
