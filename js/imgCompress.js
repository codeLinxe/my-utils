/**
 * @desc 图片压缩
 * @param {*} file 
 * @returns 
 */
const imgCompress = async (file) => {
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