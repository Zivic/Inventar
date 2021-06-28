const mongoose = require('mongoose');

const ProizvodSchema = new mongoose.Schema({
  id_preduzeca:{
    type: mongoose.Types.ObjectId,
    required: true
  },
  naziv: {
    type: String,
    required: true,
    unique: true
  },
  cena: {
    type: Number,
    required: true
  },
  kolicina: {
    type: Number,
    required: true
  },
  kategorija: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    default: ''
  },
  atributi: [{
        ime: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
      }
  ],
  slike: [{
    type: Object,
    default: null
  }],
  kriticnaKolicina: {
    type: Number,
  },

},{timestamps: true});

module.exports = Proizvod = mongoose.model('proizvod', ProizvodSchema);