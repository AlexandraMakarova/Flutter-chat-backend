const { response } = require('express');
const bcrypt = require('bcryptjs');

const { exists } = require('../models/user');
const User  = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const createUser =  async (request, response = response) => {

    const { email, password } = request.body;

    try{
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return response.status(400).json({
                ok: false,
                msg: 'No valid credential'
            });
        }

        const user = new User(request.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        const token = await generateJWT(user.id);
    
        response.json({
            ok: true,
            user,
            token
        });

    } catch(error){
        console.log(error)
        response.status(500).json(
            {
                ok: false,
                msg: 'Talk to admin'
            }
        );
    }
}

const login =  async (request, response = response) => {

    const { email, password } = request.body;

    try{
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return response.status(404).json({
                ok: false,
                msg: 'Wrong credentials'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password )
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Wrong credentials'
            });
        }
        
        const token = await generateJWT(userDB.id);
    
        response.json({
            ok: true,
            user: userDB,
            token
        });

    } catch(error){
        console.log(error)
        response.status(500).json(
            {
                ok: false,
                msg: 'Talk to admin'
            }
        );
    }
}

const renewToken = async( request, response = response) => {

    const userId = request.userId;
    const token = await generateJWT( userId );
    const user = await User.findById( userId );

    response.json({
        ok: true,
        user,
        token
    });

}

module.exports = {
    createUser, 
    login, 
    renewToken,
}