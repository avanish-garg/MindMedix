const io = require('socket.io-client');
require('dotenv').config();

// Connect to Socket.io server
const socket = io('http://localhost:50013'); // Ensure this matches your server URL and port

socket.on('connect', () => {
    console.log('Connected to server');

    // Join a room with sample userId and matchId
    socket.emit('joinRoom', { userId: 'testUserId', matchId: 'testMatchId' });

    // Send a chat message
    socket.emit('chatMessage', {
        matchId: '66cdf39b97ef4eba4d2ff86d', // Ensure this is a valid matchId
        senderId: '66cddb0b450f60c0da73ef69', // Ensure this is a valid senderId
        message: 'Hello, this is a test message!'
    });
});

// Receive messages
socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

