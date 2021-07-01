import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Registracija = (props) => {

  const {handleBack} = props;

  const [page, setPage] = useState(1);
  const [podaciKorisnika, setPodacikorisnika] = useState(null);
  const [alert, setAlert] = useState(null);
  const alertRef = useRef();

  let podaciPreduzeca = null; //Ovo radi bolje nego state

  let ime = React.createRef();
  let prezime = React.createRef();
  let emailKorisnika = React.createRef();
  let password = React.createRef();
  let passwordConfirm = React.createRef();

  let nazivPreduzeca = React.createRef();
  let emailPreduzeca = React.createRef();
  let gradPreduzeca = React.createRef();
  let adresaPreduzeca = React.createRef();

  useEffect(() => { //zasto se ovo zove na pocetku...? zato je ovako.
    if(page!=1){
      nazivPreduzeca.current.value = "";
      emailPreduzeca.current.value="";
      gradPreduzeca.current.value="";
      adresaPreduzeca.current.value="";
    }
  },[page])

  const activateAlert = (variant, message) => {
    setAlert({
      variant: variant,
      message: message
    });
    setTimeout(() => {
      alertRef.current.className  = alertRef.current.className.replace('scale-in-tl','scale-out-tl');
      //setAlert(false);
    },2500)
    setTimeout(() => {
      //setAlert(false);
      handleBack();
    },3000)
  }

  const handleNastavi = (e) => {
    e.preventDefault();
    console.log("Submitted1");
    if (validateForm()) {
      setPage(2);
    }
  };

  const handleZavrsi = (e) => {
    e.preventDefault();
    console.log("Submitted2");
    if (validateForm2()) {
      saveToDatabase();
    }
  };

  const handleNazad = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const validateForm = () => {
    //TODO: validacija ovde

    //nakon validacije:
    setPodacikorisnika({
      ime: ime.current.value,
      prezime: prezime.current.value,
      email: emailKorisnika.current.value,
      password: password.current.value,
      tip: "Menadzer"
    });
    return true;
  };
  const validateForm2 = () => {
    //TODO: validacija ovde

    //nakon validacije:
    podaciPreduzeca = {
      naziv: nazivPreduzeca.current.value,
      email: emailPreduzeca.current.value,
      grad: gradPreduzeca.current.value,
      adresa: adresaPreduzeca.current.value,
    };
    return true;
  };

  const saveToDatabase = () => {
    console.log("Saving...");
    if (podaciKorisnika && podaciPreduzeca)
      console.log(podaciKorisnika, podaciPreduzeca);
    //TODO: post to db
    axios
    .post("http://localhost:3001/api/preduzeca/", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(podaciPreduzeca),
    })
    .then((res) => {
      console.log(res)
      let idPreduzeca = res.data.idPreduzeca;
      console.log(idPreduzeca);

      //axios post korisnik
      let lokalniPodaciKorisnika = podaciKorisnika;
      lokalniPodaciKorisnika.id_preduzeca = idPreduzeca;
      console.log(lokalniPodaciKorisnika)

      axios
      .post("http://localhost:3001/api/korisnici/", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(lokalniPodaciKorisnika),
      })
      .then((res) => {
        console.log(res)
        activateAlert("success", "Nalog i preduzece uspesno dodato!");
      })
      .catch((err) => {
        console.log(err)
        activateAlert("error", "Doslo je do greske prilikom dodavanja naloga i preduzeca!");
      });

    })
    .catch((err) => console.log(err));
  };

  const prviJSX = (
    <Form className="">
      <Form.Group controlId="formaRegistracijaIme">
        <Form.Label>Ime</Form.Label>
        <Form.Control type="text" placeholder="Unesite svoje ime" ref={ime} />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaPrezime">
        <Form.Label>Prezime</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite svoje prezime"
          ref={prezime}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaEmail">
        <Form.Label>e-mail</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite svoj e-mail"
          ref={emailKorisnika}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Unesite svoj password"
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
      <Button variant="primary" type="submit" onClick={(e) => handleNastavi(e)}>
        Nastavi registraciju
      </Button>
      <Button variant="danger" type="" onClick={(e) => handleBack(e)}>
        Nazad
      </Button>
    </Form>
  );

  const drugiJSX = (
    <Form className="">
      <Form.Group controlId="formaRegistracijaNazivPreduzeca">
        <Form.Label>Naziv preduzeca</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite naziv preduzeca"
          ref={nazivPreduzeca}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaPreduzeceEmail">
        <Form.Label>e-mail preduzeca</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite e-mail preduzeca"
          ref={emailPreduzeca}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaGrad">
        <Form.Label>Grad</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite grad"
          ref={gradPreduzeca}
        />
      </Form.Group>

      <Form.Group controlId="formaRegistracijaAdresaPreduzeca">
        <Form.Label>Adresa preduzeca</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite adresu preduzeca"
          ref={adresaPreduzeca}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => handleZavrsi(e)}>
        Zavrsi registraciju
      </Button>
      <Button variant="warning" type="" onClick={(e) => handleNazad(e)}>
        Nazad
      </Button>
    </Form>
  );

  return (<>
    <div className="d-flex">
      <div className="d-flex col-6 justify-content-center align-items-center">
        <div className="col-sm-10 col-md-8">
          <h1>Registracija</h1>
          <br />
          {page == 1 ? prviJSX : drugiJSX}
        </div>
        {alert && <Alert variant={alert.variant} ref = {alertRef} className ='scale-in-tl '>{alert.message}</Alert>}
      </div>
      <div className="col-6 fancyBG" style={{ height: "100vh" }}></div>
    </div>
    </>
  );
};

export default Registracija;
