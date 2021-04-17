import sass from "esbuild:sass"

import * as cases from "./lib/cases"
import * as Feather from "react-feather"

import dataset from "./data/dataset.generated.json"
import StyledTooltip from "./StyledTooltip"

sass.global`

@use "sass:color"; // For color.scale
@use "sass:math";  // For math.is-unitless
@use "sass:meta";  // For meta.type-of

@use "duomo" as *;
@use "duomo/mixins" as *;
@use "duomo/tailwind" as *;

@use "src/index" as *;

$enter: 200ms; // FIXME
$leave: 400ms; // FIXME

// Takes precedence
$shadow-px:              0 0 0 0.5px hsla(0, 0%, 0%, 0.1);
$shadow-px-dark:         0 0 0 0.5px hsla(0, 0%, 100%, 0.25); // TODO: Deprecate?

$app-bg:                 tw(white);
$app-bg-dark:            tw(cool-gray-800);
$app-shadow:             (tw(shadow-sm), tw(shadow-md));
$app-shadow-dark:        (tw(shadow-sm), tw(shadow-md)); // TODO: Deprecate?
$app-border-color:       tw(cool-gray-200);
$app-border-color-dark:  tw(black);

$placeholder-color:      tw(cool-gray-400);
$placeholder-color-dark: tw(cool-gray-600);
$text-color:             tw(cool-gray-800);
$text-color-dark:        tw(cool-gray-200);

.sass-Obscure {
	&SVG     { color: tw(blue-600); }
	&Element { background-color: tw(blue-600); }
}

:root {
	@include antialiased;
	@include background-color(tw(cool-gray-100), tw(cool-gray-900));
}

.bg {
	&-light-only   { background-color: tw(cool-gray-200); }
	&-lighter-only { background-color: tw(cool-gray-300); }
	&-dark         { @include background-color(tw(cool-gray-200), tw(cool-gray-700)); }
	&-darker       { @include background-color(tw(cool-gray-300), tw(cool-gray-600)); }
}

hr,
[class*="border"] {
	@include border-color($app-border-color, $app-border-color-dark);
}

`

function SVG({ svg: SVG_, ...props }) {
	return <SVG_ {...props} />
}

function encodeURL(str) { return encodeURI(str.replace(/\s/g, "+")) }
function decodeURL(str) { return decodeURI(str.replace(/\+/g, " ")) }

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

