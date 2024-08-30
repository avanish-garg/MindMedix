const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const mongoose = require("mongoose"); //mongoose ko import kra hai 

const app = express();
app.use(bodyParser.json()); //to handle the jsaon request 

const selfAssessmentRoute = require("./routes/selfAssessment");
const emergencyContactRoute = require("./routes/emergencyContact"); //import kra hai emergency contact route

app.use("/api/self-assessment", selfAssessmentRoute);
app.use("/api/emergency-contact", emergencyContactRoute); //use the emergency contact route


const PORT = process.env.PORT || 50009;

//Mongoo DBConnection
const start = async() => {
    try {
        await mongoose.connect("mongodb+srv://aastharathi0404:kavitarathi29@cluster0.bciml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            serverSelectionTimeoutMS: 5000, //increse timeout
            });
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log("${PORT} Server is Working");
        });
    }catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};

app.get("/" , (req, res) => {
    res.send("Mental Health Self-Assessment API is Running");
});

start();
