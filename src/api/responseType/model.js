import mongoose, { Schema } from 'mongoose'

const responseSchema = new Schema(
  {
    responseName: {
      type: String
    },
    responseCode: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

responseSchema.methods = {
  view () {
    const view = {
      // simple view
      id: this.id,
      responseName: this.responseName,
      responseCode: this.responseCode,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return view
  }
}

const model = mongoose.model('ResponseType', responseSchema)

export const schema = model.schema
export default model
