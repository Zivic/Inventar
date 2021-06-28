const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    id_preduzeca: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    id_proizvoda: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    id_korisnika: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    promene: [
      {
        akcija: {
            type: String,
           // required: true,
        },
        izmenjena_stavka: {
            type: String,
            required: true,
        },
        prethodna_vrednost: {
            type: String,
            required: true,
        },
        nova_vrednost: {
            type: String,
            required: true,
        },
        // Optional:
        id_skladista: {
            type: mongoose.Schema.Types.ObjectId,
        },
        naziv_skladista: {
            type: String
        },
        naziv_atributa: {
            type: String,
        },
        naziv_kategorije: {
            type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = History = mongoose.model("history", HistorySchema);
