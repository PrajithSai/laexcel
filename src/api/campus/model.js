import mongoose, { Schema } from 'mongoose'

const campusSchema = new Schema(
  {
    campusName: {
      type: String
    },
    campusCode: {
      type: String
    },
    parentBranch: {
      type: Schema.Types.ObjectId,
      ref: 'Branches'
    },
    parentOrg: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations'
    },
    address: {
      type: Object
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'Cities'
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'States'
    },
    pincode: {
      type: Number
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employees'
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'DELETED']
    }
  },
  {
    timestamps: true
  }
)

campusSchema.methods = {
  view (full) {
    const view = {
      // simple view
      _id: this.id,
      id: this.id,
      campusName: this.campusName,
      campusCode: this.campusCode,
      parentBranch: this.parentBranch,
      parentOrg: this.parentOrg,
      address: this.address,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Campuses', campusSchema)

export const schema = model.schema
export default model
