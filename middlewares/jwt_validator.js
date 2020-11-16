const jwt = require('jsonwebtoken');

const validateJWT = (request, response, next) => {
    const token = request.header('x-token');

    if(!token){
        return response.status(401).json({
         ok: false,
         msg: "Where is no token in request"
        });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        request.userId = userId;
        next();
    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }
}

module.exports = {
    validateJWT
}