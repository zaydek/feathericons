import sass from "esbuild:sass"

import * as Feather from "react-feather"
import * as utils from "../utils"

import StyledTooltip from "./StyledTooltip"
import SVG from "./SVG"

export default function AppLHSSearchBar() {
  const searchBarInputRef = React.useRef(null)

  const [searchInputValue, setSearchInputValue] = React.useState(() => {
    const search = window.location.search.slice("?search=".length)
    if (search === "") return ""
    return utils.decodeURL(search)
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
    const search = utils.encodeURL(searchInputValue)
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
