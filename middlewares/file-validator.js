const { response, request } = require("express");

const validateFile4Upload = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        console.log('No files');
        return res.status(400).json({error: 'No files to upload.'});
    }

    next();
};

module.exports = {
    validateFile4Upload
};