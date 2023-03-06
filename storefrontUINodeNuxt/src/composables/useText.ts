export const useText = () => {
	const contentShorten = (
		content: string | null | undefined = '',
		from = 0,
		to = 200,
		suffix = '...'
	) => {
		if (!content) return ''

		if (content.length < to) return content
		return content.substring(from, to) + suffix
	}

	const contentShortenByWords = (content: string, from = 0, to = 200, suffix = '...') => {
		const words = content.split(' ')
		if (words.length < to) return content
		return words.slice(from, to).join(' ') + suffix
	}

	return {
		contentShorten,
		contentShortenByWords
	}
}
