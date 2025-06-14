AMF.plugin("Test Page Example", () => {
	const url = AMF.createPage("test", ({ body }) => {
		body.innerHTML = `This page is only here for testing...`;
	});

	AMF.once("menu-frame-load", () => {
		AMF.menu[0].links.unshift({
			title: "My test page",
			href: url
		});
	});
});
