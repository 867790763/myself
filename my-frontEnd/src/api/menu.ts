import { http } from "@/utils/http";

export interface Menu {
  menuCode?: string; // 菜单编码
  menuNameRaw?: string; // 菜单名称
  menuType?: string; // 菜单类型（1菜单 2权限）
  menuUrl?: string; // 菜单链接
  menuTarget?: string; // 目标窗口
  menuIcon?: string; // 菜单图标
  menuColor?: string; // 菜单颜色
  menuTitle?: string; // 菜单标题
  permission?: string; // 权限标识
  weight?: number; // 菜单权重（权重越大，表示菜单的重要性越大）
  isShow?: string; // 是否显示（1显示 0隐藏）
  sysCode?: string; // 归属系统（default:主导航菜单、mobileApp:APP菜单）
  moduleCodes?: string; // 归属模块（多个用逗号隔开）
}

export const getMenuList = (params?: Menu) => { // 获取菜单列表
  return http.request({
    method: 'get',
    url: 'sys/getMenuRouter',
    params 
  });
};