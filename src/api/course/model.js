import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program'
  }
});

const model = mongoose.model('course', batchSchema);

const schema = model.schema;

export default model;

export { schema };