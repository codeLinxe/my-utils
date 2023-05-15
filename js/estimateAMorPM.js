/**
 * @desc 判断上午还是下午
 * @param {*} date
 */
const estimateAMorPM = (date) => {
  let hour = date.getHours()
  if (hour <= 12) {
    return '上午'
  } else {
    return '下午'
  }
}

const result = estimateAMorPM(new Date())

console.log('result', result)