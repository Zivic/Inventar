import React from "react";
import { useState, useEffect } from "react";
import { Button, Table, Badge, Alert } from "react-bootstrap";
import MaterialTable from "material-table";

import RegistracijaRadnika from "./RegistracijaRadnika";
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import axios from "axios";

const DozvolaPristupa = (props) => {
  const { handleBack, idPreduzeca } = props;

  const [podaciRadnika, setPodaciRadnika] = useState(null);
  const [podaciSkladista, setPodaciSkladista] = useState(null);

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    console.log("USEEFFECT");
    axios
      .get("http://localhost:3001/api/preduzeca/" + idPreduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        let noviPodaciRadnika = [];
        res.data.id_radnika.forEach((radnikID) => {
          axios
            .get("http://localhost:3001/api/korisnici/" + radnikID)
            .then((res) => {
              noviPodaciRadnika.push(res.data);
              return noviPodaciRadnika;
            })
            .catch((err) => console.error(err));
        });
        console.log(noviPodaciRadnika);

        setTimeout(() => {
          //TODO: mrzi me
          setPodaciRadnika(noviPodaciRadnika);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("USEEFFECT");

    if (podaciRadnika)
      axios
        .get("http://localhost:3001/api/skladista/" + idPreduzeca)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setPodaciSkladista(res.data);
        })
        .catch((err) => console.log(err));
  }, [podaciRadnika]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkedNodeList = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    let checkedList = [...checkedNodeList].filter(
      (domItem) => domItem.className != "menadzer"
    );
    let listOfValues = checkedList.map((inputObject) => {
      const idSkladista = inputObject.className;
      const idKorisnika = inputObject.parentElement.parentElement.className;
      return {
        idSkladista: idSkladista,
        idKorisnika: idKorisnika,
      };
    });

    console.log(checkedList);
    console.log(listOfValues);

    const unique = [
      ...new Set(
        listOfValues.map((item) => {
          return item.idSkladista;
        })
      ),
    ];
    let retval = [];
    unique.forEach((skl) => {
      let strukturaZaSvakoSkladiste = {
        idSkladista: skl,
        idKorisnika: [],
      };

      listOfValues.forEach((pair) => {
        if (pair.idSkladista == skl)
          strukturaZaSvakoSkladiste.idKorisnika.push(pair.idKorisnika);
      });

      retval.push(strukturaZaSvakoSkladiste);
    });

    console.error(retval);
    console.log(unique);
    axios
      .post("http://localhost:3001/api/skladista/dodajRadnika", {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(retval),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        activateAlert("success", "Izmene su uspesno sacuvane!");
      })
      .catch((err) => {
        activateAlert("error", "Doslo je do greske prilikom cuvanja izmena!");
        console.log(err)});
  };

  const userHasPermission = (radnik, skladiste) => {
    if (
      skladiste.id_korisnika_sa_dozvolom.includes(radnik._id) ||
      radnik.tip == "Menadzer"
    )
      return true;
    else return false;
  };

  const activateAlert = (variant, message) => {
    setAlert({
      variant: variant,
      message: message
    });
    setTimeout(() => {
      setAlert(false);
    },4000)
  }

  return (
    <div>
      {/* {console.log(podaciRadnika)} */}
      <h3>Dozvola pristupa</h3>

      {podaciRadnika && podaciSkladista && (
        <Table>
          <thead>
            <tr>
              <th>Radnik</th>
              {podaciSkladista.map((skladiste) => {
                return <th>{skladiste.naziv}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {podaciRadnika.map((radnikObjekat, index) => {
              return (
                <tr className={radnikObjekat._id}>
                  {radnikObjekat.tip == "Menadzer" ? (
                    <td>
                      {radnikObjekat.ime + " " + radnikObjekat.prezime + "   "}
                      <Badge variant="warning">Menadzer</Badge>
                    </td>
                  ) : (
                    <td>{radnikObjekat.ime + " " + radnikObjekat.prezime}</td>
                  )}
                  {podaciSkladista.map((skladiste) => {
                    if (userHasPermission(radnikObjekat, skladiste)) {
                      if (radnikObjekat.tip == "Menadzer") {
                        return (
                          <td>
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              disabled={true}
                              className="menadzer"
                            ></input>
                          </td>
                        );
                      } else
                        return (
                          <td>
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              className={skladiste._id}
                            ></input>
                          </td>
                        );
                    } else
                      return (
                        <td>
                          <input
                            type="checkbox"
                            className={skladiste._id}
                          ></input>
                        </td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Button variant="danger" type="" onClick={(e) => handleBack(e)}>
        Nazad
      </Button>
      <Button variant="primary" type="" onClick={(e) => handleSubmit(e)}>
        Potvrdi
      </Button>
      <br/>
      {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
    </div>
  );
};

export default DozvolaPristupa;
