const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserAccount = require('../models/User'); // Import the model as 'UserAccount'


router.post("/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const newPassword = req.body.password;

        const userAccount = await UserAccount.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!userAccount) {
            console.log("Password reset token is invalid or has expired");
            return res.status(400).send("Password reset token is invalid or has expired");
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the account's password and clear the reset token
        await UserAccount.updateOne(
            { email: userAccount.email },
            {
                $set: {
                    password: hashedPassword
                },
                $unset: {
                    resetPasswordToken: "",
                    resetPasswordExpires: ""
                }
            }
        );

        console.log("Password has been updated");
        res.send('Your password has been successfully updated');
    } catch (err) {
        console.error("Error during password reset", err);
        return res.status(500).send("An error occurred while resetting the password.");
    }
});

module.exports = router;
