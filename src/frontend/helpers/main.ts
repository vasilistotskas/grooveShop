export const helpers = {
  contentShorten: (text: string, from: number, to: number) => {
    if (text.length < to) {
      return text.substr(from, to)
    }
    return text.substr(from, to) + '...'
  },
}
