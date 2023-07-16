export function randomString(length: number, digits: number = 36) {
  let result = ''
  while (result.length < length) {
    result += Math.random().toString(digits).split('.')[1]
  }
  return result.slice(0, length)
}

export function genUid(len = 16) {
  return randomString(len, 36)
}
