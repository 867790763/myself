import { Request, Response } from 'express';
import { users } from "../models/userModel";

// 获取所有用户
export const getUsers = (req: Request, res: Response) => {
  res.json({
    code: 200,
    data: users
  });
};

// 创建用户
export const createUser = (req: Request, res: Response) => {
  const { user } = req.body;
  
  users.push(user);
  
  res.status(201).json({
    code: 201,
    data: user
  });
};