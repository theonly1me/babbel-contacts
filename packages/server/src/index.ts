/**
 * @module server
 * This is the entry point to the server
 */

/* built-in dependencies */
import http from 'http';
/* external dependencies */
import mongoose from 'mongoose';
/* developer modules */
import app from './app.js';

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function init() {
  await mongoose.connect(process.env.DATABASE_URL || '');

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

init();
