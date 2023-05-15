const b64toFile = (dataurl, filename) => {
    // 获取到base64编码
    const arr = dataurl.split(',')
    // 将base64编码转为字符串
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {
        type: 'image/png',
    })
}


const blob2File = (theBlob, fileName) => {
    return new File([theBlob], fileName + '.png', {
        type: 'image/png'
    });
}

/**
 * @desc file转image
 * @param {*} file 
 * @returns 
 */
const file2Image = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = (e) => {
            img.src = e.target.result
        }
        reader.onerror = (e) => {
            reject(e)
        }
        reader.readAsDataURL(file)
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (e) => {
            reject(e)
        }
    })
}

/**
 * @desc file转base64
 * @param {*} file 
 * @returns 
 */
const file2B64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target.result)
        }
        reader.onerror = (e) => {
            reject(e)
        }
        reader.readAsDataURL(file)
    })
}

/**
 * @desc 是否base64字符串
 * @param {*} str 
 * @returns 
 */
const isBase64Str = (str) => {
    if (typeof str !== 'string') return false
    if (str.indexOf('data:') != -1 && str.indexOf('base64') != -1) {
        return true;
    } else {
        return false;
    }
}