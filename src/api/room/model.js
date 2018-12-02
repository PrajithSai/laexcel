import mongoose, { Schema } from 'mongoose'

const roomSchema = new Schema(
  {
    buildingName: {},
    parentBranch: {
      type: Schema.Types.ObjectId,
      ref: 'Branches'
    },
    // parentBuilding: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Building'
    // },
    parentOrg: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations'
    },
    floorNumber: {
      type: Number
    },
    roomNumber: {
      type: Number
    },
    roomUsage: {
      type: String
    },
    roomCarpetArea: {
      type: Number
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employees'
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

roomSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      parentBranch: this.parentBranch,
      parentBuilding: this.parentBuilding,
      parentOrg: this.parentOrg,
      floorNumber: this.floorNumber,
      roomNumber: this.roomNumber,
      roomUsage: this.roomUsage,
      roomCarpetArea: this.roomCarpetArea,
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

const model = mongoose.model('Room', roomSchema)

export const schema = model.schema
export default model
