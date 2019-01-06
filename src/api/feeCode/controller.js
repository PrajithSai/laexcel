import FeeCode from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
    FeeCode.create(req.body, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
    FeeCode.find({ status: 'Active' }, (err, resp) => {
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

export const update = (req, res, next) => {
  FeeCode.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const dropFeeCode = (req, res, next) => {
  FeeCode.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}
