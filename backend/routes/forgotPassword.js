const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const UserAccount = require('../models/User'); // Import the model as 'UserAccount'
const createTransporter = require('../config/emailTransporter');

router.post("/", async (req, res) => {
    try {
        const email = req.body.email;
        const userAccount = await UserAccount.findOne({ email: email });

        if (!userAccount) {
            console.log("Account not found");
            return res.status(404).send("Account not found");
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 600000; // Token valid for 10 minutes

        // Update account with reset token and expiry
        await UserAccount.updateOne(
            { email: email },
            {
                $set: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: resetTokenExpiry
                }
            }
        );

        // Configure the email transporter
        const transporter = createTransporter();

        const mailOptions = {
            to: userAccount.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset-password/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);

        // Log email content if in development
        if (process.env.NODE_ENV === 'development') {
            transporter.on('data', (data) => {
                console.log('Email sent:\n', data.toString());
            });
        }

        console.log("Password reset link sent");
        res.send('Password reset link has been sent to your email');
    } catch (err) {
        console.error("Error during password reset", err);
        return res.status(500).send("An error occurred while processing the password reset.");
    }
});

module.exports = router;
