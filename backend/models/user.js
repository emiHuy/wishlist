/**
 * User.js
 * 
 * Defines the Mongoose schema and model for users.
 * Each user has an email and a hashed password.
 * Passwords are automatically hashed before saving.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema for user.
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

// Middleware: Hash password before saving user info.
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    // Generate random salt for hashing.
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt.
    this.password = await bcrypt.hash(this.password, salt);
    // Save user info with hashed password.
    next();
});

// Compare password for login.
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
