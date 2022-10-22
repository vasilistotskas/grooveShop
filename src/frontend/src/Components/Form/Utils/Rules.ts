export const required = (msg: string) => (x: string) => !x && msg
export const min =
	(min: number) => (msg: string) => (x: Array<Record<string, unknown>>) =>
		x.length >= min || msg
export const max =
	(max: number) => (msg: string) => (x: Array<Record<string, unknown>>) =>
		x.length <= max || msg
export const exactly =
	(min: number) => (msg: string) => (x: Array<Record<string, unknown>>) =>
		x.length === min || msg
export const minMax =
	(min: number, max: number) => (msg: string) => (x: Array<Record<string, unknown>>) =>
		(min <= x.length && x.length <= max) || msg
export const email = (msg: string) => (x: string) => /\S+@\S+\.\S+/.test(x) || msg
export const equal =
	(msg: string) =>
	(...xs: Array<Record<string, unknown>>) =>
		xs.every((x) => x === xs[0]) || msg
