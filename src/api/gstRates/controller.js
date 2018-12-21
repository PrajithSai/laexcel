import GstRates from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
  GstRates.create(req.body, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
  GstRates.find({}, (err, resp) => {
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
