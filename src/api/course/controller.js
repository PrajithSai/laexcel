import Program from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
    Program.create(req.body, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
    Program.find({ status: "Active" }, (err, resp) => {
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
  Program.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const dropCourse = (req, res, next) => {
  Program.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}