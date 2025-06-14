import { Router } from "express";
import { auth } from "../auth.js";
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

//Get a survey question
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