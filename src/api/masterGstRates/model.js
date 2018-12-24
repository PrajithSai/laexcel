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
    }
}, { timestamps: true });

const model = mongoose.model('mastergstrates', masterGstRateSchema);

export default model;