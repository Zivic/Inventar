const mongoose = require("mongoose");

const SkladisteSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: true,
    },
    adresa: {
      type: String,
      required: true,
    },
    proizvodi: {
      type: [
        {
          id_proizvoda: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
          },
          kolicina_proizvoda: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    id_korisnika_sa_dozvolom: {
      type: [mongoose.Schema.Types.ObjectId],
      unique: true,
    },
    id_preduzeca: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = Skladiste = mongoose.model("skladiste", SkladisteSchema);
