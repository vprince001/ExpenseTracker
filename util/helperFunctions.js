export const ellipsize = (inputString, size) => {
  if (inputString.length > size) {
    return inputString.substring(0, size).trim() + '...'
  }
  return inputString
}

export const generateDatabaseId = () => {
  return Math.floor(10000000 + Math.random() * 90000000)
}
