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
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'employee',
      default: null
    },
    isAcceptedByEmp: {
      type: Boolean,
      default: null
    },
    status: {
      type: String
    },
    responseType: {
      type: String
    },
    remarks: {
      type: String
    },
    demoClassDate: {
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
      isAcceptedByEmp: this.isAcceptedByEmp,
      responseType: this.responseType,
      remarks: this.remarks,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      demoClassDate: this.demoClassDate
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
