/**
 * server.js
 * 
 * Entry point for the Wishlist backend.
 * Connects to MongoDB and starts the Express server.
 */

const mongoose = require('mongoose');
const app = require('./app');

// Load environment variables from .env.
require('dotenv').config();

/**
 * Connect to MongoDB using connection string from environment variables.
 * On successful connection, start the Express server.
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Get port from environment variables.
    const PORT = process.env.PORT;
    // Start express server.
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    // Log connection errors.
    console.error('MongoDB connection error:', err);
  });