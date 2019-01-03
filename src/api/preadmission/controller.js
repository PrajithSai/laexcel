import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { PreAdmission } from '.'
import Employee from '../employee/model'

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
  const query = {
    createdAt: { $gte: req.body.from, $lte: req.body.to },
    Program: req.body.program,
    assignedTo: { $eq: req.body.assignedTo ? req.body.assignedTo : null }
  }
  if (req.body.isAcceptedByEmp) {
    query.isAcceptedByEmp = true
  }
  if (req.body.responseType) {
    query.responseType = req.body.responseType
  }
  PreAdmission.find(query, (err, resp) => {
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
        result: resp.map(result => result.view())
      })
    }
  })
}

export const allocateEnquiriesToEmp = (
  { body: { selection, employee } },
  res,
  next
) =>
  PreAdmission.updateMany(
    { _id: { $in: selection } },
    { $set: { assignedTo: employee, isAcceptedByEmp: null } }
  )
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const acceptOrRejectEnquiry = (
  { body: { selection, status } },
  res,
  next
) => {
  const update = {}
  if (status.toLowerCase() === 'return') {
    update.assignedTo = null
    update.isAcceptedByEmp = null
  }
  if (status.toLowerCase() === 'accept') {
    update.isAcceptedByEmp = true
  }
  return PreAdmission.updateMany({ _id: { $in: selection } }, { $set: update })
    .then(notFound(res))
    .then(success(res))
    .catch(next)
}

export const fetchAdmissionsByEmp = (req, res, next) => {
  Employee.findOne({ userId: req.params.userId }, (err, result) => {
    if (err) {
      return notFound(res)
    } else {
      req.body.assignedTo = result._id
      next()
    }
  })
}

export const fetchAssignedEnquiries = (req, res, next) => {
  const query = {
    createdAt: { $gte: req.body.from, $lte: req.body.to },
    Program: req.body.program,
    assignedTo: { $ne: null }
  }
  if (req.body.responseType) {
    query.responseType = req.body.responseType
  }
  PreAdmission.find(query, (err, resp) => {
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
        result: resp.map(result => result.view())
      })
    }
  })
}

export const fetchEnquiresByStudent = (req, res, next) => {
  const query = {}
  const { name, email, number } = req.body
  if (name !== '') {
    query.StudentName = name
  }
  if (email !== '') {
    query.Email = email
  }
  if (number !== '') {
    query.ContactNumber = number
  }
  PreAdmission.find(query, (err, resp) => {
    if (err) {
      return res.send({
        error: true,
        message: 'Unable to fetch enquiries at the moment',
        payload: []
      })
    } else {
      res.send({
        error: resp.length === 0,
        message:
          resp.length === 0
            ? 'No enquiries found for the given information!'
            : `Found ${resp.length} enquiries!`,
        payload: resp.map(result => result.view())
      })
    }
  })
}

export const updateResponseAndEnquiredOn = (req, res, next) => {
  PreAdmission.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        responseType: req.body.responseType,
        createdAt: req.body.dateOfEnquiry // need clarification from murali regarding enquiredOn field
      }
    },
    { new: true },
    (err, resp) => {
      if (err) {
        return res.send({
          error: true,
          message: 'Unable to update at the moment',
          payload: []
        })
      } else {
        res.send({
          error: false,
          message: `Response type and enquiry date captured successfully!`,
          payload: resp.view()
        })
      }
    }
  )
}

export const setDemoClassDate = (req, res, next) => {
  PreAdmission.updateMany(
    { _id: req.body.selection },
    {
      $set: {
        demoClassDate: req.body.demoClassDate
      }
    },
    { new: true },
    (err, resp) => {
      if (err) {
        return res.send({
          error: true,
          message: 'Unable to update at the moment',
          payload: []
        })
      } else {
        res.send({
          error: false,
          message: `Demo class date captured successfully!`,
          payload: resp
        })
      }
    }
  )
}
