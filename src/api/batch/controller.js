import Batch from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
  Batch.create(req.body, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
  Batch.find({}, (err, resp) => {
    if (err) {
    } else {
      res.send({
        error: false,
        message: 'Registered successuflly',
        result: resp
      })
    }
  })
}
