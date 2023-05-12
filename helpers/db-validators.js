const Role = require('../models/role');
const User = require('../models/user')
const Category = require('../models/category');
const { Product } = require('../models');

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

const existsCategoryByName = async(name) => {
    name = name.toUpperCase();

    const categoryExists = await Category.findOne({name});

    if(categoryExists) {
        throw new Error(`Name: ${name} already exists`)
    }
};

const existsCategoryById = async(id) => {
    const categoryExists = await Category.findById(id);

    if(!categoryExists) {
        throw new Error(`id: ${id} does not exists`)
    }

    if (categoryExists.status === false) {
        throw new Error(`id: ${id} inactive`)
    }
};

const existsProductByName = async(name) => {
    if (name === undefined) {
        return;
    }

    name = name.toUpperCase();

    const productExists = await Product.findOne({name});
    
    if(productExists) {
        throw new Error(`Name: ${name} already exists`)
    }
};

const existsProductById = async(id) => {
    const productExists = await Product.findById(id);

    if(!productExists) {
        throw new Error(`id: ${id} does not exists`)
    }

    if (productExists.status === false) {
        throw new Error(`id: ${id} inactive`)
    }
};

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById,
    existsCategoryById,
    existsCategoryByName,
    existsProductById,
    existsProductByName
}