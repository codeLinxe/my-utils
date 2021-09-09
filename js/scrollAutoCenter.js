/**
 * @desc 自动滚动到屏幕中间
 * @param tagName {String} 标签(className, idName)
 * @param type {String} 垂直还是水平(block, inline),默认水平inline
 */
function scrollAutoCenter(tagName, type = 'inline') {
    if (!tagName || typeof tagName !== 'string') {
        return false;
    }
    let option = {
        behavior: 'smooth'
    }
    option[type] = 'center';
    document.querySelector(tagName).scrollIntoView(option);
}