const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    req: 'user',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Card = mongoose.model('card', cardSchema);
