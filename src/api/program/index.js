import { Router } from 'express'
import { create, show, update, dropProgram } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update)
router.delete('/:id', dropProgram)

export default router
