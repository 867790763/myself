import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), `.env`),
    override: false, // 后加载的不覆盖先加载的
  });

const config = {
  baseUrl: process.env.BASE_URL as string || '/api',
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: 'eyJhbGciOiJSUzI1NiIsIn231R5csdaC1I23123',
    expiresIn: 3600
  }
};

export default config;