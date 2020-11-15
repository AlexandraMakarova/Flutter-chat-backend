const { validationResult } = require("express-validator");

const fieldsValidator = (request, response, next) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
        return response.status(400).json({
         ok: false,
         msg: errors.mapped()
        });
    }

    next();
}

module.exports = {
    fieldsValidator
}