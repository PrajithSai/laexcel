import mongoose, { Schema } from 'mongoose'

const academicYearSchema = new Schema(
  {
    academicYear: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE']
    }
  },
  {
    timestamps: true
  }
)

academicYearSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      academicYear: this.academicYear,
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

const model = mongoose.model('AcademicYear', academicYearSchema)

export const schema = model.schema
export default model
