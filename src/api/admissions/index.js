import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import {
  create,
  index,
  show,
  update,
  destroy
} from './controller'

const router = new Router()

router.post('/', create)

router.get('/', token({ required: true }), query(), index)

router.get('/:id', token({ required: true }), show)

router.put(
  '/:id',
  token({ required: true }),
  update
)

router.delete('/:id', token({ required: true }), destroy)

export default router
