const fieldValidator = require('../middlewares/field-validator');
const validateJWT = require('../middlewares/validate-jwt');
const roleValidator = require('../middlewares/role-validator');

module.exports = {
    ...fieldValidator,
    ...validateJWT,
    ...roleValidator
};