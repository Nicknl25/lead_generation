const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Create a User
router.post('/add', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a User by Email
router.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;
        
        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
