const getFileSize = (filePath) => {
  return new Promise((resolve) => {
    try {
      const fs = typeof uni.getFileSystemManager === 'function' ? uni.getFileSystemManager() : null
      if (fs && typeof fs.getFileInfo === 'function') {
        fs.getFileInfo({
          filePath,
          success: (res) => resolve(res.size || 0),
          fail: () => resolve(0)
        })
        return
      }
      uni.getFileInfo({
        filePath,
        success: (res) => resolve(res.size || 0),
        fail: () => resolve(0)
      })
    } catch (e) {
      resolve(0)
    }
  })
}

const compressImageToLimit = async (filePath, limitKB = 200) => {
  try {
    const limit = limitKB * 1024
    let size = await getFileSize(filePath)
    if (size && size <= limit) return filePath
    
    let currentPath = filePath
    const qualities = [80, 70, 60, 50, 40, 35]
    for(const q of qualities) {
      const newPath = await new Promise((resolve) => {
        uni.compressImage({
          src: currentPath,
          quality: q,
          success: (res) => resolve(res.tempFilePath || (res.tempFilePaths && res.tempFilePaths[0]) || currentPath),
          fail: () => resolve(currentPath)
        })
      })
      currentPath = newPath
      size = await getFileSize(currentPath)
      if (size && size <= limit) break
    }
    return currentPath
  } catch (e) {
    console.error('图片压缩失败:', e)
    return filePath
  }
}