const copy = ({content, success, error}) => {
  if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
    // 不支持
    error('浏览器不支持')
  }
  let textarea = document.createElement("textarea")
  textarea.value = content
  textarea.readOnly = "readOnly"
  document.body.appendChild(textarea)
  textarea.select() // 选择对象
  textarea.setSelectionRange(0, content.length) //核心
  let result = document.execCommand("copy") // 执行浏览器复制命令
  if (result) {
    success("复制成功~")
  } else {
    // 请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！
    error("复制失败~")
  }
  textarea.remove()
}