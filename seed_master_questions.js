import db from '.db.js'

import MasterQuestion from '.models/masterQuestion.js'

// Connect to DB
db.connect

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