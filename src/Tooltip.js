import sass from "inline-sass"

export default function Tooltip({ children }) {
  return (
    <>
      {sass`
        .tooltip {
          @include unantialiased;
          font: rem(13) / 1.25 tw(mono);
          color: tw(white);
          background-color: tw(cool-gray-800);
          @include theme((
            box-shadow: (
              (tw(shadow-md), tw(shadow-lg)),
              ($shadow-px-dark, tw(shadow-md), tw(shadow-lg)),
            ),
          ));
          opacity: 0;
          transform: scale(0.9);
          transform-origin: center;

          // Disable pointer-events so pointer events are not eagerly
          // intercepted
          pointer-events: none;

          @include transition(200ms, (opacity, transform), tw(ease-out));
          .hoverArea:hover &,
          .focusArea:focus & {
            opacity: 1;
            transform: scale(1);
            transform-origin: center;
            @include transition(100ms, (opacity, transform), tw(ease-out));

            // Enable pointer-events so pointer events are eagerly
            // intercepted
            pointer-events: auto; // Reset
          }
        }
      `}
      <pre className="tooltip tooltip--bottom-right -mt-8 px-8 py-12 rounded-6">
        {children}
      </pre>
    </>
  )
}
