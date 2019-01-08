import { Router } from 'express';
import { create, show } from './controller';

const router = new Router();

router.post('/', create);

router.get('/', show);

export default router;