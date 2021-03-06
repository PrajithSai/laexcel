import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  create,
  index,
  show,
  update,
  destroy,
  bulkUpload,
  basedOnEnquiryDate,
  allocateEnquiriesToEmp,
  acceptOrRejectEnquiry,
  fetchAdmissionsByEmp,
  fetchAssignedEnquiries,
  fetchEnquiresByStudent,
  updateResponseAndEnquiredOn,
  setDemoClassDate,
  fetchAllAssignedEnquiries,
  fetchLogsById,
  updateResponseTypeAndRemarks
} from './controller'
import { schema } from './model'
export PreAdmission, { schema } from './model'

const router = new Router()
const {
  sourceType,
  agencyCode,
  others,
  type,
  Program,
  StudentName,
  Email,
  ContactNumber,
  responseType,
  remarks
} = schema.tree

/**
 * @api {post} /projects Create projects
 * @apiName CreateProjects
 * @apiGroup Projects
 * @apiParam countryName Country's name.
 * @apiParam status Country's status.
 * @apiSuccess {Object} Projects Country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Projects not found.
 */
router.post(
  '/',
  body({
    sourceType,
    agencyCode,
    others,
    type,
    Program,
    StudentName,
    Email,
    ContactNumber
  }),
  create
)

router.post('/upload', bulkUpload)

/**
 * @api {get} /projects Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Projects
 * @apiUse listParams
 * @apiSuccess {Object[]} projects List of projects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

/**
 * @api {get} /projects/:id Retrieve projects
 * @apiName RetrieveProjects
 * @apiGroup Projects
 * @apiSuccess {Object} projects country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 projects not found.
 */
router.get('/:id', show)

/**
 * @api {put} /projects Create projects
 * @apiName CreateProjects
 * @apiGroup Projects
 * @apiParam countryName country's countryName.
 * @apiParam status country's status.
 * @apiSuccess {Object} Projects country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Projects not found.
 */
router.put(
  '/:id',
  body({
    sourceType,
    agencyCode,
    others,
    type,
    Program,
    StudentName,
    Email,
    ContactNumber,
    responseType,
    remarks
  }),
  update
)

/**
 * @api {delete} /projects/:id Delete projects
 * @apiName DeleteProjects
 * @apiGroup Projects
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Projects not found.
 */
router.delete('/:id', destroy)

router.post('/basedOnEquiryDate', basedOnEnquiryDate)

router.post('/allocate', allocateEnquiriesToEmp)

router.post('/employee', acceptOrRejectEnquiry)

router.post('/:userId/employee', fetchAdmissionsByEmp, basedOnEnquiryDate)

router.post('/assigned', fetchAssignedEnquiries)

router.post('/student', fetchEnquiresByStudent)

router.put('/:id/clarifications', updateResponseAndEnquiredOn)

router.post('/demoClass', setDemoClassDate)

router.get('/assigned/all', fetchAllAssignedEnquiries)

router.get('/:id/logs', fetchLogsById)

router.put('/:id/employee', updateResponseTypeAndRemarks)

export default router
