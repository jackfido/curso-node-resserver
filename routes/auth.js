const {Router} = require('express');
const {login, googleSignIn, tokenRenew} = require('../controllers/auth');
const {check} = require('express-validator');
const {fieldValidator, validateJWT} = require('../middlewares')

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

router.get('/', validateJWT, tokenRenew);

module.exports = router;