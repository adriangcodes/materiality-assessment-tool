import db from "./db.js";
import Organisation from "./models/organisation.js";
import User from "./models/user.js";
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


// Connect to DB
db.connect()


// User seed data
const organisations = [
    {
        name: 'SatoshiFund',
        city: 'Sydney',
        country: 'Australia',
        numberEmployees: 2,
        industry: 'FinTech',
    }
]

await Organisation.deleteMany()
console.log('Organisations erased')

const o = await Organisation.create(organisations)
console.log('Organisations Created')

const users = [
    {
        email: "admin@app.com",
        password: await bcrypt.hash('Password123', 10),
        firstName: "Admin",
        lastName: "Admin",
        isAdmin: true,
        organisationId: o[0]._id
    }
]

await User.deleteMany()
await User.create(users)
console.log('Users Created')


// Disconnect from DB
db.disconnect()