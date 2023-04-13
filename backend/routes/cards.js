const Router = require('express').Router();
const { mongoose } = require('mongoose');
const {
  Joi, Segments, celebrate,
} = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { BadReqError } = require('../errors/BadReqError');
// const urlRegExp = new RegExp(/(^(https?:\/\/)?(www\.)?[^\/\s]+\.[^\/\s]+(\/[^\/\s]*)*#?$)/);
const pattern = require('../regex');

Router.get('/', getCards);
Router.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(pattern),
  },
}), createCard);
Router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: {
    cardId: Joi.custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
}), deleteCard);
Router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: {
    cardId: Joi.custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
}), likeCard);
Router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: {
    cardId: Joi.custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
}), dislikeCard);

module.exports = Router;
