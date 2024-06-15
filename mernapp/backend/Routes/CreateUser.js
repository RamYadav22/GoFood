const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "MyNameEndToEndYouTubeChannel$#";

// Login Route
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);
        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Create User Route
router.post("/createuser", [
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, password, location, email } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, password: hashedPassword, location, email });
        await user.save();

        // Automatically login user after successful registration
        const payload = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);
        res.status(201).json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
