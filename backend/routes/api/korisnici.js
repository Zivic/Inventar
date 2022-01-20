const express = require("express");
const app = express();
const router = express.Router();
const Korisnik = require("../../models/Korisnik");
const Preduzece = require("../../models/Preduzece");

router.get("/", (req, res) => {
  console.log('GET');
  Korisnik.find()
    .then(async (data) => {
      data.forEach((korisnik) => {

       Preduzece.findById(korisnik.id_preduzeca)
      .then((preduzece) => {
        console.log("ZZZZZZZZZZZZZZZZZ")
        console.log(preduzece)
        data.nazivPreduzeca = preduzece.naziv
        return data;
      })
      .then((ooo) => {
        console.log(ooo.nazivPreduzeca)
        res.json(ooo)
      })
      .catch((err) => {
        console.log(err)
      })
    })



    })
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route POST api/korisnici
// @description add/save korisnik, potreban je id postojeceg predizeca
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  Korisnik.create(parsedData)
    .then((data) => {
      console.log("[Success]");
      dodajKorisnikaUPreduzece(data.id_preduzeca, data._id);
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

router.post("/login", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to login with]: ");
  console.log(parsedData);

  Korisnik.findOne({ email: parsedData.email })
    .then((data) => {
      data.validatePassword(parsedData.password).then((validated) => {
        console.log(validated);
        if (validated == true) {
          console.log("[Success]");
          res.json({
            msg: "Logged in successfully",
            token: "token123",
            podaciKorisnika: {
              id: data._id,
              ime: data.ime,
              prezime: data.prezime,
              email: data.email,
              id_preduzeca: data.id_preduzeca,
              tip: data.tip,
            }
          });
        } else {
          console.log("[Error]: Password authentication failed");
          res.status(401).json({ error: "Password authentication failed" });
        }
      });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(404).json({ error: "Unable to find user for login" });
    });
});

const dodajKorisnikaUPreduzece = (idPreduzeca, idKorisnika) => {
  //Dodaje ga u niz
  console.log("Dodajem korisnika u preduzece");
  Preduzece.findByIdAndUpdate(
    { _id: idPreduzeca },
    { $push: { id_radnika: idKorisnika } },
    { safe: true, upsert: true },
    function (err, model) {
      console.log(err);
    }
  );
};

// @route GET api/korisnici/:id
// @description Get single korisnik by id
// @access Public
router.get("/:id", (req, res) => {
  Korisnik.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/korisnici/:id
// @description Update korisnik
// @access Public
router.put("/:id", (req, res) => {
  Korisnik.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/korisnici/:id
// @description Delete korisnik by id
// @access Public
router.delete("/:id", (req, res) => {
  Korisnik.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;
