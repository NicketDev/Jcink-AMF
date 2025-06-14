import { generateDetailsObject } from "./frame";
import type { MenuCategory } from "./types";
import slugify from "slugify";

const menuCategoryTemplate = (
	category: MenuCategory,
	options: { oldMenu: boolean }
) =>
	options.oldMenu
		? `
			<a name="cat${category.id}"></a>
			<div class="tableborder">
				<div class="cattitle">${category.title}</div>
				<div class="plain">
					${category.links
						.map(
							(link) =>
								`<img src="/html/sys-img/item.gif" border="0" alt="" valign="absmiddle">&nbsp;<a href="${link.href}" target="body" style="text-decoration:none">${link.title}</a><br>`
						)
						.join("")}
				</div>
			</div><br>`
		: `
			<a name="cat${category.id}"></a>
			<div class="tableborder">
				<div class="cattitle">
					<a href="#cat${
						category.id
					}" onclick="change(this)"><div class="cat-collapse"></div>
						${category.title}
					</a>
				</div>
				<div class="plain" style="display: none;">
					${category.links
						.map(
							(link) =>
								`<img src="/html/sys-img/item.gif" border="0" alt="" valign="absmiddle">&nbsp;<a href="${
									link.href
								}" target="body" style="${Object.entries({
									"text-decoration": "none",
									"font-weight": link.bold ? "bold" : "normal"
								})
									.map(([key, value]) => `${key}: ${value};`)
									.join("")}">${link.title}</a><br>`
						)
						.join("")}
				</div>
				<div class="plain">${category.description}</div>
			</div><br>`;

export function renderMenu(iframe: HTMLIFrameElement) {
	const details = generateDetailsObject(iframe);
	const doc = details.menuWindow.document;

	const oldMenu =
		new URL(details.menuWindow.location.href).searchParams.get(
			"expandold"
		) === "1";

	Array.from(doc.body.childNodes).reduce((acc, node) => {
		if (acc) doc.body.removeChild(node as ChildNode);
		else if ((node as ChildNode).nodeName === "BR") acc = true;
		return acc;
	}, false);

	window.AMF.menu
		.map((category: MenuCategory) => {
			const categoryWithId = {
				...category,
				id:
					category.id ??
					slugify(category.title, { lower: true, strict: true })
			};
			return menuCategoryTemplate(
				categoryWithId as Required<MenuCategory>,
				{ oldMenu }
			);
		})
		.forEach((category: string) => {
			const newCategory = doc.createElement("div");
			newCategory.innerHTML = category;
			doc.body.appendChild(newCategory);
		});
}

export function parseMenu(iframe: HTMLIFrameElement): MenuCategory[] {
	const details = generateDetailsObject(iframe);
	return Array.from(
		details.menuWindow.document.querySelectorAll<HTMLDivElement>(
			`.tableborder:has(.cattitle a[onclick="change(this)"])`
		) as NodeListOf<HTMLDivElement>
	).map((categoryElement) => {
		const categoryToggle = categoryElement.querySelector(
			".cattitle a"
		) as HTMLAnchorElement;
		const id = categoryToggle.href.split("#cat")[1] as string;
		const title = categoryToggle.textContent?.trim() ?? "";
		const [linksElement, descriptionElement] =
			categoryElement.querySelectorAll(
				".plain"
			) as NodeListOf<HTMLDivElement>;
		const description = descriptionElement?.textContent?.trim() ?? "";
		return {
			id,
			title,
			description,
			links: (
				Array.from(
					linksElement?.querySelectorAll("a[href]") || []
				) as HTMLAnchorElement[]
			).map((a) => ({
				title: a.textContent?.trim() ?? "",
				href: a.href,
				bold: a.childNodes[0]?.nodeName === "B"
			}))
		};
	});
}
