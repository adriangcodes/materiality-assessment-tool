import { Router } from 'express'

import Organisation from "../models/organisation.js";

const router = Router();

// Get all organisations
router.get('/organisation', async (req, res) => {
    try {
        // Access database
        const organisations = await Organisation.find()

        if (!organisations || organisations.length === 0) {
            return res.status(404).send({message: "No organisations found"})
        }

        return res.send(organisations)


    } catch (err) {
        return res.status(400).send({error: err.message})
    }
})

// Get a single organisation
router.get('/organisation/:id', async (req, res) => {
    try {

        const organisationId = req.params.id

        const organisation = await Organisation.findById(organisationId)
        if (!organisation) {
            return res.status(404).send({error: "Organisation not found"})
        }

        return res.send(organisation)

    } catch (err) {
        return res.status(400).send({error: err})
    }
})

// Create a new organisation
router.post('/organisation', async (req, res) => {
    try {
        const newOrganisation = new Organisation(req.body)
        const savedOrganisation = await newOrganisation.save()

        return res.status(201).send(savedOrganisation)
        
    } catch (err) {
        return res.status(400).send({error: err})
    }
})

export default router