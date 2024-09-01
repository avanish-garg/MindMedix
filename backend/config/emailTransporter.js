// config/emailTransporter.js
const nodemailer = require("nodemailer");

module.exports = () => {
    if (process.env.NODE_ENV === 'development') {
        return nodemailer.createTransport({
            streamTransport: true,
            newline: 'unix',
            buffer: true
        });
    } else {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }
};
