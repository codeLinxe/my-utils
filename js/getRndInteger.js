/**
 * @desc 返回 min（包含）～ max（包含）之间的数字
 * @param min {Number}
 * @param max {Number}
 * @returns {Number}
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}