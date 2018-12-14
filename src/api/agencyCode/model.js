import mongoose, { Schema } from 'mongoose'

const agencyCodeSchema = new Schema(
  {
    agencyName: {
      type: String
    },
    agencyCode: {
      type: String
    },
    source: {
      type: Schema.Types.ObjectId,
      ref: 'SourceTypes'
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

agencyCodeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      agencyName: this.agencyName,
      agencyCode: this.agencyCode,
      source: this.source,
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

const model = mongoose.model('AgencyCodes', agencyCodeSchema)

export const schema = model.schema
export default model
