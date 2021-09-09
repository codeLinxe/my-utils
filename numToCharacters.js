/**
 * @desc 数字转换成 w,k
 * 1200 ——>  1k+
 * 18000 ——>  1w+
 */
function numToCharacters(num) {
    if (Number(num) >= 10000) {
        if (num % 10000 == 0) {
            num = (num / 10000) + 'w'
        } else {
            num = (num / 10000).toFixed(1) + 'w'
        }
    } else if (Number(num) >= 1000) {
        if (num % 1000 == 0) {
            num = (num / 1000) + 'k'
        } else {
            num = (num / 1000).toFixed(1) + 'k'
        }
    }
    return num;
}