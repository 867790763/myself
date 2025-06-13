import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useGlobalStore } from "../store/global";
import { useNavStore } from "../store/modules/nav";
import { useEventBus, useScriptTag } from "@vueuse/core";

// 环境类型定义
type EnvInfo = "dev" | "test" | "prep" | "prod" | "devSG";

/**
 * 各环境OSS地址
 */
const getImgOss: any = () => {
  const u = {
    dev: "https://asset.btcdana.vip" || "https://asset.onetrader.online",
    test: "https://asset.okmax.vip",
    prep: "https://asset.btcdana.vip" || "https://asset.onetrader.online",
    prod: "https://asset.btcdana.vip" || "https://asset.onetrader.online"
  }[useRuntimeConfig().public.WEB_NODE_ENV as EnvInfo];
  return () => {
    // 新加坡服务器
    if (import.meta.client) {
      if (window && window.location.host.includes("bdc-sg")) {
        return "https://asset-sg.btcdana.asia";
      }
    }
    return u;
  };
};
// 获取图片前缀,传入 url 即可拼接
let getImgOssValue = "";
export const getImagePrefix = (url?: string) => {
  if (!getImgOssValue) getImgOssValue = getImgOss()();
  // console.log("getImgOssValue--", getImgOssValue);
  if (url) {
    return getImgOssValue + url;
  } else {
    return getImgOssValue;
  }
};

/**
 * 各环境host地址
 */
export const origin = {
  // dev:  "http://localhost:3000",
  dev: "https://test-bdc.btcdana.org/fx",
  devSG: "https://bdc-sg.btcdana.org",
  test: "https://test-bdc.btcdana.org",
  prep: "https://pre-bdc.btcdana.org",
  prod: "https://bdc.btcdana.org"
};

let getOrigin: any = () => {
  const env = useRuntimeConfig().public.WEB_NODE_ENV;
  let hostUrl = origin[env as EnvInfo];
  // 新加坡服务器
  if (import.meta.client) {
    if (window && window.location.host.includes("bdc-sg")) {
      hostUrl = origin["devSG"];
    }
  }
  const prefix =
    process.env.NODE_ENV !== "development" ? "/fx" : env != "dev" ? "/fx" : "";
  return () => {
    return { hostUrl, prefix };
  };
};
let getOriginValue: any = "";
export const getOriginUrl = (path: string) => {
  if (!getOriginValue) getOriginValue = getOrigin()();
  return () => `${getOriginValue.hostUrl}${getOriginValue.prefix}${path}`;
};

/**
 * @description: 动态获取public目录下文件的oss地址
 * svg 格式不行
 * 本地 http://192.168.88.45:3000/image/coin/trendImg.png
 * 线上 https://bdc.btcdana.org/fx/image/coin/trendImg.png
 * @param {any} val
 * @return {*} val
 * @author: zhj1214
 */
export const getOssFileUrl = (val: any) => {
  // if (!import.meta.server) {
  if (typeof val === "object") {
    // const origin = (window.location && window.location.origin) || "";
    // // const confg = useRuntimeConfig();
    // // console.log("--getOssFileUrl--", process.env.NODE_ENV);
    // const prefix = process.env.NODE_ENV !== "development" ? "/fx" : "";
    // if (typeof getOrigin != "object") getOrigin = getOrigin()();
    if (!getOriginValue) getOriginValue = getOrigin()();
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        val[key] =
          `${getOriginValue.hostUrl}${getOriginValue.prefix}${val[key]}`;
      }
    }
  }
  return val;
  // }
  // return {};
};

/**
 * @description: 动态加载 Script 脚本
 * @param {string} url
 * @param {Function} call 回调函数
 * @param {boolean} isRetry 默认,加载失败,需要重试
 * @param {boolean} isLocal 是不是当前服务器资源
 * @return {*}
 * @author: zhj1214
 */
