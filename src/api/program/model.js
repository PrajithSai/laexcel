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
    type: String
  }
});

const model = mongoose.model('program', ProgramSchema);

const schema = model.schema;

export default model;

export { schema };