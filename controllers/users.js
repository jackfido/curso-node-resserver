const {response} = require('express');

const usersGet = (req, res = response) => {
    const query = req.query;

    res.json({
        message: 'GET API CTRLR',
        query
    });
};

const usersPost = (req, res) => {
    const {name, age} = req.body;

    res.json({
        message:'POST API CTRLR',
        name,
        age
    });
};

const usersPut = (req, res) => {
    const id = req.params.userId;

    res.json({
        message:'PUT API CTRLR',
        id
    });
};

const usersDelete = (req, res) => {
    res.json({
        message:'DELETE API CTRLR'
    });
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