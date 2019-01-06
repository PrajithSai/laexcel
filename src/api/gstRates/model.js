import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations'
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'States'
  },
  gstRegisterationNumber: {
    type: String
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('gstrates', batchSchema);

const schema = model.schema;

export default model;

export { schema };