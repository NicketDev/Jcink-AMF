# AMF Menu System

The `AMF.menu` property is a powerful, fully reactive array representing the ACP's navigation menu. Any change you make to this array or its nested objects—adding, removing, or modifying items—will automatically trigger a re-render of the menu.

## When and How to Mutate `AMF.menu`

-   `AMF.menu` is **initially populated** when the menu loads for the first time (i.e., on the first `menu-frame-load` event).
-   On every subsequent menu load, the framework updates the menu HTML to reflect the current state of `AMF.menu`.
-   **Whenever you mutate `AMF.menu` (add, remove, or change items), the menu HTML is updated immediately.**
-   The best time to mutate `AMF.menu` is inside a `once` event handler for `menu-frame-load`.

**Example:**

```js
AMF.once("menu-frame-load", () => {
	AMF.menu.push({
		title: "Custom Category",
		description: "Added on first menu load",
		links: []
	});
});
```

## Structure

A menu is an array of categories. Each category has:

-   `title`: string
-   `description`: string
-   `links`: array of links (each with `title`, `href`, and optional `bold`)

**Example:**

```js
AMF.once("menu-frame-load", () => {
	const myCustomCategory = {
		title: "My Custom Mod",
		description: "A new section for my awesome tools.",
		links: [
			{ title: "Tool 1", href: "/admin.php?act=tool1" },
			{ title: "Tool 2", href: "/admin.php?act=tool2" }
		]
	};
	AMF.menu.push(myCustomCategory);
});
```

## Reactivity

-   The menu is a deep proxy. Any mutation (push, splice, property set, etc.) triggers a re-render.
-   Changes are debounced using `requestAnimationFrame` for efficiency.
-   You can modify nested properties directly:

```js
AMF.menu[0].links[0].title = "Organize Forums";
```

## Array Methods

`AMF.menu` is a standard JavaScript array and supports all array methods, such as `find`, `slice`, `pop`, `shift`, `map`, `filter`, `sort` and more. You can use these methods to inspect, modify, or manipulate the menu structure as needed.

**Examples:**

```js
// Find a category by title
const toolsCategory = AMF.menu.find((cat) => cat.title === "My Tools");

// Remove the last category
AMF.menu.pop();

// Get the first two categories
const firstTwo = AMF.menu.slice(0, 2);
```

## Advanced Usage

-   Add, remove, or reorder categories and links at any time.
-   Use events like `menu-frame-load` to update the menu after reloads.
-   Combine with `AMF.createPage` to add links to custom pages.

**Example: Add a link to a custom page**

```js
const url = AMF.createPage("My Page", ({ body }) => {
	body.innerHTML = "Hello from my page!";
});
AMF.once("menu-frame-load", () => {
	AMF.menu[0].links.push({ title: "My Page", href: url });
});
```
