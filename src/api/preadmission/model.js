import mongoose, { Schema } from 'mongoose'

const preAdmissionSchema = new Schema(
  {
    sourceType: {
      type: String
    },
    agencyCode: {
      type: String
    },
    type: {
      type: String
    },
    Program: {
      type: String
    },
    StudentName: {
      type: String
    },
    Email: {
      type: String
    },
    ContactNumber: {
      type: String
    },
    others: {
      type: Object
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

preAdmissionSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      sourceType: this.sourceType,
      agencyCode: this.agencyCode,
      others: this.others,
      type: this.type,
      Program: this.Program,
      StudentName: this.StudentName,
      Email: this.Email,
      ContactNumber: this.ContactNumber,
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

const model = mongoose.model('Preadmission', preAdmissionSchema)

export const schema = model.schema
export default model
