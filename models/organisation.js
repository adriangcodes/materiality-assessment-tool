import { model, Schema } from "mongoose";

const organisationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    numberEmployees: {
        type: Number,
    },
    industry: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Organisation = model('Organisation', organisationSchema)

export default Organisation