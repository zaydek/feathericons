const templateGlobalRegex = /(?!\/\/\s*)sass\.global`((?:\n.*?)+)`/gm
const templateRegex = /(?!\/\/\s*)sass(?!\.global)`((?:\n.*?)+)`/gm

function scanMatches(contents) {
	const globals = []
	const inlines = []
	let match = null
	while ((match = templateGlobalRegex.exec(contents))) {
		globals.push(match[1])
	}
	while ((match = templateRegex.exec(contents))) {
		inlines.push(match[1])
	}
	return [globals, inlines]
}

/**
 * @type { import("esbuild").Plugin }
 */
module.exports = {
	name: "sass-template",
	setup(build) {
		const fs = require("fs")
		const sass = require("sass")

		const importers = new Set()

		build.onResolve({ filter: /^esbuild:sass$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "sass-template-ns",
			}
		})

		build.onLoad({ filter: /.*/, namespace: "sass-template-ns" }, async args => {
			const globals = []
			const strings = []

			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				const [globals_, strings_] = scanMatches(buffer.toString())
				globals.push(...globals_)
				strings.push(...strings_)
			}

			let allGlobals = ""
			for (const v of globals) {
				allGlobals += `
					${v}
				`
			}

			let allInlines = ""
			for (const v of strings) {
				allInlines += `
					@at-root {
						${v}
					}
				`
			}

			const result = sass.renderSync({
				data: `
					${allGlobals}
					${allInlines}
				`,
			})
			const css = result.css.toString()

			return {
				contents: `
					import "data:text/css,${encodeURI(css)}"
					function sassTemplate() {}
					Object.assign(sassTemplate, {
						global() {}
					})
					export default sassTemplate
				`,
				loader: "js",
			}
		})
	},
}
