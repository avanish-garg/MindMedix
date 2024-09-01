const express = require("express");
const router = express.Router();
const SelfAssessment = require("../models/selfAssessmentModel");
const Joi = require("joi");

// Define the schema for validation
const assessmentSchema = Joi.object({
    username: Joi.string().min(3).required(),
    age: Joi.number().min(1).required(),
    gender: Joi.string().valid("male", "female").required(),
    symptoms: Joi.array().items(Joi.string()).min(3).required(),
    moodLevel: Joi.number().min(1).max(5).required(),
});

// GET route to check if the API route is working
router.get("/", (req, res) => {
    res.send("Self-Assessment API route is working");
});

// POST route to submit self-assessment data
router.post("/", async (req, res) => {
    const { error, value } = assessmentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const selfAssessment = new SelfAssessment(value);
        await selfAssessment.save();
        await findAndCreateMatches(value.symptoms, selfAssessment._id);
        res.status(201).json({ message: "Self-assessment submitted successfully", data: selfAssessment });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Function to find and create matches
async function findAndCreateMatches(symptoms, newUserId) {
    try {
        const matchingUsers = await SelfAssessment.find({
            symptoms: { $in: symptoms },
            _id: { $ne: newUserId }
        });

        for (const user of matchingUsers) {
            // Implement your match creation logic here
            console.log(`Matched ${newUserId} with ${user._id}`);
        }
    } catch (error) {
        console.error('Error finding matches:', error);
    }
}

module.exports = router;
