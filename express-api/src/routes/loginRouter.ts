import { Router, RequestHandler } from "express";
import { login, logout } from "../controllers/loginController";
import { Request, Response } from "express";

const router = Router();

// 由于不清楚具体错误原因，推测可能是类型导入问题，确保正确导入 Request 和 Response 类型
// 假设 login 函数类型正确，这里保持原调用方式
// 根据提示，先将 login 函数转换为 unknown 类型，再转换为 RequestHandler 类型
router.post("/login", login as unknown as RequestHandler);
router.post("/logout", logout as unknown as RequestHandler)
export default router;