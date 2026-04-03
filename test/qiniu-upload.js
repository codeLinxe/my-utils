import * as qiniu from 'qiniu-js'
import service from '封装http函数'

export const uploader = async (file, complete, error, next) => {
  if (!next) next = () => {} 
  if (!error) error = () => {} 
  if (!complete) complete = () => {}
  let qiniuToken = ''
  let qiniu_domain = ''
  try {
    const { data } = await service('/v1/getQiniuToken')
    qiniuToken = data?.token || ''
    qiniu_domain = data?.qiniu_domain || ''
  } catch (error) {
    console.error('qiniu-error', error)
  }
  if (!qiniuToken) {
    error && error('token不存在')
    return
  }
  // console.log('qiniuToken', qiniuToken)
  const observable = qiniu.upload(file, `/uploads/${ new Date().getTime() }.png`, qiniuToken)
  const subscription = observable.subscribe((res) => {
    next && next(res)
  },
  (err) => {
    error && error(err)
  },
  (res) => {
    const { key } = res
    const CDN_DOMAIN = qiniu_domain || '默认CDN地址'
    const url = `${CDN_DOMAIN}/${key}`
    complete && complete(url)
  })
} 

