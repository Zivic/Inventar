const mongoose = require('mongoose');

const PreduzeceSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  grad: {
    type: String,
    required: true
  },
  adresa: {
    type: String,
    required: true
  },
  id_menadzera: {
    type: mongoose.Schema.Types.ObjectId,
  },
  id_radnika: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  id_skladista: {
    type: [mongoose.Schema.Types.ObjectId]
  }

},{timestamps: true});

module.exports = Preduzece = mongoose.model('preduzece', PreduzeceSchema);