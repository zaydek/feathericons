// buildStyleObject builds a style object from a directional object. Properties
// such as 'x', 'y', and 'scale' are transformed to a 'transform' string.
// Transforms concatenate 'translateZ(0)' so transforms are GPU-aware.
function buildStyleObject(dir) {
	const {
		durMS: _1, // No-op
		func: _2,  // No-op
		x,
		y,
		scale,
		...rest
	} = dir

	const out = { ...rest }
	if (x !== undefined || y !== undefined || scale !== undefined) {
		let transformStr = ""
		if (x !== undefined) {
			if (transformStr !== "") transformStr += " "
			transformStr += `translateX(${typeof x === "string" ? x : `${x}px`})`
		}
		if (y !== undefined) {
			if (transformStr !== "") transformStr += " "
			transformStr += `translateY(${typeof y === "string" ? y : `${y}px`})`
		}
		if (scale !== undefined) {
			if (transformStr !== "") transformStr += " "
			transformStr += `scale(${scale})`
		}
		transformStr += " "
		transformStr += `translateZ(0)`

		out.transform = transformStr
	}
	return out
}

function aliases(arr) {
	const out = arr.map(v => {
		switch (v) {
			case "durMS": // No-op
			case "func":  // No-op
				return undefined
			case "x":
			case "y":
			case "scale":
				return "transform"
		}
		// Convert to kebab-case
		return v.replace(/([A-Z])/g, (_, $1, x) => {
			return (x === 0 ? "" : "-") + $1.toLowerCase()
		})
	})
	return out.filter(v => v !== undefined)
}

// <Transform> composes a CSS transition based on object-based styles. The 'on'
// property describes when a transition starts and ends, 'from' describes the
// transition start state and 'to' describes the transition end state.
//
// Usage:
//
// <Transition
//   on={open}
//   from={{
//     boxShadow: `
//       0 0 1px hsla(0, 0%, 0%, 0.25),
//       0 0 transparent,
//       0 0 transparent
//     `,
//     opacity: 0,
//     y: -20,
//     scale: 0.75,
//     durMS: 1_000,
//   }}
//   to={{
//     boxShadow: `
//       0 0 1px hsla(0, 0%, 0%, 0.25),
//       0 8px 8px hsla(0, 0%, 0%, 0.1),
//       0 2px 8px hsla(0, 0%, 0%, 0.1)
//     `,
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     durMS: 300,
//   }}
//   func="cubic-bezier(0, 0.75, 0.25, 1.1)"
// >
//   {...}
// </Transition>
//
const Transition = React.forwardRef(({ on, from, to, durMS, func, children }, ref) => {
	if (!React.isValidElement(children)) {
		throw new Error("!React.isValidElement(children)")
	}

	ref ??= children.ref

	const [computedStyles, setComputedStyles] = React.useState(buildStyleObject(from))
	const [computedDurMS, setComputedDurMS] = React.useState(from.durMS ?? durMS ?? 300)
	const [computedFunc, setComputedFunc] = React.useState(from.func ?? func ?? "ease-out")

	React.useEffect(() => {
		const target = !on ? from : to
		setComputedStyles(buildStyleObject(target))
		setComputedDurMS(target.durMS ?? durMS ?? 300)
		setComputedFunc(target.func ?? func ?? "ease-out")
	}, [on, from, to, durMS, func])

	const distinct = [
		...new Set([
			...aliases(Object.keys(from)),
			...aliases(Object.keys(to)),
		]),
	]

	return (
		React.cloneElement(
			children,
			{
				ref,
				style: {
					...computedStyles,
					willChange: distinct.join(", "),
					transition: distinct.map(v => `${v} ${computedDurMS}ms ${computedFunc} 0ms`).join(", "),
				},
			}
		)
	)
})

export default Transition
