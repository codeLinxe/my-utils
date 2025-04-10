/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
export function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
}