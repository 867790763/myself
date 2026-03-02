const UTF8 = require('crypto-js/enc-utf8');
const Base64 = require('crypto-js/enc-base64');
const Md5 = require('crypto-js/md5');
export interface EncryptionParams {
  key: string;
  iv: string;
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decryptByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return Md5(password).toString();
}