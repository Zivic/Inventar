const express = require("express");
const app = express();
const router = express.Router();
const Skladiste = require("../../models/Skladiste");

router.get("/", (req, res) => {
  Skladiste.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

router.post("/dodajRadnika", (req, res) => {
  console.log("[Attempting to add korisnik]: ");
  const parsedData = JSON.parse(req.body.data);

  console.log(req.body);

  let aaa = req.body.data;
  console.log(req.body.data);
  console.log(aaa);

  // Skladiste.updateMany({_id: {$in: skladistaNiz}}, {
  //   $push: {
  //     id_korisnika_sa_dozvolom: {$each: korisniciNiz},
  //   },
  // })
  parsedData.forEach((objekat) => {
    //TODO: ovo ne radi, promeni tamo u izgledau da se salje idSkladista i niz sa novim korisnicima za svaki.
    let korisnici = parsedData.idKorisnika;
    console.log("PPPPPPPPPPPPP");
    console.log(korisnici);


    Skladiste.updateOne(
      { _id: objekat.idSkladista },
      {
        $set: {
          id_korisnika_sa_dozvolom: [...objekat.idKorisnika],
        },
        // $push: {
        //   id_korisnika_sa_dozvolom: {$each: objekat.idKorisnika},
        // },
      }
    )
      .then((data) => {
        console.log(data);
        console.log("[SUCCESS]");
        //res.json({ msg: "Updated successfully" })
      })
      .catch((err) =>{
        //res.status(400).json({ error: "Unable to update the Database" })
        
        console.error("[ERROR]")
        console.log(err)
      }
      );
  });
  res.json({ msg: "Updated successfully maybe, idk" });
});

// @route POST api/preduzeca
// @description add/save skladiste
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  Skladiste.create(parsedData.nazivIAdresa) //Koristi podObjekat da kreira inicijalno skladiste
    .then((data) => {
      Skladiste.findByIdAndUpdate(
        //vrv postoji bolji nacin
        data._id,
        {
          $push: {
            id_korisnika_sa_dozvolom: parsedData.idMenadzera,
          },
          $set: {
            id_preduzeca: parsedData.idPreduzeca,
          },
        },
        { safe: true, upsert: true },
        function (err, model) {
          console.log(err);
        }
      );
      //TODO: push id menadzera u array dozv. korisnika
      // console.log(data);
      console.log("[Success]");
      res.json({
        msg: "Added successfully",
        idSkladista: data._id,
      });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

// @route GET api/preduzeca/:id
// @description Get single skladiste by id
// @access Public
router.get("/:idPreduzeca", (req, res) => {
  Skladiste.find({ id_preduzeca: req.params.idPreduzeca })
    .then((data) => {
      // console.log("Attempting to find skladiste with: ");
      // console.log(req.params.idPreduzeca);
      // console.log(data);
      res.json(data);
    })
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/preduzeca/:id
// @description Update skladiste
// @access Public
router.put("/:id", (req, res) => {
  Skladiste.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/preduzeca/:id
// @description Delete skladiste by id
// @access Public
router.delete("/:id", (req, res) => {
  Skladiste.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;
