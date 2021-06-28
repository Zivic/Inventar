const express = require("express");
const app = express();
const router = express.Router();
const Preduzece = require("../../models/Preduzece");

router.get("/", (req, res) => {
  Preduzece.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
})

// @route POST api/preduzeca
// @description add/save preduzece
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  Preduzece.create(parsedData)
    .then((data) => {
        // console.log(data);
      console.log("[Success]");
      res.json({ 
          msg: "Added successfully",
          idPreduzeca: data._id
     });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

// @route GET api/preduzeca/:id
// @description Get single preduzece by id
// @access Public
router.get("/:id", (req, res) => {
  Preduzece.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/preduzeca/:id
// @description Update preduzece
// @access Public
router.put("/:id", (req, res) => {
  Preduzece.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/preduzeca/:id
// @description Delete preduzece by id
// @access Public
router.delete("/:id", (req, res) => {
  Preduzece.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = router;