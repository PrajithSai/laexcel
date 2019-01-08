import mongoose, { Schema, mongo } from 'mongoose';

const ProgramSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  gstApplicable: {
    type: String
  },
  rateOfGst: {
    type: Schema.Types.ObjectId,
    ref: 'mastergstrates'
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('Programs', ProgramSchema);

const schema = model.schema;

export default model;

export { schema };