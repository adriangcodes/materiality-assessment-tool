import { Schema, model } from "mongoose";

const surveyQuestionSchema = new Schema(
    {
        surveyId: {
            type: Schema.Types.ObjectId,
            ref: "Survey",
            required: true
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "MasterQuestion",
            required: true
        },
        order: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isRequired: {
            type: Boolean,
            default: false
        }
    }
)

const SurveyQuestion = model("SurveyQuestion", surveyQuestionSchema)

export default SurveyQuestion