AMF.plugin("Retain Location", () => {
	let ignoreNextContentFrameLoad = false;
	const url = new URL(location.href);
	if (url.searchParams.has("retain")) {
		AMF.once("content-frame-load", ({ contentFrame }) => {
			const retainedSp = new URLSearchParams(
				url.searchParams.get("retain")
			);
			const newSrc = new URL(contentFrame.src);
			retainedSp.forEach((value, key) => {
				newSrc.searchParams.set(key, value);
			});
			ignoreNextContentFrameLoad = true;
			requestAnimationFrame(() => {
				contentFrame.src = `${newSrc}`;
				ignoreNextContentFrameLoad = false;
			});
		});
	}
	AMF.on("content-frame-load", ({ contentWindow }) => {
		if (ignoreNextContentFrameLoad) return;
		const retain = new URLSearchParams(contentWindow.location.search);
		retain.delete("adsess"); // already in outer url
		const url = new URL(location.href);
		url.searchParams.set("retain", `${retain}`);
		history.replaceState(null, "", `${url}`);
	});
});
