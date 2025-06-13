import { Router, RequestHandler } from 'express';
import {
  getUsers,
  createUser
} from '../controllers/userController';

const router = Router();

router.get('/getUsers', getUsers as RequestHandler);
router.post('/createUser', createUser as RequestHandler);

export default router;