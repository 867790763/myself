import express from 'express';
import cors from 'cors';
import config from './config';
import userRouter from './routes/userRoutes';
import loginRouter from './routes/loginRouter';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 基础路由
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Express + pnpm API 已启动',
    nodeEnv: config.nodeEnv
  });
});
const baseUrl: string = config.baseUrl
// 业务路由
app.use(baseUrl + '/users', userRouter);
app.use(baseUrl, loginRouter);
// 启动服务器
app.listen(config.port, () => {
  console.log(`🚀 服务运行中: http://localhost:${config.port}`);
});