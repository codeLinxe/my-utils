/**
 * @desc xhr请求
 * @param url
 */
function xhrHttp(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            // console.log('xhr.readyState', xhr.readyState)
            switch (xhr.readyState) {
                case 4:
                    // 请求成功
                    let responseStr = xhr.response;
                    let response = null;
                    try {
                        response = JSON.parse(responseStr)
                    } catch (e) {
                        response = null;
                    }
                    // console.log('response', response)
                    if (response) {
                        resolve(response)
                    } else {
                        reject('无数据')
                    }
                    break;
                default:
                    break;
            }
        }
    })
}