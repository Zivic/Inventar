import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

//TODO: stil, validacija

const AddNewKategorija = () => {
  const [atributi, setAtributi] = useState([]);

  const addNewAtribut = (nazivNovogAtributa) => {
    setAtributi(() => {
      return [
        ...atributi,
        {
          naziv: nazivNovogAtributa,
          value: [],
        },
      ];
    });
  };

  const addNewAtributField = (redniBroj) => {
    const a = [...atributi];
    a[redniBroj].value.push({ ime: "", value: "" });
    console.log(a);
    setAtributi(() => {
      return a;
    });
  };

  const removeAtributField = (redniBroj) => {
    const a = [...atributi];
    a[redniBroj].value.pop();
    console.log(a);
    setAtributi(() => {
      return a;
    });
  };

  const getDataFromInputs = () => {
    const podaci = {
      naziv: document.querySelector(`[id^='formaKategorijaNaziv']`).value,
      atributi: [],
    };
    atributi.forEach((atribut, index) => {
      const atributObjekat = {
        ime: document.querySelector(`[id^='formaKategorijaAtribut${index}']`).value,
        vrednosti: [],
      };
      document
        .querySelectorAll(`[id^='formaAtribut${index}']`)
        .forEach((attrSelect) => {
          atributObjekat.vrednosti.push(attrSelect.value);
        });
      podaci.atributi.push(atributObjekat);
    });
    console.log(podaci);
    return podaci;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted new kategorija");

    axios
      .post("http://localhost:3001/api/kategorije/", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(getDataFromInputs()),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const renderJSX = (
    <>
      <h2>Dodavanje nove kategorije</h2>
      <br />
      <Form className="">
        <Form.Group controlId="formaKategorijaNaziv">
          <Form.Label>Naziv kategorije</Form.Label>
          <Form.Control type="text" placeholder="Unesite naziv" />
        </Form.Group>

        <div className="form-group row ml-auto">
          {atributi?.map((atribut, index) => {
            return (
              <div style={{ width: "33%" }} id={`kategorijaContainer${index}`}>
                <Form.Group
                  controlId={`formaKategorijaAtribut${index}`}
                  className="mr-2"
                >
                  <Form.Label>Atribut {index}</Form.Label>
                  <div className="d-flex">
                    <Form.Control type="text" placeholder={"ime atributa"} />
                    <Button
                      variant="success"
                      type=""
                      onClick={(e) => addNewAtributField(index)}
                    >
                      +
                    </Button>
                  </div>
                </Form.Group>
                <Form.Label>Vrednosti atributa</Form.Label>
                {atributi[index].value.map((attr, localIndex) => {
                  {
                    console.log("RENDER");
                  }
                  return (
                    <Form.Group
                      controlId={`formaAtribut${index}.${localIndex}`}
                      className="mr-2 d-flex"
                    >
                      <Form.Control
                        type="text"
                        placeholder={"vrednost atributa"}
                      />
                      <Button
                        variant="danger"
                        type=""
                        onClick={(e) => removeAtributField(index)}
                      >
                        -
                      </Button>
                    </Form.Group>
                  );
                })}
              </div>
            );
          })}
        </div>
        <hr />
        <div className="d-flex justify-content-around">
          <Button
            variant="primary"
            type=""
            onClick={(e) => addNewAtribut("nazivNovogAtributa")}
          >
            Dodaj novi Atribut
          </Button>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Potvrdi
          </Button>
        </div>
      </Form>
    </>
  );

  return (
    <div
      style={{
        margin: ".5rem",
        padding: "1rem",
        //backgroundColor: "gray",
        width: "75%",
        border: " .1rem solid #ececec",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "500px",
        position: "relative",
      }}
    >
      {renderJSX}
    </div>
  );
};

export default AddNewKategorija;
