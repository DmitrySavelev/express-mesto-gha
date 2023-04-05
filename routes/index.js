const router = require('express').Router();

const { login, createUser } = require('../controllers/users-controllers');
const { loginValidation, registerValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);

module.exports = router;
