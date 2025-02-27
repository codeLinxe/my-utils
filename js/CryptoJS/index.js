const CryptoJS = require('crypto-js');  //引用AES源码js

const dataDecrypt = (str, key, iv) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(iv)
  let decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(str)
  }, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const dataEncrypt = (str, key, iv) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(iv)
  let encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}