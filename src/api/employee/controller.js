import Employee from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
  Employee.create(req.body, (err, resp) => {
    if (err) {
      req.params.errorText = "User Already Exists, try another";
      show(req, res, next);
    } else {
      req.params.errorText = "Registeration Successful";
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
  Employee.find({ status: 'Active' }, (err, resp) => {
    if (err) {
    } else {
      res.send({
        error: false,
        message:  req.params.errorText ?  req.params.errorText : 'Registered successuflly',
        result: resp
      })
    }
  })
}

export const update = (req, res, next) => {
  Employee.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true, upsert: false }, (err, resp) => {
    if (err) {
    } else {
      req.params.errorText = "Update Successfull";
      show(req, res, next)
    }
  })
}

export const dropEmployee = (req, res, next) => {
  Employee.update({ '_id': req.params.id }, { $set: { status: 'inActive' }}, (err, resp) => {
    if (err) {

    } else {
      show(req, res, next)
    }
  })
}

export const fetchEmployeeByRole = (req, res, next) =>
  Employee.find({ role: req.params.role })
    .select('name')
    .then(notFound(res))
    .then(employees =>
      employees ? employees.map(employee => employee.partialView()) : null
    )
    .then(success(res))
    .catch(next)
