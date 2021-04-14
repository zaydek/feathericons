// Scans for css`/* CSS code */`
const cssRe = /(?!\/\/\s*)css`((?:\n.*?)+)`/gm

// Scans for scss.global`/* Sass code */`
const sassGlobalRe = /(?!\/\/\s*)sass\.global`((?:\n.*?)+)`/gm

// Scans for sass`/* Sass code */`
const sassInlineRe = /(?!\/\/\s*)sass(?!\.global)`((?:\n.*?)+)`/gm

function scanCSSMatches(contents) {
	const matches = []
	let match = null
	while ((match = cssRe.exec(contents))) {
		matches.push(match[1])
	}
	return matches
}

function scanSassMatches(contents) {
	const globals = []
	const inlines = []
	let match = null
	while ((match = sassGlobalRe.exec(contents))) {
		globals.push(match[1])
	}
	while ((match = sassInlineRe.exec(contents))) {
		inlines.push(match[1])
	}
	return [globals, inlines]
}

/**
 * @type { import("esbuild").Plugin }
 */
const inlineCSSPlugins = {
	name: "inline-css",
	setup(build) {
		const fs = require("fs")

		const importers = new Set()

		build.onResolve({ filter: /^inline-css$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "inline-css-ns",
			}
		})
		build.onLoad({ filter: /.*/, namespace: "inline-css-ns" }, async args => {
			const matches = []
			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				matches.push(...scanCSSMatches(buffer.toString()))
			}

			let css = ""
			for (const match of matches) {
				if (css !== "") css += "\n"
				css += match
			}

			return {
				contents: `
					import "data:text/css,${encodeURI(css)}"
					export default function () {}
				`,
				loader: "js",
			}
		})
	},
}

/**
 * @type { import("esbuild").Plugin }
 */
const inlineSassPlugin = {
	name: "inline-sass",
	setup(build) {
		const fs = require("fs")
		const scss = require("sass")

		const importers = new Set()

		build.onResolve({ filter: /^inline-sass$/ }, args => {
			importers.add(args.importer)
			return {
				path: args.path,
				namespace: "inline-sass-ns",
			}
		})
		build.onLoad({ filter: /.*/, namespace: "inline-sass-ns" }, async args => {
			const globals = [], inlines = []
			for (const importer of importers) {
				const buffer = await fs.promises.readFile(importer)
				const [globals_, inlines_] = scanSassMatches(buffer.toString())
				globals.push(...globals_)
				inlines.push(...inlines_)
			}

			let allGlobals = ""
			for (const global of globals) {
				allGlobals += `
					${global}
				`
			}

			let allInlines = ""
			for (const inline of inlines) {
				allInlines += `
					@at-root {
						${inline}
					}
				`
			}

			const result = scss.renderSync({
				data: `
					${allGlobals}
					${allInlines}
				`,
			})
			const css = result.css.toString()

			return {
				contents: `
					import "data:text/css,${encodeURI(css)}"
					function scss() {}
					Object.assign(scss, {
						global() {}
					})
					export default scss
				`,
				loader: "js",
			}
		})
	},
}

module.exports = [
	inlineCSSPlugins,
	inlineSassPlugin,
]
