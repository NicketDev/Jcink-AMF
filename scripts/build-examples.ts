import { readdir } from "node:fs/promises";

const files = await readdir(`${import.meta.dir}/../examples`, {
	recursive: true
});

await Promise.all(
	files.map((file) =>
		Promise.all(
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
					entrypoints: [`${import.meta.dir}/../examples/${file}`],
					outdir: `${import.meta.dir}/../dist/examples`,
					format: "iife",
					...options
				});
			})
		)
	)
);
