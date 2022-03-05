const express = require("express");
const app = express();
const router = express.Router();
const Proizvod = require("../../models/Proizvod");
const Skladiste = require("../../models/Skladiste");
const History = require("../../models/History");

router.get("/", (req, res) => {
  Proizvod.find()
    .then((proizvod) => res.json(proizvod))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// router.post('/', (req, res) => {
//     console.log("POST REQUEST")
//     console.log(JSON.parse(req.body.data))
//     res.status(200).send('proizvodi POST route testing!')
// });

// @route POST api/proizvodi
// @description add/save proizvod
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);
  const copyOfParsedData = [...parsedData.kolicina];

  const kolicine = parsedData.kolicina; //ARRAY
  parsedData.kolicina = kolicine.reduce((acc, cur) => {
    return acc + parseInt(cur.kolicina);
  }, 0);

  Proizvod.create(parsedData)
    .then((proizvod) => {
      //
      copyOfParsedData.forEach((kolicinaObjekat) => {
        //skladiste sa id ovoga
        Skladiste.findByIdAndUpdate(kolicinaObjekat.id_skladista, {
          $push: {
            proizvodi: {
              id_proizvoda: proizvod._id,
              kolicina_proizvoda: kolicinaObjekat.kolicina,
            },
          },
        }).catch((err) => {
          Proizvod.findByIdAndDelete(proizvod._id).catch((err) => {
            console.log("[Error]: " + err);
            res.status(400).json({ error: "Unable to delete this item" });
          });

          console.log("[Error]: " + err);
          res.status(400).json({ error: "Unable to add this item" });
        });
      });
      console.log(proizvod._id);

      console.log("[Success]");
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

// @route PATCH api/proizvodi
// @description edit existing proizvod
// @access Public
router.patch("/", (req, res) => {
  const parsedCombinedData = JSON.parse(req.body.data);
  const parsedData = parsedCombinedData.data;
  const promene = parsedCombinedData.promene; //za history kasnije
  const idPreduzeca = parsedCombinedData.idPreduzeca;
  const idKorisnika = parsedCombinedData.idKorisnika;

  console.log("[Attempting to edit item with new values]: ");
  console.log(parsedData);
  const copyOfParsedData = [...parsedData.kolicina];

  const kolicine = parsedData.kolicina; //ARRAY
  parsedData.kolicina = kolicine.reduce((acc, cur) => {
    return acc + parseInt(cur.kolicina);
  }, 0);

  const idProizvoda = parsedData.idProizvoda;
  delete parsedData.idProizvoda;
  console.log("{ID PROIZVODA}: " + idProizvoda);
  Proizvod.findOneAndUpdate({_id: idProizvoda}, parsedData)
    .then((proizvod) => {
      //
      copyOfParsedData.forEach((kolicinaObjekat) => {
        //skladiste sa id ovoga
        Skladiste.findOneAndUpdate(
          {
            _id: kolicinaObjekat.id_skladista,
            proizvodi: { $elemMatch: { id_proizvoda: idProizvoda } },
          },
          {
            $set: {
              "proizvodi.$.kolicina_proizvoda": kolicinaObjekat.kolicina,
            },
          }
        ).catch((err) => {
          // Proizvod.findByIdAndDelete(proizvod._id)
          // .catch((err) => {
          //   console.log("[Error]: " + err);
          //   res.status(400).json({ error: "Unable to delete this item" });
          // });

          console.log("[Error]: " + err);
          res.status(400).json({ error: "Unable to edit this item" });
        });
      });
      console.log(proizvod._id);
      addNewHistoryEntry(promene, idPreduzeca, idProizvoda, idKorisnika);
      console.log("[Success]");
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

const addNewHistoryEntry = (data, idpreduzeca, idproizvoda, idkorisnika) => {
  console.log("[Attempting to add new history entry: ]");
  console.log("ID Preduzeca:");
  console.log(idpreduzeca);
  console.log("ID Korisnika:");
  console.log(idkorisnika);
  console.log(data);
  const joinedObject = {
    id_preduzeca: idpreduzeca,
    id_proizvoda: idproizvoda,
    id_korisnika: idkorisnika,
    promene: data
  }

  History.create(joinedObject)
  .then((data) => {
    console.log("[Success]");
    console.log(data);
    //res.json({ msg: "Added successfully" });
  })
  .catch((err) => {
    console.error("[Error]: " + err);
    //res.status(400).json({ error: "Unable to add this item" });
  });
}
  



router.get("/alerti/:idPreduzeca", (req, res) => {
  console.log("ALERTI")
  console.log(req.params.idPreduzeca);

  let retVal = [];
  let promises = [];

  Proizvod.find({id_preduzeca: req.params.idPreduzeca})
  .then((proizvodi) => {
    proizvodi.forEach((proizvod) => {
      promises.push(new Promise((resolve,rej)=> {

  
    console.log(proizvod.naziv)
    console.log(proizvod.kriticna_kolicina || "FALSE")
    if(proizvod.kriticna_kolicina){
      console.log("ROUND")
    Skladiste.find({id_preduzeca: req.params.idPreduzeca})
    .then((skladista) => {
      skladista.forEach((skladiste) => {
      //console.log(skladiste)

      skladiste.proizvodi.forEach((proizvodUSkladistu) => {
        console.log(proizvodUSkladistu.id_proizvoda)
        console.log(proizvod._id)

        if(proizvodUSkladistu.id_proizvoda == proizvod._id){
          console.log("PRONADJEN");
          if(proizvodUSkladistu.kolicina_proizvoda <= proizvod.kriticna_kolicina){
            retVal.push({
              id_proizvoda: proizvod._id,
              id_skladista: skladiste._id,
              naziv_proizvoda: proizvod.naziv,
              naziv_skladista: skladiste.naziv,
              kriticna_kolicina: proizvod.kriticna_kolicina,
              trenutna_kolicina: proizvodUSkladistu.kolicina_proizvoda
            })
          }
        }
      })
    })
  })
  .then(() => {
    resolve();
  })
    .catch((err) => console.error(err));
  }
}))
})

  })
  .then((ret) => {
    Promise.all(promises).then(() => {
      console.log("RETVAL")
      console.log(retVal)
      res.json(retVal)

    })




  })
  .catch((err) => console.error(err));
})



// @route GET api/proizvodi/:id
// @description Get single proizvod by id
// @access Public
router.get("/:id", (req, res) => {
  Proizvod.findById(req.params.id)
    .then((proizvod) => res.json(proizvod))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

router.get("/preduzece/:id", (req, res) => {
  Proizvod.find({id_preduzeca: req.params.id})
    .then((proizvod) => res.json(proizvod))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});


// @route PUT api/proizvodi/:id
// @description Update proizvod
// @access Public
router.put("/:id", (req, res) => {
  Proizvod.findByIdAndUpdate(req.params.id, req.body)
    .then((proizvod) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/proizvodi/:id
// @description Delete proizvod by id
// @access Public
router.delete("/:id", (req, res) => {
  Proizvod.findByIdAndRemove(req.params.id, req.body)
    .then((proizvod) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;
