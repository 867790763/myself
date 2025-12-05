import { Router, RequestHandler } from 'express';
import {
  queryCommunities,
  insCommunities
} from '../controllers/communitiesController';

const router = Router();

router.get('/queryCommunities', queryCommunities as RequestHandler);
router.post('/insCommunities', insCommunities as RequestHandler);

export default router;