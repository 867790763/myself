import { Request, Response } from 'express';
import { menuList } from "../models/menuModel";

export const getMenuRouter = (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    msg: '',
    data: menuList
  })
}