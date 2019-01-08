import mongoose, { Schema } from 'mongoose';

const logosSchema = new Schema({
    organisation: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations'
    },
    logo: {
        type: String
    }
}, { timestamps: true });

const model = mongoose.model('logos', logosSchema);

export default model;