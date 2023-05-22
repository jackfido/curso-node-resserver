const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const uploadValidator = (files, validExt = ['jpg','png','jpeg','gif','svg'], folder = '') => {
    return new Promise((resolve, reject) => {
        const {archive} = files;  
        const shortName = archive.name.split('.');
        const ext = shortName[shortName.length -1];
        
        if (!validExt.includes(ext)) {
            reject(`Extension '${ext}' not allowed, it must be one of: ${validExt} `);
        }
        
        const tmpFileName = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tmpFileName);
        
        archive.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }
        
            resolve(tmpFileName);
        });
    });
};

module.exports = {
    uploadValidator
};