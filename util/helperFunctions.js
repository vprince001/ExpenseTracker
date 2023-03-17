export const ellipsize = (inputString, size) => {
  if (inputString.length > size) {
    return inputString.substring(0, size).trim() + '...'
  }
  return inputString
}

export const generateDatabaseId = () => {
  return +new Date()
}
