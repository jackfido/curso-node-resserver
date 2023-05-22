const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidator, validateFile4Upload} = require('../middlewares')
const {uploadFile,uploadImage, showImage, uploadImageCloudinary} = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/db-validators');

const router = Router();

router.post('/', validateFile4Upload, uploadFile);

router.put('/:collection/:id',[
    validateFile4Upload,
    check('id','Not valid value for id').isMongoId(),
    check('collection').custom(
        c => allowedCollections(c, ['users','products'])
    ),
    fieldValidator
], uploadImageCloudinary);
//], uploadImage);

router.get('/:collection/:id',[
    check('id','Not valid value for id').isMongoId(),
    check('collection').custom(
        c => allowedCollections(c, ['users','products'])
    ),
    fieldValidator
], showImage)

module.exports = router;