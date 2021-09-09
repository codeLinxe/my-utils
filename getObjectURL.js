/**
 * @desc 将file文件转换为可显示的url
 * @param file
 * @returns {String}
 */
function getObjectURL(file) {
    var url = null
    if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
    } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}