# Acp Modding Framework (AMF)

A framework for building modifications for the Admin Control Panel (ACP) of Jcink hosted forums.

## The Problem

It's difficult to make any changes to the ACP. Unlike the frontend pages, there's no proper way to inject scripts. In the InvisionFree era we could use a bug in the admin notes where using a value with `</textarea>` would allow you to inject custom html, this bug isn't present in Jcink forums.

Even when you do manage to inject a script, the ACP operates using a `<frameset>` which I'd describe as a hostile environment for any developer.

## The Solution

This project attempts to make modifications to the ACP viable. It works by loading the ACP into a iframe from a new page that we do control. Then we can inject scripts into the iframe to change it's contents. This project takes care of the heavy lifting and provides several tools to make it easy for developers to get started.

## Overview

-   **Reactive menu system**: Add, remove, or modify menu categories and links with instant updates.
-   **Plugin architecture**: Register plugins that run in a controlled order, supporting async loading and external scripts.
-   **Page creation**: Easily add new pages to the ACP with custom content and logic.
-   **Event system**: Listen for key frame and navigation events with a familiar API.
-   **Full control over frames**: Access and manipulate the ACP's frameset and windows.

## Main Features

-   **AMF.menu**: Deep-proxied, fully reactive menu array. Any changes are reflected instantly in the ACP UI.
-   **AMF.plugin(name, handler)**: Register plugins (functions, URLs, or objects with init/run).
-   **AMF.createPage(options, callback)**: Add new ACP pages with custom content.
-   **AMF.on/once/off/emit**: Event system for frame and navigation events.
-   **AMF.openAcp()**: Load the ACP in a controlled iframe and initialize the framework.

## Installation

1. **Create a new ACP Webpage:**

    - Go to `Skins & Templates` → `Webpage Maker` in your forum admin panel.
    - Create a new Webpage. This page will become your new ACP entry point.
    - After creating the page, note the `pid` parameter in the URL (e.g., `index.php?act=Pages&pid=1` → `pid=1`).

2. **Add scripts to the new Webpage:**

    - In the Webpage content, add a `<script>` tag to load `dist/index.js` (the AMF bundle), any plugins you want, and finally a script to run `window.AMF.openAcp();`.
    - Example:
        ```html
        <script src="/path/to/afm/dist/index.js"></script>
        <!-- plugins should go here -->
        <script>
        	window.AMF.openAcp();
        </script>
        ```

3. **Update all admin links across the forum:**
    - By default, the forum will still link to the original admin URL. To redirect all admin links to your new ACP page:
    - Go to `Skins & Templates` → `Manage Board Wrappers`.
    - Add the following script to all relevant board wrappers, replacing `pid` with your actual value:
        ```html
        <script>
        	document.addEventListener("DOMContentLoaded", () => {
        		const ACP_PID = 1; // <-- Replace 1 with your pid
        		document
        			.querySelectorAll('a[href*="/admin.php"]')
        			.forEach((a) => {
        				const u = new URL(a.href);
        				u.pathname = "/index.php";
        				u.searchParams.set("act", "Pages");
        				u.searchParams.set("pid", `${ACP_PID}`);
        				a.href = `${u}`;
        			});
        	});
        </script>
        ```

After these steps, your new ACP will be accessible via the custom Webpage, and all admin links will point to it automatically.

## Documentation

-   [API Reference](docs/api.md)
-   [Events](docs/events.md)
-   [Menu System](docs/menu.md)
-   [Examples](docs/examples.md)

## Contributing & Development

Interested in improving AMF or fixing bugs? Here's how to get started:

### 1. Clone the Repository

```sh
git clone https://github.com/NicketDev/Jcink-AMF.git
cd jcink-amf
```

### 2. Install Dependencies

This project uses [Bun](https://bun.sh/) for package management and scripts.

```sh
bun install
```

### 3. Build the Project

```sh
bun run build
```

This will output the compiled files to the `dist/` directory.

### 4. Test Your Changes

-   Upload or serve `dist/index.js` (and any plugins) to your forum.
-   Update your ACP Webpage (see Installation above) to load your local or test build.
-   Reload the forum ACP to see your changes in action.

### 5. Opening Pull Requests

-   Fork the repository and create a new branch for your changes.
-   Make your edits and commit with clear messages.
-   Push your branch and open a Pull Request (PR) on GitHub.
-   Please provide a clear description of your changes and reference any related issues.

---

For questions or to discuss features, open an issue or join the project discussions on GitHub.
