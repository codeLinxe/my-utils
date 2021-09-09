/**
 * @desc 将base64转换为blob
 * @param dataurl {String}
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

/**
 * @desc 将blob转换为file
 * @param theBlob {Blob}
 * @param fileName {String}
 */
function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

/**
 * @desc 将base64转换成图片文件
 * @param base64 {String}
 * @param filename {String}
 * @returns {File}
 */
function dataURLtoFile(base64, filename) {
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}