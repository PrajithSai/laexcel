import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import Buildings from './model'

const formatData = building => {
  return {
    ...building.view(),
    campus: building.campus._id,
    campusName: building.campus.campusName,
    campusAddress: building.campus.address
  }
}

export const create = ({ bodymen: { body } }, res, next) => {
  Buildings.create(body)
    .then(buildings => buildings.view(true))
    .then(buildings => Buildings.findById(buildings.id).populate('campus'))
    .then(formatData)
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
    .populate('campus')
    .then(buildings => buildings.map(formatData))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Buildings.findById(params.id)
    .then(notFound(res))
    .then(buildings => (buildings ? _.merge(buildings, body).save() : null))
    // .then(buildings => (buildings ? buildings.view(true) : null))
    .then(buildings => Buildings.findById(buildings.id).populate('campus'))
    .then(formatData)
    .then(success(res, 201, `"${body.name}" Updated Successfully`))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Buildings.findById(params.id)
    .then(notFound(res))
    .then(buildings =>
      buildings ? _.merge(buildings, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)

export const deleteBuildings = (req, res, next) => {
  const deletedBuildings = new Promise((resolve, reject) => {
    req.body.map((buildingId, i) => {
      Buildings.findOneAndUpdate(
        { _id: buildingId },
        { status: 'DELETED' },
        (err, deletedResult) => {
          if (!err) {
            if (req.body.length === i + 1) {
              resolve('deletion completed')
            }
          }
        }
      )
    })
  })
  deletedBuildings.then(buildings => {
    findBuildings(req, res)
  })
}

const findBuildings = (req, res) => {
  Buildings.find({ status: { $ne: 'DELETED' } })
    .populate('campus')
    .exec()
    .then(buildings => buildings.map(formatData))
    .then(resp =>
      res.send({
        error: false,
        payload: resp,
        message: `${req.body.length} Building(s) Deleted`
      })
    )
}

export const floorsByBuilding = (req, res, next) => {
  Buildings.findById(req.params.id).then(building => {
    res.send({
      error: false,
      payload: building.floors
    })
  })
}
