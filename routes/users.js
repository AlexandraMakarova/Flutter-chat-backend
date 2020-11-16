/*
api/users
*/

const { Router } = require('express');
const { getUsers } = require('../controllers/users');
const { validateJWT } = require('../middlewares/jwt_validator');

const router = Router();

router.get('/', validateJWT, getUsers);

module.exports = router;