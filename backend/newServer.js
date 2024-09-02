// newServer.js

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors());

const routes = {
    progress: require('./routes/progress'),
    mood: require('./routes/mood'),
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
    auth: authRoutes,
};

// newServer.js - Use routes for different endpoints
app.use('/api/mood', routes.mood);
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

app.use('/api/auth', routes.auth);

// MongoDB connection setup
const start = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL";
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
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
                    const Chat = mongoose.model('Chat', new mongoose.Schema({
                        matchId: String,
                        sender: String,
                        message: String,
                        timestamp: { type: Date, default: Date.now }
                    }));

                    const chatMessage = new Chat({ matchId, sender: senderId, message });
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

start();
