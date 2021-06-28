import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../features/korisnik/korisnikSlice";
import axios from 'axios';


const socket = io("http://localhost:3002");

const Chat = (props) => {

    const korisnikStore = useSelector(selectKorisnik).payload;
    console.log(korisnikStore); 

  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {

    axios
    .get("http://localhost:3001/api/chatPoruke/preduzece/" + korisnikStore.id_preduzeca)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setReceivedMessages(res.data.map(messageObject => {
          return messageObject.ime_korisnika + ": " + messageObject.poruka;
      }));   
     })
    .catch((err) => console.log(err));




    socket.on("message", (message) => {
        console.log('message received: ' + message);
      setReceivedMessages((prevState) => [...prevState, message]);
    });

    socket.emit("joinRoom", korisnikStore.id_preduzeca);

    return (() => socket.disconnect())
  }, []);

  const sendMessage = () => {
    console.log('message sent');

    socket.emit("messageData", {
        id_preduzeca: korisnikStore.id_preduzeca,
        id_korisnika: korisnikStore.id,
        ime_korisnika: korisnikStore.ime,
        poruka: message
    })
    
    socket.emit("message", `${korisnikStore.ime}: ${message}`);
    setMessage("");
  };

  const onUpdateMessage = (event) => {
    setMessage(event.target.value);
  };


  return (
    <div className = 'containerNice UIGray'>
      <h2>Chat</h2>
          <>
            <div className ='containerNice'>
              {receivedMessages.map((item, index) => (
                  
                !item.includes(korisnikStore.ime) ? 
                <div className = 'd-flex flex-row-reverse'>
                <div key={index} className = 'chatbox UIBlue'
                >{item}
                </div>
                </div>
                :       
                <div className = 'd-flex flex-row'>          
                <div key={index} className = 'chatbox UIWhite float-right'
                >{item}
                </div>
                </div>
        
              ))}
            </div>
            <input type="text" value={message} onChange={e => onUpdateMessage(e)} />
            <button onClick={() => sendMessage()}>SEND</button>
          </>
    </div>
  );
};

export default Chat;
