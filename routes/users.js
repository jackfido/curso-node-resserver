const {Router} = require('express');
const {check} = require('express-validator');
const {usersGet, usersPut, usersPost, usersDelete} = require('../controllers/users');
/*const {fieldValidator} = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdmin, allowedRoles } = require('../middlewares/role-validator');*/
const {fieldValidator, validateJWT/*, isAdmin*/, allowedRoles} = require('../middlewares')
const { isValidRole, existsEmail, existsUserById } = require('../helpers/db-validators');

const router = Router();
router.get('/', usersGet);

router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email','eMail field is not a valid email address').isEmail(),
    check('email').custom(existsEmail),
    check('password','Password is required, it must have more than 6 characters').isLength({min:6}),
    // check('role','Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    fieldValidator
],
usersPost);

router.put('/:id', [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    fieldValidator
],
usersPut);

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    allowedRoles('ADMIN_ROLE','SALES_ROLE'),
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsUserById),
    fieldValidator
],
usersDelete);

// router.patch('/', usersPatch);

module.exports = router;