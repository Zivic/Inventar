const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;



const KorisnikSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  prezime: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id_preduzeca: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  tip: {
    type: String,
    required: true,
    default: 'Radnik'
  }
},{timestamps: true});

KorisnikSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  KorisnikSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };

module.exports = Korisnik = mongoose.model('korisnik', KorisnikSchema);