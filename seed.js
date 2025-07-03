import bcrypt from 'bcrypt'
import db from './db.js'

import Framework from './models/framework.js'
import Organisation from './models/organisation.js'
import User from './models/user.js'
import Survey from './models/survey.js'
import MasterQuestion from './models/masterQuestion.js'


// Connect to DB
await db.connect()


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


// MasterQuestion seed data

const masterQuestions = [
    {
        questionText: "How familiar are you with our sustainability efforts?",
        questionType: "single-choice",
        options: JSON.stringify([
        "Very familiar",
        "Somewhat familiar",
        "Unfamiliar"
        ]),
        framework: f[0]._id,
    },
    {
        questionText: "What do you believe are the most significant environmental, social, or economic challenges we face?",
        questionType: "text",
        options: null,
        framework: f[0]._id,
    },
    {
        questionText: "What topics should we prioritise to ensure long-term sustainability?",
        questionType: "text",
        options: null,
        framework: f[0]._id,
    },
    {
        questionText: "Please rate the importance of each topic",
        questionType: "matrix-importance",
        options: JSON.stringify([
            "Climate change & GHG emissions",
            "Energy use & renewable transition",
            "Biodiversity & habitat preservation",
            "Circular economy & waste management",
            "Water usage & pollution",
            "Supply chain ethics & human rights",
            "Modern slavery & fair labor",
            "Diversity, equity & inclusion",
            "Community investment & engagement",
            "Cybersecurity & data protection",
            "Product responsibility & safety",
            "Corporate governance & transparency",
            "Anti-corruption & bribery prevention",
            "Innovation & sustainable technology",
            "Board diversity & accountability"
        ]),
        framework: f[0]._id,
    },
    {
        questionText: "Rate how significant you believe our impact on each topic is",
        questionType: "matrix-impact",
        options: JSON.stringify([
            "Climate change & GHG emissions",
            "Energy use & renewable transition",
            "Biodiversity & habitat preservation",
            "Circular economy & waste management",
            "Water usage & pollution",
            "Supply chain ethics & human rights",
            "Modern slavery & fair labor",
            "Diversity, equity & inclusion",
            "Community investment & engagement",
            "Cybersecurity & data protection",
            "Product responsibility & safety",
            "Corporate governance & transparency",
            "Anti-corruption & bribery prevention",
            "Innovation & sustainable technology",
            "Board diversity & accountability"
        ]),
        framework: f[0]._id,
    },
    {
        questionText: "Please rank your top 5 most important topics in order of priority",
        questionType: "ranking-5",
        options: JSON.stringify([
            "Climate change & GHG emissions",
            "Energy use & renewable transition",
            "Biodiversity & habitat preservation",
            "Circular economy & waste management",
            "Water usage & pollution",
            "Supply chain ethics & human rights",
            "Modern slavery & fair labor",
            "Diversity, equity & inclusion",
            "Community investment & engagement",
            "Cybersecurity & data protection",
            "Product responsibility & safety",
            "Corporate governance & transparency",
            "Anti-corruption & bribery prevention",
            "Innovation & sustainable technology",
            "Board diversity & accountability"
        ]),
        framework: f[0]._id,
    },
    {
        questionText: "Which topics do you think will grow in importance over the next 3–5 years?",
        questionType: "text",
        options: null,
        framework: f[0]._id,
    },
    {
        questionText: "How well do you believe we are currently managing the following?",
        questionType: "matrix-performance",
        options: JSON.stringify([
            "Climate change & GHG emissions",
            "Energy use & renewable transition",
            "Biodiversity & habitat preservation",
            "Circular economy & waste management",
            "Water usage & pollution",
            "Supply chain ethics & human rights",
            "Modern slavery & fair labor",
            "Diversity, equity & inclusion",
            "Community investment & engagement",
            "Cybersecurity & data protection",
            "Product responsibility & safety",
            "Corporate governance & transparency",
            "Anti-corruption & bribery prevention",
            "Innovation & sustainable technology",
            "Board diversity & accountability"
        ]),
        framework: f[0]._id,
    },
    {
        questionText: "Is there anything else you’d like to share with us?",
        questionType: "text",
        options: null,
        framework: f[0]._id,
    }
]

// Erase any existing MasterQuestions
await MasterQuestion.deleteMany()
console.log('Master Questions erased.')
// Creates and saves a new Master Question to MongoDB for each document in masterQuestions
const mq = await MasterQuestion.create(masterQuestions)
console.log('Master Questions created.')


// Disconnect from DB
db.disconnect()