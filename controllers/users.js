// const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req, res) => {
    const {limit = 5, since = 0} = req.query;
    const status = {status: true};

    
    /*
    // Se mueve a resp
    const users = await User.find(status)
        .skip(Number(since))
        .limit(Number(limit));

    const total = await User.countDocuments(status);
    */

    const [ total, users ] = await Promise.all([
        User.countDocuments(status),
        User.find(status)
            .skip(Number(since))
            .limit(Number(limit))
    ]);
  
    res.json({
        total,
        users
    });
};

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    /*// Verify is mail exists ** move to helpers
    const existsEmail = await User.findOne({email});

    if(existsEmail) {
        return res.status(400).json({
            error: "Mail already exists"
        });
    }*/

    // Encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    // Save
    await user.save();

    res.json({
        user
    });
};

const usersPut = async(req, res) => {
    const {id} = req.params;
    const {_id, password, isGoogleUser, email, ...requestBody} = req.body;

    // Validate vs DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        requestBody.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id, requestBody);

    res.json(user);
};

const usersDelete = async(req, res) => {
    const {id} = req.params;
    // const logged = req.logged;

    // console.log(uid);

    /*// Physical delete
    const user = await User.findByIdAndDelete(id)*/

    const user = await User.findByIdAndUpdate(id, {
            status: false
        });

    res.json(user);
};

const usersPatch = (req, res) => {
    res.json({
        message:'PATCH API CTRLR'
    });
};


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}