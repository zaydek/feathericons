import * as cases from "../lib/cases"
import * as Feather from "react-feather"

import _tags from "./tags.json"
const tags = _tags as Record<string, string[]>

type Dataset = Record<string, {
	name: string
	tags: string[]
	common: string[]
}>

function hasCommon(arr1: string[], arr2: string[]): boolean {
	for (const v1 of arr1) {
		for (const v2 of arr2) {
			if (v1 === v2) {
				return true
			}
		}
	}
	return false
}

function main(): void {
	// Break space-separated tags
	for (const [k, v] of Object.entries(tags)) {
		const arr: string[] = []
		for (const str of v) {
			arr.push(...str.split(" "))
		}
		tags[k] = arr
	}
	// Get kebab-case keys
	const keys: string[] = Object.keys(Feather).map(v => cases.kebabCase(v))
	// Generate common tags
	const common: Record<string, string[]> = {}
	for (const v1 of keys) {
		for (const v2 of Object.keys(tags)) {
			if (v1 === v2) continue
			if (hasCommon(tags[v1] ?? [], tags[v2] ?? [])) {
				common[v1] = [...new Set([...tags[v1] ?? [], ...tags[v2] ?? []])]
			}
		}
	}
	// Generate dataset
	const dataset: Dataset = {}
	for (const v of keys) {
		dataset[v] = {
			name: v,
			tags: tags[v] ?? [],
			common: common[v] ?? [],
		}
	}
	console.log(JSON.stringify(dataset, null, "	"))
}

main()
