// routes/emergencyContact.js

const express = require("express");
const router = express.Router();
const EmergencyContact = require("../models/EmergencyContact");
const Joi = require("joi");

// Schema for validation
const contactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    relationship: Joi.string().min(2).required(),
    phone: Joi.string().min(10).required(),
    email: Joi.string().email().required()
});

// POST route to add a new emergency contact
router.post("/", async (req, res) => {
    // Validate the incoming data
    const { error, value } = contactSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Create a new Emergency Contact record
        const emergencyContact = new EmergencyContact(value);

        // Save the document to the database
        await emergencyContact.save();

        res.status(201).json({ message: "Emergency contact added successfully", data: emergencyContact });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// GET route to retrieve all emergency contacts
router.get("/", async (req, res) => {
    try {
        const contacts = await EmergencyContact.find();
        res.status(200).json({ data: contacts });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
