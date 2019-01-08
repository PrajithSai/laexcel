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
    ref: 'Programs'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses'
  }
});

const model = mongoose.model('Batches', courseSchema);

const schema = model.schema;

export default model;

export { schema };