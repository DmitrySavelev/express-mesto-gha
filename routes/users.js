const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
} = require('../controllers/users-controllers');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/users', createUser);

module.exports = router;
