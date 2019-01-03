import mongoose, { Schema, mongo } from 'mongoose';

const courseSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course'
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('batch', courseSchema);

const schema = model.schema;

export default model;

export { schema };