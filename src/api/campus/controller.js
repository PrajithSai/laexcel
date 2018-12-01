import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Campuses } from '.'

const formatData = campus => {
  return {
    ...campus.view(),
    city: campus.city._id,
    cityName: campus.city.cityName,
    parentBranch: campus.parentBranch._id,
    branchName: campus.parentBranch.nam
  }
}

export const create = ({ bodymen: { body } }, res, next) => {
  Campuses.create(body)
    .then(campuses => campuses.view(true))
    .then(campus => Campuses.findById(campus.id).populate('parentBranch city'))
    .then(formatData)
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Campuses.findById(params.id)
    .then(notFound(res))
    .then(campuses => (campuses ? campuses.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Campuses.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('parentBranch city')
    .then(campuses => campuses.map(formatData))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Campuses.findById(params.id)
    .then(notFound(res))
    .then(campuses => (campuses ? _.merge(campuses, body).save() : null))
    .then(campuses => (campuses ? campuses.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Campuses.findById(params.id)
    .then(notFound(res))
    .then(campuses =>
      campuses ? _.merge(campuses, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
