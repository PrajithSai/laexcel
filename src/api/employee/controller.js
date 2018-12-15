import Employee from './model'
import { success, notFound } from '../../services/response/'

export const create = (req, res, next) => {
  Employee.create(req.body, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next)
    }
  })
}

export const show = (req, res, next) => {
  Employee.find({}, (err, resp) => {
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

export const fetchEmployeeByRole = (req, res, next) =>
  Employee.find({ role: req.params.role })
    .select('name')
    .then(notFound(res))
    .then(employees =>
      employees ? employees.map(employee => employee.partialView()) : null
    )
    .then(success(res))
    .catch(next)
