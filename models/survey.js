import { Schema, model } from "mongoose";
import Organisation from "./organisation.js";


const surveySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        organisationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organisation',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['Active', 'Pending', 'Not Used']
        },
        framework: {
            type: Schema.Types.ObjectId,
            ref: 'Framework',
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const Survey = model('Survey', surveySchema)

export default Survey