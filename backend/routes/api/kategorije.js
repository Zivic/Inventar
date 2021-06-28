const express = require("express");
const app = express();
const router = express.Router();
const Kategorija = require("../../models/Kategorija");

router.get("/", (req, res) => {
  Kategorija.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
})



// @route POST api/kategorije
// @description add/save kategorija
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  Kategorija.create(parsedData)
    .then((data) => {
      console.log("[Success]");
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

// @route GET api/kategorije/:id
// @description Get single kategorija by id
// @access Public
router.get("/:id", (req, res) => {
  Kategorija.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/kategorije/:id
// @description Update kategorija
// @access Public
router.put("/:id", (req, res) => {
  Kategorija.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/kategorije/:id
// @description Delete kategorija by id
// @access Public
router.delete("/:id", (req, res) => {
  Kategorija.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;