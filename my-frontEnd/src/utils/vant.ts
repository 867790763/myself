import { showLoadingToast as LoadingToast } from "vant";

/**
 * @description: 定义 Toast 选项接口
 */
interface ToastOptions {
  message?: string;
  duration?: number;
  forbidClick?: boolean;
  loadingType?: "spinner" | "circular";
  position?: "top" | "middle" | "bottom";
  [key: string]: any;
}

/**
 * @description: 加载实例类型
 */
interface LoadingInstance {
  close: () => void;
  [key: string]: any;
}

/**
 * @description: 重命名变量，使用更准确的命名
 */
let loadingInstance: LoadingInstance | null = null;

/**
 * @description: 自定义 showLoadingToast 解决请求结束后 closeToast 清除延迟问题
 * @param {ToastOptions} options Toast 配置选项
 * @returns {LoadingInstance} 返回 Toast 实例
 * @author: zhj1214
 */
export function showLoadingToast(options: ToastOptions): LoadingInstance {
  // 默认配置
  const defaultOptions: ToastOptions = {
    // duration: 0, // 持续展示
    // forbidClick: true, // 禁止点击背景
    // message: '加载中...',
    // loadingType: 'circular',
    ...options
  };

  // 如果已有加载实例，先关闭
  if (loadingInstance) {
    loadingInstance.close();
  }

  // 创建新的加载实例
  loadingInstance = LoadingToast(defaultOptions);
  return loadingInstance;
}

/**
 * @description: 关闭当前加载提示
 * @author: zhj1214
 */
export function closeLoadingToast(): void {
  if (!loadingInstance) return;
  loadingInstance.close();
  loadingInstance = null;
}
