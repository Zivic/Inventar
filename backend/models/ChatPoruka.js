const mongoose = require("mongoose");

const ChatPorukaSchema = new mongoose.Schema(
  {
    id_preduzeca:{
      type: String,
      required: true,
    },
    id_korisnika: {
      type: String,
      required: true,
    },
    ime_korisnika: {
      type: String,
      required: true,
    },
    poruka: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = ChatPoruka = mongoose.model("chatPoruka", ChatPorukaSchema);
