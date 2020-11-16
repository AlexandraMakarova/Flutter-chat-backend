const { response } = require('express');
const User = require('../models/user');

const getUsers = async ( request, response = response ) => {

    const from = Number( request.query.from ) || 0;

    const users = await User
        .find({ _id: { $ne: request.userId } })
        .sort('-online')
        .skip(from)
        .limit(20)
    
    response.json({
        ok: true,
        users,
    })
}



module.exports = {
    getUsers
}