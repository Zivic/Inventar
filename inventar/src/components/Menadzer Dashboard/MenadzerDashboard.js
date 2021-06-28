import React from 'react';
import { useState, useEffect } from 'react';
import {Button} from "react-bootstrap";
import RegistracijaRadnika from './RegistracijaRadnika';
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";
import DozvolaPristupa from './DozvolaPristupa';
import IstorijaIzmena from './IstorijaIzmena';

const MenadzerDashboard = () => {

    const korisnikStore = useSelector(selectKorisnik).payload;
    const [mode, setMode] = useState('default');

    const changeToKreirajNalog = (e) => {
        setMode('kreiranje-naloga');
    }
    const changeToDefault = (e) => {
        setMode('default');
    }

    const changeToDozvolaPristupa = (e) => {
      setMode('dozvola-pristupa');
  }
  const changeToIstorijaIzmena = (e) => {
    setMode('istorija-izmena');
}

    return(<div className="containerNice">
        <h2>Menadzer dashboard</h2>
        <Button variant="primary" type="" onClick={(e) => changeToKreirajNalog(e)}>
        Kreiraj nalog
      </Button>
      <Button variant="primary" type="" onClick={(e) => changeToDozvolaPristupa(e)}>
        Dozvola pristupa
      </Button>
      <Button variant="primary" type="" onClick={(e) => changeToIstorijaIzmena(e)}>
        Istorija Izmena
      </Button>
      {mode == 'kreiranje-naloga' && <RegistracijaRadnika handleBack={(e) => changeToDefault(e)} idPreduzeca={korisnikStore.id_preduzeca}/>}
      {mode == 'dozvola-pristupa' && <DozvolaPristupa handleBack={(e) => changeToDefault(e)} idPreduzeca={korisnikStore.id_preduzeca}/>}
      {mode == 'istorija-izmena' && <IstorijaIzmena handleBack={(e) => changeToDefault(e)} idPreduzeca={korisnikStore.id_preduzeca}/>}

    </div>)

}

export default MenadzerDashboard;