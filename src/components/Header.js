function TopNav() {
	return (
		<nav className="hide sm:show px-16 sm:px-24 py-16 absolute top-all">
			<div className="flex-row justify-center">
				<div className="flex-row m-gap-16 w-xl">
					<div className="flex-row align-center m-gap-8">
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-grow"></div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
					<div className="flex-row align-center m-gap-8">
						<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
						<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					</div>
				</div>
			</div>
		</nav>
	)
}

function ObscureBackground() {
	return (
		<>
			<div className="hide xl:show absolute top-all -z-10" style={{ top: "100%" }}>
				<div className="sass-ObscureElement h-192"></div>
				<svg className="sass-ObscureSVG" fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>
			<div className="hide xl:show fixed top-all -z-10">
				<div className="sass-ObscureElement h-192"></div>
				<svg className="sass-ObscureSVG" fill="currentColor" viewBox="0 0 32 1" xmlns="http://www.w3.org/2000/svg">
					<path d="M16 1C4 1 0 0 0 0H32C32 0 28 1 16 1Z"></path>
				</svg>
			</div>
		</>
	)
}

export default function Header() {

	function SponsorButton() {
		return (
			<div className="flex-col align-center m-gap-12">
				<div className="flex-row justify-center w-192 h-48 bg-light-only rounded-full"></div>
				<div className="flex-row align-center m-gap-8">
					<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
					<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
				</div>
			</div >
		)
	}

	return (
		<header className="sass-ObscureElement relative">

			<TopNav />

			<ObscureBackground />

			<div className="px-16 sm:px-24 py-96 flex-row justify-center">
				<div className="flex-col xl:flex-row xl:align-center m-gap-48 w-lg">

					{/* CTA */}
					<div className="flex-col align-center m-gap-32">
						<div className="w-64 h-64 bg-lighter-only rounded-full"></div>
						<div className="flex-col align-center m-gap-16">
							<div className="w-160 h-16 bg-lighter-only rounded-full"></div>
							<div className="w-256 h-8 bg-lighter-only rounded-full"></div>
						</div>
						{/* Use a custom <Button> because of self-stretch, sm:w-192, and
						rounded-12 sm:rounded-full */}
						{/* FIXME: Too wide. Do we need to introduce flex-shrink? */}
						<div className="self-stretch sm:self-center flex-col sm:flex-row m-gap-16">
							<div className="flex-row justify-center sm:w-192 h-48 bg-light-only rounded-12 sm:rounded-full">
								<div className="flex-row align-center m-gap-12">
									<div className="w-16 h-16 bg-lighter-only rounded-full"></div>
									<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
								</div>
							</div>
							<div className="flex-row justify-center sm:w-192 h-48 bg-light-only rounded-12 sm:rounded-full">
								<div className="flex-row align-center m-gap-12">
									<div className="w-16 h-16 bg-lighter-only rounded-full"></div>
									<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
								</div>
							</div>
						</div>
					</div>

					{/* Sponsors (1 of 2) */}
					<div className="hide sm:hide xl:show flex-grow"></div>
					<div className="hide sm:hide xl:show flex-col align-center m-gap-24">
						<div className="flex-row m-gap-16">
							<div className="flex-row align-center m-gap-8">
								<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
							<div className="flex-row align-center m-gap-8">
								<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
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
							<div className="flex-row align-center m-gap-8">
								<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
							<div className="flex-row align-center m-gap-8">
								<div className="w-12 h-12 bg-lighter-only rounded-full"></div>
								<div className="w-96 h-8 bg-lighter-only rounded-full"></div>
							</div>
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

		</header>
	)
}
