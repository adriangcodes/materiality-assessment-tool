import { Router } from "express";
import { auth, adminOnly } from "../auth.js";
import Framework from "../models/framework.js";

const router = Router();

// Get all frameworks
router.get('/framework', auth, async (req, res) => {
    try {
        const framework = await Framework.find()
        if (!framework || framework.length === 0) {
            return res.status(404).send({ message: "No frameworks found" })
        }

        return res.send(framework)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Get one framework
router.get('/framework/:id', auth, async (req, res) => {
    try {
        const frameworkId = req.params.id

        const framework = await Framework.findById(frameworkId)
        if (!framework) {
            return res.status(404).send({ error: "Framework not found" })
        }

        return res.send(framework)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Create a framework
router.post('/framework', auth, adminOnly, async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData || bodyData.length === 0) {
            return res.status(400).send({ message: "The JSON body contains no data"})
        }

        const framework = await Framework.create({
            name: bodyData.name
        })

        return res.status(201).send({ newFramework: framework })

    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Update a framework
router.put('/framework/:id', auth, adminOnly, async (req, res) => {
    try {
        const frameworkId = req.params.id

        const framework = await Framework.findById(frameworkId)
        if (!framework) {
            return res.status(404).send({ message: "No frameworks found"})
        }

        const updatedFramework = await Framework.findByIdAndUpdate(
            frameworkId,
            req.body,
            { returnDocument: "after" }
        )

        return res.send({ action: "You have updated your framework", "updatedFramework" : updatedFramework})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

// Delete a framework
router.delete('/framework/:id', auth, adminOnly, async (req, res) => {
    try {
        const frameworkId = req.params.id;

        const framework = await Framework.findById(frameworkId);
        if (!framework) {
            return res.status(404).send({ error: "Framework not found"})
        }

        const deletedFramework = await Framework.findByIdAndDelete(frameworkId)

        return res.status(204).send({ message: "Framework deleted"})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router;