function Header() {
	return (
		// Use pb-112 (64 + 48) to compensate for <TopNav className="h-48 ...">
		<div className="sass-ObscureElement px-16 sm:px-24 py-64 pb-112 relative flex-row justify-center">

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

			{/* Obscure effect */}
			<div className="hide xl:show absolute top-all -z-10" style={{ top: "100%" }}>
				<div className="sass-ObscureElement h-192"></div>
				<svg className="sass-ObscureSVG" fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>
			<div className="hide xl:show fixed top-all -z-10">
				<div className="sass-ObscureElement h-192"></div>
				<svg className="sass-ObscureSVG" fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
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
		// Use z-20 because sass-SidebarToolboxPreview uses z-10
		<div className="xl:-mt-16 xl:pt-16 sticky top-all z-20">

			{sass`
				.sass-SearchBar {
					&SearchSVG {
						@include transition(200ms, (color), tw(ease-out)) {
							@include color($placeholder-color, $placeholder-color-dark);
						}

						// TODO: This fires on button focus so use inline styles instead?
						.sass-SearchBar:focus-within & {
							color: tw(blue-500);
						}
					}

					&Input {
						// Reset
						width: 100%;
						background-color: unset;

						@include padding-x(rem(16 + 40 + 16), rem(16 + 40 + 8 + 40 + 16));
						font: rem(20) / 1.5 tw(sans);
						@include color($text-color, $text-color-dark);
						@include background-color($app-bg, $app-bg-dark);

						&::placeholder    { @include color($placeholder-color, $placeholder-color-dark); }
						&::selection      { @include background-color(tw(blue-200), tw(blue-500)); }
						&::-moz-selection { @include background-color(tw(blue-200), tw(blue-500)); }
					}
				}
			`}

			<div className="sass-SearchBar relative">

				{/* LHS */}
				<div className="absolute left-all pointer-events-none">
					<div className="px-16 flex-row h-full">
						<div className="p-8 flex-row align-center">
							<Feather.Search className="sass-SearchBarSearchSVG w-24 h-24" />
						</div>
					</div>
				</div>

				<input
					ref={searchBarInputRef}
					type="text"
					className="sass-SearchBarInput h-80 border-bottom-1 rounded-top-left-24"
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
					.sass-SearchBar {
						&Button {
							@include transition(200ms, (background-color), tw(ease-out)) {
								background-color: color.scale(tw(blue-500), $alpha: -90%);
							}
							&:hover, &:focus {
								background-color: color.scale(tw(blue-500), $alpha: -80%);
							}
							&[data-checked="true"] {
								background-color: tw(blue-500);
							}
							&SVG {
								color: tw(blue-500);
								@include transition(200ms, (color), tw(ease-out)) {
									.sass-SearchBarButton[data-checked="true"] & {
										color: tw(white);
									}
								}
							}
						}
					}
				`}

				{/* RHS */}
				<div className="absolute right-all">
					<div className="px-16 flex-row h-full">

						{/* Button */}
						<div className="hover-area px-4 pl-0 relative flex-row align-center h-full pointer-events-auto">
							<button className="sass-SearchBarButton focus-area p-8 rounded-full" onClick={e => setCopyAsJSX(!copyAsJSX)} data-checked={copyAsJSX}>
								<StyledTooltip>
									{!copyAsJSX
										? "Tap to Enable Copy as JSX"
										: "Tap to Enable Copy as HTML"}
								</StyledTooltip>
								<Feather.Code className="sass-SearchBarButtonSVG" />
							</button>
						</div>

						{/* Button */}
						<div className="hover-area px-4 pr-0 relative flex-row align-center h-full pointer-events-auto">
							<button className="sass-SearchBarButton focus-area p-8 rounded-full" onClick={e => setEnableDarkMode(!enableDarkMode)} data-checked={enableDarkMode}>
								<StyledTooltip>
									{!enableDarkMode
										? "Tap to Enable Dark Mode"
										: "Tap to Enable Light Mode"}
								</StyledTooltip>
								<SVG svg={Feather.Moon} className="sass-SearchBarButtonSVG" />
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
					.sass-App {
						@include background-color($app-bg, $app-bg-dark);
						@include box-shadow($app-shadow, $app-shadow-dark);
					}
				`}

				<div className="sass-App w-xl xl:rounded-24">

					{/* Obscure effect */}
					<div className="hide xl:show -mx-8 -mb-24 sticky top-all z-20 pointer-events-none">
						<div className="flex-row">
							<div className="sass-ObscureElement w-8 h-40"></div>
							<svg className="sass-ObscureSVG w-24 h-40" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M24 0H0V40C0 26.7451 10.7451 16 24 16V0Z" />
							</svg>
							<div className="sass-ObscureElement flex-grow h-16"></div>
							<svg className="sass-ObscureSVG w-24 h-40" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
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
								.sass-SearchResultsGrid {
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(rem(128), 1fr));
									// Cannot use grid-auto-rows because aspect-ratio is not
									// preserved; use aspect aspect-w-1 aspect-h-1

									&Item {
										&::before {
											@include zero-out { content: ""; }
											@include background-color(color.scale(tw(blue-500), $alpha: -90%), tw(blue-500));
											border-radius: 9999px;

											@include transition($leave, (opacity, transform), tw(ease-out)) {
												opacity: 0;
												transform: scale(0);
											}
										}

										// Use &:hover::before { ... } because &::before:hover does
										// not work
										&:hover::before,
										&:focus::before {
											@include transition($enter, (opacity, transform), tw(ease-out)) {
												opacity: 1;
												transform: scale(0.618);
											}
										}

										&SVG {
											@include transition($leave, (color), tw(ease-out)) {
												@include color(tw(cool-gray-800), tw(cool-gray-200));
											}

											.sass-SearchResultsGridItem:hover &,
											.sass-SearchResultsGridItem:focus & {
												@include transition($enter, (color), tw(ease-out)) {
													@include color(tw(blue-500), tw(white));
												}
											}
										}
									}
								}
							`}

							<div className="sass-SearchResultsGrid px-16 pb-64 xl:p-64">
								{Object.keys(dataset).map(k => (
									<button key={k} className="sass-SearchResultsGridItem relative aspect aspect-w-1 aspect-h-1">
										<div className="flex-row center">
											{React.createElement(Feather[cases.titleCase(k)], {
												className: "sass-SearchResultsGridItemSVG w-32 h-32 z-10",
											})}
										</div>
										<div className="relative">
											<div className="absolute bottom-all">

												{sass`
													$font-size: 12;
													$svg-size:  14;
													$m-gap:      6;

													$enter:  50ms;
													$leave: 100ms;

													.sass-SearchResultsTextbox {
														> * + * { margin-left: rem($m-gap); }

														&Text {
															@include unantialiased;
															font: rem($font-size) / 1.25 tw(mono);

															@include transition($leave, (color, transform), tw(ease-out)) {
																@include color(tw(cool-gray-600), tw(cool-gray-400));
																transform: translateX(rem(((($font-size + $svg-size) / 2) + $m-gap) / 2));
															}

															.sass-SearchResultsTextbox:hover & {
																@include transition($enter, (color, transform), tw(ease-out), 100ms) {
																	@include color(tw(blue-500), tw(white));
																	transform: translateX(0);
																}
															}
														}

														&SVG {
															@include size(rem($svg-size));

															@include transition($leave, (color, transform), tw(ease-out)) {
																color: transparent;
																transform: translateX(rem(-1 * ((($font-size + $svg-size) / 2) + $m-gap) / 2));
															}

															.sass-SearchResultsTextbox:hover & {
																@include transition($enter, (color, transform), tw(ease-out), 100ms) {
																	@include color(tw(blue-500), tw(white));
																	transform: translateX(0);
																}
															}
														}
													}
												`}

												{/* Use $m-gap not m-gap */}
												<a href={`/${k}`} className="sass-SearchResultsTextbox py-8 flex-row center" tabIndex={-1}>
													<div className="sass-SearchResultsTextboxText">{k}</div>
													<Feather.Link2 className="sass-SearchResultsTextboxSVG" />
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
										.sass-SidebarToolboxPreview {
											@include background-color($app-bg, $app-bg-dark);
										}
									`}

									<div className="sass-SidebarToolboxPreview flex-row center h-320 border-bottom-1 rounded-top-right-24">
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
								{[0, 1].map(k => (
									<React.Fragment key={k}>
										{k > 0 && <hr />}
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
