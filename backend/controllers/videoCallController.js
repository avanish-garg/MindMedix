const Twilio = require('twilio');

// Hardcoded Twilio credentials
const ACCOUNT_SID = 'ACa0f90520ac0ad0eb9a4b99e9bf6bf013'; // Replace with your actual Account SID
const API_KEY_SID = 'da53a0ed8da76ec51fa2278fabfb85c3';   // Replace with your actual API Key SID
const API_SECRET = 'VXPZ8CWET26U7EEPZDZMJ919';            // Replace with your actual API Secret

const Video = Twilio.Video;

exports.videoToken = (req, res) => {
    const { room } = req.query;
    const identity = req.query.identity || 'defaultUser';

    if (!room) {
        return res.status(400).json({ error: 'Room name is required' });
    }

    // Create an Access Token
    const accessToken = new Twilio.jwt.AccessToken(ACCOUNT_SID, API_KEY_SID, API_SECRET);
    accessToken.identity = identity;

    // Create a Video grant for the token
    const videoGrant = new Twilio.jwt.AccessToken.VideoGrant({
        room: room,
    });
    accessToken.addGrant(videoGrant);

    // Serialize the token to a JWT string
    const token = accessToken.toJwt();

    res.json({ token });
};
