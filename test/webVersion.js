import ajax from '封装http函数'
import { ENV_APP_NAME } from '@/config/config.js'
import { doRefreshWebview } from './appEvent'

const isInSysAppBrowser = window.isInBrandAppBrowser

const isNewVersion = (callback) => {
  let url = `${window.location.origin}/web_version.json?t=${new Date().getTime()}`
  if (process.env.NODE_ENV === 'development') {
    callback && callback()
    return
  }
  try {
    ajax.get(url).then(res => {
      console.warn('isNewVersion-res', res)
      if (res.version) {
        let web_version = res.version || ''
        let localVersion = uni.getStorageSync(`${ENV_APP_NAME}_web_version`) || ''
        uni.setStorageSync(`${ENV_APP_NAME}_web_version`, web_version)
        if (localVersion !== '' && localVersion != web_version) {
          console.warn('检测到新版本')
          if (isInSysAppBrowser) {
            doRefreshWebview()
          } else {
            const link = location.href
            if (link.indexOf('?') === -1) {
              link += `?vRefresh=${new Date().getTime()}`
            } else {
              link += `&vRefresh=${new Date().getTime()}`
            }
            window.location.replace(link)
          }
        }
        callback && callback()
      }
    }).catch(err => {
      callback && callback()
    })
  } catch (error) {
    callback && callback()
  }
}

export default {
  isNewVersion
}