let loadScriptMap = new Map(); // 主要用于计数和去重
export const loadScript = (
  url: string,
  call: any,
  isRetry = true,
  isLocal = true
) => {
  if (!url || !import.meta.client) return;
  // 1. 下载文件
  const swiperUrl = isLocal ? getOriginUrl(url)() : url;
  const { load, unload } = useScriptTag(swiperUrl, (el: HTMLScriptElement) => {
    loadScriptMap.delete(swiperUrl);
    call && call(el);
  });
  // 2. 捕获错误,失败会重试 3 次
  if (isRetry) {
    if (!loadScriptMap.get(swiperUrl)) loadScriptMap.set(swiperUrl, 0);
    load()
      // .then((res) => {
      //   console.log("-------loadScript---done--", call);
      //   call && call(res);
      // })
      .catch((error: any) => {
        console.error("-------loadScript-----", error);
        let cs = loadScriptMap.get(swiperUrl);
        loadScriptMap.set(swiperUrl, Number(cs) + 1);
        // 2.1 卸载
        unload();
        // 2.2 再次加载
        if (Number(cs) + 1 <= 3) {
          loadScript(url, call);
          console.error(
            `--catch--网络异常,${url}资源下载失败,正在重试${loadScriptMap.get(
              swiperUrl
            )}次`,
            error
          );
        } else {
          call(false);
          // 网络差提示
          const showToastEmit = useEventBus("showToast-emit");
          showToastEmit.emit("common.wlycqcxjr");
        }
      });
  } else {
    load();
  }
};

/**
 * @description: 桥接版本:过期校验
 * 1. 相同版本,或者高版本返回 true
 * 2. 没有传入版本号,就代表不教研 true
 * @param {any} standard 兼容标准 对象类型,key: packagePrefix的值 value:是具体的版本号
 * @param {any} defaultValue 默认值.没有传版本,就使用默认值
 * @return {*} true 通过,false 不通过
 * @author: zhj1214
 */
export const bridgeVersionCheck = (
  standard: any = {},
  defaultValue = false
) => {
  const globalStore = useGlobalStore();
  // 1. 获取版本号
  const value = standard[globalStore.packagePrefix];
  // 1.1 不通过: 传入一个大的版本号不靠谱,使用 false 最好
  if (value === "false") {
    return false;
  }
  // 2. 版本比较
  else if (value) {
    const compareVersion = compare(globalStore.packageId, value);
    console.log("bridgeVersionCheck: 版本兼容_", compareVersion);
    if (validatenull(compareVersion)) return false;
    if (compareVersion >= 0) {
      return true;
    } else {
      return false;
    }
  }
  // 没有传入版本号: defaultValue
  else {
    return defaultValue;
  }
};

/**
 * @description: 刷新当前页面
 * @author: zhj1214
 * @category: 页面操作
 */
export const reloadPage = () => {
  if (!import.meta.client) return;
  try {
    // 方式一
    const router = useRouter();
    router.go(0);
  } catch (error) {
    // 方式二
    window.location.reload();
  }
};

/**
 * @description: 跳转登录页面
 * 1. token没有获取到; 3 秒后:stroe 中没有 token;
 * 2. 接口 403 跳转登录页面
 */
export const jumpLogin = () => {
  // 1. 删除本地token
  const globalStore = useGlobalStore();
  globalStore.removeLocalToken();
  // 2. 跳转app 界面
  bridge.onAppLogin();
};

/**
 * @description: 路由前进后退（默认返回上一级）
 * @param {*} level -1
 * @param {*} isOnlyBackApp 是否仅仅只返回 App
 */
export const navigateBack = (level = -1, isOnlyBackApp = false) => {
  if (import.meta.client) {
    if (!isOnlyBackApp) {
      const globalStore = useGlobalStore();
      const router = useRouter();
      const navStore = useNavStore();
      // 通过检查路由历史栈的长度来判断是否有上一级页面,如果历史栈的长度小于等于 1，则表示没有上一级页面
      // router.options.history.state.position && router.options.history.state.position > 1
      if (navStore.$state.history.length >= 1) {
        const lastPath = navStore.getLastPath();
        console.log(
          "useNavStore 要移除的 lastPath:",
          lastPath,
          "剩余：",
          navStore.$state.history
        );
        navStore.removeLastPath(); // 清除上一个路径
        // 调用后退
        router.go(level);
      } else if (globalStore.$state.fromUrl) {
        const jumpUrl =
          globalStore.$state.fromUrl +
          `?language=${globalStore.$state.language}` +
          `&token=${globalStore.$state.token}` +
          `&packageId=${globalStore.$state.packageId}` +
          `&statusBarHeight=${globalStore.$state.statusBarHeight}` +
          `&isiphonex=${globalStore.$state.IsIphoneX ? 1 : 0}` +
          "&hiddenBar=1";

        console.log(globalStore.$state, "jumpUrl:", jumpUrl);
        // `http://localhost:3000/lottery-v3/bdc-to-money?language=en&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzU4MTU4NDA1NTYsInBheWxvYWQiOiJ7XCJ1aWRcIjoxNTA0NDYsXCJtb2JpbGVcIjpcInpoajEyMTRAaG90bWFpbC5jb20udGVzdFwiLFwic2lkXCI6MTAwMDAxNTA0NDZ9In0.0nu_5onvfxm_TRuZBNkodEd_h35wXKauJG1HMnTMpSw&packageId=BtcDana.IOS-1.3.7-com.indone.online-ios&statusBarHeight=44&isiphonex=0&fromUrl=https%3A%2F%2Freg.okmax.vip%2Ffx%2Fen%2FbtcDana%2Factivity_collection&hiddenBar=1`

        window.location.replace(jumpUrl);
      } else {
        const route = useRoute();
        navStore.clearPathAll();
        if (route.path == "/lottery-v3") {
          router.replace({ path: "/activity" });
        } else if (route.path == "/lottery-money") {
          router.replace({ path: "/activity" });
        } else {
          router.replace({ path: "/mvp/coin/coin" });
        }
      }
    } else {
      bridge.onAppBack("0");
    }
  }
};

