const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require('../helpers/generate-jwt')
const User = require('../models/user');

const login = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        // Verify if user exists
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "User / Password does not found (mail)"
            });
        }

        // Verify if user is active
        if (!user.status) {
            return res.status(400).json({
                message: "User / Password does not found (status)"
            });
        }

        // Verify if password matchs with DB
        const passwordBCrypt = bcryptjs.compareSync(password, user.password);

        if (!passwordBCrypt) {
            return res.status(400).json({
                message: "User / Password does not found (match password)"
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurs, please contact server admin"
        });
    }
}

module.exports = {
    login
}