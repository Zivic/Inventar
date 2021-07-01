const express = require("express");
const app = express();
const router = express.Router();
const ChatPoruka = require("../../models/ChatPoruka");
const Proizvod = require("../../models/Proizvod");





const getMessagesFromPreduzece = async (idPreduzeca) => {
    var promise = new Promise((resolve,reject) => {
        ChatPoruka.find({id_preduzeca: idPreduzeca})
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject("error");
            console.log(err)
        })
    })
    return await promise;
}

const addMessageToPreduzece = (messageObject) => {
    ChatPoruka.create(messageObject)
    .catch((err) => console.log(err));
}

router.get("/preduzece/:idPreduzeca", (req, res) => {
    ChatPoruka.find({id_preduzeca: req.params.idPreduzeca})
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json({ error: "Not found" }));
  });

router.get("/", (req, res) => {
  ChatPoruka.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route POST api/chatPoruke
// @description add/save chatPoruka
// @access Public
router.post("/", (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  console.log("[Attempting to add new item]: ");
  console.log(parsedData);

  ChatPoruka.create(parsedData)
    .then((data) => {
      console.log("[Success]");
      res.json({ msg: "Added successfully" });
    })
    .catch((err) => {
      console.log("[Error]: " + err);
      res.status(400).json({ error: "Unable to add this item" });
    });
});

addNewChatPorukaEntry = (data) => {
  console.log(data);
};

// @route GET api/chatPoruke/:id
// @description Get single chatPoruka by id
// @access Public
router.get("/:id", (req, res) => {
  ChatPoruka.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

// @route PUT api/chatPoruke/:id
// @description Update chatPoruka
// @access Public
router.put("/:id", (req, res) => {
  ChatPoruka.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/chatPoruke/:id
// @description Delete chatPoruka by id
// @access Public
router.delete("/:id", (req, res) => {
  ChatPoruka.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ msg: "Deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "Not found" }));
});

module.exports = {
    router: router,
    addMessageToPreduzece: addMessageToPreduzece,
    getMessagesFromPreduzece: getMessagesFromPreduzece
}
