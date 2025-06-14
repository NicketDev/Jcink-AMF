# AMF Events

The AMF framework emits several key events you can hook into. All event listeners receive a `details` object containing references to the relevant frames and windows.

## Event List

### `root-frame-load`

Fired when the main ACP frameset has loaded.

-   **Payload:** `details` object

### `menu-frame-load`

Fired when the menu frame has loaded or reloaded.

-   **Payload:** `details` object

### `content-frame-load`

Fired when the main content frame has loaded or reloaded.

-   **Payload:** `details` object

### `login-frame-load`

Fired when the login frame is shown (e.g., session expired).

-   **Payload:** `details` object (only rootFrame and rootWindow)

## The `details` Object

| Property        | Type                | Description                                          |
| --------------- | ------------------- | ---------------------------------------------------- |
| `rootFrame`     | `HTMLIFrameElement` | The master iframe containing the entire ACP.         |
| `rootWindow`    | `Window`            | The `window` object of the ACP's top-level frameset. |
| `menuFrame`     | `HTMLIFrameElement` | The `<frame>` element for the navigation menu.       |
| `menuWindow`    | `Window`            | The `window` object of the menu frame.               |
| `contentFrame`  | `HTMLIFrameElement` | The `<frame>` element for the main content area.     |
| `contentWindow` | `Window`            | The `window` object of the content frame.            |

## Usage Examples

```js
AMF.once("menu-frame-load", ({ menuWindow }) => {
	// Manipulate the menu frame
});

AMF.on("content-frame-load", ({ contentWindow }) => {
	// Run logic once when the content frame loads
});
```
