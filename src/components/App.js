import sass from "esbuild:sass"

import AppLHS from "./AppLHS"
import AppRHS from "./AppRHS"
import Header from "./Header"

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

.sass-Obscure {
	&SVG     { color: tw(blue-600); }
	&Element { background-color: tw(blue-600); }
}

`

function ObscureForeground() {
	return (
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
	)
}

export default function App() {
	return (
		<>

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
					<ObscureForeground />
					<div className="flex-row" /* Use flex-row here because of <ObscureForeground /> */>
						<main className="flex-grow">
							<AppLHS />
						</main>
						<aside className="hide md:show w-320 border-left-1 rounded-right-24">
							<AppRHS />
						</aside>
					</div>
				</div>

			</div>

			{/* Footer */}
			<div className="hide xl:show h-64"></div>

		</>
	)
}
