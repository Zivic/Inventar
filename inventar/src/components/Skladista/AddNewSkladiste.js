import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {
  setKorisnikData,
  selectKorisnik
} from "../../features/korisnik/korisnikSlice";

//TODO: stil, validacija

const AddNewSkladiste = () => {
  const podaciKorisnika = useSelector(selectKorisnik).payload;
  console.log(podaciKorisnika);

  const naziv = React.createRef();
  const adresa = React.createRef();

  const handleSubmit = (e) => {
    console.log("SUBMITTED");
    if (naziv.current.value && adresa.current.value) {
      const podaciSkladista = {
        nazivIAdresa: {
          naziv: naziv.current.value,
          adresa: adresa.current.value,
        },
        idMenadzera: podaciKorisnika.id,
        idPreduzeca: podaciKorisnika.id_preduzeca
      };
      console.log(podaciSkladista);

      axios
        .post("http://localhost:3001/api/skladista/", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(podaciSkladista),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="containerZaForme">
      <h3>Novo skladiste</h3>
      <br />
      <Form className="col-md-4">
        <Form.Group controlId="formaSkladisteNaziv">
          <Form.Label>Naziv skladista</Form.Label>
          <Form.Control type="text" placeholder="Unesite naziv" ref={naziv} />
        </Form.Group>

        <Form.Group controlId="formaSkladisteAdresa">
          <Form.Label>Adresa</Form.Label>
          <Form.Control type="text" placeholder="Unesite adresu" ref={adresa} />
        </Form.Group>
        <Button variant="primary" type="" onClick={(e) => handleSubmit(e)}>
          Dodaj
        </Button>
      </Form>
    </div>
  );
};
export default AddNewSkladiste;
