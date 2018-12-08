import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { States } from '.'
import Cities from '../cities/model'

export const create = ({ bodymen: { body } }, res, next) => {
  States.create(body)
    .then(states => states.view(true))
    .then(success(res, 201, `"${body.stateName}" Created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  States.findById(params.id)
    .then(notFound(res))
    .then(states => (states ? states.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  States.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .then(states => states.map(state => state.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  States.findById(params.id)
    .then(notFound(res))
    .then(states => (states ? _.merge(states, body).save() : null))
    .then(states => (states ? states.view(true) : null))
    .then(success(res, 201, `"${body.stateName}" Updated Successfully`))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  States.findById(params.id)
    .then(notFound(res))
    .then(states =>
      states ? _.merge(states, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)

export const deleteStates = (req, res, next) => {
  const deletedStates = new Promise((resolve, reject) => {
    req.body.map((stateId, i) => {
      States.findOneAndUpdate(
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

  req.body.map((stateId, i) => {
    Cities.update(
      { state: stateId },
      { $set: { status: 'DELETED' } },
      {
        multi: true
      },
      (err, deletedResult) => {
        if (!err) {
          console.log('deleted in cities')
        }
      }
    )
  })

  deletedStates.then(states => {
    findStatesAncCities(req, res)
  })
}

const findStatesAncCities = (req, res) => {
  const statesDB = new Promise((resolve, reject) => {
    States.find({ status: { $ne: 'DELETED' } })
      .then(states => states.map(state => state.view()))
      .then(resp =>
        resolve({
          statesDB: {
            error: false,
            payload: resp,
            message: `${req.body.length} state(s) Deleted`
          }
        })
      )
  })

  const citiesDB = new Promise((resolve, reject) => {
    Cities.find({ status: { $ne: 'DELETED' } })
      .populate('state', {
        stateName: 'state.stateName',
        stateShortCode: 'state.stateShortCode'
      })
      .exec()
      .then(cities => cities.map(city => city.view()))
      .then(resp =>
        resolve({
          citiesDB: {
            payload: resp
          }
        })
      )
  })

  Promise.all([statesDB, citiesDB]).then(data => {
    res.send({
      error: false,
      statesDB: data[0].statesDB,
      citiesDB: data[1].citiesDB
    })
  })
}
