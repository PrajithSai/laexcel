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
    dateOfEnquiry: {
      type: Date
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
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'employee'
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
      _id: this.id,
      id: this.id,
      sourceType: this.sourceType,
      agencyCode: this.agencyCode,
      dateOfEnquiry: this.dateOfEnquiry,
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
