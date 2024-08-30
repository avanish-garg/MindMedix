// models/EmergencyContact.js

const mongoose = require("mongoose");

// Emergency Contact Schema
const EmergencyContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model creation
const EmergencyContact = mongoose.model("EmergencyContact", EmergencyContactSchema);

module.exports = EmergencyContact;
