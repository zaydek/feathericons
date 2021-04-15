const Duomo = {
	verbose: (() => {
		const attr = document.currentScript?.getAttribute("data-verbose")
		if (attr === undefined) {
			return true
		}
		return attr === "" || attr === "true"
	})(),
}

Duomo.localStorageThemePreference = function () {
	if (!("localStorage" in window)) {
		return null
	}
	return window.localStorage["duomo-theme-preference"]
}

Duomo.matchMediaThemePreference = function () {
	if (!("matchMedia" in window)) {
		return null
	}
	const matches = window.matchMedia("(prefers-color-scheme: dark)").matches
	return matches ? "dark" : "light"
}

Duomo.themePreference = function () {
	return Duomo.localStorageThemePreference() ?? Duomo.matchMediaThemePreference()
}

Duomo.toggleDebugMode = function () {
	const dark = document.documentElement.toggleAttribute("data-debug")
	if (Duomo.verbose === true) console.log(`duomo: [data-debug] ${dark ? "on" : "off"}`)
	return dark
}

Duomo.toggleDarkMode = function () {
	let dark = false
	if (!document.documentElement.hasAttribute("data-theme")) {
		document.documentElement.setAttribute("data-theme", "dark")
		dark = true
	} else {
		document.documentElement.removeAttribute("data-theme")
		dark = false
	}
	if (Duomo.verbose === true) console.log(`duomo: [data-theme="dark"] ${dark ? "on" : "off"}`)
	return dark
}

// if (Duomo.themePreference() === "dark") {
// 	Duomo.toggleDarkMode()
// }
//
// document.addEventListener("keydown", e => {
// 	if (e.ctrlKey === false && e.key.toLowerCase() === "d") {
// 		Duomo.toggleDebugMode()
// 	} else if (e.ctrlKey === true && e.key.toLowerCase() === "d") {
// 		Duomo.toggleDarkMode()
// 	}
// })

window.Duomo = Duomo
