import sass from "esbuild:sass"

import * as cases from "../lib/cases"
import * as Feather from "react-feather"

import dataset from "../data/dataset.generated.json"
import SearchBar from "./AppLHSSearchBar"

export default function AppLHS() {
	return (
		<>

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

		</>
	)
}
