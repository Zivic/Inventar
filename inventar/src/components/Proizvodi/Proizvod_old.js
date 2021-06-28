import React from 'react';
import {useState, useEffect} from 'react' ;
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
const Proizvod = (props) => {
    const {idProizvoda} = props;
//TODO: sredi izgled forme zavrsi prokaze za sve sto je potrebno u prikazu proizvoda, pokusaj da popravis slike, ali nije bitno, dodaj SKU ? prvo vidi kako radi barkod.
    const [podaciProizvoda, setPodaciProizvoda] = useState(null);
    const [aktivnaKategorija, setAktivnaKategorija] = useState(0);
    const [kategorije, setkategorije] = useState([]);
    const [aktivniAtributi, setAktivniAtributi] = useState(null);
    useEffect(() => {
      console.log("USEEFFECT AXIOS")
        axios.get("http://localhost:3001/api/proizvodi/" + idProizvoda)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setPodaciProizvoda(() => res.data);
          }).then(() =>
          

       { axios
        .get("http://localhost:3001/api/kategorije/")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setkategorije(() => res.data);
      })
    //   .then(() => {
    //     console.log("AAAAAAAAAAAAAAA " + podaciProizvoda.kategorija);

    //     setAktivnaKategorija(
    //         kategorije.filter((kategorija) => kategorija.naziv == podaciProizvoda?.kategorija)
    //       );
    //     })
      .catch((err) => console.log(err));
    }).catch((err) => console.log(err));
    },[]);

    useEffect(() =>{    //postavlja inicijalnu kategoriju na vrednost iz baze
      console.log("USEEFFECT KATEGORIJE");

        setAktivnaKategorija(
            kategorije.filter((kategorija) => kategorija.naziv == podaciProizvoda?.kategorija)
          );
    },[kategorije])

    useEffect(() => {   //postavlja odgovarajuce atribute
      console.log("USEEFFECT ATRIBUTI");

        aktivnaKategorija[0]?.atributi?.forEach((atributObjekat, index) => {
            let nazivAtributa = podaciProizvoda.atributi[index].ime;
            let vrednostAtributa = podaciProizvoda.atributi[index].value;
            let domObject = document.getElementById('formaProizvod.ControlSelectAtribut' + nazivAtributa);
            if(domObject) 
            domObject.value = vrednostAtributa;
        });
    },[aktivnaKategorija])

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

      const getDataFromInputs =  () => {
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
    
              const dataFromInputs = {
                naziv: document.getElementById("formaProizvodNaziv").value,
                kolicina: document.getElementById("formaProizvodKolicina").value,
                cena: document.getElementById("formaProizvodCena").value,
                kategorija: document.getElementById(
                  "formaProizvod.ControlSelectKategorija"
                ).value,
                atributi: vrednostiAtributa,
                // slike: imageURL,
                opis: document.getElementById("formaProizvod.ControlTextareaOpis")
                  .value,
              };
              console.log(dataFromInputs);
              return dataFromInputs;
            }

      const handleSubmit = async (e) => {
        console.log("Submitted new product");
        e.preventDefault();
        let data = getDataFromInputs();
        console.log(data);

    //TODO: POST
    // axios
    //   .patch("http://localhost:3001/api/proizvodi/", {
    //     headers: { "Content-Type": "application/json" },
    //     data: JSON.stringify(data),
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
      }
      let renderJSX = null;
      console.log("SSSSSSSSSSSSSSSSSSSSSSSS")

      console.log(podaciProizvoda?.naziv)
      if(podaciProizvoda)
     renderJSX = (
        <>
          <h2>Prikaz proizvoda</h2>
          <br />
          <Form className="col-sm-6 col-md-4">
            <Form.Group controlId="formaProizvodNaziv">
              <Form.Label>Naziv proizvoda</Form.Label>
              <Form.Control name="naziv" type="text" placeholder="Unesite naziv" defaultValue={podaciProizvoda?.naziv} 
              />
            </Form.Group>
    
            <Form.Group controlId="formaProizvodKolicina">
              <Form.Label>Kolicina</Form.Label>
              <Form.Control type="number" placeholder={0} defaultValue={podaciProizvoda?.kolicina} />
            </Form.Group>
    
            <Form.Group controlId="formaProizvodCena">
              <Form.Label>Cena</Form.Label>
              <Form.Control type="number" placeholder={0}  defaultValue={podaciProizvoda?.cena}/>
            </Form.Group>
    
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
    
            <Form.Group controlId="formaProizvod.ControlSelectKategorija">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control as="select" onChange={(e) => handleChangeKategorije(e)}  defaultValue={aktivnaKategorija.naziv}>
                {kategorije?.map((kategorija) => {
                  console.log(kategorija.naziv);
                  return (
                    <option value={kategorija.naziv} key={kategorija.naziv}>
                      {kategorija.naziv}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <div className="form-group row ml-auto">
              {console.log("Aktivna kategorija: ")}
              {console.log(aktivnaKategorija[0])}
              {aktivnaKategorija[0]?.atributi.map((atributObjekat, index) => {
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
                    //   value={podaciProizvoda?.atributi[index]}
                    >
                      {atributObjekat.vrednosti.map((vrednost) => {
                        {
                          console.log(vrednost);
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
    
            <Form.Group controlId="formaProizvod.ControlTextareaOpis">
              <Form.Label>Dodatan opis</Form.Label>
              <Form.Control as="textarea" rows={3} isInvalid defaultValue ={podaciProizvoda?.opis}/>
              <Form.Control.Feedback type="invalid">
                Looks bad!
              </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group>
              <Form.File id="formaProizvodControlFile" label="Slike" />
            </Form.Group>
    
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Potvrdi
            </Button>
          </Form>
        </>
      );

    const podaciJSX = (<div>
    Proizvod
    <h2>Naziv: {podaciProizvoda?.naziv}</h2>
  </div>
  );
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  console.log(podaciProizvoda);
    return(
        podaciProizvoda ? <div 
        style={{
          margin: ".5rem",
          padding: "3rem",
          //backgroundColor: "gray",
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          // width: "75%",
          border: " .1rem solid #ececec",
          borderWidth: ".1rem .1rem 0",
          borderRadius: "8px 8px 0 0",
          //height: "500px",
          position: "relative",
        }}
      >
        {renderJSX}
      </div> : <p>Loading...</p>
    )
}
export default Proizvod;