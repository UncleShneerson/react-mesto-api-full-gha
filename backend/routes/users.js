const router = require('express').Router();

const {
  getUsers,
  getUserById,
  showUserInfo,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

const { userUpdateValidate, avatarUpdateValidate, IdValidate } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me/', showUserInfo);
router.get('/:userId', IdValidate, getUserById);
router.patch('/me/', userUpdateValidate, updateProfile);
router.patch('/me/avatar', avatarUpdateValidate, updateAvatar);

module.exports = router;
