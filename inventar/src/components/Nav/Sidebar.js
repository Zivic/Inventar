import { useEffect } from "react";
import { Accordion, Card, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = (props) => {
  const { isCollapsed } = props;
  const korisnikStore = useSelector(selectKorisnik).payload;

  return (
    <Collapse
      in={!isCollapsed}
      dimension="height"
    >
        <div
          className={"col-md-3 col-sm-3 col-lg-2"}
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "2rem",
            backgroundColor: "FloralWhite",
            color: "#EEEEEE",
            fontWeight: "bold",
          }}
        >
          <Nav
            variant="pills"
            defaultActiveKey="/skladista"
            className="flex-column "
          >
            <NavLink
              to="/skladista"
              activeClassName="active"
              className="nav-link "
              eventKey="1"
            >
              <i className="fas fa-warehouse fa-fw "></i>
              <span className=" ">Skladista</span>
            </NavLink>
            <NavLink
              to="/noviProizvod"
              activeClassName="active"
              className="nav-link "
              eventKey="2"
            >
              <i className="fas fa-plus fa-fw"></i>
              <span className=" ">Dodaj novi proizvod</span>
            </NavLink>

            {korisnikStore.tip !== "Radnik" && (
              <NavLink
                to="/novaKategorija"
                activeClassName="active"
                className="nav-link "
                eventKey="3"
              >
                <i className="far fa-plus-square fa-fw"></i>
                <span className=" ">Dodaj novu kategoriju</span>
              </NavLink>
            )}
            <NavLink
              to="/pregledProizvoda"
              activeClassName="active"
              className="nav-link "
              eventKey="4"
            >
              <i className="fas fa-table fa-fw"></i>
              <span className=" ">Pregled proizvoda</span>
            </NavLink>
            {korisnikStore.tip !== "Radnik" && (
              <NavLink
                to="/menadzerDashboard"
                activeClassName="active"
                className="nav-link "
                eventKey="5"
              >
                <i className="fas fa-table fa-fw"></i>
                <span className=" ">Menadzer Dashboard</span>
              </NavLink>
            )}
            {korisnikStore.tip === "Administrator" && (
              <NavLink
                to="/adminDashboard"
                activeClassName="active"
                className="nav-link "
                eventKey="6"
              >
                <i className="fas fa-table fa-fw"></i>
                <span className=" ">Admin Dashboard</span>
              </NavLink>
            )}
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
              className="nav-link"
              eventKey="7"
            >
              <i class="far fa-comment fa-fw"></i>
              <span className=" ">Chat</span>
            </NavLink>
          </Nav>
        </div>
    </Collapse>
  );
};

export default Sidebar;
