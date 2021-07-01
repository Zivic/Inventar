import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import { Redirect } from "react-router-dom";

const BrzoPlus = (props) => {
  const { targetovanProizvod } = props;
  const [skladista, setSkladista] = useState([]);

  const [alert, setAlert] = useState(null);
  const alertRef = useRef();
  let history = useHistory();

  const korisnikStore = useSelector(selectKorisnik).payload;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/skladista/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSkladista(() => res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const redirect = () => {
    history.push('/skladista')
  }

  const getVrednostProizvodaIzSkladista = (skladiste) => {
    //console.log(skladiste);
    let vr = 0;
    skladiste.proizvodi.forEach((proizvodObjekat) => {
      if (proizvodObjekat.id_proizvoda == targetovanProizvod._id)
        vr = proizvodObjekat.kolicina_proizvoda;
    });
    return vr;
  };

  const korisnikImaDozvolu = (skladiste) => {
    if (korisnikStore.tip == "Menadzer") return false;

    let retVal = false;
    if (!skladiste.id_korisnika_sa_dozvolom.includes(korisnikStore.id))
      retVal = true;
    return retVal;
  };

  const getDataFromInputs = async () => {
    const kolicinaFromInputs = [];

    skladista.forEach((skladiste, index) => {
      const vrednostInputa = document.getElementById(
        "formaProizvodKolicinaDodavanje" + skladiste._id
      ).value;
      kolicinaFromInputs.push({
        id_skladista: skladiste._id,
        naziv: skladiste.naziv,
        kolicina: vrednostInputa,
      });
    });

    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(kolicinaFromInputs);
        }, 2000);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await getDataFromInputs();
    debugger;
    let promene = [];
    let idPreduzeca = korisnikStore.id_preduzeca;
    let idKorisnika = korisnikStore.id_korisnika;

    data.forEach((kolicinaObjekat) => {
      let inicijalnaKolicina = skladista.filter((obj) => {
        //debugger;
        return obj._id === kolicinaObjekat.id_skladista;
      })[0].proizvodi;
      // console.log(podaciProizvoda)
      let novaKolicina = inicijalnaKolicina.filter(
        (proizvodObjekatUSkladistu) => {
          return (
            proizvodObjekatUSkladistu.id_proizvoda === targetovanProizvod._id
          );
        }
      );

      if (parseInt(kolicinaObjekat.kolicina) + novaKolicina[0].kolicina_proizvoda != novaKolicina[0].kolicina_proizvoda) {
        console.log("razlikuje se !");
        console.log(kolicinaObjekat);
        console.log(inicijalnaKolicina);
        debugger;
        kolicinaObjekat.kolicina =  parseInt(kolicinaObjekat.kolicina) + novaKolicina[0].kolicina_proizvoda;
        promene.push({
          //id_korisnika: korisnikStore.id,
          izmenjena_stavka: "kolicina",
          prethodna_vrednost: novaKolicina[0].kolicina_proizvoda,
          nova_vrednost: kolicinaObjekat.kolicina,
          naziv_skladista: kolicinaObjekat.naziv,
        });
      }
      else{
        kolicinaObjekat.kolicina = novaKolicina[0].kolicina_proizvoda;
      }

    });
    console.log(promene);
    debugger;

    var podaci = {};
    podaci.kolicina = data;
    podaci.idProizvoda = targetovanProizvod._id;

    const combinedData = {
        promene: promene,
        data: podaci,
        idPreduzeca: idPreduzeca,
        idKorisnika: korisnikStore.id,
      };
      console.log(combinedData);
      debugger;
      axios
        .patch("http://localhost:3001/api/proizvodi/", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(combinedData),
        })
        .then((res) => {
          console.log(res)
          activateAlert("success", "Izmene su uspesno sacuvane!");
        })
        .catch((err) => {
          console.log(err)
          activateAlert("error", "Doslo je do greske prilikom cuvanja izmena!");
        });
  };

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
      redirect();
    },3000)
  }

  return (
    <>
    <div className = 'row'>
    <h4 className="col-md-5">Trenutna kolicina</h4>
      <h4 className="col-md-5">Kolicina koju zelite dodati</h4>
    </div>


      {skladista.map((skladiste, index) => {
        return (
          <div className = 'row'>
            <Form.Group
              controlId={"formaProizvodKolicina" + skladiste._id}
              className="col-md-5"
            >
              <Form.Label>
                 <b>{skladiste.naziv}</b>:{" "}
              </Form.Label>
              <Form.Control
                className="col-md-5 "
                type="number"
                defaultValue={getVrednostProizvodaIzSkladista(skladiste)}
                disabled={true}
              />
            </Form.Group>
            <Form.Group
              controlId={"formaProizvodKolicinaDodavanje" + skladiste._id}
              className="col-md-5"
            >
              <Form.Label>
                 <b>{skladiste.naziv}</b>:{" "}
              </Form.Label>
              <Form.Control
                className="col-md-5"
                type="number"
                defaultValue={0}
                disabled={korisnikImaDozvolu(skladiste)}
              />
            </Form.Group>
          </div>
        );
      })}
      <div>
      <Button className = 'float-right'variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Potvrdi
      </Button>
      </div>
      {alert && <Alert variant={alert.variant} ref = {alertRef} className ='scale-in-tl '>{alert.message}</Alert>}

    </>
  );
};

export default BrzoPlus;
