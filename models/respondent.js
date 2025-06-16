import { Schema, model } from 'mongoose'

const respondentSchema = new Schema(
    {
        surveyId : {
            type: Schema.Types.ObjectId,
            ref: "Survey",
            required: true
        },
        stakeholderType: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                'Please enter a valid email address'
              ]
        },
        region: {
            type: String
        },
        submittedAt: {
            type: Date,
            default: Date.now()
        },
        consentToContact : {
            type: Boolean,
            default: false
        },
        consentToStorePII: {
            type: Boolean,
            default: false
        }
    }
)

const Respondent = model("Respondent", respondentSchema)

export default Respondent