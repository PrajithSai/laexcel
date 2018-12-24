import { Router } from 'express'
import { create, show, fetchEmployeeByRole, update, dropEmployee } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)
router.put('/:id', update);
router.delete('/:id', dropEmployee);

router.get('/:role/role', fetchEmployeeByRole)

export default router
