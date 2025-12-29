/**
 * app.js
 * 
 * Main Express application setup for the Wishlist API.
 * Configures middleware, CORS, and routes.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const wishlistRoutes = require('./routes/wishlistRoutes')

/**
 * Enable CORS for all origins.
 * Allows requests from any domain.
 */
app.use(cors());

/**
 * Parse incoming JSON requests.
 * Makes `req.body` contain parsed JSON objects.
 */
app.use(express.json());          

/**
 * Mount wishlist API routes.
 * All routes defined in wishlistRoutes will be prefixed with /wishlist.
 * Example: GET /wishlist, POST /wishlist, etc.
 */
app.use('/wishlist', wishlistRoutes);

module.exports = app;