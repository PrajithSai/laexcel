import mongoose, { Schema } from 'mongoose'
var CounterSchema = Schema({
    branch: {
        type: Schema.Types.ObjectId,
        required: true
    },
    seq: { 
        type: Number,
        default: 0
    }
});
export default mongoose.model('Counters', CounterSchema);