/**
 * @module ContactsRouter
 * The router module for the contacts routes
 */
/* external dependencies */
import express from 'express';

/* developer modules */
import { getOrCreateContactDetails } from '../controllers/ContactsController.js';

const router = express.Router();

router.post('/contacts', getOrCreateContactDetails);

export default router;
