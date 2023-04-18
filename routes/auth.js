const {Router} = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const { check } = require('express-validator');
const {fieldValidator} = require('../middlewares/field-validator')

const router = Router();

router.post('/login', [
    check('email','eMail is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    fieldValidator
],login);

router.post('/google', [
    check('id_token','ID Token es necesario').not().isEmpty(),
    fieldValidator
],googleSignIn);

module.exports = router;