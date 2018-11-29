import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Branches } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Branches.create(body)
    .then((branches) => branches.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
 Branches.findById(params.id)
    .then(notFound(res))
    .then((branches) => branches ? branches.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Branches.find({ status: { $ne : "DELETED" } }, select, cursor)
    .then((branches) => branches.map((branch) => branch.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Branches.findById(params.id)
        .then(notFound(res))
        .then((branches) => branches ? _.merge(branches, body).save() : null)
        .then((branches) => branches ? branches.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Branches.findById(params.id)
        .then(notFound(res))
        .then((branches) => branches ? _.merge(branches, { status: 'DELETED' }).save() : null)
        .then(success(res, 204))
        .catch(next)  