import sass from "inline-sass"

import * as cases from "./lib/cases"
import * as Feather from "react-feather"

import dataset from "./data/dataset.generated.json"
import Tooltip from "./Tooltip"

function iota(max) {
	return Array.from(new Array(max), (_, x) => x);
}

function ItemLTR({ children }) {
	return (
		<div className="flex-row align-center m-gap-12">
			{children ?? <>
				<div className="w-16 h-16 bg-darker rounded-full"></div>
				<div className="w-96 h-8 bg-darker rounded-full"></div>
			</>}
		</div>
	)
}

function ItemLTRSmall({ children }) {
	return (
		<div className="flex-row align-center m-gap-8">
			{children ?? <>
				<div className="w-12 h-12 bg-darker rounded-full"></div>
				<div className="w-96 h-8 bg-darker rounded-full"></div>
			</>}
		</div>
	)
}

function ItemRTL({ children }) {
	return (
		<div className="flex-row align-center m-gap-12">
			{children ?? <>
				<div className="w-96 h-8 bg-darker rounded-full"></div>
				<div className="w-16 h-16 bg-darker rounded-full"></div>
			</>}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Header() {

	function SponsorButton() {
		return (
			<div className="flex-col align-center m-gap-12">
				<div className="flex-row justify-center w-192 h-48 bg-light-only rounded-full"></div>
				<div className="flex-row align-center m-gap-8">
					<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
				</div>
			</div >
		)
	}

	return (
		// Use pb-112 (64 + 48) to compensate for <TopNav className="h-48 ...">
		<div className="obscureBackground px-16 sm:px-24 py-64 pb-112 relative flex-row justify-center">

			{/* Top nav */}
			{/* <div className="hide sm:show flex-row justify-center">
				<div className="flex-row m-gap-16 w-xl">
					<div className="flex-row align-center m-gap-8">
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-grow"></div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
				</div>
			</div> */}

			{/* Obscure effect (absolute and fixed) */}
			<div className="obscureArea hide xl:show absolute top-all -z-10" style={{ top: "100%" }}>
				<div className="h-192"></div>
				<svg fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>
			<div className="obscureArea hide xl:show fixed top-all -z-10">
				<div className="h-192"></div>
				<svg fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>

			{/* <div className="flex-col xl:flex-row xl:align-center m-gap-48" style={{ width: "100%", maxWidth: `${480 / 16}rem`, backgroundColor: "red" }}> */}
			<div className="flex-col xl:flex-row xl:align-center m-gap-48 w-lg">

				{/* CTA */}
				<div className="flex-col align-center m-gap-32">
					<div className="w-64 h-64 bg-lighter-only rounded-full"></div>
					<div className="flex-col align-center m-gap-16">
						<div className="w-160 h-16 bg-lighter-only rounded-full"></div>
						<div className="w-256 h-8 bg-lighter-only rounded-full"></div>
					</div>
					{/* Use a custom <Button> because of self-stretch, sm:w-192, and
					rounded-12 sm:rounded-full */}
					{/* FIXME: Too wide. Do we need to introduce flex-shrink? */}
					<div className="self-stretch sm:self-center flex-col sm:flex-row m-gap-16">
						<div className="flex-row justify-center sm:w-192 h-48 bg-light-only rounded-12 sm:rounded-full">
							<div className="flex-row align-center m-gap-12">
								<div className="w-16 h-16 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
						</div>
						<div className="flex-row justify-center sm:w-192 h-48 bg-light-only rounded-12 sm:rounded-full">
							<div className="flex-row align-center m-gap-12">
								<div className="w-16 h-16 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
						</div>
					</div>
				</div>

				{/* Sponsors (1 of 2) */}
				<div className="hide sm:hide xl:show flex-grow"></div>
				<div className="hide sm:hide xl:show flex-col align-center m-gap-24">
					<div className="flex-row m-gap-16">
						<div className="flex-row align-center m-gap-8">
							<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
							<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						</div>
						<div className="flex-row align-center m-gap-8">
							<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
							<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						</div>
					</div>
					<div className="flex-row m-gap-16">
						<SponsorButton />
						<SponsorButton />
						<SponsorButton />
					</div>
					<div className="flex-row m-gap-16">
						<SponsorButton />
						<SponsorButton />
					</div>
				</div>

				{/* Sponsors (2 of 2) */}
				<div className="hide sm:show xl:hide flex-grow"></div>
				<div className="hide sm:show xl:hide flex-col align-center m-gap-24">
					<div className="flex-row m-gap-16">
						<div className="flex-row align-center m-gap-8">
							<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
							<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						</div>
						<div className="flex-row align-center m-gap-8">
							<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
							<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						</div>
					</div>
					{/* Add a wrapper <div> for -mx-8 and -my-12 */}
					<div>
						<div className="-mx-8 -my-12 flex-row justify-center flex-wrap">
							<div className="px-8 py-12">
								<SponsorButton />
							</div>
							<div className="px-8 py-12">
								<SponsorButton />
							</div>
							<div className="px-8 py-12">
								<SponsorButton />
							</div>
							<div className="px-8 py-12">
								<SponsorButton />
							</div>
							<div className="px-8 py-12">
								<SponsorButton />
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

// function Input(props) {
// 	const [search, setSearch] = React.useState("")
// 	return <input {...props} value={search} onChange={e => setSearch(e.target.value)} />
// }

sass.global`

@use "sass:color"; // For color.scale
@use "sass:math";  // For math.is-unitless
@use "sass:meta";  // For meta.type-of

@use "duomo" as *;
@use "duomo/mixins" as *;
@use "duomo/tailwind" as *;

@use "src/index" as *;

// Add a slight delay so the dark mode transition is not instant. Instant dark
// mode transitions actually have a blinding effect where the user feels
// overwhelmed by the immediate transition. About 250ms feels ample so the user
// can anticipate the transition without surprise.
$theme-delay: 250ms;

$enter: 200ms; // FIXME
$leave: 400ms; // FIXME

// Takes precedence
$shadow-px:              0 0 0 0.5px hsla(0, 0%, 0%, 0.1);
$shadow-px-dark:         0 0 0 0.5px hsla(0, 0%, 100%, 0.25);

$app-bg:                 tw(white);
$app-bg-dark:            color.scale(tw(cool-gray-800), $lightness: 2.5%);
$app-shadow:             (tw(shadow-sm), tw(shadow-md));
$app-shadow-dark:        ($shadow-px-dark, tw(shadow-sm), tw(shadow-md));
$app-border-color:       tw(cool-gray-200);
$app-border-color-dark:  tw(black);

$placeholder-color:      tw(cool-gray-400);
$placeholder-color-dark: tw(cool-gray-600);
$text-color:             tw(cool-gray-800);
$text-color-dark:        tw(cool-gray-200);

.obscure {
	&Background {
		// background-color: #0066ff;
		background-color: tw(blue-600);
	}
	&Area {
		// > svg { color: #0066ff; }
		> svg { color: tw(blue-600); }
		// > div { background-color: #0066ff; }
		> div { background-color: tw(blue-600); }
	}
}

* {
	@include reset {
		// https://stackoverflow.com/a/29961714
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
	}
}

:root {
	@include antialiased;
	@include background-color(
		tw(cool-gray-100),
		tw(cool-gray-900),
	);
}

// TODO
.bg {
	&-light-only {
		background-color: tw(cool-gray-200);
	}
	&-lighter-only {
		background-color: tw(cool-gray-300);
	}
	&-dark {
		@include background-color(
			tw(cool-gray-200),
			tw(cool-gray-700),
		);
	}
	&-darker {
		@include background-color(
			tw(cool-gray-300),
			tw(cool-gray-600),
		);
	}
}

hr,
[class*="border"] {
	@include border-color(
		$app-border-color,
		$app-border-color-dark,
	);
}

`

function SVG({ svg: SVG_, ...props }) {
	return <SVG_ {...props} />
}

function encodeURL(str) {
	return encodeURI(str.replace(/\s/g, "+"))
}
function decodeURL(str) {
	return decodeURI(str.replace(/\+/g, " "))
}

function SearchBar() {
	const searchBarInputRef = React.useRef(null)

	const [searchInputValue, setSearchInputValue] = React.useState(() => {
		const search = window.location.search.slice("?search=".length)
		if (search === "") return ""
		return decodeURL(search)
	})
	const [searchInputHasFocus, setSearchInputHasFocus] = React.useState(false)

	// TODO: Change to localStorage?
	const [copyAsJSX, setCopyAsJSX] = React.useState(false)
	const [enableDarkMode, setEnableDarkMode] = React.useState(() => document.documentElement.getAttribute("data-theme") === "dark")

	// Focus effect
	React.useEffect(() => {
		function handleKeyDown(e) {
			switch (e.keyCode) {
			// "esc"
			case 27:
				e.preventDefault()
				if (document.activeElement !== searchBarInputRef.current) {
					searchBarInputRef.current.focus()
				} else {
					searchBarInputRef.current.blur()
				}
				return
			// "/"
			case 191:
				e.preventDefault()
				searchBarInputRef.current.focus()
				return
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	// URL effect
	React.useEffect(() => {
		const search = encodeURL(searchInputValue)
		if (search === "") {
			// Reset to the current pathname
			window.history.replaceState({}, "", window.location.pathname)
		} else {
			window.history.replaceState({}, "", `?search=${search}`)
		}
	}, [searchInputValue])

	// // Dark mode getter effect (get <html data-theme="dark">)
	// React.useEffect(() => {
	// 	const obs = new MutationObserver(muts => {
	// 		for (const mut of muts) {
	// 			setEnableDarkMode(mut.target.getAttribute("data-theme") === "dark")
	// 		}
	// 	})
	// 	obs.observe(document.documentElement, { attributes: true })
	// 	return () => obs.disconnect()
	// }, [])

	// Dark mode setter effect (set <html data-theme="dark">)
	const onceRef = React.useRef(false)
	React.useEffect(() => {
		if (onceRef.current === false) {
			onceRef.current = true
			return
		}
		window.Duomo.toggleDarkMode()
	}, [enableDarkMode])

	return (
		// Use z-20 because sidebarIconPane uses z-10
		<div className="xl:-mt-16 xl:pt-16 sticky top-all z-20">

			{sass`
				.searchBar {
					&SearchSVG {
						@include color(
							$placeholder-color,
							$placeholder-color-dark,
						);
						@include transition(200ms, (color), tw(ease-out));

						// TODO: This fires on button focus so use inline styles instead?
						.searchBar:focus-within & {
							color: tw(blue-500);
						}
					}

					&Input {
						@include reset {
							width: 100%;
							background-color: unset;
							&:focus { outline: unset; }
						}
						@include padding-x(
							rem(16 + 40 + 16),          // LHS buttons
							rem(16 + 40 + 8 + 40 + 16), // RHS buttons
						);
						// Prefer 1.5 for WebKit
						font: rem(20) / 1.5 tw(sans);
						@include color(
							$text-color,
							$text-color-dark,
						);
						@include background-color(
							$app-bg,
							$app-bg-dark,
						);
						&::placeholder {
							@include color(
								$placeholder-color,
								$placeholder-color-dark,
							);
						}
						// Do not use &::selection, &::-moz-selection (as one)
						&::selection {
							@include background-color(
								tw(blue-200),
								tw(blue-500),
							);
						}
						&::-moz-selection {
							@include background-color(
								tw(blue-200),
								tw(blue-500),
							);
						}
					}
				}
			`}

			<div className="searchBar relative">

				{/* LHS */}
				<div className="absolute left-all pointer-events-none">
					<div className="px-16 flex-row h-full">
						<div className="p-8 flex-row align-center">
							<Feather.Search className="searchBarSearchSVG w-24 h-24" />
						</div>
					</div>
				</div>

				<input
					ref={searchBarInputRef}
					type="text"
					className="searchBarInput h-80 border-bottom-1 rounded-top-left-24"
					placeholder={window.innerWidth <= 512
						? "Search"
						: (!searchInputHasFocus ? `Search (Tap \`/\` to Focus)` : "")}
					value={searchInputValue}
					onChange={e => setSearchInputValue(e.target.value)}
					onFocus={e => setSearchInputHasFocus(true)}
					onBlur={e => setSearchInputHasFocus(false)}
					spellCheck={false}
				/>

				{sass`
					// Use [data-checked] for :checked because buttons (<button>) cannot
					// use type="checkbox"
					.searchBar {
						&Button {
							@include reset {
								&:focus { outline: none }
							}
							background-color: color.scale(tw(blue-500), $alpha: -90%);
							@include transition(200ms, (background-color), tw(ease-out));
							&:hover,
							&:focus {
								background-color: color.scale(tw(blue-500), $alpha: -80%);
							}
							&[data-checked="true"] {
								background-color: tw(blue-500);
							}
							&SVG {
								color: tw(blue-500);
								@include transition(200ms, (color), tw(ease-out));
								.searchBarButton[data-checked="true"] & {
									color: tw(white);
								}
							}
						}
					}
				`}

				{/* RHS */}
				<div className="absolute right-all">
					<div className="px-16 flex-row h-full">

						{/* Button */}
						<div className="hoverArea px-4 pl-0 relative flex-row align-center h-full pointer-events-auto">
							<button className="searchBarButton focusArea p-8 rounded-full" onClick={e => setCopyAsJSX(!copyAsJSX)} data-checked={copyAsJSX}>
								<Tooltip>
									{!copyAsJSX
										? "Tap to Enable Copy as JSX"
										: "Tap to Enable Copy as HTML"}
								</Tooltip>
								<Feather.Code className="searchBarButtonSVG" />
							</button>
						</div>

						{/* Button */}
						<div className="hoverArea px-4 pr-0 relative flex-row align-center h-full pointer-events-auto">
							<button className="searchBarButton focusArea p-8 rounded-full" onClick={e => setEnableDarkMode(!enableDarkMode)} data-checked={enableDarkMode}>
								<Tooltip>
									{!enableDarkMode
										? "Tap to Enable Dark Mode"
										: "Tap to Enable Light Mode"}
								</Tooltip>
								<SVG svg={Feather.Moon} className="searchBarButtonSVG" />
							</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default function App() {

	// React.useEffect(() => {
	// 	let animationFrame = 0
	// 	function virtualScroller(targets, { offset, topOffset, bottomOffset } = {}) {
	// 		offset ??= 0
	// 		topOffset ??= offset ?? 0
	// 		bottomOffset ??= offset ?? 0
	// 		cancelAnimationFrame(animationFrame)
	// 		animationFrame = window.requestAnimationFrame(() => {
	// 			for (let x = 0, len = targets.length; x < len; x++) {
	// 				let target = targets[x]
	// 				const { top, bottom } = target.getBoundingClientRect()
	// 				//
	// 				// +----------+ <- offset
	// 				// |//////////|
	// 				// +----------+ <- t
	// 				// |          |
	// 				// |          |
	// 				// +----------+ <- b
	// 				// |//////////|
	// 				// +----------+ <- offset
	// 				//
	// 				const t = -1 * bottom
	// 				const b = (window.scrollY + top) - (window.scrollY + window.innerHeight)
	// 				if (t > topOffset) {
	// 					target.style.visibility = "hidden"
	// 				} else if (b > bottomOffset) {
	// 					target.style.visibility = "hidden"
	// 					for (x++; x < len; x++) {
	// 						target = targets[x]
	// 						target.style.visibility = "hidden"
	// 					}
	// 					return
	// 				} else {
	// 					target.style.visibility = ""
	// 				}
	// 			}
	// 		})
	// 	}
	// 	const targets = document.getElementsByClassName("searchResultsButton")
	// 	function handleScroll(e) {
	// 		virtualScroller(targets, {
	// 			offset: 2 * window.innerHeight,
	// 		})
	// 	}
	// 	virtualScroller(targets, {
	// 		offset: 2 * window.innerHeight,
	// 	})
	// 	document.addEventListener("scroll", handleScroll, false)
	// 	return () => document.removeEventListener("scroll", handleScroll, false)
	// }, [])

	return (
		<>

			{/* Top nav */}
			<div className="hide sm:show px-16 sm:px-24 py-16 flex-row justify-center">
				<div className="flex-row m-gap-16 w-xl">
					<div className="flex-row align-center m-gap-8">
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-grow"></div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
				</div>
			</div>

			{/* Header */}
			<Header />

			{/* App */}
			<div className="flex-row justify-center">

				{sass`
					.app {
						@include background-color(
							$app-bg,
							$app-bg-dark,
						);
						@include box-shadow(
							$app-shadow,
							$app-shadow-dark,
						);
					}
				`}

				<div className="app w-xl xl:rounded-24">

					{/* Obscure effect */}
					<div className="hide xl:show -mx-8 -mb-24 sticky top-all z-20 pointer-events-none">
						<div className="obscureArea flex-row">
							<div className="w-8 h-40"></div>
							<svg className="w-24 h-40" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M24 0H0V40C0 26.7451 10.7451 16 24 16V0Z" />
							</svg>
							<div className="flex-grow h-16"></div>
							<svg className="w-24 h-40" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M0 0H24V40C24 26.7451 13.2549 16 0 16V0Z" />
							</svg>
							<div className="w-8 h-40"></div>
						</div>
					</div>

					{/* Defer flex-row to here not w-xl because of the obscure effect */}
					<div className="flex-row">

						{/* LHS */}
						<div className="flex-grow">

							<SearchBar />

							{sass`
								.searchResults {
									// // TODO
									// // Use relative to make fast scrolling less buggy
									// position: relative;
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(rem(128), 1fr));
									// grid-auto-rows: rem(128);

									&Button {
										@include reset {
											&:focus { outline: none; }
										}
										position: relative;

										// Use ::before not ::after
										&::before {
											@include zero-out { content: ""; }
											// TODO
											@include background-color(
												color.scale(tw(blue-500), $alpha: -90%), // Use 90% not 80%
												tw(blue-500),
											);
											border-radius: 9999px;
											opacity: 0;
											transform: scale(0);
											@include transition($leave, (opacity, transform), tw(ease-out));
										}

										// Use &:hover::before { ... } (&::before:hover does not work)
										&:hover::before,
										&:focus::before {
											opacity: 1;
											transform: scale(0.618);
											@include transition($enter, (opacity, transform), tw(ease-out));
										}

										&SVG {
											@include color(
												tw(cool-gray-800),
												tw(cool-gray-200),
											);
											@include transition($leave, (color), tw(ease-out));

											.searchResultsButton:hover &,
											.searchResultsButton:focus & {
												@include color(
													tw(blue-500),
													tw(white), // Use white not cool-gray-200
												);
												@include transition($enter, (color), tw(ease-out));
											}
										}
									}
								}
							`}

							<div className="searchResults px-16 pb-64 xl:p-64">
								{Object.keys(dataset).map(k => (
									// <button key={k} className="searchResultsButton" style={{ transition: "500ms opacity cubic-bezier(0, 0, 0.2, 1)" }}>
									<button key={k} className="searchResultsButton aspect aspect-w-1 aspect-h-1">
										<div className="flex-row center">
											{React.createElement(Feather[cases.titleCase(k)], {
												className: "searchResultsButtonSVG w-32 h-32",
											})}
										</div>
										<div className="relative">
											<div className="absolute bottom-all">

												{sass`
													$font-size: 12;
													$svg-size:  14;
													$gap:        6;

													$enter: 100ms; // Make shorter
													$leave: 200ms; // Make shorter

													.searchResultsTextbox {
														@include reset {
															&:focus { outline: none; }
														}

														> * + * {
															margin-left: rem($gap);
														}

														&Text {
															@include unantialiased;
															text-align: center;
															font: rem($font-size) / 1.25 tw(mono);
															@include color(
																tw(cool-gray-600),
																tw(cool-gray-400),
															);
															transform: translateX(rem(((($font-size + $svg-size) / 2) + $gap) / 2));
															@include transition($leave, (color, transform), tw(ease-out));

															// // TODO
															// cursor: text;
															// user-select: text; // TODO: Do we need this?

															.searchResultsTextbox:hover & {
																@include color(
																	tw(blue-500),
																	tw(white), // Use white not cool-gray-200
																);
																transform: translateX(0); // Reset
																@include transition($enter, (color, transform), tw(ease-out), 100ms);
															}
														}

														&SVG {
															@include size(rem($svg-size));
															color: transparent;
															transform: translateX(rem(-1 * ((($font-size + $svg-size) / 2) + $gap) / 2));
															@include transition($leave, (color, transform), tw(ease-out));
															.searchResultsTextbox:hover & {
																@include color(
																	tw(blue-500),
																	tw(white), // Use white not cool-gray-200
																);
																transform: translateX(0); // Reset
																@include transition($enter, (color, transform), tw(ease-out), 100ms);
															}
														}
													}
												`}

												{/* Use Sass for m-gap; $gap */}
												<a href={`/${k}`} className="searchResultsTextbox py-8 flex-row center" tabIndex={-1}>
													<div className="searchResultsTextboxText">{k}</div>
													<Feather.Link2 className="searchResultsTextboxSVG" />
												</a>

											</div>
										</div>
									</button>
								))}
							</div>

						</div>

						{/* RHS */}
						<div className="hide md:show w-320 border-left-1 rounded-right-24">
							<div className="xl:-mt-16 xl:pt-16 sticky top-all z-10">

								{/* Top */}
								<div className="relative">

									{sass`
										.sidebarIconPane {
											@include background-color(
												$app-bg,
												$app-bg-dark,
											);
										}
									`}

									<div className="sidebarIconPane flex-row center h-320 border-bottom-1 rounded-top-right-24">
										<div className="w-64 h-64 bg-dark rounded-full"></div>
										<div className="absolute top-all">
											<div className="p-24 flex-row align-center h-full">
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-dark rounded-full"></div>
											</div>
										</div>
										<div className="absolute bottom-all">
											<div className="p-24 flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-dark rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-dark rounded-full"></div>
											</div>
										</div>
									</div>
								</div>

								{/* Body */}
								{iota(2).map(key => (
									<React.Fragment key={key}>
										{key > 0 && <hr />}
										<div className="p-24 flex-col m-gap-16">

											{/* Top */}
											<div className="flex-row align-center m-gap-16 h-full">
												<div className="w-96 h-8 bg-dark rounded-full"></div>
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-dark rounded-full"></div>
											</div>

											{/* Bottom */}
											<div className="flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-dark rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-dark rounded-full"></div>
											</div>

										</div>
									</React.Fragment>
								))}

								<hr />
								<div className="p-24 flex-row m-gap-16">
									<div className="w-128">
										<div className="aspect aspect-w-6 aspect-h-4 bg-dark rounded-4"></div>
									</div>
									<div className="flex-grow">
										<div className="flex-col m-gap-6 h-full">
											<div className="w-stagger-1 h-6 bg-dark rounded-full"></div>
											<div className="w-stagger-2 h-6 bg-dark rounded-full"></div>
											<div className="w-stagger-3 h-6 bg-dark rounded-full"></div>
											<div className="w-stagger-4 h-6 bg-dark rounded-full"></div>
											<div className="flex-grow"></div>
											<div className="self-end w-stagger-1 h-6 bg-dark rounded-full"></div>
										</div>
									</div>
								</div>

								{/* <hr /> */}

							</div>
						</div>

					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="hide xl:show h-64"></div>

		</>
	)
}
