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
    ref: 'Courses'
  },
  feeStructure: [new Schema({ type: {
    type: String
  },
  amount: {
    type: String
  }
  })],
  status: { 
    type: String,
    default: 'Active',
    enum: ['Active', 'inActive']
  }
});

const model = mongoose.model('feestructure', batchSchema);

const schema = model.schema;

export default model;

export { schema };