import { Router } from "express";
import MasterQuestion from "../models/masterQuestion.js";
import { auth, adminOnly } from "../auth.js";

const router = Router();

// Get all Master Questions
router.get('/master-question', auth, async (req, res) => {
    try {
        const masterQuestions = await MasterQuestion.find()

        if (!masterQuestions || masterQuestions.length === 0) {
            return res.status(404).send({ message: "No master questions found"})
        }

        return res.send(masterQuestions)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get one master question
router.get('/master-question/:id', auth, async (req, res) => {
    try {
        const masterQuestionId = req.params.id

        const masterQuestion = await MasterQuestion.findById(masterQuestionId)
        if (!masterQuestion) {
            return res.status(404).send({ error: "Master question not found"})
        }

        return res.send(masterQuestion)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a master question
router.post('/master-question', auth, adminOnly, async (req, res) => {
    try {
        const bodyData = req.body
        
        const masterQuestion = await MasterQuestion.fin
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Update a master question
router.put('/master-question/:id', auth, adminOnly, async (req, res) => {
    try {
        const questionId = req.params.id

        const question = await MasterQuestion.findById(questionId)
        if (!question) {
            return res.status(404).send({ error: "Question not found with that ID"})
        }

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a master question
router.delete('/master-question/:id', auth, adminOnly, async (req, res) => {
    try {
        const questionId = req.params.id

        const question = await MasterQuestion.findById(questionId)
        if (!question) {
            return res.status(404).send({ error: "No MasterQuestion found with that ID"})
        }

        const deletedQuestion = await MasterQuestion.findByIdAndDelete(questionId);

        return res.status(204).send({ message: 'Master question has been deleted'})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router