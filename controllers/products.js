// const {response, request} = require('express');
// const bcryptjs = require('bcryptjs');
const {Product} = require('../models');
const category = require('../models/category');

const getProducts = async(req, res) => {
    const {limit = 5, since = 0} = req.query;
    const status = {status: true};

    const [ total, products ] = await Promise.all([
        Product.countDocuments(status),
        Product.find(status)
            .populate('category','name')
            .populate('user','name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);
  
    res.json({
        total,
        products
    });
};

const getProduct = async(req, res) => {
    const {id} = req.params;
    
    const product = await Product.findById(id)
        .populate('category','name')
        .populate('user','name');
  
    res.json({
        product
    });
};

const createProduct = async(req, res) => {
    const name = req.body.name.toUpperCase();
    const category = req.body.category.toUpperCase();
    
    const data = {
        name,
        category,
        user: req.logged._id
    }

    let product = await new Product(data);
    
    await product.save();

    product = await product
        .populate('category','name');
        //.populate('user','name');

    product = await product
        //.populate('category','name')
        .populate('user','name');
  
    res.status(201).json({
        product
    });
};

const updateProduct = async(req, res) => {
    const {id} = req.params;
    const {status, user, ...body } = req.body;
    
    if (body.name !== undefined) {
        body.name = body.name.toUpperCase();
    }
    body.user = req.logged._id;

    let product = await Product.findByIdAndUpdate(id, body, {new: true})
        .populate('category','name');
        // .populate('user','name');

    product = await Product.findByIdAndUpdate(id, body, {new: true})
        //.populate('category','name')
        .populate('user','name');

    res.json({
        product
    });
};

const deleteProduct = async(req, res) => {
    const {id} = req.params;
    const product = await Product
        .findByIdAndUpdate(id, {status: false}, {new:true})
        .populate('category','name')
        .populate('user','name');;
  
    res.json({
        product
    });
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}