import Cookies from "js-cookie";

// cookie key 前缀
const keyPrefix = "cxms_app_";

export function getCookie(key: string) {
  console.log('123', Cookies.get(`${keyPrefix}${key}`));
  
  return Cookies.get(`${keyPrefix}${key}`);
}

export function setCookie(key: string, value: string) {
  console.log('setCookie', value);
  
  Cookies.set(`${keyPrefix}${key}`, value, { expires: 30 });
}

export function removeCookie(key: string) {
  return Cookies.remove(`${keyPrefix}${key}`);
}
