import db from "./db.js";
import Organisation from "./models/organisation.js";


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

// Disconnect from DB
db.disconnect()