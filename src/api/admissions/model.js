import mongoose, { Schema } from 'mongoose'
import Counter from './CounterModel';

const admissionSchema = new Schema(
  {
    thruCounselling: {
      type: Boolean,
      default: false
    },
    admissionNumber: {
      type: String,       //we be prepare server side
      trim: true,
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
      trim: true,
      required: true
    },
    middleName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    contactNumber: {
      type: Number,
      required: true,
      maxlength: 10
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    fatherFirstName: {
      type: String,
      trim: true,
      required: true
    },
    fatherMiddleName: {
      type: String,
      trim: true
    },
    fatherLastName: {
      type: String,
      trim: true,
      required: true
    },
    fatherOccupation: {
      type: String,
      trim: true
    },
    fatherContactNumber: {
      type: Number,
      required: true,
      maxlength: 10
    },
    motherName: {
      type: String,
      trim: true
    },
    motherOccupation: {
      type: String,
      trim: true
    },
    siblingName: {
      type: String,
      trim: true
    },
    qualification: {
      type: String,
      trim: true
    },
    institute: {
      type: String,
      trim: true
    },
    others: {
      type: Object
    },
    category: {
      type: String,
      trim: true,
      required: true
    },
    isHostelResidant: {
      type: Boolean,
      default: false
    },
    hostelName: {
      type: String,
      trim: true
    },
    hostelContact: {
      type: Number,
      maxlength: 10
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
      type: String,
      trim: true
    },
    upscAttempted: {
      type: Boolean,
      default: false
    },
    noOfAttempts: {
      type: Number
    },
    particulars: {
      type: String,
      trim: true
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

admissionSchema.pre('save', function(next) {
  Counter.findByIdAndUpdate({
    branch: this.branch
  }, { $inc: { seq: 1} }, { upsert: true, new: true }, (err, counter) => {
      if(err){
        return next(err);
      } else {
        this.admissionNumber = `${this.branchCode}-${("000" + counter.seq).slice(-4)}`;
      }
      next();
  });
});

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
