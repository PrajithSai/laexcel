import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import ResponseType from './model'

export const create = ({ bodymen: { body } }, res, next) => {
  ResponseType.create(body)
    .then(responseType => responseType.view(true))
    .then(success(res, 201, `"${body.responseName}" created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  ResponseType.findById(params.id)
    .then(notFound(res))
    .then(responseType => (responseType ? responseType.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ResponseType.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .then(responseTypes =>
      responseTypes.map(responseType => responseType.view())
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ResponseType.findById(params.id)
    .then(notFound(res))
    .then(responseType =>
      responseType ? _.merge(responseType, body).save() : null
    )
    .then(responseType => (responseType ? responseType.view(true) : null))
    .then(success(res, 201, `"${body.stateName}" Updated Successfully`))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ResponseType.findById(params.id)
    .then(notFound(res))
    .then(responseType =>
      responseType ? _.merge(responseType, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
