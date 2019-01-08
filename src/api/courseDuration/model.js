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
    ref: 'Batches'
  },
  courseName: {
    type: Schema.Types.ObjectId,
    ref: 'Courses'
  },
  months: {
    type: String
  },
  fromDate: {
    type: Date
  },
  toDate: {
    type: Date
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('courseduration', batchSchema);

const schema = model.schema;

export default model;

export { schema };