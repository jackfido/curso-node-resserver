const fieldValidator = require('../middlewares/field-validator');
const validateJWT = require('../middlewares/validate-jwt');
const roleValidator = require('../middlewares/role-validator');
const validateFile4Upload = require('../middlewares/file-validator')

module.exports = {
    ...fieldValidator,
    ...validateJWT,
    ...roleValidator,
    ...validateFile4Upload
};