const express = require("express");
const app = express();
const router = express.Router();
const History = require("../../models/History");
const Proizvod = require("../../models/Proizvod");

router.get("/", (req, res) => {
  History.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

router.get("/:idPreduzeca", (req, res) => {
  History.find({ id_preduzeca: req.params.idPreduzeca }).lean()
    .then((data) => {
      let copyOfData = data;
      let forPromise = [];
      //console.log(copyOfData);
      copyOfData.forEach((historyObject, index) => {
          forPromise.push(new Promise((resolve,reject) =>{
            Proizvod.findById(historyObject.id_proizvoda)
            .then((data2) => {
              historyObject.naziv_proizvoda = data2.naziv;
              resolve();
            }).catch((err) => {
              console.error(err);
              //res.status(404).json({ error: "Not found" });
            })
          }));
        });
      Promise.all(forPromise).then(() => {
        res.json(copyOfData);
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Not found" });
    });
});

// @route POST api/histories
// @description add/save history
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  History.create(parsedData)
    .then((data) => {
      console.log("[Success]");
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

addNewHistoryEntry = (data) => {
  console.log(data);
};

// @route GET api/histories/:id
// @description Get single history by id
// @access Public
router.get("/:id", (req, res) => {
  History.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/histories/:id
// @description Update history
// @access Public
router.put("/:id", (req, res) => {
  History.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/histories/:id
// @description Delete history by id
// @access Public
router.delete("/:id", (req, res) => {
  History.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;
