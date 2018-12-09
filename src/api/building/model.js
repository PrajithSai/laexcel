import mongoose, { Schema } from 'mongoose'

const statesSchema = new Schema(
  {
    name: {
      type: String
    },
    code: {
      type: String
    },
    campus: {
      type: Schema.Types.ObjectId,
      ref: 'Campuses'
    },
    campusName: {
      type: String
    },
    campusAddress: {
      type: Object
    },
    rented: {
      type: Boolean
    },
    totalArea: {
      type: Number
    },
    floorArea: {
      type: Number
    },
    carpetArea: {
      type: Number
    },
    floors: [
      {
        rowId: { type: Number },
        floorNo: {
          type: Number
        },
        floorArea: {
          type: Number
        }
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: { type: String }
  },
  {
    timestamps: true
  }
)

statesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      code: this.code,
      campus: this.campus,
      campusName: this.campusName,
      campusAddress: this.campusAddress,
      rented: this.rented,
      totalArea: this.totalArea,
      floorArea: this.floorArea,
      carpetArea: this.carpetArea,
      floors: this.floors,
      status: this.status,
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

const model = mongoose.model('Buildings', statesSchema)

export const schema = model.schema
export default model
