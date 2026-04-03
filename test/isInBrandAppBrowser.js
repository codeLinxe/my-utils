

(function() {
  var o = {
  a: () => {
    // #ifdef H5
    const reg = RegExp('global/android', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('global/android')
    // #endif
    return false
  },
  b: () => {
    // #ifdef H5
    const reg = RegExp('greengage', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    // 通过正则表达式匹配ua中是否含有micromessenger字符串
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('greengage')
    // #endif
    return false
  },
  c: () => {
    // #ifdef H5
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    const reg = RegExp('ycf', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    // 通过正则表达式匹配ua中是否含有yuanmeng字符串
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('ycf')
    // #endif
    return false
  },
  d: () => {
    // #ifdef H5
    const reg1 = RegExp('jjt','u')
    const regexp1 = window.navigator.userAgent.toLowerCase().match(reg1)
    if (regexp1) {
      return regexp1.toString().includes('jjt')
    }
    
    const reg2 = RegExp('smoothly0427','u')
    const regexp2 = window.navigator.userAgent.toLowerCase().match(reg2)
    if (regexp2) {
      return regexp2.toString().includes('smoothly0427')
    }
    // #endif
    return false
  },
  e: () => {
    // #ifdef H5
    const reg = RegExp('yuanmeng', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    // 通过正则表达式匹配ua中是否含有yuanmeng字符串
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('yuanmeng')
    // #endif
    return false
  },
  f: () => {
    // #ifdef H5
    const reg = RegExp('ypbr', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('ypbr')
    // #endif
    return false
  },
  g: () => {
    // #ifdef H5
    const reg1 = RegExp('mainunion','u')
    const regexp1 = window.navigator.userAgent.toLowerCase().match(reg1)
    if (regexp1) {
      return regexp1.toString().includes('mainunion')
    }
    
    const reg2 = RegExp('chain0702','u')
    const regexp2 = window.navigator.userAgent.toLowerCase().match(reg2)
    if (regexp2) {
      return regexp2.toString().includes('chain0702')
    }
    // #endif
    return false
  },
  h: () => {
    // #ifdef H5
    const reg1 = RegExp('cumquat','u')
    const regexp1 = window.navigator.userAgent.toLowerCase().match(reg1)
    if (regexp1) {
      return regexp1.toString().includes('cumquat')
    }

    const reg2 = RegExp('sheep121','u')
    const regexp2 = window.navigator.userAgent.toLowerCase().match(reg2)
    if (regexp2) {
      return regexp2.toString().includes('sheep121')
    }

    const reg3 = RegExp('brahmalotus','u')
    const regexp3 = window.navigator.userAgent.toLowerCase().match(reg3)
    if (regexp3) {
      return regexp3.toString().includes('brahmalotus')
    }
    // #endif
    return false
  },
  i: () => {
    // #ifdef H5
    const reg = RegExp('rjbr', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('rjbr')
    // #endif
    return false
  },
  j: () => {
    // #ifdef H5
    const reg = RegExp('litchieast', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('litchieast')
    // #endif
    return false
  },
  k: () => {
    // #ifdef H5
    const reg = RegExp('circle', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('circle')
    // #endif
    return false
  },
  l: () => {
    // #ifdef H5
    const reg = RegExp('ginkgo', 'u')
    const regexp = window.navigator.userAgent.toLowerCase().match(reg)
    if (regexp === null) {
      return false
    }
    return regexp.toString().includes('ginkgo')
    // #endif
    return false
  }
}
  var res = false
  for(var k in o) {
    var fn = o[k] || null
    var flag = false
    if (typeof fn === 'function') {
      flag = fn()
    }
    if (flag) {
      res = true
      break
    }
  }
  window.isInBrandAppBrowser = res
})()