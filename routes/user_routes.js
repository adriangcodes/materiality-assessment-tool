import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { auth, adminOnly } from '../auth.js'
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

// Login
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

// Get all users
router.get('/users', auth, async (req, res) => {
    try {
        const user = await User.find()

        if (!user || user.length === 0) {
            return res.status(404).send({ message: "No users found"})
        }

        return res.send(user)

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.put('/users/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).send({ message: "User not found"})
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            req.body,
            {returnDocument: 'after'}
        )

        return res.send(updatedUser)

    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.delete('/user/:id', auth, adminOnly, async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({ message: "User not found"})
        }

        const deletedUser = await User.findByIdAndDelete(userId)

        return res.status(204).send({ message: "User has been deleted"})

    } catch (err) {
        return res.status(400).send({ error: err.message })
    } 
})

export default router;
