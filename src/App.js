function iota(max) {
	return Array.from(new Array(max), (_, x) => x);
}

function ItemLTR({ children }) {
	return (
		<div className="flex-row align-center m-gap-12">
			{children ?? <>
				<div className="w-16 h-16 bg-cool-gray-300 rounded-full"></div>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

function ItemLTRSmall({ children }) {
	return (
		<div className="flex-row align-center m-gap-8">
			{children ?? <>
				<div className="w-12 h-12 bg-cool-gray-300 rounded-full"></div>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

function ItemRTL({ children }) {
	return (
		<div className="flex-row align-center m-gap-12">
			{children ?? <>
				<div className="w-96 h-8 bg-cool-gray-300 rounded-full"></div>
				<div className="w-16 h-16 bg-cool-gray-300 rounded-full"></div>
			</>}
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Header() {

	function SponsorButton() {
		return (
			<div className="flex-col align-center m-gap-12">
				<div className="flex-row justify-center w-192 h-48 bg-cool-gray-200 rounded-full"></div>
				<ItemLTRSmall />
			</div >
		)
	}

	return (
		// Use pb-112 to compensate for <TopNav className="h-48 ...">
		<div className="px-16 sm:px-24 py-64 pb-112 flex-row justify-center">
			<div className="flex-col xl:flex-row xl:align-center m-gap-48 w-lg">

				{/* CTA */}
				<div className="flex-col align-center m-gap-32">
					<div className="w-64 h-64 bg-cool-gray-300 rounded-full"></div>
					<div className="flex-col align-center m-gap-16">
						<div className="w-160 h-16 bg-cool-gray-300 rounded-full"></div>
						<div className="w-256 h-8 bg-cool-gray-300 rounded-full"></div>
					</div>
					{/* Use a custom <Button> because of self-stretch, sm:w-192, and
					rounded-12 sm:rounded-full */}
					<div className="self-stretch sm:self-center flex-col sm:flex-row m-gap-16">
						<div className="flex-row justify-center sm:w-192 h-48 bg-cool-gray-200 rounded-12 sm:rounded-full">
							<ItemLTR />
						</div>
						<div className="flex-row justify-center sm:w-192 h-48 bg-cool-gray-200 rounded-12 sm:rounded-full">
							<ItemLTR />
						</div>
					</div>
				</div>

				{/* Sponsors (1 of 2) */}
				<div className="hide sm:hide xl:show flex-grow"></div>
				<div className="hide sm:hide xl:show flex-col align-center m-gap-24">
					<div className="flex-row m-gap-16">
						<ItemLTRSmall />
						<ItemLTRSmall />
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
						<ItemLTRSmall />
						<ItemLTRSmall />
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
	)
}

export default function App() {
	return (
		<>
			{/* Top nav */}
			<div className="hide sm:show px-16 sm:px-24 py-16 flex-row justify-center">
				<div className="flex-row m-gap-16 w-xl">
					<ItemLTR />
					<div className="flex-grow"></div>
					<ItemRTL />
					<ItemRTL />
				</div>
			</div>

			{/* Header */}
			<Header />

			{/* App */}
			<div className="flex-row justify-center">
				<div className="w-xl bg-white xl:rounded-24 shadow">

					{/* <StickyObscureEffect> */}
					{/* TODO: May need to add -my to cover shadow */}
					<div className="hide xl:show -mx-8 -mb-24 sticky top-all z-20">
						<div className="flex-row">
							<div className="w-8 h-40 bg-cool-gray-100"></div>
							<svg className="w-24 h-40 color-cool-gray-100" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M24 0H0V40C0 26.7451 10.7451 16 24 16V0Z" />
							</svg>
							<div className="flex-grow h-16 bg-cool-gray-100"></div>
							<svg className="w-24 h-40 color-cool-gray-100" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M0 0H24V40C24 26.7451 13.2549 16 0 16V0Z" />
							</svg>
							<div className="w-8 h-40 bg-cool-gray-100"></div>
						</div>
					</div >

					{/* Defer flex-row to here not w-xl because of <<StickyObscureEffect>> */}
					<div className="flex-row">

						{/* LHS */}
						<div className="flex-grow">

							{/* Search bar */}
							<div className="xl:-mt-16 xl:pt-16 sticky top-all z-10">
								<div className="relative">
									{/* Buttons */}
									<div className="px-16 sm:px-24 flex-row align-center m-gap-16 h-80 sm:h-96 bg-white rounded-top-left-24 border-bottom-1">
										<div className="w-32 h-32 bg-cool-gray-200 rounded-full"></div>
										<div className="flex-grow"></div>
										<div className="w-32 h-32 bg-cool-gray-200 rounded-full"></div>
										<div className="w-32 h-32 bg-cool-gray-200 rounded-full"></div>
									</div>
									{/* Input */}
									<div className="absolute left-all">
										<div className="px-16 sm:px-24 pl-64 sm:pl-80 flex-row align-center h-full">
											<div className="w-192 h-8 bg-cool-gray-200 rounded-full"></div>
										</div>
									</div>
								</div>
							</div>

							{/* Body */}
							<div className="px-16 xl:p-64 custom-grid">
								{iota(64).map(key => (
									<div key={key} className="aspect aspect-w-1 aspect-h-1 bg-cool-gray-100">
										<div className="flex-row center">
											<div className="w-64 h-64 bg-black rounded-full"></div>
										</div>

										<div className="relative">
											<div className="absolute bottom-all">
												<div className="px-8 py-4 flex-row justify-center h-full">
													<div>Hello, world!</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

						</div>

						{/* RHS */}
						<div className="hide md:show w-320 bg-cool-gray-50 rounded-right-24 border-left-1">
							<div className="xl:-mt-16 xl:pt-16 sticky top-all">

								{/* Top */}
								<div className="relative">
									<div className="flex-row center h-320 bg-white rounded-top-right-24 border-bottom-1">
										<div className="w-64 h-64 bg-cool-gray-200 rounded-full"></div>
										<div className="absolute top-all">
											<div className="p-24 flex-row align-center h-full">
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
										</div>
										<div className="absolute bottom-all">
											<div className="p-24 flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-cool-gray-200 rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
										</div>
									</div>
								</div>

								{/* Body */}
								{iota(2).map(key => (
									<React.Fragment key={key}>
										{key > 0 && <hr />}
										<div className="p-24 flex-col m-gap-16">
											{/* Top */}
											<div className="flex-row align-center m-gap-16 h-full">
												<div className="w-96 h-8 bg-cool-gray-200 rounded-full"></div>
												<div className="flex-grow"></div>
												<div className="w-24 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
											{/* Bottom */}
											<div className="flex-row align-center m-gap-16 h-full">
												<div className="flex-grow">
													<div className="h-8 bg-cool-gray-200 rounded-full"></div>
												</div>
												<div className="w-64 h-24 bg-cool-gray-200 rounded-full"></div>
											</div>
										</div>
									</React.Fragment>
								))}

								<hr />
								<div className="p-24 flex-row m-gap-16">
									<div className="w-128">
										<div className="aspect aspect-w-6 aspect-h-4 bg-cool-gray-200 rounded-4"></div>
									</div>
									<div className="flex-grow">
										<div className="flex-col m-gap-6 h-full">
											<div className="w-stagger-1 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-2 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-3 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="w-stagger-4 h-6 bg-cool-gray-200 rounded-full"></div>
											<div className="flex-grow"></div>
											<div className="self-end w-stagger-1 h-6 bg-cool-gray-200 rounded-full"></div>
										</div>
									</div>
								</div>

								{/* <hr /> */}

							</div>
						</div>

					</div>
				</div>
			</div>

			<div className="hide xl:show h-64"></div>
		</>
	)
}
