const {Router} = require('express');
const {login} = require('../controllers/auth');
const { check } = require('express-validator');
const {fieldValidator} = require('../middlewares/field-validator')

const router = Router();

router.post('/login', [
    check('email','eMail is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    fieldValidator
],login);

module.exports = router;