const proxyCache = new WeakMap();

export function createDeepProxy<T extends object>(
	target: T,
	onSet: () => void
): T {
	if (proxyCache.has(target)) {
		return proxyCache.get(target);
	}

	const handler: ProxyHandler<T> = {
		get(target, property, receiver) {
			const value = Reflect.get(target, property, receiver);
			if (value && typeof value === "object") {
				return createDeepProxy(value, onSet);
			}
			return value;
		},
		set(target, property, value, receiver) {
			const proxiedValue =
				value && typeof value === "object"
					? createDeepProxy(value, onSet)
					: value;
			const result = Reflect.set(
				target,
				property,
				proxiedValue,
				receiver
			);
			onSet();
			return result;
		},
		deleteProperty(target, property) {
			const result = Reflect.deleteProperty(target, property);
			onSet();
			return result;
		}
	};

	const proxy = new Proxy(target, handler);
	proxyCache.set(target, proxy);
	return proxy;
}
