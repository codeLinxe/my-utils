export function isMobileBrowser() {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  const bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  const bIsAndroid = sUserAgent.match(/android/i) == 'android'
  const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  }
  return false
}