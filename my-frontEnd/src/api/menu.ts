import { http } from "@/utils/http";

export interface ItemType {
  label: string,
  key: string,
  icon?: any,
  children?: ItemType[],
  component?: string,
  type?: "group",
  path?: string,
  url?: string,
}

export const getMenuList = (params?: ItemType) => { // 获取菜单列表
  return http.request({
    method: 'get',
    url: 'sys/getMenuRouter',
    params 
  });
};