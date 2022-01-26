import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate  } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
//TODO: bug, ponekad se ne prikazuju atrubuti kod editovanja
const Proizvod = (props) => {
  const { idProizvoda } = props; //radi na principu, ako nema props onda je ADD NEW, ako ima onda je EDIT

  const [aktivnaKategorija, setAktivnaKategorija] = useState(0);
  const [kategorije, setkategorije] = useState([]);
  const [skladista, setSkladista] = useState([]);
  const [podaciProizvoda, setPodaciProizvoda] = useState(null);
  const [alertiProizvoda, setAlertiProizvoda] = useState(false);

  const [alert, setAlert] = useState(null);
  const alertRef = useRef();


  const korisnikStore = useSelector(selectKorisnik).payload;
  let history = useNavigate ();

  let initialValues = null;

  useEffect(() => {

    var tempPodaciProizvoda = null;

    if (idProizvoda)
      axios
        .get("http://localhost:3001/api/proizvodi/" + idProizvoda)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setPodaciProizvoda(() => res.data);
          tempPodaciProizvoda = res.data;
        })
        .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/api/kategorije/preduzece/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setkategorije(() => res.data);

        console.log(idProizvoda)
        //debugger;
        if(! idProizvoda){
          console.log(res.data[0])
          //debugger;
          setAktivnaKategorija([res.data[0]])

        }
        else{
          setAktivnaKategorija(res.data.filter((kat) => {
            console.error(tempPodaciProizvoda)
           return  kat.naziv == tempPodaciProizvoda?.kategorija
          }))

        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/api/skladista/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSkladista(() => res.data);
      })
      .catch((err) => console.log(err));



  }, []);

  useEffect(() => {
    //postavlja inicijalnu kategoriju na vrednost iz baze
    if (podaciProizvoda) {
      console.log("USEEFFECT KATEGORIJA");
      // console.log(idProizvoda)
      // console.log(podaciProizvoda)
      setAktivnaKategorija(
        kategorije.filter(
          (kategorija) => kategorija.naziv == podaciProizvoda?.kategorija
        )
      );
    }

    // else if(kategorije){
    //   setAktivnaKategorija([kategorije[0]])
    // }
  }, [kategorije]);

  useEffect(() => {
    //postavlja odgovarajuce atribute
    if (idProizvoda)
      aktivnaKategorija[0]?.atributi?.forEach((atributObjekat, index) => {
        let nazivAtributa = podaciProizvoda.atributi[index]?.ime;
        let vrednostAtributa = podaciProizvoda.atributi[index]?.value;
        let domObject = document.getElementById(
          "formaProizvod.ControlSelectAtribut" + nazivAtributa
        );
        if (domObject) domObject.value = vrednostAtributa;
      });
  }, [aktivnaKategorija]);

  const redirect = () => {
    history.push('/skladista')
  }

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
      //handleBack(null);
      //TODO: REDIRECT TO TABLE
      redirect();
    },3000)
  }

  const handleChangeKategorije = (e) => {
    //TODO: menja lokalni state, aktivnu kategoriju
    setAktivnaKategorija(
      kategorije.filter((kategorija) => kategorija.naziv == e.target.value)
    );
    console.log("Kategorija promenjena, trenutno: " + aktivnaKategorija);
  };

  const handleChangeAtributa = (e) => {
    console.log("Atribut promenjen, trenutno: " + e.target.value);
    //TODO: menja lokalni state, aktivnu kategoriju
  };

  const handleCheckAlert = (e) => {
    setAlertiProizvoda(!alertiProizvoda);
  };

  //from: https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript   //approach 1
  async function toDataURL(url, callback) {
    console.log("URL:", url);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result).then((eee) => {
          console.log("PPPPPPPPPPP: " + eee);
          console.log(eee);
          return Promise.resolve(eee);
        });
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const getDataFromInputs = async () => {
    //Atributi su nizovi objekata sa imenom i vrednoscu
    const vrednostiAtributa = [];
    document
      .querySelectorAll("[id^='formaProizvod.ControlSelectAtribut']")
      .forEach((attrSelect) => {
        vrednostiAtributa.push({
          ime: attrSelect.id.slice(34),
          value: attrSelect.value,
        });
      });

    let data = null;
    let imageURL = null;

    await toDataURL(
      document.getElementById("formaProizvodControlFile").files[0],
      async function (dataUrl) {
        imageURL = dataUrl;
        return Promise.resolve(dataUrl).then(() => {
          const dataFromInputs = {
            id_preduzeca: korisnikStore.id_preduzeca,
            naziv: document.getElementById("formaProizvodNaziv").value,
            kolicina: [],
            cena: document.getElementById("formaProizvodCena").value,
            kategorija: document.getElementById(
              "formaProizvod.ControlSelectKategorija"
            ).value,
            atributi: vrednostiAtributa,
            slike: imageURL,
            opis: document.getElementById("formaProizvod.ControlTextareaOpis")
              .value,
            kriticna_kolicina: document.getElementById("formaProizvodKriticnaKolicina").value
          };
          skladista.forEach((skladiste, index) => {
            const vrednostInputa = document.getElementById(
              "formaProizvodKolicina" + skladiste._id
            ).value;
            dataFromInputs.kolicina.push({
              id_skladista: skladiste._id,
              naziv: skladiste.naziv,
              kolicina: vrednostInputa,
            });
          });
          //TODO SREDI BACKEND za ovo, kolicinu u proizvodu i dodavanje u skladiste
          data = dataFromInputs;
          return Promise.resolve(dataFromInputs);
        });
      }
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  };

  const getVrednostProizvodaIzSkladista = (skladiste) => {
    //console.log(skladiste);
    let vr = 0;
    skladiste.proizvodi.forEach((proizvodObjekat) => {
      if (proizvodObjekat.id_proizvoda == idProizvoda)
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

  const handleSubmit = async (e) => {
    console.log("Submitted new product");
    e.preventDefault();
    let data = await getDataFromInputs();
    console.log("Data from inputs: ");
    console.log(data);
    console.log("Initial values: ");
    console.log(podaciProizvoda);
    console.log(skladista);
    console.log(kategorije);

    let promene = [];
    let idPreduzeca = korisnikStore.id_preduzeca;
    let idKorisnika = korisnikStore.id_korisnika;

    if (idProizvoda) {
      //TODO: history za atribute ?
      //ako je EDIT
      if (data.cena != podaciProizvoda.cena) {
        promene.push({
          // id_korisnika: korisnikStore.id,
          izmenjena_stavka: "cena",
          prethodna_vrednost: podaciProizvoda.cena,
          nova_vrednost: parseInt(data.cena),
        });
      }
      if (data.naziv != podaciProizvoda.naziv) {
        promene.push({
          //id_korisnika: korisnikStore.id,
          izmenjena_stavka: "naziv",
          prethodna_vrednost: podaciProizvoda.naziv,
          nova_vrednost: data.naziv,
        });
      }
      if (data.opis != podaciProizvoda.opis) {
        promene.push({
          //id_korisnika: korisnikStore.id,
          izmenjena_stavka: "opis",
          prethodna_vrednost: podaciProizvoda.opis,
          nova_vrednost: data.opis,
        });
      }
      if (data.kategorija != podaciProizvoda.kategorija) {
        promene.push({
          //id_korisnika: korisnikStore.id,
          izmenjena_stavka: "kategorija",
          prethodna_vrednost: podaciProizvoda.kategorija,
          nova_vrednost: data.kategorija,
        });
      }
      //KOLICINA:
      data.kolicina.forEach((kolicinaObjekat) => {
        let inicijalnaKolicina = skladista.filter((obj) => {
          //debugger;
          return obj._id === kolicinaObjekat.id_skladista;
        })[0].proizvodi;
        // console.log(podaciProizvoda)
        let novaKolicina = inicijalnaKolicina.filter(
          (proizvodObjekatUSkladistu) => {
            return (
              proizvodObjekatUSkladistu.id_proizvoda === podaciProizvoda._id
            );
          }
        );
        // console.log(inicijalnaKolicina)
        // console.log(novaKolicina)
        // console.log(kolicinaObjekat.kolicina)
        // console.log(novaKolicina[0].kolicina_proizvoda)
        if (kolicinaObjekat.kolicina != novaKolicina[0].kolicina_proizvoda) {
          console.log("razlikuje se !");
          console.log(kolicinaObjekat);
          console.log(inicijalnaKolicina);
          debugger;

          promene.push({
            //id_korisnika: korisnikStore.id,
            izmenjena_stavka: "kolicina",
            prethodna_vrednost: novaKolicina[0].kolicina_proizvoda,
            nova_vrednost: parseInt(kolicinaObjekat.kolicina),
            naziv_skladista: kolicinaObjekat.naziv,
          });
        }
      });

      //ATRIBUTI:

      // if (data.opis != podaciProizvoda.opis) {
      //   promene.push({
      //     id_korisnika: korisnikStore.id,
      //     izmenjena_stavka: "opis",
      //     prethodna_vrednost: podaciProizvoda.opis,
      //     nova_vrednost: data.opis,
      //   });
      // console.log(promene);
      // console.log(podaciProizvoda)
      // console.log(kategorije)
      // console.log(aktivnaKategorija)
      // debugger;
      //}
    }

    if (podaciProizvoda) {
      data.idProizvoda = podaciProizvoda._id;
      console.log(data);

      const combinedData = {
        promene: promene,
        data: data,
        idPreduzeca: idPreduzeca,
        idKorisnika: korisnikStore.id,
      };

      axios
        .patch("http://localhost:3001/api/proizvodi/", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(combinedData),
        })
        .then((res) => {
          console.log(res);
          activateAlert("success", "Izmene su uspesno sacuvane!");
        })
        .catch((err) => {
          console.log(err);
          activateAlert("error", "Doslo je do greske prilikom cuvanja izmena!");
        });
    } else
      axios
        .post("http://localhost:3001/api/proizvodi/", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(data),
        })
        .then((res) => {
          console.log(res)
          activateAlert("success", "Nov proizvod je uspesno dodat!");
        })
        .catch((err) => {
          console.log(err)
          activateAlert("error", "Doslo je do greske prilikom dodavanja novog proizvoda!");

        });
  };

  const kategorijaJSX = (
    <>
      <Form.Group controlId="formaProizvod.ControlSelectKategorija">
        <Form.Label>
          <h4>Kategorija</h4>
        </Form.Label>
        <Form.Control as="select" onChange={(e) => handleChangeKategorije(e)}>
          {/* {console.error(aktivnaKategorija)} */}
          {kategorije?.map((kategorija) => {
            // console.log(kategorija.naziv);
            return (
              <option
                value={kategorija.naziv}
                key={kategorija.naziv}
                selected={
                  kategorija.naziv == aktivnaKategorija[0]?.naziv && "selected"
                }
              >
                {kategorija.naziv}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <div className="form-group row ml-auto">
        {/* {console.log(aktivnaKategorija[0])} */}
        {aktivnaKategorija[0]?.atributi.map((atributObjekat) => {
          return (
            <Form.Group
              controlId={`formaProizvod.ControlSelectAtribut${atributObjekat.ime}`}
              className="mr-2"
              key={atributObjekat.ime}
            >
              <Form.Label>{atributObjekat.ime}</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleChangeAtributa(e)}
              >
                {atributObjekat.vrednosti.map((vrednost) => {
                  {
                    //console.log(vrednost);
                  }
                  return (
                    <option value={vrednost} key={vrednost}>
                      {vrednost}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          );
        })}
      </div>
    </>
  );

  const osnovnoJSX = (
    <>
      <h4>Osnovni podaci</h4>
      <Form.Group controlId="formaProizvodNaziv">
        <Form.Label>Naziv proizvoda</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite naziv"
          defaultValue={podaciProizvoda?.naziv}
        />
      </Form.Group>

      <Form.Group controlId="formaProizvodCena">
        <Form.Label>Cena</Form.Label>
        <Form.Control
          type="number"
          placeholder={0}
          defaultValue={podaciProizvoda?.cena}
        />
      </Form.Group>

      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Check me out"
          defaultValue={podaciProizvoda?.cena}
        />
      </Form.Group> */}
    </>
  );

  const kolicinaJSX = (
    <>
      <h4>Kolicina</h4>
      {skladista.map((skladiste, index) => {
        return (
          <Form.Group
            controlId={"formaProizvodKolicina" + skladiste._id}
            className="mr-2"
          >
            <Form.Label>
              Kolicina u skladistu <b>{skladiste.naziv}</b>:{" "}
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={getVrednostProizvodaIzSkladista(skladiste)}
              disabled={korisnikImaDozvolu(skladiste)}
            />
          </Form.Group>
        );
      })}
 { korisnikStore.tip !== 'Radnik' &&    <>
      <h4>Alert</h4>

      <Form.Check
        type="checkbox"
        label="Omoguci alerte"
        defaultValue={false}
        onChange={(e) => handleCheckAlert(e)}
      />
      <br />
      <Form.Label>
        Obavesti me ako kolicina u nekom skladistu padne ispod:{" "}
      </Form.Label>
      <Form.Control
        id="formaProizvodKriticnaKolicina"
        type="number"
        defaultValue={0}
        disabled={!alertiProizvoda}
      ></Form.Control>
      </>}
    </>
  );

  const bonusJSX = (
    <>
      <h4>Dodatni podaci</h4>
      <Form.Group controlId="formaProizvod.ControlTextareaOpis">
        <Form.Label>Dodatan opis</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          
          defaultValue={podaciProizvoda?.opis}
        />
        <Form.Control.Feedback type="invalid">Looks bad!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.File id="formaProizvodControlFile" label="" hidden />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Potvrdi
      </Button>
    </>
  );

  const renderJSX = (
    <>
      {/* {console.log(kategorije)} */}
      {idProizvoda ? <h2>Editovanje proizvoda</h2> : <h2>Dodavanje novog proizvoda</h2>}
      <br />
      <Form className="row p-3 justify-content-between">
        <div
          className="col-sm-6 col-xs-12  border rounded 
        UIWhite between py-3 scale-in-tl"
        >
          {osnovnoJSX}
        </div>
        <div
          className="col-sm-6 col-xs-12  border rounded 
        UIWhite between py-3 scale-in-tl"
        >
          {kategorijaJSX}
        </div>
        <div
          className="col-sm-6 col-xs-12  border rounded 
          UIWhite between py-3 scale-in-tl"
        >
          {kolicinaJSX}
        </div>
        <div
          className="col-sm-6 col-xs-12  border rounded 
        UIWhite between py-3 scale-in-tl"
        >
          {bonusJSX}
        </div>
      </Form>
    </>
  );

  return (
    <div
      style={{
        margin: ".5rem",
        padding: "3rem",
        backgroundColor: "#EEEEEE",
        //backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        // width: "75%",
        border: " .1rem solid #ececec",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "100%",
        position: "relative",
      }}
    >
      {renderJSX}
      {alert && <Alert variant={alert.variant} ref = {alertRef} className ='scale-in-tl '>{alert.message}</Alert>}
    </div>
  );
};

export default Proizvod;
