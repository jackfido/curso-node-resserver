const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require('../helpers/generate-jwt')
const User = require('../models/user');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token);
        // console.log(email);

        let user = await User.findOne({email});
        // console.log(user);

        if (!user) {
            // console.log('!user');
            const data = {
                name,
                email,
                password: 'douh',
                img,
                role: 'USER_ROLE',
                isGoogleUser: true
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            // console.log('!user.status');
            res.status(401).json({
                status: 'User blocked, please contact with admin',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            error: "Invalid token"
        });
    }
};

module.exports = {
    login,
    googleSignIn
}