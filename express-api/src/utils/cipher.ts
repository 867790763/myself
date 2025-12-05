const UTF8 = require('crypto-js/enc-utf8');
const Base64 = require('crypto-js/enc-base64');

export function decryptByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}