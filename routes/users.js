const {Router} = require('express');
const router = Router();
const {usersGet, usersPut, usersPost, usersDelete, usersPatch} = require('../controllers/users')

router.get('/', usersGet);

router.post('/', usersPost);

router.put('/:userId', usersPut);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;