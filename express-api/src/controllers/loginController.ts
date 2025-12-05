import { Request, Response } from 'express';
import { users } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';
import { execute } from "../db_server/db";
import { decryptByBase64 } from '../utils/cipher';

export const login = async (req: Request, res: Response) => {
  req.body.loginCode = decryptByBase64(req.body.loginCode);
  req.body.password = decryptByBase64(req.body.password);
  const { loginCode, password } = req.body;
  console.log(req.body);
  if (!loginCode) {
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
  const sql = `select * from sys_user where login_code = ?`
  const rows = await execute(sql, [loginCode])
  console.log("rows", rows);
  if (!rows.length) {
     return res.status(200).json({
      code: 401,
      msg: '用户名或密码错误',
      success: false,
      data: {}
    })
  }
  let user: any = {};
  console.log("rows11", rows);
  if (rows[0].password !== password) {
    return res.status(200).json({
      code: 401,
      msg: '用户名或密码错误',
      success: false,
    })
  }
  if (rows[0].status !== '0') {
    return res.status(200).json({
      code: 403,
      msg: '用户已被禁用',
      success: false,
    })
  }
  user.userCode = rows[0].userCode;
  user.userName = rows[0].userName;
  user.sex = rows[0].sex;
  user.avatar = rows[0].avatar;
  user.phone = rows[0].phone;
  user.mobile = rows[0].mobile;
  user.email = rows[0].email;
  user.roleCode = rows[0].roleCode;
  user.status = rows[0].status;

  // 生成JWT令牌
  const token = generateToken(user.userCode);
  return res.status(200).json({
    code: 200,
    msg: '登录成功',
    success: true,
    data: {
      token,
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