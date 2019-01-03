import { Router } from 'express'
import { create, show, update, dropBatch } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update)
router.delete('/:id', dropBatch)

export default router
