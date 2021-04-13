/**
 * @type { import("esbuild").BuildOptions }
 */
module.exports = {
	target: ["es2017"],
	plugins: [
		require("./plugins/mdxPlugin"),
		require("./plugins/sassPlugin"),
		...require("./plugins/cssScssPlugins"),
	],
}
