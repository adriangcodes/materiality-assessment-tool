import { Router } from 'express'
import bcrypt from 'bcrypt'


import User from '../models/user.js'
import Organisation from '../models/organisation.js';

const router = Router();

// Register a user
router.post('/register', async (req, res) => {
    try {
        const bodyData = req.body

        if (!bodyData) {
            return res.status(400).send({ message: "No body data found" })
        }
        const userOrganisation = await Organisation.findById(bodyData.organisationId)
        if (!userOrganisation) {
            return res.status(404).send({ message: "Organisation not found for the user" })
        }

        const user = await User.create({
            email: bodyData.email,
            password: await bcrypt.hash(req.body.password, 10),
            firstName: bodyData.firstName,
            lastName: bodyData.lastName,
            isAdmin: bodyData.isAdmin === true ? true : false,
            organisationId: bodyData.organisationId
        })

        res.status(201).send({ email: user.email})


    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

export default router