# AMF Plugin System

The plugin system allows you to register code that runs when the ACP loads. Plugins can be used to add features, modify the UI, or load external scripts.

## Plugin Variations

### 1. Function Plugin

A simple function that runs when the ACP loads.

```js
AMF.plugin("My Plugin", () => {
	// Your code here
});
```

### 2. External Script Plugin

A string (URL) to a script that will be loaded and executed.

```js
AMF.plugin("External Plugin", "/path/to/plugin.js");
```

### 3. Plugin Object (init & run)

An object with optional `init` and required `run` methods. `init` can be async and is called before `run`. The result of `init` is passed to `run`.

```js
AMF.plugin("Advanced Plugin", {
	init: async () => {
		// Initialization logic (can be async)
		return await fetch("/api/config").then((r) => r.json());
	},
	run: (config) => {
		// Plugin logic using the result of init
		console.log("Config loaded:", config);
	}
});
```

## Plugin Execution Order

-   Plugins are executed in the order they are registered.
-   If a plugin is a string, it is loaded as a script.
-   If a plugin is an object, `init` is called first (if present), then `run` is called with the result.
-   **All `init` functions run in parallel (non-blocking).** This means that initialization for all plugins starts at the same time, and does not wait for others to finish.
-   **After all `init` functions have completed, the corresponding `run` functions are executed in registration order.**
