import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Buildings } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Buildings.create(body)
    .then(buildings => buildings.view(true))
    .then(success(res, 201, `"${body.name}" Created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Buildings.findById(params.id)
    .then(notFound(res))
    .then(buildings => (buildings ? buildings.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Buildings.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .then(buildings => buildings.map(state => state.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Buildings.findById(params.id)
    .then(notFound(res))
    .then(buildings => (buildings ? _.merge(buildings, body).save() : null))
    .then(buildings => (buildings ? buildings.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Buildings.findById(params.id)
    .then(notFound(res))
    .then(buildings =>
      buildings ? _.merge(buildings, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
