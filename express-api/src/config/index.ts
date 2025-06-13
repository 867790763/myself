import dotenv from 'dotenv';

dotenv.config();

const config = {
  baseUrl: process.env.BASE_URL as string,
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'eyJhbGciOiJSUzI1NiIsIn231R5csdaC1I23123',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  }
};

export default config;