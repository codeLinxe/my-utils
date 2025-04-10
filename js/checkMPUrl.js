/**
   * 微信头像
   * @param {String} url -图片地址
   */
const checkMPUrl = (url) => {
    // #ifdef MP
    if (
        url.substring(0, 4) === 'http' &&
        url.substring(0, 5) !== 'https' &&
        url.substring(0, 12) !== 'http://store' &&
        url.substring(0, 10) !== 'http://tmp' &&
        url.substring(0, 10) !== 'http://usr'
    ) {
        url = 'https' + url.substring(4, url.length);
    }
    // #endif
    return url;
}