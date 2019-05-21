function getViewSize() {
  var viewWidth = document.documentElement.clientWidth; 
  var viewHeight = document.documentElement.clientHeight;
  return {
    viewWidth: viewWidth,
    viewHeight: viewHeight
  }
}