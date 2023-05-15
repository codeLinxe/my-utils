/**
 * @desc   判断是否为同一天
 * @param  {Date} date1
 * @param  {Date} date2 可选／默认值：当天
 * @return {Boolean}
 */
function isSameDay(date1, date2) {
  if (!date2) {
    date2 = new Date();
  }
  const date1ZeroTimer = date1.setHours(0, 0, 0, 0)
  const date2ZeroTimer = date2.setHours(0, 0, 0, 0)

  return date1ZeroTimer === date2ZeroTimer
}

let date1 = new Date('2023-05-16T03:24:00');

const result = isSameDay(date1)

console.log('result', result)
