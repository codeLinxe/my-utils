/**
 * @desc 判断输入值是否是数组类型
 * @param {*} val 
 * @return {Boolean}
 */
function isArray(val) {
    if(!val) {
        return false
    }
    if(Object.prototype.toString.call(val) === '[object Array]') {
        return true
    }
    return false
}