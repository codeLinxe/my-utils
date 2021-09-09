function filterFile(file, {
    size = 0,
    type = 'image'
}) {
    return new Promise((resolve, reject) => {
        let rFilter = ''
        let rFilterTip = ''
        switch (type) {
            case 'image':
                rFilter = /\/(?:jpeg|jpg|png|gif|webp)/i;
                rFilterTip = "您必须选择一个有效的图像文件！"
                break
            case 'video':
                rFilter = /\/(?:mp4|quicktime|mov)/i;
                rFilterTip = "您必须选择一个有效的视频文件！"
                break
            case 'radio':
                rFilter = /\/(?:mp3|mpeg)/i;
                rFilterTip = "您必须选择一个有效的音频文件！"
                break
            default:
                break
        }
        if (file.type && !rFilter.test(file.type)) {
            alert(rFilterTip);
            reject();
            return false;
        }
        if (!file.type) {
            let nameList = file.name.split('.')
            let type = nameList[nameList.length - 1]
            if (type && !rFilter.test(type)) {
                alert(rFilterTip);
                reject();
                return false;
            }
        }
        if (size > 0 && file.size > size) {
            let sizeStr = Math.floor(size / 1024 / 1024)
            let tipTxt = ''
            switch (type) {
                case 'image':
                    tipTxt = `图片太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                    break
                case 'video':
                    tipTxt = `视频太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                    break
                case 'radio':
                    tipTxt = `音频太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                    break
                default:
                    tipTxt = `文件太大了，会影响打开速度，小于${sizeStr}MB才行哦！`
                    break
            }
            alert(tipTxt);
            reject();
            return false;
        }
        resolve()
    })
}