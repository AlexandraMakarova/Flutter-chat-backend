/*
api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fields_validator');
const { validateJWT } = require('../middlewares/jwt_validator');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidator
], createUser);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], login);

router.get('/', validateJWT, renewToken);

module.exports = router;