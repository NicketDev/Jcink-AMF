# AMF API Reference

## Global AMF Object

The AMF object is available globally as `window.AMF`.

---

## Methods

### `AMF.plugin(name, handler)`

Register a plugin. Plugins can be:

-   A function (executed when the ACP loads)
-   A string (URL to a script to load)
-   An object with `init` and `run` methods

See [Plugin System](plugins.md) for full details and advanced usage.

**Example:**

```js
AMF.plugin("My Plugin", () => {
	// Plugin logic here
});
```

### `AMF.menu`

A deep-proxied, fully reactive array of menu categories and links. Modifying this array updates the ACP menu instantly.

**Category structure:**

```js
{
  title: "Category Title",
  description: "Description text",
  links: [
    { title: "Link Title", href: "/admin.php?act=...", bold: false }
  ]
}
```

### `AMF.createPage(options, callback)`

Create a new ACP page. Returns the URL for the new page.

-   `options`: string (page name) or object `{ name, act, headline, slug }`
-   `callback`: function called when the page is loaded, receives an enhanced context object

**Example:**

```js
const url = AMF.createPage({ name: "My Page" }, ({ body }) => {
	body.innerHTML = "Hello, world!";
});
```

### `AMF.on(event, listener)`

Listen for an event. Returns an unsubscribe function.

### `AMF.once(event, listener)`

Listen for an event once.

### `AMF.off(event, listener)`

Remove an event listener.

### `AMF.emit(event, ...args)`

Emit an event.

### `AMF.openAcp()`

Load the ACP in a controlled iframe and initialize the framework.

---

## Types

### MenuCategory

-   `id?`: string
-   `title`: string
-   `description`: string
-   `links`: MenuLink[]

### MenuLink

-   `title`: string
-   `href`: string
-   `bold?`: boolean

### Details (event payload)

-   `rootFrame`: HTMLIFrameElement
-   `rootWindow`: Window
-   `menuFrame`: HTMLIFrameElement
-   `menuWindow`: Window
-   `contentFrame`: HTMLIFrameElement
-   `contentWindow`: Window

---

For more, see [Events](events.md), [Menu System](menu.md), and [Examples](examples.md).
