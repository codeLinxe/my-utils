// 让微信端，返回页面可刷新
// 需要刷新页
if(navigator.userAgent.indexOf('iPhone OS') != -1) {
    window.addEventListener("popstate", function(e) {
        self.location.reload();
    }, false);
    var state = {
        title : "",
        url : "#"
    };
    window.history.replaceState(state, "", "#");
}else {
    var needRefresh = sessionStorage.getItem("need-refresh");
    if(needRefresh){
        sessionStorage.removeItem("need-refresh");
        location.reload();
    }
}

// 需要后退页
if(navigator.userAgent.indexOf('iPhone OS') != -1) {
  window.addEventListener("popstate", function(e) {
      self.location.reload();
  }, false);
  var state = {
      title : "",
      url : "#"
  };
  window.history.replaceState(state, "", "#");
}else {
  sessionStorage.setItem("need-refresh");
}