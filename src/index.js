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
$layout-map: (
	flow-margin: rem(32),
	head-h1-margin: rem(8),
	head-h2-margin: rem(8),
	head-h3-margin: rem(8),
	text-margin: rem(32 / 2),
	head-h1: (600 rem(32) / 1.4 tw(sans)),
	head-h2: (600 rem(24) / 1.4 tw(sans)),
	head-h3: (600 rem(24) / 1.4 tw(sans)),
	text: (rem(18) / 1.5 tw(sans)),
	text-small: (rem(14) / 1.8 tw(sans)),
	code: (em(14) / 1.5 tw(mono)),
	code-pre: (rem(15) / 1.6 tw(mono)),
	code-padding: rem(2) rem(4),
	code-rounded: rem(3),
	code-pre-padding: rem(16) rem(24),
	code-pre-rounded: rem(6),
);

.prose {
	@each $mk, $mv in $layout-map {
		--prose-#{$mk}: #{$mv};
	}
}

// Themes

$light-map: (
	head-h1-color: tw(black),
	head-h2-color: tw(black),
	head-h3-color: tw(black),
	text-color: tw(cool-gray-800),
	text-anchor-color: tw(cool-gray-600),
	text-small-color: tw(cool-gray-700),
	hr-border: 2px solid tw(cool-gray-200),
	code-color: hsl(220, 83.33%, 50%),
	code-bg: tw(white),
	code-border: 1px solid tw(cool-gray-300),
	code-pre-color: tw(cool-gray-100),
	code-pre-bg: tw(cool-gray-800),
	code-pre-border: none,
);

// FIXME: 1px solid transparent
//
// https://github.com/zaydek/duomo/issues/203
$dark-map: (
	head-h1-color: tw(cool-gray-100),
	head-h2-color: tw(cool-gray-100),
	head-h3-color: tw(cool-gray-100),
	text-color: tw(cool-gray-200),
	text-anchor-color: tw(cool-gray-200),
	text-small-color: tw(cool-gray-300),
	hr-border: 2px solid tw(cool-gray-600),
	code-color: tw(gray-100),
	code-bg: tw(cool-gray-700),
	code-border: 1px solid transparent,
	code-pre-color: tw(cool-gray-100),
	code-pre-bg: tw(cool-gray-700),
	code-pre-border: none,
);

.prose {
	@each $mk, $mv in $light-map {
		--prose-#{$mk}: #{$mv};
	}
}

[data-theme="dark"] .prose {
	@each $mk, $mv in $dark-map {
		--prose-#{$mk}: #{$mv};
	}
}

.prose > * + * {
	margin-top: var(--prose-flow-margin);
}

// <article class="prose">
//   <div> <- Step over
//     ...
//   </div>
// </article>
//
.prose > :not(div) {
	font: var(--prose-text);
	color: var(--prose-text-color);
	transition: var(--theme-transition);
}

.prose h1 {
	font: var(--prose-head-h1);
	color: var(--prose-head-h1-color);
	transition: var(--theme-transition);
}
.prose h2 {
	font: var(--prose-head-h2);
	color: var(--prose-head-h2-color);
	transition: var(--theme-transition);
}
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	font: var(--prose-head-h3);
	color: var(--prose-head-h3-color);
	transition: var(--theme-transition);
}
.prose h1 + p {
	margin-top: var(--prose-head-h1-margin);
}
.prose h2 + p {
	margin-top: var(--prose-head-h2-margin);
}
.prose h3 + p,
.prose h4 + p,
.prose h5 + p,
.prose h6 + p {
	margin-top: var(--prose-head-h3-margin);
}
.prose p + p {
	margin-top: var(--prose-text-margin);
}
.prose a {
	color: var(--prose-text-anchor-color);
	text-decoration: underline;
	transition: var(--theme-transition);
}
.prose small {
	font: var(--prose-text-small);
	color: var(--prose-text-small-color);
	transition: var(--theme-transition);
}
.prose hr {
	border: var(--prose-hr-border);
	transition: var(--theme-transition);
}
.prose *:not(pre) code {
	@include unantialiased;
	padding: var(--prose-code-padding);
	font: var(--prose-code);
	color: var(--prose-code-color);
	background-color: var(--prose-code-bg);
	border: var(--prose-code-border);
	border-radius: var(--prose-code-rounded);
	transition: var(--theme-transition);
}
.prose pre {
	@include unantialiased;
	padding: var(--prose-code-pre-padding);
	font: var(--prose-code-pre);
	color: var(--prose-code-pre-color);
	background-color: var(--prose-code-pre-bg);
	border: var(--prose-code-pre-border);
	border-radius: 0; // Reset
	transition: var(--theme-transition);

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
		padding: var(--prose-code-pre-padding);
		border-radius: var(--prose-code-pre-rounded);
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
