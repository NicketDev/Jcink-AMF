await Promise.all(
	[
		{
			minify: false
		},
		{
			minify: true,
			naming: "[dir]/[name].min.[ext]"
		}
	].map(async (options) => {
		await Bun.build({
			entrypoints: ["./src/index.ts"],
			outdir: "./dist",
			format: "iife",
			...options
		});
	})
);
