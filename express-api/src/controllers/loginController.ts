import { Request, Response } from 'express';
import { users } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';

export const login = (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username) {
    return res.status(200).json({
      code: 500,
      data: null,
      msg: '用户名为必填项'
    })
  }
  if (!password) {
    return res.status(200).json({
      code: 500,
      data: null,
      msg: '密码为必填项'
    })
  }
  const user = users.find(u => u.username === username)
  if (!user) {
     return res.status(200).json({
      code: 401,
      msg: '用户名错误',
      success: false,
      data: {}
    })
  }
  // 生成JWT令牌
  // const token = generateToken(user.id);
  return res.status(200).json({
    code: 200,
    msg: '登录成功',
    success: true,
    data: {
      token: 'ad123456789',
      title: '后台系统',
      user
    }
  })
}

// 登出
export const logout = (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    msg: '登出成功',
    success: true,
  })
}