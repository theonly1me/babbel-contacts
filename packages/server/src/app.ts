/**
 * @module Express
 * This module contains the Express RequestListener
 */
/* external dependencies */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';

/* developer modules */
import ContactsRouter from './routes/ContactsRouter.js';
import HealthRouter from './routes/HealthRouter.js';
import { authenticateUser } from './policies/authenticateUser.js';

dotenv.config();

const app = express();

/* middleware */
// adding security headers
app.use(helmet());

// configure cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
  })
);

// logging
app.use(morgan('combined'));

app.use(express.json());

// health check router, no auth required
app.use(HealthRouter);

// routes & policies / custom middleware
app.use(authenticateUser);

app.use(ContactsRouter);

export default app;