/**
 * @description: i18n路由跳转
 */
export const navigateI18nTo = async (params: any) => {
  // 方案一
  // const router = useRouter(); // 路由跳转
  // const localePath = useLocalePath(); // 路由跳转
  // router.push(localePath(params));
  // 方案二
  const localeRoute = useLocaleRoute();
  const globalStore = useGlobalStore();
  const linkPath = computed(() => {
    const route = localeRoute(params.path, globalStore?.$state.language); // 第二个参数保证跳转的页面使用的都是指定的语言
    return route != null ? route.path : "/";
  });
  console.log(params, "--linkPath--", linkPath.value);

  // 添加当前路径到导航历史
  const navStore = useNavStore();
  navStore.addPath(linkPath.value);
  // 跳转
  navigateTo({
    path: linkPath.value,
    query: params.query
  });
  // router.push(linkPath.value);
};

/**
 * @description: tabbar 页面跳转
 * @param {string} page 页面的 name
 */
export const switchTabBar = (page: string) => {
  const switchTabBarEmit = useEventBus("tab-bar-jump-on");
  const globalStore = useGlobalStore();
  const idx = globalStore.$state.tabBarPages.indexOf(page);
  if (idx >= 0) {
    switchTabBarEmit.emit(idx);
  }
};

/**
 * @description: 如果链接是当前项目路由页面，调用此函数
 * @param {string} thirdUrl
 * @author: zhj1214
 */
export const jumpLocalH5PageRoute = (thirdUrl: string) => {
  // 获取当前 URL 对象
  const url = new URL(thirdUrl);
  // 获取参数对象
  const params = new URLSearchParams(url.search);
  // 创建一个空对象来存储解析后的参数
  const parsedParams: any = {};
  // 遍历参数对象并将其存储在解析后的对象中
  for (const [key, value] of params.entries()) {
    parsedParams[key] = value;
  }
  console.log(url, "--url跳转本项目的页面--", parsedParams);

  navigateI18nTo({
    path: url.pathname.replace("/fx", ""),
    query: parsedParams
  });
};

/**
 * @description: 如果链接是当前项目地址，通过 url 跳转，调用此函数
 * @param {string} thirdUrl
 * @author: zhj1214
 */
export const jumpLocalH5PageUrl = async (thirdUrl: string) => {
  const globalStore = useGlobalStore();
  let token = globalStore.$state.token
    ? `&token=${globalStore.$state.token}`
    : "";
  thirdUrl += `?language=${globalStore.$state.language}&packageId=${globalStore.$state.packageId}${token}&hiddenBar=1`;
  await navigateTo(thirdUrl, {
    external: true
  });
};

export const goDownload = () => {
  if (import.meta.client) {
    try {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端

      if (!isAndroid) {
        return (window.location.href =
          "https://apps.apple.com/app/btcdana-trading-online/id1641836061");
      }

      window.location.href =
        "https://play.google.com/store/apps/details?id=com.btcdana.online&hlid&hl=en&shortlink=74dc6077&c=BtcInvite-h5&pid=QR_code&source_caller=ui";
    } catch (e) {
      console.log(e);
    }
  }
};
/*
 * 登录的统一hook
 * */
