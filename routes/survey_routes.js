import { Router } from "express";
import { auth } from "../auth";
import Survey from "../models/survey";



const router = Router();

// Get all surveys
router.get('/survey', auth, async (req, res) => {
    try {
        const surveys = await Survey.find()

        if (!surveys || surveys.length === 0) {
            return res.status(404).send({ message: "No surveys found" })
        }

        return res.send(surveys)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get one survey
router.get('/survey/:id', auth, async (req, res) => {
    try {
        const surveyId = req.params.id

        const survey = await Survey.findById(surveyId)
        if (!survey) {
            return res.status(404).send({ message: "Survey not found with that ID"})
        }

        return res.send(survey)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a survey
router.post('/survey', auth, async (req, res) => {
    try {
        const bodyData = req.body

        const newSurvey = await Survey.create()

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})