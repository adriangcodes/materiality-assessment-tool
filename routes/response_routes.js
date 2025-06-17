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



export default router;