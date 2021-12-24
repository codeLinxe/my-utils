/**
 *
 * @desc 获取url参数
 * @param {String} url
 * @returns {Object}
 */
function getUrlParams(url = window.location.href) {
    let search = window.location.search;
    if (!search) {
        return false;
    }
    let href = url.split('#')[0],
        str = href.split("?")[1], //  通过"?"得到一个数组,取?后面的参数
        items = str.split("&"), //  通过"&"分割成数组
        arr, name, value,
        result = {};
    for (let i = 0; i < items.length; i++) {
        arr = items[i].split("="); //  通过"="分割出每个参数的key和value
        name = arr[0];
        value = arr[1];
        result[name] = value;
    }
    return result;
}

/**
 * 获取url参数
 *
 * @param {*} name
 * @param {*} [url=window.location.serach]
 * @returns
 */
function getQueryString(name, url) {
    var url = url || window.location.href
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(1).match(reg)
    if (r != null) {
        return r[2]
    }
    return null
}