import mongoose, { Schema } from 'mongoose'

const organizationSchema = new Schema({
    orgName: {
        type: String
    },
    orgType: {
      type: String
    },
    orgShortName: {
      type: String
    },
    orgAddress: {
      type: Object
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'States'
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'Cities'
    },
    orgPan: {
      type: String
    },
    orgPin: {
      type: String
    },
    gst: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employees'
    },
    status: {
      type: String
    }
}, {
    timestamps: true
});

organizationSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        orgName: this.orgName,
        orgShortName: this.orgShortName,
        orgType: this.orgType,
        orgAddress: this.orgAddress,
        city: this.city,
        state: this.state,
        orgPin: this.orgPin,
        orgPan: this.orgPan,
        gst: this.gst,
        createdBy: this.createdBy,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Organizations', organizationSchema)

export const schema = model.schema
export default model