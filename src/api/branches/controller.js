import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Branches } from '.'

const formatData = branch => {
  return {
    ...branch.view(),
    city: branch.city._id,
    cityName: branch.city.cityName
  }
}

export const create = ({ bodymen: { body } }, res, next) => {
  Branches.create(body)
    .then(branches => branches.view(true))
    .then(branch => Branches.findById(branch.id).populate('city'))
    .then(formatData)
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Branches.findById(params.id)
    .then(notFound(res))
    .then(branches => (branches ? branches.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Branches.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('city')
    .then(branches => branches.map(formatData))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Branches.findById(params.id)
    .then(notFound(res))
    .then(branches => (branches ? _.merge(branches, body).save() : null))
    .then(branches => (branches ? branches.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Branches.findById(params.id)
    .then(notFound(res))
    .then(branches =>
      branches ? _.merge(branches, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
