const { mongoose } = require('mongoose');
const Card = require('../models/card');

const { BadReqError } = require('../errors/BadReqError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { NotFoundError } = require('../errors/NotFoundError');

const CREATED_CODE = 200;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((data) => {
      data.populate(['owner', 'likes'])
        .then((card) => {
          res.status(CREATED_CODE).send({
            name: card.name,
            link: card.link,
            owner: card.owner,
            likes: card.likes,
            createdAt: card.createdAt,
            _id: card._id,
          });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Введены некорректные данные при создании новой карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new BadReqError(`Введены некорректные данные при удалении карточки с данным ID: ${cardId}`));
  }
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(`Карточка с данным id не найдена:  ${cardId}`);
    })
    .then((card) => {
      if (String(card.owner._id) === req.user._id) {
        Card.findByIdAndDelete(cardId)
          .orFail(() => {
            throw new NotFoundError(`Карточка с данным id не найдена:  ${cardId}`);
          })
          .then(() => res.send({ message: 'Карточка успешко удалена' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
    })
    .catch(next);
  return 0;
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.params.cardId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadReqError(`Введены некорректные данные при поиске пользователя с данным ID: ${userId}`));
  }
  Card.findByIdAndUpdate(
    userId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw (new NotFoundError(`Карточка с данным id не найдена:  ${userId}`));
    })
    .then((data) => {
      data.populate(['owner', 'likes'])
        .then((card) => res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          createdAt: card.createdAt,
          _id: card._id,
        }));
    })
    .catch(next);
  return 0;
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.params.cardId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadReqError(`Введены некорректные данные при поиске пользователя с данным ID: ${userId}`));
  }
  Card.findByIdAndUpdate(
    userId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw (new NotFoundError(`Карточка с данным id не найдена:  ${userId}`));
    })
    .then((data) => {
      data.populate(['owner', 'likes'])
        .then((card) => res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          createdAt: card.createdAt,
          _id: card._id,
        }));
    })
    .catch(next);
  return 0;
};
