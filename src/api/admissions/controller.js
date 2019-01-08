import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Admissions } from './model'

export const create = ({ bodymen: { body } }, res, next) => {
  Admissions.create(body)
  .then(admission => admission ? admission.view() : null)
  .then(success(res, 201, `Admission Successfull`))
  .catch(next)
}

export const show = ({ params }, res, next) =>
  Admissions.findById(params.id)
    .then(notFound(res))
    .then(admission => (admission ? admission.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>
  Admissions.find({ status: { $ne: 'DELETED' } })
    .then(admissions =>
      admissions.map(admission => admission.view())
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Admissions.findById(params.id)
    .then(notFound(res))
    .then(admission =>
      admission ? _.merge(admission, body).save() : null
    )
    .then(admission => (admission ? admission.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Admissions.findById(params.id)
    .then(notFound(res))
    .then(admission =>
      admission
        ? _.merge(admission, { status: 'DELETED' }).save()
        : null
    )
    .then(success(res, 204))
    .catch(next)