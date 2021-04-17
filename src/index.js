// import App from "./components/App"

import sass from "esbuild:sass"

import Docs from "./docs.mdx"

sass.global`

@use "duomo" as *;
@use "duomo/mixins" as *;
@use "duomo/tailwind" as *;

`

function App() {
	return (
		<>

			{sass`

// Layout

// prettier-ignore
$prose-flow-margin: rem(32);
$prose-head-h1-margin: rem(8);
$prose-head-h2-margin: rem(8);
$prose-head-h3-margin: rem(8);
$prose-text-margin: rem(32 / 2);
$prose-head-h1: (600 rem(32) / 1.4 tw(sans));
$prose-head-h2: (600 rem(24) / 1.4 tw(sans));
$prose-head-h3: (600 rem(24) / 1.4 tw(sans));
$prose-text: (rem(18) / 1.5 tw(sans));
$prose-text-small: (rem(14) / 1.8 tw(sans));
$prose-code: (em(14) / 1.5 tw(mono));
$prose-code-pre: (rem(15) / 1.6 tw(mono));
$prose-code-padding: rem(2) rem(4);
$prose-code-rounded: rem(3);
$prose-code-pre-padding: rem(16) rem(24);
$prose-code-pre-rounded: rem(6);

// Themes

// FIXME: 1px solid transparent
//
// https://github.com/zaydek/duomo/issues/203
$prose-head-h1-color-set: (
	tw(black),
	tw(cool-gray-100),
);
$prose-head-h2-color-set: (
	tw(black),
	tw(cool-gray-100),
);
$prose-head-h3-color-set: (
	tw(black),
	tw(cool-gray-100),
);
$prose-text-color-set: (
	tw(cool-gray-800),
	tw(cool-gray-200),
);
$prose-text-anchor-color-set: (
	tw(cool-gray-600),
	tw(cool-gray-200),
);
$prose-text-small-color-set: (
	tw(cool-gray-700),
	tw(cool-gray-300),
);
$prose-hr-border-set: (
	2px solid tw(cool-gray-200),
	2px solid tw(cool-gray-600),
);
$prose-code-color-set: (
	hsl(220, 83.33%, 50%),
	tw(gray-100),
);
$prose-code-bg-set: (
	tw(white),
	tw(cool-gray-700),
);
$prose-code-border-set: (
	1px solid tw(cool-gray-300),
	1px solid transparent,
);
$prose-code-pre-color-set: (
	tw(cool-gray-100),
	tw(cool-gray-100),
);
$prose-code-pre-bg-set: (
	tw(cool-gray-800),
	tw(cool-gray-700),
);

// $prose-code-pre-border-dark:   none;

.prose > * + * {
	margin-top: $prose-flow-margin;
}

// <article class="prose">
//   <div> <- Step over
//     ...
//   </div>
// </article>
//
.prose > :not(div) {
	font: $prose-text;
	@include color($prose-text-color-set...);
}

.prose h1 {
	font: $prose-head-h1;
	@include color($prose-head-h1-color-set...);
}
.prose h2 {
	font: $prose-head-h2;
	@include color($prose-head-h2-color-set...);
}
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	font: $prose-head-h3;
	@include color($prose-head-h3-color-set...);
}
.prose h1 + p {
	margin-top: $prose-head-h1-margin;
}
.prose h2 + p {
	margin-top: $prose-head-h2-margin;
}
.prose h3 + p,
.prose h4 + p,
.prose h5 + p,
.prose h6 + p {
	margin-top: $prose-head-h3-margin;
}
.prose p + p {
	margin-top: $prose-text-margin;
}
.prose a {
	@include color($prose-text-anchor-color-set...);
	text-decoration: underline;
}
.prose small {
	font: $prose-text-small;
	@include color($prose-text-small-color-set...);
}
.prose hr {
	// @include border: $prose-hr-border;
	@include theme-property(border, $prose-hr-border-set...);
}
.prose *:not(pre) code {
	@include unantialiased;
	padding: $prose-code-padding;
	font: $prose-code;
	@include color($prose-code-color-set...);
	@include background-color($prose-code-bg-set...);
	@include theme-property(border, $prose-code-border-set...);
	border-radius: $prose-code-rounded;
}
.prose pre {
	@include unantialiased;
	padding: $prose-code-pre-padding;
	font: $prose-code-pre;
	@include color($prose-code-pre-color-set...);
	@include background-color($prose-code-pre-bg-set...);
	// @include theme-property(border, $prose-code-pre-border-set...);
	border: none; // FIXME
	border-radius: 0; // Reset

	/*
	 * Overrides
	 */

	@include margin-x(rem(-16));
	@include padding-x(rem(16));
}
@media (min-width: breakpoint(sm)) {
	.prose pre {
		@include margin-x(0); // Reset
		padding: $prose-code-pre-padding;
		border-radius: $prose-code-pre-rounded;
	}
}

			`}

			<div className="py-96 flex-row justify-center">
				<div className="w-md">
					<div className="prose">
						<Docs />
					</div>
				</div>
			</div>

		</>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
)
