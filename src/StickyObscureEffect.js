export default function StickyObscureEffect() {
  return (
    <div className="hide xl:show -mx-4 -mb-24 sticky top-all z-10">
      <div className="flex-row">
        <div className="w-4 h-40 bg-black"></div>
        <svg className="w-24 h-40 color-black" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M24 0H0V40C0 26.7451 10.7451 16 24 16V0Z" />
        </svg>
        <div className="flex-grow h-16 bg-black"></div>
        <svg className="w-24 h-40 color-black" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M0 0H24V40C24 26.7451 13.2549 16 0 16V0Z" />
        </svg>
        <div className="w-4 h-40 bg-black"></div>
      </div>
    </div >
  )
}
