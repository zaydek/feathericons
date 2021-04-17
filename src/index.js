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

$prose-head-h1-color:     tw(black);
$prose-head-h2-color:     tw(black);
$prose-head-h3-color:     tw(black);
$prose-text-color:        tw(cool-gray-800);
$prose-text-anchor-color: tw(cool-gray-600);
$prose-text-small-color:  tw(cool-gray-700);
$prose-hr-border:         2px solid tw(cool-gray-200);
$prose-code-color:        hsl(220, 83.33%, 50%);
$prose-code-bg:           tw(white);
$prose-code-border:       1px solid tw(cool-gray-300);
$prose-code-pre-color:    tw(cool-gray-100);
$prose-code-pre-bg:       tw(cool-gray-800);
$prose-code-pre-border:   none;

// FIXME: 1px solid transparent
//
// https://github.com/zaydek/duomo/issues/203
$prose-head-h1-color-dark:     tw(cool-gray-100);
$prose-head-h2-color-dark:     tw(cool-gray-100);
$prose-head-h3-color-dark:     tw(cool-gray-100);
$prose-text-color-dark:        tw(cool-gray-200);
$prose-text-anchor-color-dark: tw(cool-gray-200);
$prose-text-small-color-dark:  tw(cool-gray-300);
$prose-hr-border-dark:         2px solid tw(cool-gray-600);
$prose-code-color-dark:        tw(gray-100);
$prose-code-bg-dark:           tw(cool-gray-700);
$prose-code-border-dark:       1px solid transparent;
$prose-code-pre-color-dark:    tw(cool-gray-100);
$prose-code-pre-bg-dark:       tw(cool-gray-700);
$prose-code-pre-border-dark:   none;

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
	@include color($prose-text-color, $prose-text-color-dark);
}

.prose h1 {
	font: $prose-head-h1;
	@include color($prose-head-h1-color, $prose-head-h1-color-dark);
}
.prose h2 {
	font: $prose-head-h2;
	@include color($prose-head-h2-color, $prose-head-h2-color-dark);
}
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	font: $prose-head-h3;
	@include color($prose-head-h3-color, $prose-head-h3-color-dark);
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
	@include color($prose-text-anchor-color, $prose-text-anchor-color-dark);
	text-decoration: underline;
}
.prose small {
	font: $prose-text-small;
	@include color($prose-text-small-color, $prose-text-small-color-dark);
}
.prose hr {
	border: $prose-hr-border;
}
.prose *:not(pre) code {
	@include unantialiased;
	padding: $prose-code-padding;
	font: $prose-code;
	@include color($prose-code-color, $prose-code-color-dark);
	@include background-color($prose-code-bg, $prose-code-bg-dark);
	border: $prose-code-border;
	border-radius: $prose-code-rounded;
}
.prose pre {
	@include unantialiased;
	padding: $prose-code-pre-padding;
	font: $prose-code-pre;
	@include color($prose-code-pre-color, $prose-code-pre-color-dark);
	@include background-color($prose-code-pre-bg, $prose-code-pre-bg-dark);
	border: $prose-code-pre-border;
	border-radius: 0; // Reset

	/*
	 * Overrides
	 */

	margin-left: rem(-16);
	padding-left: rem(16);

	margin-right: rem(-16);
	padding-right: rem(16);
}
@media (min-width: breakpoint(sm)) {
	.prose pre {
		margin-left: 0; // Reset
		margin-right: 0; // Reset
		padding: $prose-code-pre-padding;
		border-radius: $prose-code-pre-rounded;
	}
}

			`}

			<div className="prose">
				<Docs />
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
