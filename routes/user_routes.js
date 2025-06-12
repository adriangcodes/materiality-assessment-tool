import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Organisation from '../models/organisation.js';

const router = Router();

// Register a user
router.post('/register', async (req, res) => {
    try {
        const bodyData = req.body;

        if (!bodyData) {
            return res.status(400).send({ message: 'No body data found' });
        }
        const userOrganisation = await Organisation.findById(
            bodyData.organisationId
        );
        if (!userOrganisation) {
            return res
                .status(404)
                .send({ message: 'Organisation not found for the user' });
        }

        const user = await User.create({
            email: bodyData.email,
            password: await bcrypt.hash(req.body.password, 10),
            firstName: bodyData.firstName,
            lastName: bodyData.lastName,
            isAdmin: bodyData.isAdmin === true ? true : false,
            organisationId: bodyData.organisationId
        });

        res.status(201).send({ email: user.email });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const bodyData = req.body;

        if (!bodyData) {
            return res.status(400).send({ message: 'No login details found' });
        }

        const user = await User.findOne({ email: bodyData.email });
        if (user) {
            const match = await bcrypt.compare(
                bodyData.password || '',
                user.password
            );

            if (!match) {
                return res.status(401).send({ error: 'Invalid Credentials' });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 1000 * 60 * 60 // 1 hour
            });

            res.send({
                token,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(404).send({ error: 'Email or password incorrect' });
        }
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

export default router;
