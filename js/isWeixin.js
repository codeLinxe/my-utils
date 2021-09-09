/**
 *
 * @desc 判断是否为微信环境
 */
function is_weixin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}