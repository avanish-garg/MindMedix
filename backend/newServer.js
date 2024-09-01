// Load environment variables
require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const progressRoutes = require('./routes/progress');
const moodRoutes = require('./routes/mood');
const authRoutes = require('./routes/auth'); // Added auth routes
const predictRoutes = require('./routes/predict'); // Added predict routes
const forgotPasswordRoutes = require('./routes/forgotPassword');
const resetPasswordRoutes = require('./routes/resetPassword');
const selfAssessmentRoute = require("./routes/selfAssessment");
const emergencyContactRoute = require("./routes/emergencyContact");
const matchRoutes = require('./routes/match');
const cors = require('cors');
//const videoCallRoutes = require('./routes/videoCallRoutes');

// Use Routes

app.use('/api/progress', progressRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/auth', authRoutes);        // Authentication routes
app.use('/api/predict', predictRoutes);  // Prediction routes
app.use('/api/tips', require('./routes/tips'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api', require('./routes/chatbotRoutes'));
app.use('/forgot-password', forgotPasswordRoutes);
app.use('/reset-password', resetPasswordRoutes);
app.use('/api/self-assessment', selfAssessmentRoute); // Self-Assessment route
app.use('/api/emergency-contact', emergencyContactRoute); // Emergency Contact route
app.use('/api/match', matchRoutes); // Matching routes

//app.use('/api/video', videoCallRoutes); // Video call routes

// MongoDB Connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL", {
            serverSelectionTimeoutMS: 5000, // Increase timeout
        });
        console.log("Connected to MongoDB");

        // Server and Socket.io Setup
        const server = http.createServer(app);
        const io = socketio(server);

        io.on('connection', (socket) => {
            console.log('New user connected');

            // Joining a chat room based on matchId
            socket.on('joinRoom', ({ userId, matchId }) => {
                socket.join(matchId);
                socket.userId = userId;  // Store the user ID in the socket object
                console.log(`User ${userId} joined room ${matchId}`);
            });

            // Handling chat messages
            socket.on('chatMessage', async ({ matchId, senderId, message }) => {
                console.log(`Received chat message: matchId=${matchId}, senderId=${senderId}, message=${message}`);

                const chatMessage = new Chat({
                    matchId,
                    sender: senderId,
                    message
                });

                try {
                    await chatMessage.save();
                    console.log(`Message saved: ${message}`);
                    io.to(matchId).emit('message', {
                        senderId,
                        message,
                        timestamp: chatMessage.timestamp
                    });
                } catch (error) {
                    console.error('Error saving chat message:', error.message);
                }
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });

        // Start the Server
        const PORT = process.env.PORT || 50009;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Root Route
app.get("/", (req, res) => {
    res.send("Mental Health Self-Assessment API is Running");
});

// Start the server and connect to the database
start();
