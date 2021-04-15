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
				<div className="flex-row justify-center w-192 h-48 bg-dark rounded-full"></div>
				<ItemLTRSmall />
			</div >
		)
	}

	return (
		// Use pb-112 (64 + 48) to compensate for <TopNav className="h-48 ...">
		<div className="obscureBackground px-16 sm:px-24 py-64 pb-112 relative flex-row justify-center">

			{/* Obscure effect (absolute and fixed) */}
			<div className="obscureArea absolute top-all -z-10" style={{ top: "100%" }}>
				<div className="h-192"></div>
				<svg fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>
			<div className="obscureArea fixed top-all -z-10">
				<div className="h-192"></div>
				<svg fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>

			<div className="flex-col xl:flex-row xl:align-center m-gap-48 w-lg">

				{/* CTA */}
				<div className="flex-col align-center m-gap-32">
					<div className="w-64 h-64 bg-darker rounded-full"></div>
					<div className="flex-col align-center m-gap-16">
						<div className="w-160 h-16 bg-darker rounded-full"></div>
						<div className="w-256 h-8 bg-darker rounded-full"></div>
					</div>
					{/* Use a custom <Button> because of self-stretch, sm:w-192, and
					rounded-12 sm:rounded-full */}
					<div className="self-stretch sm:self-center flex-col sm:flex-row m-gap-16">
						<div className="flex-row justify-center sm:w-192 h-48 bg-dark rounded-12 sm:rounded-full">
							<ItemLTR />
						</div>
						<div className="flex-row justify-center sm:w-192 h-48 bg-dark rounded-12 sm:rounded-full">
							<ItemLTR />
						</div>
					</div>
				</div>

				{/* Sponsors (1 of 2) */}
				<div className="hide sm:hide xl:show flex-grow"></div>
				<div className="hide sm:hide xl:show flex-col align-center m-gap-24">
					<div className="flex-row m-gap-16">
						<ItemLTRSmall />
						<ItemLTRSmall />
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
						<ItemLTRSmall />
						<ItemLTRSmall />
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

// $fast: 100ms;
// $slow: 200ms;
// $slower: 300ms;

$theme-dur: 0ms;

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
$app-shadow:             ($shadow-px, tw(shadow-xs), tw(shadow-sm));
$app-shadow-dark:        ($shadow-px-dark, tw(shadow-xs), tw(shadow-sm));
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

// $obscure: tw(blue-500);
// $obscure-hsl: ( // Must use hsl for url-based SVG
// 	math.floor(color.hue($obscure)),
// 	math.floor(color.saturation($obscure)),
// 	math.floor(color.lightness($obscure)),
// );

:root {
	@include antialiased;
	@include theme((
		background-color: (
			tw(cool-gray-100),
			tw(cool-gray-900),
		),
	));
}

// body {
// 	$h: rem(472);
// 	background-image:
// 		url("data:image/svg+xml,%3Csvg fill='hsl(#{$obscure-hsl})' viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' /%3E%3C/svg%3E"),
// 		url("data:image/svg+xml,%3Csvg fill='hsl(#{$obscure-hsl})' viewBox='0 0 16 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 1C4 1 1.33333 0.333333 0 0H16C14.6667 0.333333 12 1 8 1Z' /%3E%3C/svg%3E");
// 	background-repeat:
// 		repeat-x,
// 		no-repeat;
// 	background-size:
// 		$h,
// 		100%;
// 	// background-attachment:
// 	// 	fixed,
// 	// 	fixed;
// 	background-position:
// 		0 0,
// 		0 $h;
//
// 	> * {
// 		$h: rem(128);
// 		background-image:
// 			url("data:image/svg+xml,%3Csvg fill='hsl(#{$obscure-hsl})' viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' /%3E%3C/svg%3E"),
// 			url("data:image/svg+xml,%3Csvg fill='hsl(#{$obscure-hsl})' viewBox='0 0 16 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 1C4 1 1.33333 0.333333 0 0H16C14.6667 0.333333 12 1 8 1Z' /%3E%3C/svg%3E");
// 		background-repeat:
// 			repeat-x,
// 			no-repeat;
// 		background-size:
// 			$h,
// 			100%;
// 		background-attachment:
// 			fixed,
// 			fixed;
// 		background-position:
// 			0 0,
// 			0 $h;
// 	}
// }

.bg-dark {
	@include theme((
		background-color: (
			tw(cool-gray-200),
			tw(cool-gray-700),
		),
	));
}

.bg-darker {
	@include theme((
		background-color: (
			tw(cool-gray-300),
			tw(cool-gray-600),
		),
	));
}

hr,
[class*="border"] {
	@include theme((
		border-color: (
			$app-border-color,
			$app-border-color-dark,
		),
	));
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
	const once = React.useRef(false)
	React.useEffect(() => {
		if (once.current === false) {
			once.current = true
			return
		}
		// window.Duomo.toggleDarkMode()

		document.documentElement.setAttribute("data-theme-effect", "true")
		setTimeout(() => {
			Duomo.toggleDarkMode()
			setTimeout(() => {
				document.documentElement.removeAttribute("data-theme-effect")
			}, 1_000)
		}, 10)

		// if (enableDarkMode) {
		// 	document.documentElement.setAttribute("data-theme", "dark")
		// } else {
		// 	document.documentElement.removeAttribute("data-theme")
		// }
	}, [enableDarkMode])

	return (
		// Use z-20 because sidebarIconPane uses z-10
		<div className="xl:-mt-16 xl:pt-16 sticky top-all z-20">

			{sass`
				.searchBar {
					&SearchSVG {
						@include theme((
							color: (
								$placeholder-color,
								$placeholder-color-dark,
							),
						));
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
						font: rem(20) / 1 tw(sans);
						@include theme((
							color: (
								$text-color,
								$text-color-dark,
							),
							background-color: (
								$app-bg,
								$app-bg-dark,
							),
						));
						&::placeholder {
							@include theme((
								color: (
									$placeholder-color,
									$placeholder-color-dark,
								),
							));
						}
						// Do not use &::selection, &::-moz-selection (as one)
						&::selection {
							@include theme((
								background-color: (
									tw(blue-200),
									tw(blue-500),
								),
							));
						}
						&::-moz-selection {
							@include theme((
								background-color: (
									tw(blue-200),
									tw(blue-500),
								),
							));
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
					placeholder={!searchInputHasFocus ? `Search (Tap \`/\` to Focus)` : ""}
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
					<div className="-mx-4 px-16 flex-row h-full">

						{/* Button */}
						<div className="hoverArea px-4 relative flex-row align-center h-full pointer-events-auto">
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
						<div className="hoverArea px-4 relative flex-row align-center h-full pointer-events-auto">
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

	return (
		<>
			{/* Top nav */}
			<div className="hide sm:show px-16 sm:px-24 py-16 flex-row justify-center">
				<div className="flex-row m-gap-16 w-xl">
					<ItemLTR />
					<div className="flex-grow"></div>
					<ItemRTL />
					<ItemRTL />
				</div>
			</div>

			{/* Header */}
			<Header />

			{/* App */}
			<div className="flex-row justify-center">
				{sass`
					.app {
						@include theme((
							background-color: ($app-bg, $app-bg-dark),
							box-shadow: ($app-shadow, $app-shadow-dark),
						));
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
									// TODO
									// Use relative to make fast scrolling less buggy
									position: relative;
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(rem(128), 1fr));

									&Button {
										@include reset {
											&:focus { outline: none; }
										}
										position: relative;

										// Use ::before not ::after
										&::before {
											@include zero-out { content: ""; }
											@include theme((
												background-color: (
													// TODO
													color.scale(tw(blue-500), $alpha: -90%), // Use 90% not 80%
													tw(blue-500),
												),
											));
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
											@include theme((
												color: (
													tw(cool-gray-800),
													tw(cool-gray-200),
												),
											));
											@include transition($leave, (color), tw(ease-out));

											.searchResultsButton:hover &,
											.searchResultsButton:focus & {
												@include theme((
													color: (
														tw(blue-500),
														tw(white), // Use white not cool-gray-200
													),
												));
												@include transition($enter, (color), tw(ease-out));
											}
										}
									}
								}
							`}

							<div className="searchResults px-16 xl:p-64 xl:pb-96">
								{Object.keys(dataset).slice(0, 64).map(k => (
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
															@include theme((
																color: (
																	tw(cool-gray-600),
																	tw(cool-gray-400),
																),
															));
															transform: translateX(rem(((($font-size + $svg-size) / 2) + $gap) / 2));
															@include transition($leave, (color, transform), tw(ease-out));

															// // TODO
															// cursor: text;
															// user-select: text; // TODO: Do we need this?

															.searchResultsTextbox:hover & {
																@include theme((
																	color: (
																		tw(blue-500),
																		tw(white), // Use white not cool-gray-200
																	),
																));
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
																@include theme((
																	color: (
																		tw(blue-500),
																		tw(white), // Use white not cool-gray-200
																	),
																));
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
											@include theme((
												background-color: (
													$app-bg,
													$app-bg-dark,
												),
											));
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

			<div className="hide xl:show h-64"></div>
		</>
	)
}
