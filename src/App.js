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
				<div className="w-16 h-16 bg-cool-gray-300 rounded-full"></div>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

function ItemLTRSmall({ children }) {
	return (
		<div className="flex-row align-center m-gap-8">
			{children ?? <>
				<div className="w-12 h-12 bg-cool-gray-300 rounded-full"></div>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

function ItemRTL({ children }) {
	return (
		<div className="flex-row align-center m-gap-12">
			{children ?? <>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
				<div className="w-16 h-16 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Header() {

	function SponsorButton() {
		return (
			<div className="flex-col align-center m-gap-12">
				<div className="flex-row justify-center w-192 h-48 bg-cool-gray-200 rounded-full"></div>
				<ItemLTRSmall />
			</div >
		)
	}

	return (
		// Use pb-112 to compensate for <TopNav className="h-48 ...">
		<div className="px-16 sm:px-24 py-64 pb-112 flex-row justify-center">
			<div className="flex-col xl:flex-row xl:align-center m-gap-48 w-lg">

				{/* CTA */}
				<div className="flex-col align-center m-gap-32">
					<div className="w-64 h-64 bg-cool-gray-300 rounded-full"></div>
					<div className="flex-col align-center m-gap-16">
						<div className="w-160 h-16 bg-cool-gray-300 rounded-full"></div>
						<div className="w-256 h-8 bg-cool-gray-300 rounded-full"></div>
					</div>
					{/* Use a custom <Button> because of self-stretch, sm:w-192, and
					rounded-12 sm:rounded-full */}
					<div className="self-stretch sm:self-center flex-col sm:flex-row m-gap-16">
						<div className="flex-row justify-center sm:w-192 h-48 bg-cool-gray-200 rounded-12 sm:rounded-full">
							<ItemLTR />
						</div>
						<div className="flex-row justify-center sm:w-192 h-48 bg-cool-gray-200 rounded-12 sm:rounded-full">
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

@use "sass:color";

@use "duomo" as *;
@use "duomo/mixins" as *;
@use "duomo/tailwind" as *;

$enter-ms: 200ms;
$leave-ms: 400ms;

@mixin antialiased   { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
@mixin unantialiased { -webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto; }

.antialiased   { @include antialiased; }
.unantialiased { @include unantialiased; }

// :root {
// 	@include transition(1000ms, (background-color), tw(ease, out)) {
// 		@include background-color(
// 			tw(cool-gray, 50),
// 			tw(cool-gray, 900),
// 		);
// 	}
// }

:root {
	@include antialiased;
	background-color: tw(cool-gray, 50);
}

`

function SearchBar() {
	const [searchInputValue, setSearchInputValue] = React.useState("")

	return (
		<div className="xl:-mt-16 xl:pt-16 sticky top-all z-10">
			{sass`
				.searchBar {
					&SVG {
						@include transition($leave-ms, (color), tw(ease, out)) {
							color: tw(cool-gray, 800);
						}
						.searchBar:focus-within & {
							@include transition($enter-ms, (color), tw(ease, out)) {
								color: tw(blue, 600);
							}
						}
					}
					&Input {
						// Resets
						width: 100%;
						&:focus { outline: unset; }

						font: rem(20) / 1 tw(sans);
						color: tw(cool-gray, 800);
					}
					&Tooltip {
						// ...
					}
				}
			`}
			<div className="searchBar relative">
				<div className="absolute all">
					{sass`
						.tooltip {
							position: absolute;
							&--top    { bottom: 100%; left:   50%; transform: translateX(-50%); }
							&--right  { top:     50%; left:  100%; transform: translateY(-50%); }
							&--bottom { top:    100%; left:   50%; transform: translateX(-50%); }
							&--left   { top:     50%; right: 100%; transform: translateY(-50%); }
						}

						.styledTooltip {
							margin-top: rem(-16);
							padding: rem(8) rem(16);

							@include unantialiased;
							white-space: pre;
							font: rem(13) / 1.25 tw(mono);
							color: hsla(0, 0%, 100%, 0.975);
							background-color: tw(cool-gray, 800);
							border-radius: rem(6);
							box-shadow: tw(shadow, md),
								tw(shadow, lg);

							// @include transition(200ms, (opacity, transform), tw(ease, out)) {
							opacity: 0;
							// 	transform: scale(0.9);
							// 	transform-origin: center;
							// }
							.group:hover & {
							// 	@include transition(100ms, (opacity, transform), tw(ease, out)) {
							opacity: 1;
							// 		transform: scale(1);
							// 		transform-origin: center;
							// 	}
							}
						}
					`}
					<div className="px-16 flex-row h-full">

						{/* Icon */}
						<div className="p-8 flex-row align-center">
							<Feather.Search className="searchBarSVG w-24 h-24" />
						</div>

						{/* Icon */}
						<div className="flex-grow"></div>
						<div className="group relative">
							<div className="p-8 flex-row align-center h-full">
								<Feather.Code className="w-24 h-24 text-cool-gray-800" />
							</div>
							<div className="tooltip tooltip--bottom pointer-events-none">
								<div className="styledTooltip">
									<div>Tap to Copy as JSX</div>
								</div>
							</div>
						</div>

						{/* Icons */}
						<div className="group relative">
							<div className="p-8 flex-row align-center h-full">
								<Feather.Moon className="w-24 h-24 text-cool-gray-800" />
							</div>
							<div className="tooltip tooltip--bottom pointer-events-none">
								<div className="styledTooltip">
									<div>Tap to Enable Dark Mode</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<input
					type="text"
					className="searchBarInput pl-64 pr-96 h-80 bg-white rounded-top-left-24 border-bottom-1"
					placeholder="Search ..."
					value={searchInputValue}
					onFocus={() => setSearchBarHasFocus(true)}
					onBlur={() => setSearchBarHasFocus(false)}
					onChange={e => setSearchInputValue(e.target.value)}
					spellCheck={false}
				/>
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
					.searchAppContainer {
						box-shadow: 0 0 0 0.5px hsla(0, 0%, 0%, 0.05),
							tw(shadow, sm),
							tw(shadow, lg);
					}
				`}
				<div className="searchAppContainer w-xl bg-white xl:rounded-24">

					{/* <StickyObscureEffect> */}
					{/* TODO: May need to add -my to cover shadow */}
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

					{/* Defer flex-row to here not w-xl because of <<StickyObscureEffect>> */}
					<div className="flex-row">

						{/* LHS */}
						<div className="flex-grow">

							{/* Search bar */}
							<SearchBar />

							{/* Body */}
							{sass`
								.searchGrid {
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(rem(144), 1fr));
									&Item {
										position: relative;
										&::after {
											@include zero-out { content: ""; }
											background-color: color.scale(tw(blue, 400), $alpha: -75%);
											border-radius: 9999px;
											@include transition($leave-ms, (opacity, transform), tw(ease, out)) {
												opacity: 0;
												transform: scale(0);
											}
										}
										// Use &:hover::after { ... } (&::after:hover does not work)
										&:hover::after {
											@include transition($enter-ms, (opacity, transform), tw(ease, out)) {
												opacity: 1;
												transform: scale(0.618);
											}
										}
										&SVG {
											@include transition($leave-ms, (color), tw(ease, out)) {
												color: tw(cool-gray, 800);
											}
											.searchGridItem:hover & {
												@include transition($enter-ms, (color), tw(ease, out)) {
													color: tw(blue, 600);
												}
											}
										}
									}
								}
							`}
							<div className="searchGrid px-16 xl:p-64 xl:pb-96">
								{Object.keys(dataset).map(k => (
									<div key={k} className="searchGridItem aspect aspect-w-1 aspect-h-1">
										<div className="flex-row center">
											{React.createElement(Feather[cases.titleCase(k)], {
												className: "searchGridItemSVG w-32 h-32",
											})}
										</div>
										<div className="relative">
											<div className="absolute bottom-all">
												{sass`
													$size: 13;
													$size-gap: 6;

													$enter-ms: 100ms;
													$leave-ms: 200ms;

													.searchTextbox {
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
															.searchTextbox:hover & {
																@include transition($enter-ms, (color, transform), tw(ease, out), 100ms) {
																	// text-decoration: underline;
																	color: tw(blue, 600);
																	transform: translateX(0); // Reset
																}
															}
														}
														&SVG {
															@include size(rem($size + 1));
															@include transition($leave-ms, (color, opacity, transform), tw(ease, out)) {
																color: tw(cool-gray, 400);
																opacity: 0;
																transform: translateX(rem(-1 * ($size + $size-gap) / 2));
															}
															.searchTextbox:hover & {
																@include transition($enter-ms, (color, opacity, transform), tw(ease, out), 100ms) {
																	color: tw(blue, 600);
																	opacity: 1;
																	transform: translateX(0);
																}
															}
														}
													}
												`}
												<a href={`/${k}`} className="searchTextbox py-8 flex-row center">
													<div className="searchTextboxText">{k}</div>
													<Feather.ExternalLink className="searchTextboxSVG" />
												</a>
											</div>
										</div>
									</div>
								))}
							</div>

						</div>

						{/* RHS */}
						<div className="hide md:show w-320 bg-cool-gray-50 rounded-right-24 border-left-1">
							<div className="xl:-mt-16 xl:pt-16 sticky top-all">

								{/* Top */}
								<div className="relative">
									<div className="flex-row center h-320 bg-white rounded-top-right-24 border-bottom-1">
										<div className="w-64 h-64 bg-cool-gray-200 rounded-full"></div>
										<div className="absolute top-all">
											<div className="p-24 flex-row align-center h-full">
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
										</div>
										<div className="absolute bottom-all">
											<div className="p-24 flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-cool-gray-200 rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-cool-gray-200 rounded-full"></div>
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
												<div className="w-96 h-8 bg-cool-gray-200 rounded-full"></div>
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
											{/* Bottom */}
											<div className="flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-cool-gray-200 rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
										</div>
									</React.Fragment>
								))}

								<hr />
								<div className="p-24 flex-row m-gap-16">
									<div className="w-128">
										<div className="aspect aspect-w-6 aspect-h-4 bg-cool-gray-200 rounded-4"></div>
									</div>
									<div className="flex-grow">
										<div className="flex-col m-gap-6 h-full">
											<div className="w-stagger-1 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-2 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-3 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-4 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="flex-grow"></div>
											<div className="self-end w-stagger-1 h-6 bg-cool-gray-200 rounded-full"></div>
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
