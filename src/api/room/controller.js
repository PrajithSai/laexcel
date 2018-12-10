import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Room } from '.'

const formatData = room => {
  return {
    ...room.view(),
    parentBuilding: room.parentBuilding._id,
    buildingName: room.parentBuilding.name,
    parentBranch: room.parentBranch._id,
    branchName: room.parentBranch.name
  }
}

export const create = ({ bodymen: { body } }, res, next) => {
  Room.create(body)
    .then(room => room.view(true))
    .then(room =>
      Room.findById(room.id).populate('parentBranch parentBuilding')
    )
    .then(formatData)
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Room.findById(params.id)
    .then(notFound(res))
    .then(room => (room ? room.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Room.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('parentBranch parentBuilding')
    .then(rooms => rooms.map(formatData))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Room.findById(params.id)
    .then(notFound(res))
    .then(room => (room ? _.merge(room, body).save() : null))
    .then(room =>
      Room.findById(room.id).populate('parentBranch parentBuilding')
    )
    .then(formatData)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Room.findById(params.id)
    .then(notFound(res))
    .then(room => (room ? _.merge(room, { status: 'DELETED' }).save() : null))
    .then(success(res, 204))
    .catch(next)

export const deleteRooms = (req, res, next) =>
  Room.updateMany(
    { _id: { $in: req.body.ids } },
    { $set: { status: 'DELETED' } }
  )
    .then(notFound(res))
    .then(rooms => rooms)
    .then(success(res))
    .catch(next)
