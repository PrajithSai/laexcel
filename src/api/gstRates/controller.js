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
  GstRates.find({ status: 'Active' }, (err, resp) => {
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
  GstRates.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const dropGstRates = (req, res, next) => {
  GstRates.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}
