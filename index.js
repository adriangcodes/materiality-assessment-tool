import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connect } from './db.js';
import organisation_routes from './routes/organisation_routes.js';
import user_routes from './routes/user_routes.js';
import survey_routes from './routes/survey_routes.js';



const app = express();
const port = 8080;


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(organisation_routes);
app.use(user_routes);
app.use(survey_routes);


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