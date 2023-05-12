// const {response, request} = require('express');
// const bcryptjs = require('bcryptjs');
const {Category} = require('../models/index');

const getCategories = async(req, res) => {
    const {limit = 5, since = 0} = req.query;
    const status = {status: true};

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(status),
        Category.find(status)
            .populate('user','name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);
  
    res.json({
        total,
        categories
    });
};

const getCategory = async(req, res) => {
    const {id} = req.params;
    
    const category = await Category.findById(id).populate('user','name');
  
    res.json({
        category
    });
};

const createCategory = async(req, res) => {
    const name = req.body.name.toUpperCase();
    
    const data = {
        name,
        user: req.logged._id
    }

    let category = await new Category(data);
    
    await category.save();

    category = await category.populate('user','name');
  
    res.status(201).json({
        category
    });
};

const updateCategory = async(req, res) => {
    const {id} = req.params;
    const {status, user, ...body } = req.body;
    
    body.name = body.name.toUpperCase();
    body.user = req.logged._id;

    let category = await Category.findByIdAndUpdate(id, body, {new: true})
        .populate('user','name');

    res.json({
        category
    });
};

const deleteCategory = async(req, res) => {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false}, {new:true})
        .populate('user','name');;
  
    res.json({
        category
    });
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}