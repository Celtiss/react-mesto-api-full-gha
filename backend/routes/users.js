const Router = require('express').Router();
const {
  Joi, Segments, celebrate,
} = require('celebrate');
const { default: mongoose } = require('mongoose');
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const { BadReqError } = require('../errors/BadReqError');
const patternUrl = require('../regex');

Router.get('/', getUsers);
Router.get('/me', getCurrentUser);
Router.get('/:userId', celebrate({
  [Segments.PARAMS]: {
    userId: Joi.required().custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
}), getUserById);
Router.patch('/me', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },

}), updateUserInfo);
Router.patch('/me/avatar', celebrate({
  [Segments.BODY]: {
    avatar: Joi.string().required().regex(patternUrl),
  },
}), updateUserAvatar);

module.exports = Router;
