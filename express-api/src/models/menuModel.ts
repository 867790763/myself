// 菜单接口定义
export interface Menu {
  children?: Menu,
  component?: string,
  id: string,
  leaf?: boolean,
  meta?: {hideMenu: boolean, color: string, icon: string, title: string},
  name: string,
  path: string,
  redirect?: string,
  target: string,
  url?: string
}

export const menuList: Menu[] = [
  {
    component: "LAYOUT",
    id:"1897200404032466944",
    leaf:false,
    meta:{hideMenu: false, color: "", icon: "icon-settings", title: "系统管理"},
    name:"Views1897200404032466944",
    path: "/1897200404032466944",
    redirect: "/1897200410013544448",
    target: "",
    url: "",
  }
]