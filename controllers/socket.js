const User = require('../models/user');
const Message = require('../models/message');

const userConnected = async ( userId = '' ) => {

    const user  = await User.findById( userId );
    user.online = true;
    await user.save();
    return user;
}

const userDisconnected = async ( userId = '' ) => {
    const user  = await User.findById( userId );
    user.online = false;
    await user.save();
    return user;
}

const saveMessage = async( payload ) => {

    try {
        const message = new Message( payload );
        await message.save();

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}


