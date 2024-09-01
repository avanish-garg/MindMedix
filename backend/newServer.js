// backend/newServer.js

require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

// newServer.js - Initialize Express
const app = express();

<<<<<<< HEAD
// Middleware to parse JSON
=======
// newServer.js - Middleware
>>>>>>> 9309d57c9df49d532e63c6874f9e813686a152b5
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

<<<<<<< HEAD
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
=======
// newServer.js - Routes
const routes = {
    progress: require('./routes/progress'),
    mood: require('./routes/mood'),
    auth: require('./routes/auth'),
    predict: require('./routes/predict'),
    tips: require('./routes/tips'),
    userRoutes: require('./routes/userRoutes'),
    feedback: require('./routes/feedbackRoutes'),
    chatbot: require('./routes/chatbotRoutes'),
    forgotPassword: require('./routes/forgotPassword'),
    resetPassword: require('./routes/resetPassword'),
    selfAssessment: require('./routes/selfAssessment'),
    emergencyContact: require('./routes/emergencyContact'),
    match: require('./routes/match'),
    // videoCall: require('./routes/videoCallRoutes') // Uncomment if needed
};

// newServer.js - Use routes for different endpoints
app.use('/api/mood', routes.mood);
app.use('/api/auth', routes.auth);
app.use('/api/predict', routes.predict);
app.use('/api/tips', routes.tips);
app.use('/api/users', routes.userRoutes);
app.use('/api/feedback', routes.feedback);
app.use('/api', routes.chatbot);
app.use('/forgot-password', routes.forgotPassword);
app.use('/reset-password', routes.resetPassword);
app.use('/api/self-assessment', routes.selfAssessment);
app.use('/api/emergency-contact', routes.emergencyContact);
app.use('/api/match', routes.match);
//app.use('/api/video', routes.videoCall); // Uncomment if needed
>>>>>>> 9309d57c9df49d532e63c6874f9e813686a152b5

// newServer.js - MongoDB Connection
const start = async () => {
    try {
<<<<<<< HEAD
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL", {
            serverSelectionTimeoutMS: 5000, // Increase timeout
=======
        const mongoUri = process.env.MONGO_URI || "mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL";
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
>>>>>>> 9309d57c9df49d532e63c6874f9e813686a152b5
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
<<<<<<< HEAD
                    await chatMessage.save();
=======
                    const Chat = mongoose.model('Chat', new mongoose.Schema({
                        matchId: String,
                        sender: String,
                        message: String,
                        timestamp: { type: Date, default: Date.now }
                    }));

                    const chatMessage = new Chat({ matchId, sender: senderId, message });
                    await chatMessage.save();

>>>>>>> 9309d57c9df49d532e63c6874f9e813686a152b5
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

// newServer.js - Root Route
app.get("/", (req, res) => {
    res.send("Mental Health Self-Assessment API is Running");
});

// newServer.js - Start the server and connect to the database
start();
