import * as React from "react"

////////////////////////////////////////////////////////////////////////////////

const useIsomorphicLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

function truthy(v: unknown): boolean {
	return !!v
}

////////////////////////////////////////////////////////////////////////////////

interface Direction {
	durMS?: number
	func?: string
	delayMS?: number
	x?: number | string
	y?: number | string
	scale?: number
}

function buildStyleObject(dir: Direction): Record<string, number | string> {
	const {
		durMS: _1,   // No-op
		func: _2,    // No-op
		delayMS: _3, // No-op
		x,
		y,
		scale,
		...rest
	} = dir

	const out = rest as Record<string, number | string>
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

		out["transform"] = transformStr
	}
	return out
}

function kebabCase(str: string): string {
	return str.replace(/([A-Z])/g, (_, $1, x) =>
		(x === 0 ? "" : "-") + $1.toLowerCase())
}

function aliases(arr: string[]): string[] {
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
		return kebabCase(v)
	})
	return out.filter(v => v !== undefined) as string[]
}

interface TransitionProps {
	from: Direction
	to: Direction
	durMS?: number
	func?: string
	delayMS?: number
	children?: any
}

// Usage:
//
// <Transition
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
//   {open && (
//     // ...
//   )}
// </Transition>
//
export default function Transition({ from, to, durMS, func, delayMS, children }: TransitionProps): JSX.Element {
	const [computedStyles, setComputedStyles] = React.useState(buildStyleObject(from))
	const [computedDurMS, setComputedDurMS] = React.useState(from.durMS ?? durMS ?? 300)
	const [computedFunc, setComputedFunc] = React.useState(from.func ?? func ?? "ease-out")
	const [computedDelayMS, setComputedDelayMS] = React.useState(from.delayMS ?? delayMS ?? 0)
	const [computedChildren, setComputedChildren] = React.useState(children)

	// Layout effect to compute computedChildren from children
	useIsomorphicLayoutEffect(() => {
		if (truthy(children)) {
			setComputedChildren(children)
			return
		}
		const timeoutID = setTimeout(() => {
			setComputedChildren(children)
		}, computedDelayMS + computedDurMS)
		return () => {
			clearTimeout(timeoutID)
		}
	}, [(computedDelayMS + computedDurMS), children])

	// Debounced effect to compute computedStyles, computedDurMS, and computedFunc
	React.useEffect(() => {
		// Debounce by one frame
		const timeoutID = setTimeout(() => {
			let dir = from
			if (truthy(children) && truthy(computedChildren)) {
				dir = to
			}
			setComputedStyles(buildStyleObject(dir))
			setComputedDurMS(dir.durMS ?? durMS ?? 300)
			setComputedFunc(dir.func ?? func ?? "ease-out")
			setComputedDelayMS(dir.delayMS ?? delayMS ?? 0)
		}, 16.67)
		return () => {
			clearTimeout(timeoutID)
		}
	}, [from, to, durMS, func, delayMS, children, computedChildren])

	if (!truthy(computedChildren)) {
		return null
	}

	// Compute on every truthy render
	const distinct = [
		...new Set([
			...aliases(Object.keys(from)),
			...aliases(Object.keys(to)),
		]),
	]

	return React.cloneElement(computedChildren, {
		style: {
			...computedStyles,
			willChange: distinct.join(", "),
			transition: distinct.map(v => `
				${v}
				${computedDurMS}ms
				${computedFunc}
				${computedDelayMS}ms
			`).join(", "),
		},
	})
}
