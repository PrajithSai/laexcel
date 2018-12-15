import mongoose, { Schema } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
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
    default: 'inActive',
    enum: ['Active', 'inActive']
  }
}, { timestamps: true });

const model = mongoose.model('employee', employeeSchema);
const schema = model.schema;

export { schema };
export default model;