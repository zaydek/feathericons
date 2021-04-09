const mdxPlugin = {
	name: "mdx",
	setup(build) {
		const fs = require("fs")
		const mdx = require("@mdx-js/mdx")
		const prism = require("prismjs")

		build.onLoad({ filter: /\.mdx$/ }, async args => {
			const text = await fs.promises.readFile(args.path, "utf8")

			// Preprocess code on the server
			let serverText = ""
			const arr = text.split("\n")

			top:
			for (let x = 0; x < arr.length; x++) {
				if (arr[x].startsWith("```")) {
					const x1 = x
					x++
					for (; x < arr.length; x++) {
						if (arr[x] === "```") {
							const x2 = x

							const code = arr.slice(x1 + 1, x2).join("\n")
							const lang = arr[x1].slice(3)

							let out = ""
							if (lang === "") {
								out = `<pre><code class="language-plaintext>${code}</code></pre>`
									.replace(/class=/g, `className=`) // For JSX
									.replace(/({|})/g, `{"$1"}`)      // For JSX
									.replace(/\n/g, `{"\\n"}`)        // For JSX
							} else {
								out = `<pre><code class="language-${lang}">${prism.highlight(code, Prism.languages[lang], lang)}</code></pre>`
									.replace(/class=/g, `className=`) // For JSX
									.replace(/({|})/g, `{"$1"}`)      // For JSX
									.replace(/\n/g, `{"\\n"}`)        // For JSX
							}

							if (x > 0) serverText += "\n"
							serverText += out
							continue top
						}
					}
				}
				if (x > 0) serverText += "\n"
				serverText += arr[x]
			}

			const contents = await mdx(serverText)
			return {
				contents: `
					import { mdx } from "@mdx-js/react"
					${contents}
				`,
				loader: "jsx",
			}
		})
	},
}

const sassPlugin = {
	name: "scss",
	setup(build) {
		const sass = require("sass")

		build.onLoad({ filter: /\.scss$/ }, args => {
			const result = sass.renderSync({ file: args.path })
			return {
				contents: result.css.toString(),
				loader: "css",
			}
		})
	},
}

module.exports = {
	target: ["es2017"],
	plugins: [
		mdxPlugin,
		sassPlugin,
	],
}
