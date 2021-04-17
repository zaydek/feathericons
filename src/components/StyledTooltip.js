import sass from "esbuild:sass"

sass`

.sass-Tooltip {
	&Top         { position: absolute; bottom: 100%; left:   50%; transform: translateX(-50%); }
	&TopLeft     { position: absolute; bottom: 100%; left:    0%; }
	&TopRight    { position: absolute; bottom: 100%; right:   0%; }
	&Right       { position: absolute; top:     50%; left:  100%; transform: translateY(-50%); }
	&Bottom      { position: absolute; top:    100%; left:   50%; transform: translateX(-50%); }
	&BottomLeft  { position: absolute; top:    100%; left:    0%; }
	&BottomRight { position: absolute; top:    100%; right:   0%; }
	&Left        { position: absolute; top:     50%; right: 100%; transform: translateY(-50%); }
}

`

export default function StyledTooltip({ children }) {
	return (
		<>

			{sass`
				$tooltip-shadow:      (tw(shadow-md), tw(shadow-lg));
				$tooltip-shadow-dark: ($shadow-px-dark, tw(shadow-md), tw(shadow-lg));

				.sass-StyledTooltip {
					@include unantialiased;
					font: rem(13) / 1.25 tw(mono);
					color: tw(white);
					background-color: tw(cool-gray-800);
					@include box-shadow($tooltip-shadow, $tooltip-shadow-dark);

					@include transition(200ms, (opacity, transform), tw(ease-out)) {
						opacity: 0;
						transform: scale(0.9);
						transform-origin: center;
					}

					pointer-events: none;

					.hover-area:hover &,
					.focus-area:focus & {
						@include transition(100ms, (opacity, transform), tw(ease-out)) {
							opacity: 1;
							transform: scale(1);
							transform-origin: center;
						}

						pointer-events: auto;
					}
				}
			`}

			<pre className="sass-TooltipBottomRight sass-StyledTooltip -mt-8 px-8 py-12 rounded-6">
				{children}
			</pre>

		</>
	)
}
