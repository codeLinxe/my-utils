function urlBackReload() {
    window.addEventListener('pageshow', function(event) {
        //event.persisted属性为true时，表示当前文档是从往返缓存中获取
        if (event.persisted) location.reload();
    }, false);
}