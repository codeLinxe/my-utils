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