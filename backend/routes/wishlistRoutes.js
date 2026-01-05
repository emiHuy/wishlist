/**
 * wishlistRoutes.js
 * 
 * Defines API routes for Wishlist items.
 * Supports CRUD operations: Create, Read, Update, Delete.
 * 
 * Error Codes:
 * 200 OK => Success.
 * 201 Created => Resource created.
 * 400 Bad Request => Client sent invalid data.
 * 404 Not Found => Resource not found.
 * 500 Internal Server Error => Unexpected server error.
 */

/**
 * @typedef {Object} WishlistItem
 * @property {string} title - Required.
 * @property {string} [description]
 * @property {number} [price]
 * @property {string} [url]
 */

const express = require('express');
router = express.Router();
const WishlistItem = require('../models/WishlistItem');
const { protect } = require('../middleware/auth');

/**
 * POST /wishlist
 * Create new wishlist item.
 * @param {Object} req.body - Wishlist item data.
 * @returns {WishlistItem} - Created wishlist item.
 */
router.post('/', protect, async (req, res) => {
  try {
    const newItem = new WishlistItem({
      ...req.body,
      user: req.user._id,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message }); // Bad request (validation fails).
  }
});

/**
 * GET /wishlist
 * Fetch all wishlist items.
 * @returns {Array<WishlistItem>} - Array of wishlist items.
 */
router.get('/', protect, async (req, res) => {
    try {
        const items = await WishlistItem.find({ user: req.user._id });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

/**
 * GET /wishlist/:id
 * Fetch single wishlist item by ID.
 * @param {string} req.params.id - Wishlist item ID.
 * @returns {WishlistItem} - Wishlist item.
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const item = await WishlistItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

/**
 * PUT /wishlist/:id
 * Update existing wishlist item by ID.
 * @param {string} req.params.id - Wishlist item ID.
 * @param {Object} req.body - Updated data.
 * @returns {WishlistItem} - Updated wishlist item.
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await WishlistItem.findById(
      req.params.id,
    );
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    // Update fields.
    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /wishlist/:id
 * Delete wishlist item by ID.
 * @param {string} req.params.id - Wishlist item ID.
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedItem = await WishlistItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json({ message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;