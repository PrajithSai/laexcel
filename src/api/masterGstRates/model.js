import mongoose, { Schema } from 'mongoose';

const masterGstRateSchema = new Schema({
  rateOfGst: {
      type: String
    },
    cgst: {
      type: String
    },
    sgst: {
      type: String
    },
    igst: {
      type: String
    },
    status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'inActive']
    }
}, { timestamps: true });

const model = mongoose.model('mastergstrates', masterGstRateSchema);

export default model;