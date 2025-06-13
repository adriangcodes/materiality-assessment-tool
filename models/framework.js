import { Schema, model } from "mongoose";

const frameworkSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

const Framework = model('Framework', frameworkSchema)

export default Framework