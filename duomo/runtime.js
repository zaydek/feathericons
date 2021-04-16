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
	const debugMode = document.documentElement.toggleAttribute("data-debug")
	if (Duomo.verbose === true) console.log(`duomo: [data-debug] ${debugMode ? "on" : "off"}`)
	return debugMode
}

Duomo.toggleDarkModeImmediate = function () {
	const darkMode = !document.documentElement.hasAttribute("data-theme")
	if (darkMode === true) {
		document.documentElement.setAttribute("data-theme", "dark")
	} else {
		document.documentElement.removeAttribute("data-theme")
	}
	if (Duomo.verbose === true) console.log(`duomo: [data-theme="dark"] ${darkMode ? "on" : "off"}`)
	return darkMode
}

let Duomo_timeoutIDs = []
Duomo.toggleDarkMode = function () {
	// clearTimeout(Duomo_timeoutIDs)
	Duomo_timeoutIDs
		.reverse()
		.forEach(timeoutID => clearTimeout(timeoutID))

	const darkMode = !document.documentElement.hasAttribute("data-theme")
	document.documentElement.setAttribute("data-theme-effect", "true")
	Duomo_timeoutIDs.push(setTimeout(() => {
		Duomo.toggleDarkModeImmediate()
		Duomo_timeoutIDs.push(setTimeout(() => {
			document.documentElement.removeAttribute("data-theme-effect")
		}, 50))
	}, 50))
	return darkMode
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
