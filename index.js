import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connect } from './db.js';
import organisation_routes from './routes/organisation_routes.js';
import user_routes from './routes/user_routes.js';
import survey_routes from './routes/survey_routes.js';
import framework_routes from './routes/framework_routes.js';
import master_question_routes from './routes/master_question_routes.js'
import survey_question_routes from './routes/survey_question_routes.js'
import respondent_routes from './routes/respondent_routes.js';
import response_routes from './routes/response_routes.js'



const app = express();
const port = 8080;

const allowedOrigins = ['http://localhost:5173', 'https://materialityassessmenttool.netlify.app/']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(organisation_routes);
app.use(user_routes);
app.use(survey_routes);
app.use(framework_routes);
app.use(master_question_routes)
app.use(survey_question_routes)
app.use(respondent_routes)
app.use(response_routes)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server Error'
        : err.message;
    return res.status(status).json({ error: message });
});

app.listen(port, async () => {
    console.log(`Back-end is listening on port ${port}`);
    connect();
});