
//const MongoClient = require('mongodb').MongoClient;

const books = require('./routes/api/books');
const kategorije = require('./routes/api/kategorije');
const proizvodi = require('./routes/api/proizvodi');
const preduzeca = require('./routes/api/preduzeca');
const korisnici = require('./routes/api/korisnici');
const skladista = require('./routes/api/skladista');
const histories = require('./routes/api/histories');
const chatPoruke = require('./routes/api/chatPoruke');
const connectDB = require('./config/db');

//const Proizvod = require("./models/Proizvod");
const ChatPoruka = require("./models/ChatPoruka");


var cors = require('cors'); //import cors module
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

//const http = require("http");
var server = require('http').createServer(app);
var io = require('socket.io')(3002);
const port = 3001;

connectDB();
//using routes:

app.use('/api/books', books);
app.use('/api/proizvodi', proizvodi);
app.use('/api/kategorije', kategorije);
app.use('/api/preduzeca', preduzeca);
app.use('/api/korisnici', korisnici);
app.use('/api/skladista', skladista);
app.use('/api/histories', histories);
app.use('/api/chatPoruke', chatPoruke.router);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


io.on("connection", socket => {
    //console.log(socket);
    var idPreduzeca = null;
    socket.on("joinRoom", (chatRoomID) => {
        console.log('Joining room with id: ' + chatRoomID);
        socket.join(chatRoomID);
        idPreduzeca = chatRoomID;
    })

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  
    socket.on("message", message => {
        console.log('[message received: ' + message + ' ]');
      io.to(idPreduzeca).emit("message", message);
    });

    socket.on("messageData", messageData => {
        chatPoruke.addMessageToPreduzece(messageData);
    });

    let unreadMessages = 0;
    ChatPoruka.watch().on('change', data => {
      if(data.fullDocument.id_preduzeca == idPreduzeca){
        unreadMessages++;
        console.log("Unread messages: " + unreadMessages);
        socket.broadcast.to(idPreduzeca).emit("unreadMessages", unreadMessages);
      }
    }
    )



  });

  // Proizvod.watch().on('change', data => 
  // console.log(data.updateDescription.updatedFields))


app.listen(port, () => {
  console.log(`Inventar server is  listening at http://localhost:${port} ...`)
})


/*
async function run() {
    try {
        await client.connect();
        console.log("Inventar server connected correctly to MongoDB database");
        const db = client.db("Inventar")
        const col = db.collection("users");

        // Construct a document                                                                                                                                                              
        let personDocument = {
            "name": { "first": "Alan", "last": "Turing" },
            "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
            "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
            "contribs": [ "Turing machine", "Turing test", "Turingery" ],
            "views": 1250000
        }
        // Insert a single document, wait for promise so we can read it back
        //const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
/*
client.collection.insertOne({
    name:"Djole",
    age: "25",
    status: "Pending"
})*/