export const useSignup = () => {
  let { locale } = useI18n();
  // id为邀友者id
  return (id: string | number = "") => {
    try {
      if (!locale.value || locale.value === "en_US") {
        locale.value = "en";
      }
      if (id !== "") {
        id = `id=${id}`;
      }
      window.location.href = `https://reg.forexdana.trade/download/${locale.value}/#/share/email?${id}`;
    } catch (e) {
      console.log(e);
    }
  };
};

/**
 * @description: 获取环境配置信息
 * @return {*}
 * @author: zhj1214
 */
export function useEnvConfigInfo(): any {
  if (process.env.NODE_ENV != "development") return { token: "" };
  let WEB_NODE_ENV = "dev";
  try {
    WEB_NODE_ENV = useRuntimeConfig().public.WEB_NODE_ENV;
  } catch (error) {
    console.log("-环境信息-", process.env.WEB_NODE_ENV);
    WEB_NODE_ENV = process.env.WEB_NODE_ENV || "dev";
  }

  if (WEB_NODE_ENV === "dev" || WEB_NODE_ENV === "test") {
    return {
      token:
        // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDQxNzc5ODM2NDksInBheWxvYWQiOiJ7XCJ1aWRcIjoxODY5ODY0MCxcIm1vYmlsZVwiOlwiemhqMTRAcXEuY29tXCIsXCJzaWRcIjoxMDAxODY5ODY0MH0ifQ.RAmWEOhfLp5ZGDBUUWgIcIbq5gd2kn9FEl5uHc0I25c", // zhj14@qq.com
        // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDIwMTkzODk1ODksInBheWxvYWQiOiJ7XCJ1aWRcIjoxODY5ODY0MSxcIm1vYmlsZVwiOlwiemhqMTVAcXEuY29tXCIsXCJzaWRcIjoxMDAxODY5ODY0MX0ifQ.ivRyFNg0-UJW89j8F957RM_9bDAhYDa8gyuhL6RJqR8", // zhj15@qq.com
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDEzMTY1ODIzNzYsInBheWxvYWQiOiJ7XCJ1aWRcIjoxNTA0NDYsXCJtb2JpbGVcIjpcInpoajEyMTRAaG90bWFpbC5jb20udGVzdFwiLFwic2lkXCI6MTAwMDAxNTA0NDZ9In0.3QDhJyOmUYtDmiMsUK5khSeL1yOHSHSlcqk6u0l72_o", // zhj1214mail.com
      // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDIwOTQzNDE0MzMsInBheWxvYWQiOiJ7XCJ1aWRcIjoxODY4NTQ2NCxcIm1vYmlsZVwiOlwiMjAyMTIzNDk3NDYwQHFxLmNvbVwiLFwic2lkXCI6MTAwMTg2ODU0NjR9In0.iVWe5Cr_BhQ7XMewtSyuMhuF9c7ZMrE7Lpd1Uoe0LCc", // 202123497460@qq.com
      devProxy: "https://test-bdc.btcdana.org/api",
      // devProxy: "https://api.okmax.vip/",
      routeRules: "https://test-bdc.btcdana.org/api/**"
    };
  } else if (WEB_NODE_ENV === "pre" || WEB_NODE_ENV === "prep") {
    return {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDI5NzY1NjQzOTUsInBheWxvYWQiOiJ7XCJ1aWRcIjoxODQxMzkyMyxcIm1vYmlsZVwiOlwiMTEzMDAwMzU4MjAwMjg1MDE0NzgzXCIsXCJzaWRcIjoxMDAxODQxMzkyM30ifQ.BImcLyyl1MSb7hyMKx6VI2Xyz725xMInlLqRxdVPhWU", // zhj
      devProxy: "https://pre-bdc.btcdana.org/api",
      // devProxy: "https://api.dana668.com/",
      routeRules: "https://pre-bdc.btcdana.org/api/**"
    };
  } else if (WEB_NODE_ENV === "prod") {
    return {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDI5NzY1NjQzOTUsInBheWxvYWQiOiJ7XCJ1aWRcIjoxODQxMzkyMyxcIm1vYmlsZVwiOlwiMTEzMDAwMzU4MjAwMjg1MDE0NzgzXCIsXCJzaWRcIjoxMDAxODQxMzkyM30ifQ.BImcLyyl1MSb7hyMKx6VI2Xyz725xMInlLqRxdVPhWU", // zhj
      devProxy: "https://bdc.btcdana.org/api",
      routeRules: "https://bdc.btcdana.org/api/**"
    };
  }
  return { token: "" };
}
