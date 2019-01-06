import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  type: {
    type: String
  },
  code: {
    type: String
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('feecode', batchSchema);

const schema = model.schema;

export default model;

export { schema };