const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardCreateValidate, IdValidate } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardCreateValidate, createCard);
router.delete('/:cardId', IdValidate, deleteCardById);
router.put('/:cardId/likes', IdValidate, likeCard);
router.delete('/:cardId/likes', IdValidate, dislikeCard);

module.exports = router;
