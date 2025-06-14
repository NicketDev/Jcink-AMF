await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./dist",
	format: "iife",
	minify: true
});
