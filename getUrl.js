/**
 *
 * @desc 获取url参数
 * @param {String} url
 * @returns {Object}
 */
function getUrl(url) {
  let str = url.split("?")[1], //  通过"?"得到一个数组,取?后面的参数
    items = str.split("&"); //  通过"&"分割成数组
  let arr, name, value;
  let result = {};
  for (let i = 0; i < items.length; i++) {
    arr = items[i].split("="); //  通过"="分割出每个参数的key和value
    name = arr[0];
    value = arr[1];
    result[name] = value;
  }
  return result;
}
