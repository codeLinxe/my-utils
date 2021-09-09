/**
 * @desc 获得百分数
 * @param {Number} n 
 * @returns {String}
 */
function percentage(n) {
    n *= 100;
    return ((n > 100) ? 100 : (n < 0) ? 0 : n) + "%";
}