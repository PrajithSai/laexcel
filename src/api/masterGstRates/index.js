import { Router } from 'express'
import { create, show, update, dropMasterGstRates } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update);
router.delete('/:id', dropMasterGstRates)

export default router
