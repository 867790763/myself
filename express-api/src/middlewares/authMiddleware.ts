import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

// 认证中间件
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 从请求头获取token
  const token = req.headers.authorization?.split(' ')[1];
  console.log('401');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '未提供认证令牌'
    });
  }

  try {
    // 验证token
    const decoded = await verifyToken(token);
    // 将用户信息添加到请求对象
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '无效或过期的令牌'
    });
  }
};