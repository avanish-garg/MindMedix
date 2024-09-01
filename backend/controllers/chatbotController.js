const responses = {
    greeting: "Hello! I'm here to help you with mental health resources. How can I assist you today? Please tell me about your mood; is it happy, sad, anxious, or depressed?",
    anxious: "It's completely normal to feel anxious sometimes. Have you tried deep breathing exercises or mindfulness?",
    depressed: "I'm really sorry to hear that you're feeling this way. It's important to talk to someone who can help. Take a moment and revise all the happy memories; it will help you feel better.",
    selfHelp: "There are many self-help resources available. Would you like some recommendations?",
    default: "I'm here to listen. Please tell me more about what you're feeling.",
    happy: "I'm so glad to hear that! Happiness is a great feeling. Make sure to take a moment to enjoy it and do something nice for yourself!",
};

const chat = (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botResponse;

    // Basic keyword matching for mental health topics
    if (userMessage.includes('hi') || userMessage.includes('hello')) {
        botResponse = responses.greeting;
    } else if (userMessage.includes('anxious')) {
        botResponse = responses.anxious;
    } else if (userMessage.includes('depressed') || userMessage.includes('depression')) {
        botResponse = responses.depressed;
    } else if (userMessage.includes('help') || userMessage.includes('self-help')) {
        botResponse = responses.selfHelp;
    } else if (userMessage.includes('happy') || userMessage.includes('excellent')) {
        botResponse = responses.happy;
    } else {
        botResponse = responses.default;
    }

    res.json({ response: botResponse });
};

module.exports = {
    chat,
};
