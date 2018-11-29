import mongoose, { Schema } from 'mongoose'

const statesSchema = new Schema({
    stateName: {
        type: String
    },
    stateShortCode: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employees'
    },
    status: {
      type: String
    }
}, {
    timestamps: true
});

statesSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        stateName: this.stateName,
        stateShortCode: this.stateShortCode,
        createdBy: this.createdBy,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('States', statesSchema)

export const schema = model.schema
export default model