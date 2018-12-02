import mongoose, { Schema } from 'mongoose'

const citiesSchema = new Schema(
  {
    cityName: {
      type: String
    },
    cityShortCode: {
      type: String
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'States'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

citiesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      cityName: this.cityName,
      cityShortCode: this.cityShortCode,
      state: this.state,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Cities', citiesSchema)

export const schema = model.schema
export default model
