import sass from "inline-sass"

import * as cases from "./lib/cases"
import * as Feather from "react-feather"

import dataset from "./data/dataset.generated.json"

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
		<div className="px-16 sm:px-24 py-64 pb-112 flex-row justify-center">
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

$enter-ms: 200ms;
$leave-ms: 400ms;

// TOOD: Extract to Duomo mixins
@mixin antialiased   { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
@mixin unantialiased { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }

// TOOD: Extract to Duomo core
.antialiased   { @include antialiased; }
.unantialiased { @include unantialiased; }

@mixin reset {
	@content;
}

// TOOD: Extract to Duomo mixins
@mixin padding-x($v) {
	@if meta.type-of($v) == number and
			math.is-unitless($v) {
		@error "padding-x: #{$v} must be of type rem, em, px, etc."
	}
	padding-left: $v;
	padding-right: $v;
}
@mixin padding-y($v) {
	@if meta.type-of($v) == number and
			math.is-unitless($v) {
		@error "padding-y: #{$v} must be of type rem, em, px, etc."
	}
	padding-top: $v;
	padding-bottom: $v;
}
@mixin margin-x($v)  {
	@if meta.type-of($v) == number and
			math.is-unitless($v) {
		@error "margin-x: #{$v} must be of type rem, em, px, etc."
	}
	margin-left: $v;
	margin-right: $v;
}
@mixin margin-y($v)  {
	@if meta.type-of($v) == number and
			math.is-unitless($v) {
		@error "margin-y: #{$v} must be of type rem, em, px, etc."
	}
	margin-top: $v;
	margin-bottom: $v;
}

// TODO: Add border-width
// TODO: Add border-radius

$shadow-px: 0 0 0 0.5px hsla(0, 0%, 0%, 0.15);
$shadow-px-dark: 0 0 0 0.5px hsla(0, 0%, 100%, 0.15);

$app-bg: tw(white);
$app-bg-dark: tw(cool-gray, 800);
$app-shadow: ($shadow-px, tw(shadow, xs), tw(shadow, sm));
$app-shadow-dark: ($shadow-px-dark, tw(shadow, xs), tw(shadow, sm));
$app-border-color: tw(cool-gray, 200);
$app-border-color-dark: tw(black);
$theme-dur-ms: 500ms;

.bg-dark {
	@include transition(500ms, (background-color), tw(ease, out)) {
		@include background-color(
			tw(cool-gray, 200),
			tw(cool-gray, 700),
		);
	}
}

.bg-darker {
	@include transition(500ms, (background-color), tw(ease, out)) {
		@include background-color(
			tw(cool-gray, 300),
			tw(cool-gray, 600),
		);
	}
}

:root {
	@include antialiased;

	@include theme-transition($theme-dur-ms, (background-color), tw(ease, out)) {
		@include background-color(
			tw(cool-gray, 50),
			tw(cool-gray, 900),
		);
	}
}

hr {
	@include theme-transition($theme-dur-ms, (border-color), tw(ease, out)) {
		@include border-color(
			$app-border-color,
			$app-border-color-dark,
		);
	}
}

`

function SVG({ svg: SVG_, ...props }) {
	return <SVG_ {...props} />
}

function SearchBar() {
	const [searchInputValue, setSearchInputValue] = React.useState("")
	const [copyAsJSX, setCopyAsJSX] = React.useState(false)
	const [enableDarkMode, setEnableDarkMode] = React.useState(false)

	// TODO
	// const [hoverTooltipArea, setHoverTooltipArea] = React.useState(false)

	return (
		// Use z-20 not z-10 because the RHS uses z-10
		<div className="xl:-mt-16 xl:pt-16 sticky top-all z-20">

			{sass`
				.searchBarSearchSVG {
					@include transition(100ms, (color), tw(ease, out)) {
						color: tw(cool-gray, 800);
					}
					.searchBar:focus-within & {
						color: tw(blue, 500);
					}
				}
			`}

			<div className="searchBar relative">

				{/* LHS */}
				<div className="absolute left-all">
					<div className="px-16 flex-row h-full">
						<div className="p-8 flex-row align-center">
							<Feather.Search className="searchBarSearchSVG w-24 h-24" />
						</div>
					</div>
				</div>

				{sass`
					.searchBarInput {
						@include reset {
							width: 100%;
							background-color: unset;
							&:focus { outline: unset; }
						}

						padding-left: rem(16 + 40 + 16);
						padding-right: rem(16 + 40 + 8 + 40 + 16);
						font: rem(20) / 1 tw(sans);
						color: tw(cool-gray, 800);
						border-bottom: rem(1) solid transparent;
						@include transition($theme-dur-ms, (color, background-color, border,color), tw(ease, out)) {
							@include color(
								tw(cool-gray, 800),
								tw(cool-gray, 400),
							);
							@include background-color(
								$app-bg,
								$app-bg-dark,
							);
							@include border-color(
								$app-border-color,
								$app-border-color-dark,
							);
						}
					}
				`}

				<input
					type="text"
					className="searchBarInput h-80 bg-white rounded-top-left-24"
					placeholder="Search ..."
					value={searchInputValue}
					onChange={e => setSearchInputValue(e.target.value)}
					spellCheck={false}
				/>

				{sass`
					// Use [data-checked=true] for :checked because <button> cannot use
					// type="checkbox"
					.searchBarButton {
						@include reset {
							&:focus { outline: none }
						}

						padding: rem(8);
						border-radius: 9999px;

						@include transition(150ms, (background-color), tw(ease, out)) {
							background-color: color.scale(tw(blue, 500), $alpha: -90%);
						}
						&:hover,
						&:focus {
							background-color: color.scale(tw(blue, 500), $alpha: -80%);
						}
						&[data-checked="true"] {
							background-color: tw(blue, 500);
						}

						&Tooltip {
							margin-top: rem(-8);
							padding: rem(8) rem(12);
							display: flex;
							flex-direction: row;
							align-items: center;
							> * + * {
								margin-left: rem(6);
							}

							@include unantialiased;
							white-space: pre;
							font: rem(13) / 1.25 tw(mono);
							color: white;
							background-color: tw(cool-gray, 800);
							border-radius: rem(6);

							@include theme-transition($theme-dur-ms, (box-shadow), tw(ease, out)) {
								@include box-shadow(
									(tw(shadow, md), tw(shadow, lg)),
									($shadow-px-dark, tw(shadow, md), tw(shadow, lg)),
								);
							}

							@include transition(100ms, (opacity, transform), tw(ease, out)) {
								opacity: 0;
								transform: scale(0.9);
								transform-origin: center;
							}
							// FIXME: :active styles clash with :focus styles (e.g. JSX is
							// :active and Dark Mode is :focus)
							.searchBarButtonHoverArea:hover &,
							.searchBarButton:focus & {
								opacity: 1;
								transform: scale(1);
								transform-origin: center;
							}
						}

						&SVG {
							@include transition(150ms, (color), tw(ease, out)) {
								color: tw(blue, 500);
							}
							.searchBarButton[data-checked="true"] & {
								color: white;
							}
						}
					}
				`}

				{/* RHS */}
				<div className="absolute right-all">
					<div className="-mx-4 px-16 flex-row h-full">

						{/* Button */}
						<div className="searchBarButtonHoverArea px-4 relative flex-row align-center h-full pointer-events-auto">
							<button className="searchBarButton" onClick={e => setCopyAsJSX(!copyAsJSX)} data-checked={copyAsJSX}>
								<div className="tooltip tooltip--bottom-right pointer-events-none">
									<div className="searchBarButtonTooltip">
										{!copyAsJSX ? "Tap to Enable Copy as JSX" : "Tap to Enable Copy as HTML"}
									</div>
								</div>
								<Feather.Code className="searchBarButtonSVG" />
							</button>
						</div>

						{/* Button */}
						<div className="searchBarButtonHoverArea px-4 relative flex-row align-center h-full pointer-events-auto">
							<button className="searchBarButton" onClick={e => setEnableDarkMode(!enableDarkMode)} data-checked={enableDarkMode}>
								<div className="tooltip tooltip--bottom-right pointer-events-none">
									<div className="searchBarButtonTooltip">
										{!enableDarkMode ? "Tap to Enable Dark Mode" : "Tap to Enable Light Mode"}
									</div>
								</div>
								<SVG svg={!enableDarkMode ? Feather.Sun : Feather.Moon} className="searchBarButtonSVG" />
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
						@include transition($theme-dur-ms, (background-color, box-shadow), tw(ease, out)) {
							@include background-color(
								$app-bg,
								$app-bg-dark,
							);
							@include box-shadow(
								$app-shadow,
								$app-shadow-dark,
							);
						}
					}
				`}
				<div className="app w-xl xl:rounded-24">

					{/* Obscure effect */}
					{/* <div className="hide xl:show -mx-8 -mb-24 sticky top-all z-20 pointer-events-none">
						<div className="flex-row">
							<div className="w-8 h-40 bg-cool-gray-100"></div>
							<svg className="w-24 h-40 text-cool-gray-100" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M24 0H0V40C0 26.7451 10.7451 16 24 16V0Z" />
							</svg>
							<div className="flex-grow h-16 bg-cool-gray-100"></div>
							<svg className="w-24 h-40 text-cool-gray-100" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M0 0H24V40C24 26.7451 13.2549 16 0 16V0Z" />
							</svg>
							<div className="w-8 h-40 bg-cool-gray-100"></div>
						</div>
					</div> */}

					{/* Defer flex-row to here not w-xl because of the obscure effect */}
					<div className="flex-row">

						{/* LHS */}
						<div className="flex-grow">

							<SearchBar />

							{sass`
								.searchResults {
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(rem(144), 1fr));

									&Button {
										@include reset {
											&:focus { outline: none; }
										}

										position: relative;
										&::after {
											@include zero-out { content: ""; }
											// Use 90% not 80%
											background-color: color.scale(tw(blue, 500), $alpha: -90%);
											border-radius: 9999px;
											@include transition($leave-ms, (opacity, transform), tw(ease, out)) {
												opacity: 0;
												transform: scale(0);
											}
										}
										// Use &:hover::after { ... } (&::after:hover does not work)
										&:hover::after,
										&:focus::after {
											@include transition($enter-ms, (opacity, transform), tw(ease, out)) {
												opacity: 1;
												transform: scale(0.618);
											}
										}

										&SVG {
											@include transition($leave-ms, (color), tw(ease, out)) {
												color: tw(cool-gray, 800);
											}
											.searchResultsButton:hover &,
											.searchResultsButton:focus & {
												@include transition($enter-ms, (color), tw(ease, out)) {
													color: tw(blue, 600);
												}
											}
										}
									}
								}
							`}

							<div className="searchResults px-16 xl:p-64 xl:pb-96">
								{Object.keys(dataset).map(key => (
									<button key={key} className="searchResultsButton aspect aspect-w-1 aspect-h-1">
										<div className="flex-row center">
											{React.createElement(Feather[cases.titleCase(key)], {
												className: "searchResultsButtonSVG w-32 h-32",
											})}
										</div>
										<div className="relative">
											<div className="absolute bottom-all">

												{sass`
													$size: 13;
													$size-gap: 6;

													$enter-ms: 100ms;
													$leave-ms: 200ms;

													.searchResultsTextbox {
														@include reset {
															&:focus { outline: none; }
														}

														// Prefer Sass because of use of $size-gap
														@include padding-y(rem(8));
														display: flex;
														flex-direction: row;
														justify-content: center;
														align-items: center;
														> * + * {
															margin-left: rem($size-gap);
														}

														&Text {
															@include unantialiased;
															text-align: center;
															font: rem($size) / 1.25 tw(mono);
															@include transition($leave-ms, (color, transform), tw(ease, out)) {
																color: tw(cool-gray, 800);
																transform: translateX(rem(($size + $size-gap) / 2));
															}
															.searchResultsTextbox:hover & {
															// .searchResultsTextbox:focus & {
																@include transition($enter-ms, (color, transform), tw(ease, out), 100ms) {
																	color: tw(blue, 600);
																	transform: translateX(0); // Reset
																}
															}
														}

														&SVG {
															@include size(rem($size + 1)); // Add 1 for SVG
															@include transition($leave-ms, (color, opacity, transform), tw(ease, out)) {
																color: tw(cool-gray, 400);
																opacity: 0;
																transform: translateX(rem(-1 * ($size + $size-gap) / 2));
															}
															.searchResultsTextbox:hover & {
															// .searchResultsTextbox:focus & {
																@include transition($enter-ms, (color, opacity, transform), tw(ease, out), 100ms) {
																	color: tw(blue, 600);
																	opacity: 1;
																	transform: translateX(0); // Reset
																}
															}
														}
													}
												`}

												<a href={`/${key}`} className="searchResultsTextbox" tabIndex={-1}>
													<div className="searchResultsTextboxText">{key}</div>
													<Feather.ExternalLink className="searchResultsTextboxSVG" />
												</a>

											</div>
										</div>
									</button>
								))}
							</div>

						</div>

						{sass`
							.appSidebar {
								border-left: rem(1) solid transparent;
								@include transition($theme-dur-ms, (background-color, border-color), tw(ease, out)) {
									@include background-color(
										tw(cool-gray, 50),
										$app-bg-dark,
									);
									@include border-color(
										$app-border-color,
										$app-border-color-dark,
									);
								}
							}
						`}

						{/* RHS */}
						<div className="appSidebar hide md:show w-320 rounded-right-24">
							{/* <div className="xl:-mt-16 xl:pt-16 sticky top-all z-10"> */}
							<div className="sticky top-all z-10">

								{/* Top */}
								<div className="relative">

									{sass`
										.appSidebarPreview {
											border-bottom: rem(1) solid transparent;
											@include transition($theme-dur-ms, (border-color, background-color), tw(ease, out)) {
												@include border-color(
													$app-border-color,
													$app-border-color-dark,
												);
												@include background-color(
													$app-bg,
													$app-bg-dark,
												);
											}
										}
									`}

									<div className="appSidebarPreview flex-row center h-320 rounded-top-right-24">
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
