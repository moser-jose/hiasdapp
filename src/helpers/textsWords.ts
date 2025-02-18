const truncateText = (text: string, maxLength: number = 0): string => {
  if (text.length > maxLength) return text.slice(0, maxLength) + '...'
  return text
}

const truncateTextWords = (text: string, maxWords: number = 0): string => {
  const words = text.split(' ')
  if (words.length > maxWords) return words.slice(0, maxWords).join(' ') + '...'
  return text
}

export { truncateTextWords, truncateText }
