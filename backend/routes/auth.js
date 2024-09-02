const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// POST request for user registration
router.post('/register', async (req, res) => {
    const { name, age, gender, phoneNo, email, password } = req.body;

    console.log("Registration request received with data:", req.body); // Log incoming data

    try {
        // Validate input data
        if (!name || !age || !gender || !phoneNo || !email || !password) {
            console.error('Validation failed: All fields are required'); // Log validation error
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('User already exists:', email); // Log existing user error
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            age,
            gender,
            phoneNo,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log('New user created:', newUser); // Log successful user creation

        res.status(201).json({ message: 'Registration successful', userId: newUser._id });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log error message
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
