/**
 * @desc 模拟定时器
 * @param callback
 * @param interval
 * @returns {number}
 */
function simulateInterval(callback, interval) {
    let timerId = null;

    function fn() {
        const prevTimmerId = timerId;
        timerId = setTimeout(fn, interval);
        callback(timerId);
        clearTimeout(prevTimmerId);
    }

    return setTimeout(fn, interval);
}

/**
 * @desc 清除模拟定时器
 * @param intervalId
 */
function simulateClearInterval(intervalId) {
    intervalId && clearTimeout(intervalId);
}