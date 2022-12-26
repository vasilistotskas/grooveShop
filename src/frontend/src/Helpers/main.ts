export const helpers = {
	contentShorten: (text: string, from: number, to: number) => {
		if (text.length < to) {
			return text.substring(from, to)
		}
		return text.substring(from, to) + '...'
	}
}
