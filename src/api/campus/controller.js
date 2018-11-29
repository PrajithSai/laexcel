import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Campuses } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Campuses.create(body)
    .then((campuses) => campuses.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
 Campuses.findById(params.id)
    .then(notFound(res))
    .then((campuses) => campuses ? campuses.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Campuses.find({ status: { $ne : "DELETED" } }, select, cursor)
    .then((campuses) => campuses.map((campus) => campus.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Campuses.findById(params.id)
        .then(notFound(res))
        .then((campuses) => campuses ? _.merge(campuses, body).save() : null)
        .then((campuses) => campuses ? campuses.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Campuses.findById(params.id)
        .then(notFound(res))
        .then((campuses) => campuses ? _.merge(campuses, { status: 'DELETED' }).save() : null)
        .then(success(res, 204))
        .catch(next)  