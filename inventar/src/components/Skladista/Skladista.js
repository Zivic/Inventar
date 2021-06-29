import React from "react";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddNewSkladiste from "./AddNewSkladiste";
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import axios from "axios";
import SkladisteCard from "./SkladisteCard";
import DonutGraph from "../DonutGraph";

const Skladista = () => {
  const [mode, setMode] = useState("prikaz");
  const [podaciSkladista, setPodaciSkladista] = useState([]);
  //redux idpreduzeca
  const korisnikStore = useSelector(selectKorisnik).payload;

  const handleDodaj = () => {
    console.log("DODATO");
    setMode("dodavanje");
  };

  const reducerZaBrojProizvoda = (trenutnoSkladiste) => {
    console.log(trenutnoSkladiste);
    return trenutnoSkladiste.proizvodi.reduce((acc, cur) => {
      return acc + cur.kolicina_proizvoda;
    }, 0);
  };

  useEffect(() => {
    console.log("USEEFFECT AXIOS");
    axios
      .get("http://localhost:3001/api/skladista/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setPodaciSkladista(() => res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let PrikazJSX = (
    <div className=" row align-items-center">
      <div className="align-items-center">
        <DonutGraph
          labels={podaciSkladista?.map((skladiste) => {
            return skladiste.naziv;
          })}
          vrednosti={podaciSkladista.map((skladiste) => {
            return reducerZaBrojProizvoda(skladiste);
          })}
        />
      </div>
      <div className="ml-5">
        {podaciSkladista.map((skladiste) => {
          return (
            <SkladisteCard
              title={skladiste.naziv}
              subtitle={skladiste.adresa}
              text1={"default text"}
              text2={"Različitih proizvoda: " + skladiste.proizvodi.length}
              text3={
                "Ukupno proizvoda u skladistu: " +
                reducerZaBrojProizvoda(skladiste)
              }
            />
          );
        })}
        {korisnikStore.tip !== "Radnik" && (
          <Button variant="primary" type="" onClick={(e) => handleDodaj(e)}>
            Dodaj skladiste
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        margin: ".5rem",
        padding: "3rem",

        //backgroundColor: "gray",
        width: "100%",
        border: "solid lightgray",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "500px",
      }}
    >
      <h2>Skladista</h2>
      {mode == "prikaz" && PrikazJSX}
      {mode == "dodavanje" && <AddNewSkladiste />}
    </div>
  );
};
export default Skladista;
