import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const RegistracijaRadnika = (props) => {
  const { handleBack, idPreduzeca } = props;

  const [podaciKorisnika, setPodacikorisnika] = useState(null);
  let podaciPreduzeca = null; //Ovo radi bolje nego state

  let ime = React.createRef();
  let prezime = React.createRef();
  let emailKorisnika = React.createRef();
  let password = React.createRef();
  let passwordConfirm = React.createRef();

  const handleZavrsi = (e) => {
    e.preventDefault();
    console.log("Submitted2");
    validateForm(); //if 1 ?
  };

  useEffect(() => {
      console.error(podaciKorisnika) //this is baaad
    if( podaciKorisnika !== null ){
        saveToDatabase();
    }
  },[podaciKorisnika]) 

  const validateForm = () => {
    //TODO: validacija ovde

    //nakon validacije:
    setPodacikorisnika({
      ime: ime.current.value,
      prezime: prezime.current.value,
      email: emailKorisnika.current.value,
      password: password.current.value,
      tip: "Radnik",
    });

    return true;
  };

  const saveToDatabase = () => {
    console.log("Saving...");
    console.log(podaciKorisnika);
    if (podaciKorisnika) {
      console.log(podaciKorisnika);

      //axios post korisnik
      let lokalniPodaciKorisnika = podaciKorisnika;
      lokalniPodaciKorisnika.id_preduzeca = idPreduzeca; //TODO: redux
      console.error(lokalniPodaciKorisnika);

        axios
        .post("http://localhost:3001/api/korisnici/", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(lokalniPodaciKorisnika),
        })
        .then((res) => {console.log(res)})
        .catch((err) => console.log(err));
    }
  };

  const prviJSX = (
    <Form className="">
      <Form.Group controlId="formaRegistracijaIme">
        <Form.Label>Ime</Form.Label>
        <Form.Control type="text" placeholder="Unesite ime" ref={ime} />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaPrezime">
        <Form.Label>Prezime</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite prezime"
          ref={prezime}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaEmail">
        <Form.Label>e-mail</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite e-mail radnika"
          ref={emailKorisnika}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Unesite password"
          ref={password}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaConfirmPassword">
        <Form.Label>Potvrda Password-a</Form.Label>
        <Form.Control
          type="password"
          placeholder="Potvrdite svoj password"
          ref={passwordConfirm}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => handleZavrsi(e)}>
        Potvrdi
      </Button>
      <Button variant="danger" type="" onClick={(e) => handleBack(e)}>
        Nazad
      </Button>
    </Form>
  );

  return (
    <div className="d-flex">
      <div className="d-flex col-6 justify-content-center align-items-center">
        <div className="col-sm-10 col-md-8">
          <h3>Registracija radnika</h3>
          <br />
          {prviJSX}
        </div>
      </div>
      {/* <div className="col-6 fancyBG" style={{ height: "100vh" }}></div> */}
    </div>
  );
};

export default RegistracijaRadnika;
