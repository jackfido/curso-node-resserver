const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res, next) => {
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            error: 'Invalid session - token invalid'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                error: 'Invalid session - user does not exists'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                error: 'Invalid session - status'
            });
        }

        req.logged = user;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            error: 'Invalid session - error'
        });
    }
};

module.exports = {
    validateJWT
};