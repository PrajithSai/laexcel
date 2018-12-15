import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { PreAdmission } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  body.dateOfEnquiry = body.others.dateOfEnquiry
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
    .then(preAdmissions =>
      preAdmissions.map(preAdmission => preAdmission.view())
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PreAdmission.findById(params.id)
    .then(notFound(res))
    .then(preAdmissions =>
      preAdmissions ? _.merge(preAdmissions, body).save() : null
    )
    .then(preAdmissions => (preAdmissions ? preAdmissions.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PreAdmission.findById(params.id)
    .then(notFound(res))
    .then(preAdmissions =>
      preAdmissions
        ? _.merge(preAdmissions, { status: 'DELETED' }).save()
        : null
    )
    .then(success(res, 204))
    .catch(next)

export const basedOnEnquiryDate = (req, res, next) => {
  PreAdmission.find(
    {
      'others.dateOfEnquiry': { $gte: req.body.from, $lte: req.body.to },
      assignedTo: { $eq: null }
    },
    (err, resp) => {
      if (err) {
        return res.send({
          error: true,
          message: 'Unable to fetch enquiries at the moment',
          result: []
        })
      } else {
        res.send({
          error: resp.length === 0,
          message:
            resp.length === 0
              ? 'No unassigned enquiries found between given dates!'
              : `Found ${resp.length} enquiries!`,
          result: resp
        })
      }
    }
  )
}

export const allocateEnquiriesToEmp = (
  { body: { selection, employee } },
  res,
  next
) =>
  PreAdmission.updateMany(
    { _id: { $in: selection } },
    { $set: { assignedTo: employee } }
  )
    .then(notFound(res))
    .then(success(res))
    .catch(next)
