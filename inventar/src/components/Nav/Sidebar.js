import { Accordion, Card, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
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
      {/* <Accordion defaultActiveKey="">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0" className="">
            <span>Click me!</span>
            <span className="fas fa-angle-down float-right"></span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Link to="/skladista">Skladista <i className="fas fa-warehouse"></i></Link>
              <hr/>
              <Link to="/noviProizvod">Dodaj novi proizvod <i className="fas fa-plus"></i></Link>
              <hr/>
              <Link to="/novaKategorija">Dodaj novu kategoriju <i className="far fa-plus-square"></i></Link>
              <hr/>
              <Link to="/pregledProizvoda">Pregled proizvoda <i className="fas fa-table"></i></Link>
              <hr/>
              <Link to="/menadzerDashboard">Menadzer Dashboard <i className="fas fa-table"></i></Link>
              <hr/>
              <Link to="/barkod">Barkod <i className="fas fa-barcode"></i></Link>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <span>Click me!</span>
            <i className="fas fa-angle-down float-right"></i>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Link to="Dashboard">Dashboard</Link>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}

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
        <NavLink
          to="/novaKategorija"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="far fa-plus-square fa-fw"></i>
          <span className="ml-2">Dodaj novu kategoriju</span>
        </NavLink>
        <NavLink
          to="/pregledProizvoda"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-table fa-fw"></i>
          <span className="ml-2">Pregled proizvoda</span>
        </NavLink>
        <NavLink
          to="/menadzerDashboard"
          activeClassName="active"
          className="nav-link UIBlue"
        >
          <i className="fas fa-table fa-fw"></i>
          <span className="ml-2">Menadzer Dashboard</span>
          
        </NavLink>
        <NavLink
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
        </NavLink>
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
