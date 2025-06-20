import { Router, RequestHandler } from 'express';
import { getMenuRouter } from "../controllers/sysController";

const router = Router();

router.get('/getMenuRouter', getMenuRouter as unknown as RequestHandler)

export default router