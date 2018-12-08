import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Organizations } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Organizations.create(body)
    .then(organizations =>
      Organizations.findById(organizations._id)
        .populate('state', {
          stateName: 'state.stateName',
          stateShortCode: 'state.stateShortCode'
        })
        .populate('city', {
          cityName: 'state.cityName',
          cityShortCode: 'state.cityShortCode'
        })
        .exec()
        .then(populatedOrgs => populatedOrgs.view(true))
    )
    .then(success(res, 201, `"${body.orgName}" Created Successfully`))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Organizations.findById(params.id)
    .then(notFound(res))
    .then(organizations => (organizations ? organizations.view() : null))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Organizations.find({ status: { $ne: 'DELETED' } }, select, cursor)
    .populate('state', {
      stateName: 'state.stateName',
      stateShortCode: 'state.stateShortCode'
    })
    .populate('city', {
      cityName: 'state.cityName',
      cityShortCode: 'state.cityShortCode'
    })
    .exec()
    .then(organizations =>
      organizations.map(organization => organization.view())
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Organizations.findById(params.id)
    .then(notFound(res))
    .then(organizations =>
      organizations ? _.merge(organizations, body).save() : null
    )
    .then(organizations => (organizations ? organizations.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Organizations.findById(params.id)
    .then(notFound(res))
    .then(organizations =>
      organizations
        ? _.merge(organizations, { status: 'DELETED' }).save()
        : null
    )
    .then(success(res, 204))
    .catch(next)

export const deleteMany = (req, res, next) => {
  const deletedOrgs = new Promise((resolve, reject) => {
    req.body.map((orgId, i) => {
      Organizations.findOneAndUpdate(
        { _id: orgId },
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
  deletedOrgs.then(orgs => {
    findOrganisations(req, res)
  })
}

const findOrganisations = (req, res) =>
  Organizations.find({ status: { $ne: 'DELETED' } })
    .populate('state', {
      stateName: 'state.stateName',
      stateShortCode: 'state.stateShortCode'
    })
    .populate('city', {
      cityName: 'state.cityName',
      cityShortCode: 'state.cityShortCode'
    })
    .exec()
    .then(organizations =>
      organizations.map(organization => organization.view())
    )
    .then(resp =>
      res.send({
        error: false,
        payload: resp,
        message: `${req.body.length} Organisation(s) Deleted`
      })
    )
