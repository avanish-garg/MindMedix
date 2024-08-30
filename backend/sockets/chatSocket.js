const Chat = require('../models/chatModel');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for a user joining a chat room
        socket.on('joinRoom', ({ senderId, receiverId }) => {
            const room = [senderId, receiverId].sort().join('_');
            socket.join(room);
        });

        // Handle sending a message
        socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
            const chatMessage = new Chat({ senderId, receiverId, message });
            await chatMessage.save();

            const room = [senderId, receiverId].sort().join('_');
            io.to(room).emit('receiveMessage', chatMessage);
        });

        // Handle receiving a message
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
