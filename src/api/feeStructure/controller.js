import FeeStructure from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
  FeeStructure.create(req.body, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      req.params.message = 'fee structure created successfully';
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
  FeeStructure.find({ status: 'Active' }, (err, resp) => {
    if (err) {
    } else {
      res.send({
        error: false,
        message: req.params.message,
        result: resp
      })
    }
  })
}

export const update = (req, res, next) => {
  FeeStructure.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      req.params.message = 'fee structure updated successfully';
      show(req, res, next)
    }
  })
}

export const dropFeeStructure = (req, res, next) => {
  FeeStructure.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}