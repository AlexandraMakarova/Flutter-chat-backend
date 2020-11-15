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

module.exports = {
    generateJWT
}