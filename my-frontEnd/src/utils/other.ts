import { onBeforeMount, ref, computed } from "vue";

/**
 * @description: 是不是 Android 设备
 */
export const isAndroid = computed(() => {
  if (typeof window !== "undefined") {
    let u = navigator.userAgent;
    return u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
  }
});

/**
 * @description: 是不是 iOS 设备
 */
export const isiOS = computed(() => {
  if (typeof window !== "undefined") {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
});

/**
 * @description: 节流
 * @param {*} func 要执行的函数
 * @param {*} limit 时间
 * @param {*} isDelayExecution 是否需要，延迟执行一次
 * @return {*} function
 * @author: zhj1214
 */
export const throttle = function <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
  isDelayExecution = false
): (...args: Parameters<T>) => void {
  if (typeof window === "undefined") return () => {};
  let inThrottle: boolean;
  let lastFunc: number;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = window.setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            if (isDelayExecution) {
              func(...args);
              lastRan = Date.now();
            } else {
              inThrottle = false;
            }
          }
        },
        Math.max(limit - (Date.now() - lastRan), 0)
      );
    }
  };
};

/**
 * @description: 防抖
 * @param {*} function 执行函数
 * @param {*} delay 延迟时间
 * @param {*} isDelayexec 延迟以后是否执行(默认不执行)
 */
export const debounce = function <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  isDelayexec = false
): (...args: Parameters<T>) => void {
  if (typeof window === "undefined") return () => {};

  let timeoutId: number | undefined = undefined;
  let isRun: boolean = false;

  return function (...args: Parameters<T>) {
    // 1. 清除之前的延迟调用
    if (timeoutId !== undefined && timeoutId !== null) {
      clearTimeout(timeoutId);
      isRun = false;
    } else {
      // 1.2 立即执行
      func(...args);
      isRun = true;
    }
    // 2. 延迟
    timeoutId = window.setTimeout(() => {
      if (!isRun && isDelayexec) func(...args);
      clearTimeout(timeoutId);
      timeoutId = undefined;
      isRun = false;
    }, delay);
  };
};

/**
 * 区分调用浏览器的是什么设备
 */
export const useUserAgent = () => {
  const agent = ref<string>();
  const setAgent = (newAgent: string) => (agent.value = newAgent);

  onBeforeMount(() => {
    const u = navigator.userAgent;
    const isWeixin = u.toLowerCase().indexOf("micromessenger") !== -1; // 微信内
    const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    isWeixin && (agent.value = "wx");
    isAndroid && (agent.value = "android");
    isIOS && (agent.value = "ios");
  });

  return [agent, setAgent];
};

/**
 * @description: 千位符表示
 * @param {number} num
 * @return {*}
 */
export const toThousands = (num: number | string) => {
  var numStr = (num || 0).toString();
  let decimal = "";
  if (numStr.includes(".")) {
    const arr = numStr.split(".");
    numStr = arr[0];
    decimal = arr[1];
  }
  return `${numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}${
    decimal && "."
  }${decimal}`;
};

/**
 * @description: 保留几位小数字
 * @param {number | string} val
 * @param {number} count
 * @param {boolean} isRound 默认只截取不会四舍五入
 * @param {boolean} isRetention 默认保留小数点和 0
 * @return {*} 结果
 */
export const decimalToLength = (
  val: string | number,
  count = 2,
  isRound = false,
  isRetention = true
) => {
  // 1. 转成 string
  let valStr = (val || 0).toString();
  // 2. 是否包含小数点
  const l = valStr.indexOf(".");
  if (l > 0) {
    if (count > 0) {
      if (!isRound) {
        let afterStr = valStr.substring(l, l + count + 1);
        // 不够位数:补 0
        if (afterStr.length < count) {
          for (let index = 0; index < count - afterStr.length; index++) {
            afterStr += "0";
          }
        }
        return valStr.split(".")[0] + afterStr;
      } else {
        return parseFloat(valStr).toFixed(count);
      }
    } else {
      return valStr.split(".")[0];
    }
  }
  // 例如: .23
  else if (l === 0) {
    return `0${valStr.substring(l, l + count + 1)}`;
  }
  // 不包含
  else {
    let suffix = "";
    for (let index = 0; index < count; index++) {
      suffix += "0";
    }
    return `${valStr}${isRetention && count > 0 ? "." + suffix : ""}`;
  }
};

/**
 * @description: 用户昵称格式转换
 * @param {string} name 用户昵称
 * @param {*} type 1. xxx***xxx  2.最长 11 位,超过...展示
 * @return {*} 昵称
 * @author: zhj1214
 */
export const userNameToFormat = (name: string, type = 1, nullStr = "--") => {
  if (!name) return nullStr;
  if (type == 1) {
    if (name.length >= 6) {
      return name.slice(0, 3) + "**" + name.slice(-3);
    } else {
      return name.slice(0, 3) + "**";
    }
  } else if (type == 2) {
    let str = "";
    str = name.substring(0, 11);
    if (name.length > 11) {
      str += "...";
    }
    return str;
  }
  return nullStr;
};

/**
 * @description: 哈希
 * @param {string} str
 * @return {*}
 * @author: zhj1214
 */
export function hashCode(str: string): number {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

/**
 * @description: 字符串比大小
 * 字符串: a > b : 1  a == b : 0  a < b : -1
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @author: zhj1214
 */
export const strSpecificSize = (a: string, b: string) => {
  if (!a || !b) return false;
  if (a.length >= b.length) {
    if (a.length > b.length) {
      return 1;
    } else {
      return a > b ? 1 : -1; // 长度相等
    }
  }
  return -1;
};
