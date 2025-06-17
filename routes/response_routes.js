import { Router } from "express";
import { auth } from "../auth.js";
import Response from "../models/response.js";

const router = Router();

// Get all Responses
router.get('/response', auth, async (req, res) => {
    try {
        const response = await Response.find()

        if (!response) {
            return res.status(404).send({ error: "No responses found" })
        }

        return res.send(response)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get one response
router.get('/response/:id', auth, async (req, res) => {
    try {
        const responseId = req.params.id

        const response = await Response.findById(responseId)
        if (!response) {
            return res.status(404).send({ error : "No response found with that ID"})
        }

        return res.send(response)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a response
router.post('/response', auth, async (req, res) => {
    try {
        const bodyData = req.body
        const newResponse = await Response.create(
            {
                surveyId: bodyData.surveyId,
                respondentId: bodyData.respondentId,
                questionId: bodyData.questionId,
                answer: bodyData.answer
            }
        )

        return res.status(201).send({message: "Response created successfully", "newResponse" : newResponse})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Update a response
router.put('/response/:id', auth, async (req, res) => {
    try {
        const responseId = req.params.id

        const response = await Response.findByIdAndUpdate(
            responseId,
            req.body,
            { returnDocument: "after" }
        )
        if (!response) {
            return res.status(404).send({ error: "No response with that ID found"})
        }

        return res.send(response)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a response
router.delete('/response/:id', auth, async (req, res) => {
    try {
        const responseId = req.params.id

        const response = await Response.findById(responseId)
        if (!response) {
            return res.status(400).send({ error: "No responses found with that ID"})
        }

        const deletedResponse = await Response.findByIdAndDelete(responseId)

        return res.status(204).send()
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router;