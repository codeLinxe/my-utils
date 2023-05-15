function getZeroTimestamp() {
  return new Date().setHours(0, 0, 0, 0)
}

const result = getZeroTimestamp()

console.log('result', result)