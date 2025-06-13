import jwt from 'jsonwebtoken';
import config from '../config';

// 生成JWT令牌
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

// 验证JWT令牌
export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

// 从JWT令牌中提取用户ID
export const extractUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
};