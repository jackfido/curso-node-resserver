const {Router} = require('express');
const {check} = require('express-validator');
const {existsCategoryById, existsCategoryByName} = require('../helpers/db-validators');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { fieldValidator, validateJWT, isAdmin } = require('../middlewares');
const router = Router();

// Get - Obtener todas las categorias
router.get('/', getCategories);

// Get - Obtener una categoria por Id
router.get('/:id',[
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    fieldValidator
], getCategory);

// Post - Crear nueva categoria - Privado - Cualquier rol
router.post('/', [
    validateJWT,
    check('name').notEmpty(),
    check('name').custom(existsCategoryByName),
    fieldValidator
], createCategory);

// Put - Actualizar categoria por Id - Privado - Cualquier rol
router.put('/:id', [
    validateJWT,
    check('name').notEmpty(),
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    check('name').custom(existsCategoryByName),
    fieldValidator
], updateCategory);

// Delete Eliminar una categoria - Solo Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    fieldValidator
], deleteCategory);

module.exports = router; 