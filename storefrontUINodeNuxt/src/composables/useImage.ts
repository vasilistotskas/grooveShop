export const useImage = () => {
	const resolveImageFilenameNoExt = (fileName: string) => {
		if (!fileName) return undefined
		return fileName.split('.').slice(0, -1).join('.')
	}

	const resolveImageFileExtension = (fileName: string) => {
		if (!fileName) return undefined
		return fileName.split('.').pop()
	}

	return {
		resolveImageFilenameNoExt,
		resolveImageFileExtension
	}
}
