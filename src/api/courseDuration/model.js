import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  academicYear: {
    type: String
  },
  courseDuration: {
    type: String
  },
  batch: {
    type: Schema.Types.ObjectId,
    ref: 'batch'
  },
  courseName: {
    type: Schema.Types.ObjectId,
    ref: 'course'
  },
  months: {
    type: String
  },
  fromDate: {
    type: Date
  },
  toDate: {
    type: Date
  }
});

const model = mongoose.model('courseduration', batchSchema);

const schema = model.schema;

export default model;

export { schema };