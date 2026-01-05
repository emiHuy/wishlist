// implement verification email
// add logout.

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// CREATE user (POST). 
router.post('/signup', async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Check if user exists.
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists.'});
        }

        // Create user.
        const user = await User.create({
            email,
            name,
            password,
        });

        // Return the following.
        res.status(201).json({
            message: 'Signup successful.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// LOGIN user (POST).
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user with matching email.
        const user = await User.findOne( { email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // Check if passwords match.
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json( { message: 'Invalid credentials.'});
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET user by ID
router.get('/me', protect, async (req, res) => {
    try {
        // Find user by id and exclude the password. 
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Return user info (without password).
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE user by ID
router.delete('/me', protect, async (req, res) => {
    try {
        // Only allow logged-in user to delete their account.
        if (req.user._id.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Not authorized.' });
        }
        // Find user by ID
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Delete user.
        await user.remove();
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;