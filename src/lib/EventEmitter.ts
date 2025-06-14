type Listener = (...args: any[]) => void;

export default class EventEmitter {
	private events: Record<string, Listener[]>;

	constructor() {
		this.events = {};
	}
	on(event: string, listener: Listener): () => void {
		if (!this.events[event]) this.events[event] = [];
		this.events[event].push(listener);
		return () => this.off(event, listener);
	}
	off(event: string, listener: Listener): void {
		if (!this.events[event]) return;
		const idx = this.events[event].indexOf(listener);
		if (idx > -1) this.events[event].splice(idx, 1);
	}
	emit(event: string, ...args: any[]): void {
		console.log(event, args);
		if (!this.events[event]) return;
		this.events[event].forEach((listener) => listener.apply(this, args));
	}
	once(event: string, listener: Listener): void {
		const remove = this.on(event, (...args) => {
			remove();
			listener.apply(this, args);
		});
	}
	addEventListener(event: string, listener: Listener): () => void {
		return this.on(event, listener);
	}
	removeEventListener(event: string, listener: Listener): void {
		return this.off(event, listener);
	}
	dispatchEvent(event: string, ...args: any[]): void {
		return this.emit(event, ...args);
	}
}
