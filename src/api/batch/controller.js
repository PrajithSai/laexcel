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
  Batch.find({ status: 'Active' }, (err, resp) => {
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
  Batch.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const dropBatch = (req, res, next) => {
  Batch.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}