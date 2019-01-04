import { Router } from 'express'
import { create, show, update } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update)

export default router
