import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import AgencyCodes from './model'

const formatData = agency => {
  console.log('agency', agency)
  return {
    ...agency.view(),
    source: agency.source._id,
    sourceName: agency.source.sourceName,
    sourceCode: agency.source.sourceCode
  }
}

export const create = ({ bodymen: { body } }, res, next) => {
  AgencyCodes.create(body)
    .then(cities =>
      AgencyCodes.findById(cities._id)
        .populate('source')
        .then(agency => formatData(agency))
    )
    .then(success(res, 201, `"${body.cityName}" Created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  AgencyCodes.findById(params.id)
    .then(notFound(res))
    .then(cities => (cities ? cities.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AgencyCodes.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('source')
    .then(cities => cities.map(formatData))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AgencyCodes.findById(params.id)
    .then(notFound(res))
    .then(cities => (cities ? _.merge(cities, body).save() : null))
    .then(cities =>
      cities
        ? AgencyCodes.findById(cities._id)
          .populate('source')
          .then(agency => formatData(agency))
        : null
    )
    .then(success(res, 201, `"${body.cityName}" Updated Successfully`))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AgencyCodes.findById(params.id)
    .then(notFound(res))
    .then(cities =>
      cities ? _.merge(cities, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)

export const deleteCities = (req, res, next) => {
  const deletedCities = new Promise((resolve, reject) => {
    req.body.map((stateId, i) => {
      AgencyCodes.findOneAndUpdate(
        { _id: stateId },
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
  deletedCities.then(states => {
    findCities(req, res)
  })
}

const findCities = (req, res) => {
  AgencyCodes.find({ status: { $ne: 'DELETED' } })
    .populate('state', {
      stateName: 'state.stateName',
      stateShortCode: 'state.stateShortCode'
    })
    .exec()
    .then(cities => cities.map(city => city.view()))
    .then(resp =>
      res.send({
        error: false,
        payload: resp,
        message: `${req.body.length} Citie(s) Deleted`
      })
    )
}
