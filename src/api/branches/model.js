import mongoose, { Schema } from 'mongoose'

const branchesSchema = new Schema(
  {
    name: {
      type: String
    },
    code: {
      type: String
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
      ref: 'User'
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

branchesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      _id: this.id,
      id: this.id,
      name: this.name,
      code: this.code,
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

const model = mongoose.model('Branches', branchesSchema)

export const schema = model.schema
export default model
