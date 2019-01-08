import mongoose, { Schema } from 'mongoose'

const admissionSchema = new Schema(
  {
    thruCounselling: {
      type: Boolean,
      default: false
    },
    admissionNumber: {
      type: String,       //we be prepare server side
      required: true
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Organizations'
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicYear'
    },
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Branches'
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    contactNumber: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    fatherFirstName: {
      type: String,
      required: true
    },
    fatherMiddleName: {
      type: String
    },
    fatherLastName: {
      type: String,
      required: true
    },
    fatherOccupation: {
      type: String
    },
    fatherContactNumber: {
      type: Number,
      required: true
    },
    motherName: {
      type: String
    },
    motherOccupation: {
      type: String
    },
    siblingName: {
      type: String
    },
    qualification: {
      type: String
    },
    institute: {
      type: String
    },
    others: {
      type: Object
    },
    category: {
      type: String,
      required: true
    },
    isHostelResidant: {
      type: Boolean,
      default: false
    },
    hostelName: {
      type: String
    },
    hostelContact: {
      type: Number
    },
    presentAddress: {
      line1: String,
      line2: String,
      line3: String,
      city: String,
      state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
      },
      pincode: Number
    },
    permenantAddress: {
      line1: String,
      line2: String,
      line3: String,
      city: String,
      state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
      },
      pincode: Number
    },
    educationDetails: [
      {
        name: String,
        percentage: Number,
        passOutYear: Number,
        institutionName: String,
        place: String,
        boardOrUniversityName: String
      }
    ],
    isEmployee: {
      type: Boolean,
      default: false
    },
    employerName: {
      type: String
    },
    upscAttempted: {
      type: Boolean,
      default: false
    },
    noOfAttempts: {
      type: Number
    },
    particulars: {
      type: String
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Programs',
      required: true,
    },
    courses: [
        Schema.Types.ObjectId
    ],
    isResidential: {
      type: Boolean,
      default: false
    },
    grossFee: {
      type: Number,
      required: true
    },
    concessionAllowed: {
      type: Number
    },
    commitedFee: {
      type: Number,    //will be calculated on server side
      required: true
    },
    gstAmount: {
      type: Number,   //calculated serverside
      required: true
    },
    totalFee: {
      type: Number,
      required: true
    },
    installmentsCount: {
      type: Number,
      default: 1
    },
    installmentsDetails: [
      {
        amount: Number,
        dueDate: Date
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  },
  {
    timestamps: true
  }
)

admissionSchema.methods = {
  view (full) {
    const view = {
      ...this, id: this.id
    }
    return full
      ? {
        ...view
      }
      : view
  }
}

const model = mongoose.model('Admissions', admissionSchema)

export const schema = model.schema
export default model
