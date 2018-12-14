import mongoose, { Schema } from 'mongoose'

const sourceCodeSchema = new Schema(
  {
    sourceName: {
      type: String
    },
    sourceCode: {
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

sourceCodeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      sourceName: this.sourceName,
      sourceCode: this.sourceCode,
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

const model = mongoose.model('SourceTypes', sourceCodeSchema)

export const schema = model.schema
export default model
