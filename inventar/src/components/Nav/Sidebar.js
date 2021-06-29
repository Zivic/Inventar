import { Accordion, Card, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {

  const korisnikStore = useSelector(selectKorisnik).payload;

  return (
    <div
      className="col-md-3 col-sm-3 col-lg-2 slide-right"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "#14213D",
        color: "#EEEEEE",
        fontWeight: "bold",
      }}
    >


      <Nav variant="pills" defaultActiveKey="/home" className="flex-column ">
        <NavLink
          to="/skladista"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-warehouse fa-fw"></i>
          <span className="ml-2">Skladista</span>
        </NavLink>
        <NavLink
          to="/noviProizvod"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-plus fa-fw"></i>
          <span className="ml-2">Dodaj novi proizvod</span>
        </NavLink>
        
        {korisnikStore.tip !== 'Radnik' && <NavLink
          to="/novaKategorija"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="far fa-plus-square fa-fw"></i>
          <span className="ml-2">Dodaj novu kategoriju</span>
        </NavLink>}
        <NavLink
          to="/pregledProizvoda"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-table fa-fw"></i>
          <span className="ml-2">Pregled proizvoda</span>
        </NavLink>
        {korisnikStore.tip !== 'Radnik' && <NavLink
          to="/menadzerDashboard"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-table fa-fw"></i>
          <span className="ml-2">Menadzer Dashboard</span>
          
        </NavLink>}
        {/* <NavLink
          to="/barkod"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-barcode fa-fw"></i>Barkod
        </NavLink>
        <NavLink
          to="Dashboard"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          Dashboard
        </NavLink> */}
        <NavLink
          to="/chat"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          Chat
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
