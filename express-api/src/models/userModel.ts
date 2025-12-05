import bcrypt from 'bcryptjs';

// 用户接口定义
export interface User {
  readonly userCode: string, // 使用readonly关键字来标记只读属性
  userName: string,
  emali?: string,// 接口的属性可以是可选的，即在对象中可以存在也可以不存在。使用?来标记可选属性
  [propName: string]: any; //将额外的属性赋给对象，可以使用索引签名
  phone?: string,
  roleCode: Array<string>,
  // loginCode: string,
  // password: string
}

export const users: Array<User> = [
  
]