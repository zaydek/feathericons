function alpha(ch: string): boolean {
	return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")
}

function digit(ch: string): boolean {
	return ch >= "0" && ch <= "9"
}

// toKebabCase("HelloWorld") -> "hello-world"
// toKebabCase("HelloWorld2") -> "hello-world-2"
// toKebabCase("HelloWorld22") -> "hello-world-22"
//
export function kebabCase(str: string): string {
	let out = ""
	for (let x = 0; x < str.length; x++) {
		const ch = str[x]!
		if (x > 0 && ch >= "A" && ch <= "Z") {
			out += "-" + ch.toLowerCase()
			continue
		} else if ((x > 0 && digit(ch)) && (x - 1 >= 0 && alpha(str[x - 1]!))) {
			out += "-" + ch
			continue
		}
		out += ch.toLowerCase()
	}
	return out
}

// toTitleCase("hello-world") -> "HelloWorld"
// toTitleCase("hello-world-2") -> "HelloWorld2"
// toTitleCase("hello-world-22") -> "HelloWorld22"
//
export function titleCase(str: string): string {
	return str.split("-").map(v => v.slice(0, 1).toUpperCase() + v.slice(1)).join("")
}
