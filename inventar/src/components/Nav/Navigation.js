import io from "socket.io-client";

import { Navbar, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import { useState, useEffect } from "react";
import axios from 'axios';
const socket = io("http://localhost:3002");

const Navigation = (props) => {
  const {toggleCollapse} = props;
  const korisnikStore = useSelector(selectKorisnik).payload;
  const imeIPrezime = korisnikStore.ime + " " + korisnikStore.prezime;

  const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState("");

  useEffect(() => {
    socket.on("unreadMessages", (numberOfMessages) => {
      console.log("Unread messages: " + numberOfMessages);
      setNumberOfUnreadMessages(numberOfMessages);
    });
    socket.emit("joinRoom", korisnikStore.id_preduzeca);

    console.log("ALERTI")
    axios
    .get("http://localhost:3001/api/proizvodi/alerti/" + korisnikStore.id_preduzeca)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      // setPodaciProizvoda(() => res.data);
      // tempPodaciProizvoda = res.data;
    })
    .catch((err) => console.log(err));


    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="home">Inventar</Navbar.Brand>
        <Button onClick={() => toggleCollapse()}>collapse</Button>
        <Nav className="mr-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          {/* {korisnikStore.tip !== "Radnik" && (
            <NavLink to="/menadzerDashboard" className="btn btn-primary">
              Alerti <Badge variant="light">9</Badge>
            </NavLink>
          )} */}
          <NavLink to="/menadzerDashboard" className="btn btn-primary">
            Poruke <Badge variant="light">{numberOfUnreadMessages}</Badge>
          </NavLink>
        </Nav>
        <span className="fas fa-user text-light"></span>
        <span className="text-light">{imeIPrezime}</span>
      </Navbar>
    </>
  );
};
export default Navigation;
