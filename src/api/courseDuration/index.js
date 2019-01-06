import { Router } from 'express'
import { create, show, update, dropCourseDuration } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update);
router.delete('/:id', dropCourseDuration);

export default router
