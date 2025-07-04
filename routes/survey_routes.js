import { Router } from "express";
import { adminOnly, auth } from "../auth.js";
import Survey from "../models/survey.js";




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
router.get('/survey/:id', async (req, res) => {
    try {
        const surveyId = req.params.id

        const survey = await Survey
            .findById(surveyId)
            .populate('organisationId', 'name')
        if (!survey) {
            return res.status(404).send({ message: "Survey not found with that ID" })
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
        if (!bodyData) {
            return res.status(400).send({ message: "No body data found" })
        }

        const newSurvey = await Survey.create({
            name: bodyData.name,
            organisationId: bodyData.organisationId,
            framework: bodyData.framework,
            createdBy: bodyData.createdBy
        })

        return res.status(201).send({newSurvey})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Update a survey
router.put('/survey/:id', auth, async (req, res) => {
    try {
        const surveyId = req.params.id

        const survey = await Survey.findById(surveyId)
        if (!survey) {
            return res.status(404).send({ message: "Survey not found" })
        }

        const updatedSurvey = await Survey.findByIdAndUpdate(
            surveyId,
            req.body,
            { returnDocument: 'after' }
        )

        return res.send(updatedSurvey)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a survey
router.delete('/survey/:id', auth, adminOnly, async (req, res) => {
    try {
        const surveyId = req.params.id

        const survey = await Survey.findById(surveyId)
        if (!survey) {
            return res.status(404).send({ message: "Survey not found" })
        }

        const deletedSurvey = await Survey.findByIdAndDelete(surveyId)

        return res.send({ message: "Survey successfully deleted" })

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router