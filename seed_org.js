import bcrypt from 'bcrypt'
import db from './db.js'

import Framework from '.models/framework.js'
import Organisation from './models/organisation.js'
import User from '.models/user.js'
import Survey from '.models/survey.js'
import SurveyQuestion from '.models/surveyquestion.js'


// Connect to DB
db.connect


// Framework seed data

const frameworks = [
    {
        name: 'GRI'
    }
]

// Erase any existing Frameworks
await Framework.deleteMany()
console.log('Frameworks erased.')
// Creates and saves a new Framework to MongoDB for each document in frameworks
const f = await Framework.create(frameworks)
console.log('Frameworks created.')


// Organisation seed data

const organisations = [
  {
    name: 'Materiality Assessment',
    city: 'Sydney',
    country: 'Australia',
    numberEmployees: 2,
    industry: 'Software',
    // createdAt will default to now
  },
  {
    name: 'Tesla',
    city: 'Austin',
    country: 'USA',
    numberEmployees: 150000,
    industry: 'Automotive',
    // createdAt will default to now
  }
]

// Erase any existing Organisations
await Organisation.deleteMany()
console.log('Organisations erased.')
// Creates and saves a new Organisations to MongoDB for each document in organisations
const o = await Organisation.create(organisations)
console.log('Organisations created.')


// User seed data

const users = [
    {
        email: 'admin@app.com',
        password: await bcrypt.hash('Password123', 10),
        firstName: 'Admin',
        lastName: 'Admin',
        isAdmin: true,
        isActive: true,
        organisationId: o[0]._id,
        // createdAt will default to now
    },
    {
        email: 'elon@tesla.com',
        password: await bcrypt.hash('1Password', 10),
        firstName: 'Elon',
        lastName: 'Musk',
        isAdmin: false,
        isActive: true,
        organisationId: o[1]._id,
        // createdAt will default to now
    }
]

// Erase any existing Users
await User.deleteMany()
console.log('Users erased.')
// Creates and saves a new User to MongoDB for each document in users
const u = await User.create(users)
console.log('Users created.')


// Survey seed data

const surveys = [
    {
        name: '2025 Materiality Assessment',
        organisationId: o[1]._id,
        status: 'Active',
        framework: f[0]._id,
        createdBy: u[1]._id,
        // createdAt will default to now
    }
]

// Erase any existing Surveys
await Survey.deleteMany()
console.log('Surveys erased.')
// Creates and saves a new Survey to MongoDB for each document in surveys
const s = await Survey.create(surveys)
console.log('Surveys created.')

// SurveyQuestion seed data

const surveyquestions = [
    {
        
    }
]