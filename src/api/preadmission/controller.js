import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { PreAdmission } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  PreAdmission.create(body)
    .then(preAdmissions =>
      PreAdmission.findById(preAdmissions._id)
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

export const bulkUpload = (req, res, next) => {
  PreAdmission.create(req.body)
    .then(preAdmission => preAdmission.map(rec => rec.view(true)))
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  PreAdmission.findById(params.id)
    .then(notFound(res))
    .then(preAdmissions => (preAdmissions ? preAdmissions.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PreAdmission.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('state', {
      stateName: 'state.stateName',
      stateShortCode: 'state.stateShortCode'
    })
    .exec()
    .then(preAdmissions => preAdmissions.map(preAdmission => preAdmission.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PreAdmission.findById(params.id)
    .then(notFound(res))
    .then(preAdmissions => (preAdmissions ? _.merge(preAdmissions, body).save() : null))
    .then(preAdmissions => (preAdmissions ? preAdmissions.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PreAdmission.findById(params.id)
    .then(notFound(res))
    .then(preAdmissions =>
      preAdmissions ? _.merge(preAdmissions, { status: 'DELETED' }).save() : null
    )
    .then(success(res, 204))
    .catch(next)
