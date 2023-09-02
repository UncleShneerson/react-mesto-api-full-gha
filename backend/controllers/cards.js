const NotFoundError = require('../Errors/NotFoundError');
const NotEnoughRightsError = require('../Errors/NotEnoughRightsError');
const ValidationError = require('../Errors/ValidationError');

const { CREATED } = require('../utils/errorCodes');

const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardData) => res.status(CREATED).send(cardData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((card) => {
      const { _id, owner } = card;
      if (String(owner) !== req.user._id) {
        throw new NotEnoughRightsError();
      }
      Card.findByIdAndRemove(_id)
        .orFail(() => new NotFoundError('Данных c указанным id не существует'))
        .then((cardData) => {
          res.send(cardData);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((cardData) => {
      res.send(cardData);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((cardData) => {
      res.send(cardData);
    })
    .catch(next);
};
