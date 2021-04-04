const Duomo = {
	verbose: (() => {
		const attr = document.currentScript?.getAttribute("data-verbose")
		if (attr === undefined) {
			return true
		}
		return attr === "" || attr === "true"
	})(),
}

Duomo.getThemeDurationMS = function () {
	const durStr = window.getComputedStyle(document.documentElement).getPropertyValue("--theme-dur").trim()
	switch (true) {
		case durStr.endsWith("ms"): // Takes precedence
			return +durStr.slice(durStr, -"ms".length)
		case durStr.endsWith("s"):
			return +durStr.slice(durStr, -"s".length) * 1_000
	}
	return 0
}

Duomo.getThemeTiming = function () {
	return window.getComputedStyle(document.documentElement).getPropertyValue("--theme-timing").trim()
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

let timeoutID = 0
Duomo.toggleDarkMode = function () {
	if (timeoutID !== 0) clearTimeout(timeoutID)
	document.documentElement.setAttribute("data-theme-effect", "true")
	timeoutID = setTimeout(() => {
		document.documentElement.removeAttribute("data-theme-effect")
		timeoutID = 0 // Reset
	}, Duomo.getThemeDurationMS())

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

if (Duomo.themePreference() === "dark") {
	Duomo.toggleDarkMode()
}

document.addEventListener("keydown", e => {
	if (e.ctrlKey === false && e.key.toLowerCase() === "d") {
		Duomo.toggleDebugMode()
	} else if (e.ctrlKey === true && e.key.toLowerCase() === "d") {
		Duomo.toggleDarkMode()
	}
})

window.Duomo = Duomo
