/**
 * @module HealthRouter
 * The router module for health check routes
 */
/* external dependencies */
import express from 'express';

/* developer modules */
import { knockknock } from '../controllers/HealthController.js';

const router = express.Router();

router.get('/knockknock', knockknock);

export default router;
