const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/Chat'); // Import Chat model
require('dotenv').config();

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
const matchRoutes = require('./routes/match');
const videoCallRoutes = require('./routes/videoCallRoutes'); // Import video call routes

app.use('/api/match', matchRoutes);
app.use('/api/video', videoCallRoutes); // Set up video call routes

// Serve the chat HTML file
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

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
const PORT = process.env.PORT || 50019; 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
