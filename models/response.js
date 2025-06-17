import { Schema, model } from "mongoose";

const responseSchema = new Schema(
    {
        surveyId: {
            type: Schema.Types.ObjectId,
            ref: "Survey",
            required: true
        },
        respondentId: {
            type: Schema.Types.ObjectId,
            ref: "Respondent",
            required: true
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "MasterQuestion",
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }
)

const Response = model("Response", responseSchema)

export default Response