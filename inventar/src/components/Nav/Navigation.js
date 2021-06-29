import { Navbar, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {Link, NavLink } from "react-router-dom";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
//TODO: dodaj rute u navbar, dodaj avatar(logged in as)

const Navigation = () => {
  const korisnikStore = useSelector(selectKorisnik).payload;
  const imeIPrezime = korisnikStore.ime + " " + korisnikStore.prezime;
  console.error(korisnikStore);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="home">Inventar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          {korisnikStore.tip !== 'Radnik' &&
          <NavLink to="/menadzerDashboard" className="btn btn-primary">
            Alerti <Badge variant="light">9</Badge>
          </NavLink>}
          <NavLink to="/menadzerDashboard" className="btn btn-primary">
            Poruke <Badge variant="light">20</Badge>
          </NavLink>
        </Nav>
        <span className="fas fa-user text-light"></span>
        <span className="text-light">{imeIPrezime}</span>
      </Navbar>
    </>
  );
};
export default Navigation;
