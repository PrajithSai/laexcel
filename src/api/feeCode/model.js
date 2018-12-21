import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  type: {
    type: String
  },
  code: {
    type: String
  }
});

const model = mongoose.model('feecode', batchSchema);

const schema = model.schema;

export default model;

export { schema };