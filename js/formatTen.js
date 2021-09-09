/**
 * @desc 十位数补零
 * @param {Number} n 
 * @returns {String}
 */
function formatTen(n) {
    return (n > 9) ? '' + n : '0' + n;
}