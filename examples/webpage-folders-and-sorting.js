AMF.plugin("Webpage Folders & Sorting", () => {
	AMF.on("content-frame-load", ({ contentWindow }) => {
		const url = new URL(contentWindow.location.href);
		if (
			url.searchParams.get("act") !== "webpages" ||
			url.searchParams.get("show_all") !== "1"
		)
			return;

		const table = contentWindow.document.querySelector(".tableborder");
		const tbody = table.querySelector("tbody");
		const trs = Array.from(tbody.querySelectorAll("tr"));
		const headRow = trs.shift();
		const paginationRow = trs.pop();
		const [pageHeader, includeKeyHeader, modifiedHeader] =
			headRow.querySelectorAll(".titlemedium");
		const maintitle = contentWindow.document.querySelector(".maintitle");

		let pageSortAsc = true;
		let modifiedSortAsc = true;
		let currentSort = null;
		let filterValue = "";
		let expandedFolders = new Set();
		let dataTree = null;

		const STORAGE_KEY = "webpage-sorting-state";
		const FOLDER_KEY = "webpage-sorting-folders";

		function saveState() {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					filterValue,
					currentSort,
					pageSortAsc,
					modifiedSortAsc
				})
			);
			sessionStorage.setItem(
				FOLDER_KEY,
				JSON.stringify(Array.from(expandedFolders))
			);
		}

		function loadState() {
			try {
				const state = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
				if (state) {
					filterValue = state.filterValue || "";
					currentSort = state.currentSort || null;
					pageSortAsc = state.pageSortAsc ?? true;
					modifiedSortAsc = state.modifiedSortAsc ?? true;
				}
				const folders = JSON.parse(sessionStorage.getItem(FOLDER_KEY));
				if (folders) expandedFolders = new Set(folders);
			} catch {}
		}

		function buildDataTree(trs) {
			const root = { name: "", path: "", type: "folder", children: [] };
			trs.forEach((tr) => {
				const fullPath = tr.querySelector("td").textContent.trim();
				const parts = fullPath.split("/");
				let node = root;
				let currentPath = "";
				for (let i = 0; i < parts.length; i++) {
					const part = parts[i];
					currentPath = currentPath ? currentPath + "/" + part : part;
					let child = node.children.find(
						(c) =>
							c.name === part &&
							c.type ===
								(i === parts.length - 1 ? "file" : "folder")
					);
					if (!child) {
						child = {
							name: part,
							path: currentPath,
							type: i === parts.length - 1 ? "file" : "folder",
							children: i === parts.length - 1 ? undefined : [],
							row: i === parts.length - 1 ? tr : undefined
						};
						node.children.push(child);
					}
					node = child;
				}
			});
			return root;
		}

		function nodeMatchesFilter(node, filter) {
			if (!filter) return true;
			if (node.type === "file" && node.row) {
				const text = node.path.toLowerCase();
				return text.includes(filter);
			}
			return (
				node.children &&
				node.children.some((child) => nodeMatchesFilter(child, filter))
			);
		}

		function sortTree(node) {
			if (!node.children) return;
			node.children.forEach(sortTree);
			node.children.sort((a, b) => {
				if (a.type === "folder" && b.type === "file") return -1;
				if (a.type === "file" && b.type === "folder") return 1;
				let aText, bText;
				if (currentSort === "page") {
					aText = a.name.toLowerCase();
					bText = b.name.toLowerCase();
					return pageSortAsc
						? aText.localeCompare(bText)
						: bText.localeCompare(aText);
				} else if (currentSort === "modified") {
					aText =
						a.type === "file" && a.row
							? new Date(
									a.row
										.querySelector("td:nth-child(3)")
										.textContent.trim()
							  )
							: new Date(0);
					bText =
						b.type === "file" && b.row
							? new Date(
									b.row
										.querySelector("td:nth-child(3)")
										.textContent.trim()
							  )
							: new Date(0);
					return modifiedSortAsc ? aText - bText : bText - aText;
				} else {
					aText = a.name.toLowerCase();
					bText = b.name.toLowerCase();
					return aText.localeCompare(bText);
				}
			});
		}

		function renderTree(node, fragment, depth, filter) {
			if (!node.children) return;
			for (const child of node.children) {
				if (!nodeMatchesFilter(child, filter)) continue;
				if (child.type === "folder") {
					const tr = contentWindow.document.createElement("tr");
					const td = contentWindow.document.createElement("td");
					td.className = "tdrow1";
					td.colSpan = headRow.children.length;
					td.style.paddingLeft = `${depth * 2}em`;
					td.style.fontWeight = "bold";
					td.style.cursor = "pointer";
					td.textContent =
						(expandedFolders.has(child.path) ? "▼ " : "► ") +
						child.name;
					tr.appendChild(td);
					tr.className = "folder-row";
					tr.dataset.path = child.path;
					tr.addEventListener("click", (e) => {
						e.stopPropagation();
						if (expandedFolders.has(child.path)) {
							expandedFolders.delete(child.path);
						} else {
							expandedFolders.add(child.path);
						}
						saveState();
						renderTable();
					});
					fragment.appendChild(tr);
					if (expandedFolders.has(child.path)) {
						renderTree(child, fragment, depth + 1, filter);
					}
				} else if (child.type === "file" && child.row) {
					const tr = child.row;
					tr.style.display = "";
					const td = tr.querySelector("td");
					td.style.paddingLeft = `${depth * 2}em`;
					const a = td.querySelector("a");
					if (a) a.textContent = child.name;
					fragment.appendChild(tr);
				}
			}
		}

		function renderTable() {
			const filter = filterValue.trim().toLowerCase();
			tbody.innerHTML = "";
			const fragment = contentWindow.document.createDocumentFragment();
			fragment.appendChild(headRow);
			if (!dataTree) dataTree = buildDataTree(trs);
			sortTree(dataTree);
			renderTree(dataTree, fragment, 0, filter);
			fragment.appendChild(paginationRow);
			tbody.appendChild(fragment);
		}

		let filterTimeout;
		function onFilterInput(e) {
			filterValue = e.target.value;
			clearTimeout(filterTimeout);
			filterTimeout = setTimeout(() => {
				renderTable();
				saveState();
			}, 120);
		}

		function setupFilterInput() {
			if (!maintitle) return;
			const filterInput = contentWindow.document.createElement("input");
			filterInput.type = "text";
			filterInput.placeholder = "Filter...";
			filterInput.style.margin = "-4px 4px";
			filterInput.style.float = "right";
			filterInput.value = filterValue;
			filterInput.addEventListener("input", onFilterInput);
			maintitle.appendChild(filterInput);
		}

		function clearSortIndicators() {
			[pageHeader, modifiedHeader].forEach((header) => {
				header.textContent = header.textContent
					.replace(/[\u25B2\u25BC]/g, "")
					.trim();
			});
		}

		function setSortIndicator(header, asc) {
			clearSortIndicators();
			header.textContent =
				header.textContent.trim() + (asc ? " \u25B2" : " \u25BC");
		}

		function sortByPage() {
			currentSort = "page";
			setSortIndicator(pageHeader, pageSortAsc);
			pageSortAsc = !pageSortAsc;
			renderTable();
			saveState();
		}

		function sortByModified() {
			currentSort = "modified";
			setSortIndicator(modifiedHeader, modifiedSortAsc);
			modifiedSortAsc = !modifiedSortAsc;
			renderTable();
			saveState();
		}

		function setupSorting() {
			pageHeader.style.cursor = "pointer";
			modifiedHeader.style.cursor = "pointer";
			pageHeader.addEventListener("click", sortByPage);
			modifiedHeader.addEventListener("click", sortByModified);
		}

		function prepHtml() {
			trs.forEach((tr) => {
				const center = tr.querySelector("td > center");
				if (center) center.outerHTML = center.innerHTML;
			});
		}

		prepHtml();
		loadState();
		setupFilterInput();
		setupSorting();
		if (currentSort === "page") {
			sortByPage();
			pageSortAsc = !pageSortAsc;
		} else if (currentSort === "modified") {
			sortByModified();
			modifiedSortAsc = !modifiedSortAsc;
		}
		renderTable();
	});
});
