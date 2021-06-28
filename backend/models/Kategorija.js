const mongoose = require("mongoose");

const KategorijaSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: true,
      unique: true,
    },
    atributi: [
      {
        ime: {
          type: String,
          required: true,
        },
        vrednosti: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = Kategorija = mongoose.model("kategorija", KategorijaSchema);
