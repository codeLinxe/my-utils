/**
 * @desc 卸载（unload）文档之前向web服务器发送数据(用于客户追踪等特殊场景，需要在用户后退或关闭页面的情况下发送请求)
 * @param url
 * @param data
 */
function sendBeacon(url, data) {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, data);
    } else {
        var client = new XMLHttpRequest();
        client.open("POST", url, false); // 第三个参数表明是同步的 xhr
        client.setRequestHeader("Content-Type", "multipart/form-data;");
        client.send(data);
    }
}