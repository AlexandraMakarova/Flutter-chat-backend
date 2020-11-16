
const Message = require('../models/message');

const getChat = async(request, response) => {

    const myId = request.userId;
    const messagesFrom = request.params.from;

    const last30 = await Message.find({
        $or: [{ from: myId, to: messagesFrom }, { from: messagesFrom, to: myId }]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    response.json({
        ok: true,
        messages: last30
    })
}

module.exports = {
    getChat
}