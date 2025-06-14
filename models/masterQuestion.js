import { Schema, model } from "mongoose";

const masterQuestionSchema = new Schema(
    {
        questionText: {
            type: String,
            required: true
        },
        questionType: {
            type: String
        },

        options: {
            type: String
        },
        framework: {
            type: Schema.Types.ObjectId,
            ref: 'Framework',
            required: true
        }

    }
)

const MasterQuestion = model('MasterQuestion', masterQuestionSchema)

export default MasterQuestion