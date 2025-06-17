import { Router } from 'express';
import Respondent from '../models/respondent.js';
import { adminOnly, auth } from '../auth.js';

const router = Router();

// Get all Respondents
router.get('/respondent', auth, async (req, res) => {
    try {
        const respondents = await Respondent.find()
        if (!respondents || respondents.length === 0) {
            return res.status(404).send({ error: "No respodents exist" })
        }

        return res.send(respondents)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get one Respondent
router.get('/respondent/:id', auth, async (req, res) => {
    try {
        const respondentId = req.params.id;
        
        const respondent = await Respondent.findById(respondentId)
        if (!respondent) {
            return res.status(404).send({ error : "No respondents with that ID found"})
        }

        return res.send(respondent)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a respondent
router.post('/respondent', auth, async (req, res) => {
    try {
        const bodyData = req.body
        const respondent = await Respondent.create(
            {
                surveyId: bodyData.surveyId,
                stakeholderType: bodyData.stakeholderType,
                firstName: bodyData.firstName,
                lastName: bodyData.lastName,
                emailAddress: bodyData.emailAddress,
                region: bodyData.region,
                consentToContact: bodyData.consentToContact,
                consentToStorePII: bodyData.consentToStorePII
            }
        )

        if (!respondent) {
            return res.status(400).send({ error: "There was an error created the respondent"})
        }

        return res.status(201).send(respondent)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Update a Respondent
router.put('/respondent/:id', auth, async (req, res) => {
    try {
        const respondentId = req.params.id

        const respondent = await Respondent.findById(respondentId)
        if (!respondent) {
            return res.status(404).send({ error : "No respondent found with that ID"})
        }

        const updatedRespondent = await Respondent.findByIdAndUpdate(
            respondentId,
            req.body,
            { returnDocument: "after" }
        )

        return res.send({ message : "Updated Successfully", "updatedRespondent" : updatedRespondent})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a Respondent
router.delete('/respondent/:id', auth, adminOnly, async (req, res) => {
    try {
        const respondentId = req.params.id

        const respondent = await Respondent.findById(req.params.id)
        if (!respondent) {
            return res.status(400).send({ error: "No respondent found with that ID"})
        }

        const deletedRespondent = await Respondent.findByIdAndDelete(respondentId)

        return res.status(204).send({message : "Deleted respondent"})

    } catch (err) {
        return res.status(400).send({ error : err.message})
    }
})

export default router