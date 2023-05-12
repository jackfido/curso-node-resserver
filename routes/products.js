const {Router} = require('express');
const {check} = require('express-validator');
const {existsCategoryById,existsProductById, existsProductByName} = require('../helpers/db-validators');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { fieldValidator, validateJWT, isAdmin } = require('../middlewares');
const router = Router();

// Get - Obtener todas las productos
router.get('/', getProducts);

// Get - Obtener una producto por Id
router.get('/:id',[
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    fieldValidator
], getProduct);

// Post - Crear nueva producto - Privado - Cualquier rol
router.post('/', [
    validateJWT,
    check('name').notEmpty(),
    check('name').custom(existsProductByName),
    check('category').notEmpty(),
    check('category', 'This is not a valid id').isMongoId(),
    check('category').custom(existsCategoryById),
    fieldValidator
], createProduct);

// Put - Actualizar producto por Id - Privado - Cualquier rol
router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    check('name').custom(existsProductByName),
    fieldValidator
], updateProduct);

// Delete Eliminar una producto - Solo Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    fieldValidator
], deleteProduct);

module.exports = router; 