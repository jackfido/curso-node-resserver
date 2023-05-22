const path = require('path');
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const {response, request} = require("express");
const {uploadValidator} = require("../helpers/uploadValidator");
const {User, Product} = require('../models');

const uploadFile = async(req, res = response) => {
    try {
        const result = await uploadValidator(req.files, undefined, 'images');
        res.json({result});
    } catch (error) {
        res.status(400).json({error});
    }
};

const uploadImage = async(req = request, res = response) => {      
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model){
                return res.status(400).json({error: `User with id: ${id} does not exists`});
            }

            break;
        case 'products':
            model = await Product.findById(id);

            if (!model){
                return res.status(400).json({error: `Product with id: ${id} does not exists`});
            }

            break;
        default:
            return res.status(500).json({error: 'TODO pending'});
    }

    // Clean previous images
    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads',collection,model.img);

        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const name = await uploadValidator(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json(model);
};

const uploadImageCloudinary = async(req = request, res = response) => {      
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model){
                return res.status(400).json({error: `User with id: ${id} does not exists`});
            }

            break;
        case 'products':
            model = await Product.findById(id);

            if (!model){
                return res.status(400).json({error: `Product with id: ${id} does not exists`});
            }

            break;
        default:
            return res.status(500).json({error: 'TODO pending'});
    }

    // Clean previous images
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archive;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;
    await model.save();

    res.json(model);
};

const showImage = async(req = request, res = response) => {
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if (!model){
                return res.status(400).json({error: `User with id: ${id} does not exists`});
            }

            break;
        case 'products':
            model = await Product.findById(id);

            if (!model){
                return res.status(400).json({error: `Product with id: ${id} does not exists`});
            }

            break;
        default:
            return res.status(500).json({error: 'TODO pending'});
    }

    // Clean previous images
    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads',collection,model.img);

        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    res.json({message: 'Placeholder does not provided'});
};

module.exports = {
    uploadFile,
    uploadImage,
    uploadImageCloudinary,
    showImage
};