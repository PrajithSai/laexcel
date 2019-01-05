import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import AcademicYear from './model'

export const create = ({ bodymen: { body } }, res, next) => {
  AcademicYear.create(body)
    .then(academicYear => academicYear.view())
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  AcademicYear.findById(params.id)
    .then(notFound(res))
    .then(academicYear => (academicYear ? academicYear.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AcademicYear.find({ status: { $ne: 'INACTIVE' } }, select, cursor)
    .then(academicYears =>
      academicYears.map(academicYear => academicYear.view())
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AcademicYear.findById(params.id)
    .then(notFound(res))
    .then(academicYear =>
      academicYear ? _.merge(academicYear, body).save() : null
    )
    .then(academicYear => academicYear.view())
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AcademicYear.findById(params.id)
    .then(notFound(res))
    .then(academicYear =>
      academicYear ? _.merge(academicYear, { status: 'DELETED' }).save() : null
    )
    .then(academicYear => academicYear.view())
    .then(success(res))
    .catch(next)
