import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import AddNewSkladiste from "./AddNewSkladiste";
import { useSelector } from "react-redux";
import { selectKorisnik } from "../../features/korisnik/korisnikSlice";
import SkladisteCard from "./SkladisteCard";
import SkladistePage from "./SkladistePage";
import useFetch from "../useFetch";

const Skladista = () => {
  const [mode, setMode] = useState("prikaz");
  const korisnikStore = useSelector(selectKorisnik).payload;
  const {
    data: podaciSkladista,
    loading,
    error,
  } = useFetch(
    "http://localhost:3001/api/skladista/" + korisnikStore.id_preduzeca
  );

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

  let PrikazJSX = (
    <div className=" row align-items-center">
      {/* <div className="align-items-center">
        <DonutGraph
          labels={podaciSkladista?.map((skladiste) => {
            return skladiste.naziv;
          })}
          vrednosti={podaciSkladista.map((skladiste) => {
            return reducerZaBrojProizvoda(skladiste);
          })}
        />
      </div> */}
      <div className="row justify-content-around">
        {podaciSkladista &&
          podaciSkladista.map((skladiste) => {
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
      <div className="flex-column w-100">
        {podaciSkladista &&
          podaciSkladista.map((skladiste) => {
            return <SkladistePage {...skladiste} />;
          })}
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
        height: "100%",
      }}
    >
      <h2>Skladista</h2>
      {mode == "prikaz" && PrikazJSX}
      {mode == "dodavanje" && <AddNewSkladiste />}
    </div>
  );
};
export default Skladista;
