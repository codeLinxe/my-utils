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