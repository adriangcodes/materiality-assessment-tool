import { Router } from "express";
import { auth, adminOnly } from "../auth.js";
import SurveyQuestion from "../models/surveyQuestion.js";

const router = Router();

// Get all Survey Questions
router.get('/survey-question', auth, async (req, res) => {
    try {
        const surveyQuestion = await SurveyQuestion.find()
        if (!surveyQuestion) {
            return res.status(404).send({ error: "No survey questions found"})
        }

        return res.send(surveyQuestion)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get a survey question
router.get('/survey-question/:id', auth, async (req, res) => {
    try {
        const questionId = req.params.id

        const question = await SurveyQuestion.findById(questionId)
        if (!question) {
            return res.status(404).send({ error: "Survey Question not found"})
        }

        return res.send(question)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a survey question
router.post('/survey-question', auth, adminOnly, async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData || bodyData.length === 0) {
            return res.status(400).send({ message: "The JSON body contains no data"})
        }

        const question = await SurveyQuestion.create(
            {
                surveyId: bodyData.surveyId,
                questionId: bodyData.questionId,
                order: bodyData.order,
                isActive: bodyData.isActive || true,
                isRequired: bodyData.isRequired || false
            }
        )


        return res.status(201).send({ message: "Success", newQuestion : question})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Edit a survey question
router.put('/survey-question/:id', auth, adminOnly, async (req, res) => {
    try {
        const questionId = req.params.id

        const surveyQuestion = await SurveyQuestion.findById(questionId)
        if (!surveyQuestion) {
            return res.status(404).send({ error: "No Survey Question found with that ID"})
        }

        const updatedSurveyQuestion = await SurveyQuestion.findByIdAndUpdate(
            questionId,
            req.body,
            { returnDocument: "after" }
        )

        return res.send({ message : "Success", "updatedSurveyQuestion" : updatedSurveyQuestion })

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a survey question
router.delete('/survey-question/:id', auth, adminOnly, async (req, res) => {
    try {
        const questionId = req.params.id

        const question = await SurveyQuestion.findById(questionId)
        if (!question) {
            return res.status(404).send({ error: "No Survey Question found with that ID"})
        }

        const deletedQuestion = await SurveyQuestion.findByIdAndDelete(questionId)

        return res.status(204).send({ message: "Successfully deleted"})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router;