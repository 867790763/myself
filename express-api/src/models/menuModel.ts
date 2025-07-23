// 菜单接口定义
export interface Menu {
  label: string,
  key: string,
  icon?: any,
  children?: Menu[],
  component?: string,
  type?: "group",
  path?: string,
  url?: string,
}


export const menuList: Menu[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'PieChartTwoTone',
    component: "LAYOUT",
  },
  {
    key: 'users',
    label: '系统管理',
    icon: 'UserOutlined',
    component: "LAYOUT",
    children: [
      { key: 'list', label: '用户管理', component: '/sys/user/index', path: '/sys/user/index', url: '/sys/user/index' },
      { key: 'roles', label: '角色管理', component: '/sys/role/index', path: '/sys/role/index', url: '/sys/role/index' },
    ],
  },
];
