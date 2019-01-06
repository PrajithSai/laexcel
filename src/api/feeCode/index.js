import { Router } from 'express'
import { create, show, update, dropFeeCode } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update);
router.delete('/:id', dropFeeCode);

export default router
