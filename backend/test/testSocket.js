const io = require('socket.io-client');

// Connect to your server (replace 'http://localhost:50003' with your actual server URL if different)
const socket = io('http://localhost:50018');

socket.on('connect', () => {
    console.log('Connected to server');

    // Simulate joining a room (matchId should match the actual match ID in your database)
    const matchId = '66cdf39b97ef4eba4d2ff86d'; // Replace with actual matchId
    
    const userId = '66cddb0b450f60c0da73ef69'; // Replace with actual userId

    socket.emit('joinRoom', { userId, matchId });
    console.log(`User ${userId} joined room ${matchId}`);

    // Simulate sending a chat message
    socket.emit('chatMessage', { matchId, message: 'Hello, this is a test message!' });

    socket.on('message', (message) => {
        console.log('Received message:', message);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});
