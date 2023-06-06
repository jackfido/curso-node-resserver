const dbValidator = require('./db-validators');
const generateJWT = require('./generate-jwt');
const checkJWT = require('./check-jwt');
const googleVerify = require('./google-verify');
const uploadValidator = require('./uploadValidator');

module.exports = {
    ...dbValidator,
    ...generateJWT,
    ...checkJWT,
    ...googleVerify,
    ...uploadValidator   
};