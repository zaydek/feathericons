export function encodeURL(str) { return encodeURI(str.replace(/\s/g, "+")) }
export function decodeURL(str) { return decodeURI(str.replace(/\+/g, " ")) }
