const appendScript2Doc = (link, callback) => {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = link // 在线引用
  s.onload = () => {
    // js读取完成后
    callback && callback()
  }
  document.head.appendChild(s)
}