import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Cities } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Cities.create(body)
    .then(cities =>
      Cities.findById(cities._id)
        .populate('state', {
          stateName: 'state.stateName',
          stateShortCode: 'state.stateShortCode'
        })
        .exec()
        .then(populatedCity => populatedCity.view(true))
    )
    .then(success(res, 201, `"${body.cityName}" Created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Cities.findById(params.id)
    .then(notFound(res))
    .then(cities => (cities ? cities.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cities.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('state', {
      stateName: 'state.stateName',
      stateShortCode: 'state.stateShortCode'
    })
    .exec()
    .then(cities => cities.map(city => city.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Cities.findById(params.id)
    .then(notFound(res))
    .then(cities => (cities ? _.merge(cities, body).save() : null))
    .then(cities => (cities ? cities.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Cities.findById(params.id)
    .then(notFound(res))
    .then(cities =>
      cities ? _.merge(cities, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
