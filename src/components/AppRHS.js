import sass from "esbuild:sass"

export default function AppRHS() {
  return (
    <div className="xl:-mt-16 xl:pt-16 sticky top-all z-10">

      {/* Top */}
      <div className="relative">

        {sass`
					.sass-SidebarToolboxPreview {
						@include background-color($app-bg, $app-bg-dark);
					}
				`}

        <section className="sass-SidebarToolboxPreview flex-row center h-320 border-bottom-1 rounded-top-right-24">
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
        </section>

      </div>

      {/* Content */}
      {[0, 1].map(k => (
        <section key={k}>
          {k > 0 && <hr />}
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
        </section>
      ))}

      {/* Carbon Ads */}
      <hr />
      <section className="p-24 flex-row m-gap-16">
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
      </section>

    </div>
  )
}
