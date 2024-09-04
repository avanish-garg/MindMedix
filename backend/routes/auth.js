const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST request for user registration
router.post('/register', async (req, res) => {
    const { username, name, email, gender, age, phoneNo, password } = req.body;

    console.log("Registration request received with data:", req.body);

    try {
        // Validate input data
        if (!username || !name || !email || !gender || !age || !phoneNo || !password) {
            console.error('Validation failed: All fields are required');
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.error('User already exists:', email, username);
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            name,
            email,
            gender,
            age,
            phoneNo,
            password: hashedPassword,
        });

        await newUser.save();

        console.log('New user created:', newUser);

        res.status(201).json({ message: 'Registration successful', userId: newUser._id });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST request for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Login request received with data:", req.body);

    try {
        // Validate input data
        if (!email || !password) {
            console.error('Validation failed: Email and password are required');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password mismatch for user:', email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful for user:', email);

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
