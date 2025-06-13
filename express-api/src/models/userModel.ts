import bcrypt from 'bcryptjs';

// 用户接口定义
export interface User {
  readonly id: string, // 使用readonly关键字来标记只读属性
  name: string,
  emali?: string,// 接口的属性可以是可选的，即在对象中可以存在也可以不存在。使用?来标记可选属性
  [propName: string]: any; //将额外的属性赋给对象，可以使用索引签名
  phone?: string,
  role: string,
  username: string,
  password: string
}

export const users: Array<User> = [
  {
    id: 'asd12dsf45a',
    name: 'liuhao',
    age: '28', // 额外的属性，使用索引签名允许赋值
    role: 'admin',
    username: '867790763',
    password: 'lh971007.'
  },
  {
    id: 'asd12dsf45a',
    name: 'maomao',
    age: '5', // 额外的属性，使用索引签名允许赋值
    role: 'user',
    username: 'maomao',
    password: 'maomao123'
  },
]