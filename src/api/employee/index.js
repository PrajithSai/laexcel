import { Router } from 'express'
import { create, show, fetchEmployeeByRole } from './controller'

const router = new Router()

router.post('/', create)
router.get('/', show)

router.get('/:role/role', fetchEmployeeByRole)

export default router
