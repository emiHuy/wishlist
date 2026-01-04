/**
 * wishlistItem.js
 * 
 * Defines the Mongoose schema and model for Wishlist items.
 * Each item includes a title, description, price, and URL.
 * Timestamps (createdAt, updatedAt) are automatically added.
 */

// define user in wishlist item

const mongoose = require('mongoose')

// Define schema for wishlist item.
const WishlistItemSchema = new mongoose.Schema({
    // Title of item (required).
    title: {
        type: String, 
        required: true, 
        trim: true
    },
    // Description of item (optional).
    description: {
        type: String, 
        trim: true
    },
    // Price of item (optional).
    price: {
        type: Number, 
        min: 0
    },
    // URL of item (optional).
    url: {
        type: String
    }    
}, {timestamps: true});

// Export modell for use in other parts of backend.
module.exports = mongoose.model('WishlistItem', WishlistItemSchema)