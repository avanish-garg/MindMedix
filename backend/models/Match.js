const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: 'SelfAssessment', required: true },
    user2: { type: Schema.Types.ObjectId, ref: 'SelfAssessment', required: true },
    symptoms: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;
