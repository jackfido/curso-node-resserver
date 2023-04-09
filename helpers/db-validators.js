const Role = require('../models/role');
const User = require('../models/user')

const isValidRole = async(role = '') => {
    const existsRole = await Role.findOne({role});
    
    if (!existsRole) {
        throw new Error(`Role: "${role}" is not defined`);
    }
};

const existsEmail = async(email = '') => {
    const emailsExists = await User.findOne({email});

    if(emailsExists) {
        throw new Error(`eMail: ${email} already exists`)
    }
};

const existsUserById = async(id) => {
    const userExists = await User.findById(id);

    if(!userExists) {
        throw new Error(`id: ${id} does not exists`)
    }
};

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById
}