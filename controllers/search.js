const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const {Category, Product, User} = require('../models')
const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
];

const searchCategories = async(keyTerm = '', res = response) => {
    if (isValidObjectId(keyTerm)) {
        const category = await Category.findById(keyTerm);

        return res.json({
            results: (category)? [category]: []
        });
    }

    const regex = new RegExp(keyTerm, 'i');
    const categories = await Category.find({
        $and: [{name: regex},{status: true}]
    }).populate('user','name');

    return res.json({total: categories.length, results: categories });
};

const searchProducts = async(keyTerm = '', res = response) => {
    if (isValidObjectId(keyTerm)) {
        const product = await Product.findById(keyTerm);

        return res.json({
            results: (product)? [product]: []
        });
    }

    const regex = new RegExp(keyTerm, 'i');
    const products = await Product.find({
        name: regex, status: true
    }).populate('category','name').populate('user','name');

    return res.json({total: products.length, results: products });
};

const searchUsers = async(keyTerm = '', res = response) => {
    if (isValidObjectId(keyTerm)) {
        const user = await User.findById(keyTerm);

        return res.json({
            results: (user)? [user]: []
        });
    }

    const regex = new RegExp(keyTerm, 'i');
    const users = await User.find({
        $or:[{
            name: regex
        }
        ,{
            email: regex
        }],
        $and: [{status: true}]
    });

    return res.json({total: users.length, results: users });
};

const search = (req = request, res = response) => {
    const {collection, keyTerm} = req.params;
    //console.log('collection', collection);
    //console.log('keyTerm', keyTerm);

    if (!allowedCollections.includes(collection)) {
        return res.status(404).json({
            error: `Allowed collections are ${allowedCollections}`
        });
    }

    switch (collection) {
        case 'categories':
            searchCategories(keyTerm, res);

            break;
        case 'products':
            searchProducts(keyTerm, res);

            break;
        case 'users':
            searchUsers(keyTerm, res);

            break;
        default:
            res.status(500).json({
                message: 'Collections does not available'
            });

            break;
    }
};

module.exports = {
    search
};