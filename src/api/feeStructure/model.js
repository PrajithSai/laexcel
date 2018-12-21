import mongoose, { Schema, mongo } from 'mongoose';

const batchSchema = new Schema({
  academicYear: {
    type: String
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branches'
  },
  courseName: {
    type: Schema.Types.ObjectId,
    ref: 'course'
  },
});

const model = mongoose.model('feestructure', batchSchema);

const schema = model.schema;

export default model;

export { schema };