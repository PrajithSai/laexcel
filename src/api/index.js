import { Router } from 'express'
import user from './user'
import auth from './auth'
import cities from './cities'
import states from './states'
import organizations from './organizations'
import branches from './branches'
import campus from './campus'
import room from './room'
import preadmission from './preadmission'
import buildings from './building'
import sourcetype from './soruceType'
import agencycodes from './agencyCode'
import employee from './employee'
import responsetype from './responseType'
import program from './program'
import course from './course'
import Batch from './batch'
import CourseDuration from './courseDuration'
import feeCode from './feeCode'
import gstRates from './gstRates'
import feestructure from './feeStructure';

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/states', states)
router.use('/cities', cities)
router.use('/branches', branches)
router.use('/organizations', organizations)
router.use('/campuses', campus)
router.use('/room', room)
router.use('/preadmission', preadmission)
router.use('/buildings', buildings)
router.use('/sourcetype', sourcetype)
router.use('/agencycodes', agencycodes)
router.use('/employee', employee)
router.use('/responsetype', responsetype)
router.use('/program', program)
router.use('/course', course)
router.use('/batch', Batch)
router.use('/courseDuration', CourseDuration)
router.use('/feecode', feeCode);
router.use('/gstRates', gstRates)
router.use('/feestructure', feestructure)
export default router
