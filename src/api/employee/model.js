import mongoose, { Schema } from 'mongoose'

const employeeSchema = new Schema(
  {
    userId: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    phonenumber: {
      type: String
    },
    address: {
      type: String
    },
    role: {
      type: String
    },
    status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'inActive']
    }
  },
  { timestamps: true }
)

employeeSchema.methods = {
  partialView () {
    return { id: this._id, name: this.name }
  }
}

const model = mongoose.model('employee', employeeSchema)
const schema = model.schema

export { schema }
export default model
