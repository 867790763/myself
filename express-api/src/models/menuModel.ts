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
    path: '/home/dashboard/index',
  },
  {
    key: 'users',
    label: '系统管理',
    icon: 'UserOutlined',
    component: "LAYOUT",
    children: [
      { key: 'list', label: '用户管理', component: '/sys/user/list', path: '/sys/user', url: '/sys/user/list' },
      { key: 'roles', label: '角色管理', component: '/sys/role/index', path: '/sys/role', url: '/sys/role/index' },
    ],
  },
  {
    key: 'bim',
    label: '3D管理',
    icon: 'UserOutlined',
    component: "LAYOUT",
    children: [
      { key: 'examples', label: '3D示例', component: '/examples/demo', path: '/examples', url: '/examples/demo' },
    ],
  },
];
