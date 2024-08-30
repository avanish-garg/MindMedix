const Twilio = require('twilio');

// Use environment variables for credentials
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const API_KEY_SID = process.env.TWILIO_API_KEY_SID;
const API_SECRET = process.env.TWILIO_API_SECRET;

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
