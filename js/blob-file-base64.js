const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    b64Data = b64Data.toString()
    const byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const byteArrays = [];


    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
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

/**
 * @desc 图片压缩
 * @param {*} file 
 * @returns 
 */
const imgCompress = async(file) => {
    // 将文件转img对象
    const img = await file2Image(file)
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        // 获取文件宽高比例
        const { width: originWidth, height: originHeight } = img
        // 自定义等比例缩放宽高属性，这里我用的是固定800宽度，高度是等比例缩放
        const scale = Number((originWidth / originHeight).toFixed(2)) // 比例取小数点后两位)
        const targetWidth = 800 // 固定宽
        const targetHeight = Math.round(800 / scale) // 等比例缩放高

        canvas.width = targetWidth
        canvas.height = targetHeight
        context.clearRect(
            0, 0, targetWidth, targetHeight,
        )
        // canvas重新绘制图片
        context.drawImage(
            img, 0, 0, targetWidth, targetHeight,
        )
        // canvas转二进制对象转文件对象，返回
        const type = 'image/png'
        canvas.toBlob((blob) => {
            const f = new File(
                [blob], file.name, {
                type,
                lastModified: file.lastModified,
            },
            )
            resolve(f)
        }, type)
    })
}