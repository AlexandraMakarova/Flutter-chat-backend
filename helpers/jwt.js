const jwt = require('jsonwebtoken');

const generateJWT = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
    
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h',
        }, (err, token ) => {
            if ( err ){
                reject("JWT wasn't created");
            } else {
                resolve(token);
            }
        })
    });
}

const checkJWT = ( token = '') => {
    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        return [true, userId];
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    checkJWT
}