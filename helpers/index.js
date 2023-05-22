const dbValidator = require('./db-validators');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadValidator = require('./uploadValidator');

module.exports = {
    ...dbValidator,
    ...generateJWT,
    ...googleVerify,
    ...uploadValidator   
};