import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Branches, { schema } from './model'

const router = new Router()
const {
  name,
  code,
  parentOrg,
  address,
  city,
  state,
  pincode,
  createdBy
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
    name,
    code,
    parentOrg,
    address,
    city,
    state,
    pincode,
    createdBy
  }),
  create
)

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
  body({ name, code, parentOrg, address, city, state, pincode, createdBy }),
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

export default router
