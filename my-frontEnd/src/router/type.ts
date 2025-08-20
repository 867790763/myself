import type { RouteRecordRaw, RouteMeta } from 'vue-router';

export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  color?: string;

  path: string;

  target?: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}