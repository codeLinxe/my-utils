/**
 * 
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * 
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^[1][0-9]{10}$/.test(str)
}

/**
 * 
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

function isSpec(str) {
    return /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/.test(str)
}

// IP地址、前后有汉字、带参数的，都是OK的。
function urlReg(str) {
    return /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(str)
}

function strNmberTotal(e) {
    //只保留第一个. 清除多余的(/\.{2,}/g, ".")
    e.target.value = e.target.value.replace(/\.{2,}/g, ".");
    //禁止录入整数部分两位以上，但首位为0
    e.target.value = e.target.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
    //禁止录入整数部分超过13位
    e.target.value = e.target.value.replace(/^([1-9]\d{12})\d*/g, '$1');
    //替换除了数字和.以外的字符
    e.target.value = e.target.value.replace(/[^\d\.]/g, '').replace(/^0{2,}/g, '');
    //第一个输入.  则自动变为0.
    e.target.value = e.target.value.replace(/^\./g, '0.');
    //保证.只出现一次，而不能出现两次以上 2..    2.2.2
    e.target.value = e.target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    //只能输入两个小数
    e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
}
/**
 * 匹配中文和标点符号
 * @param {*} e 
 * @returns 
 */
function isChinese(e) {
    return /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g.text(e)
}