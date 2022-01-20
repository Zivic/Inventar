import React from 'react';
import TabelaProizvoda from './TabelaProizvoda';
import {useState} from 'react';
import Proizvod from './Proizvod';

const PregledProizvoda = () => {
    const [selectedProizvod, setSelectedProizvod] = useState(null);
    const handleProizvodSelection = (idProizvoda) => {
        setSelectedProizvod(idProizvoda);
    }
    return(
        <div
      style={{
        margin: ".5rem",
        //backgroundColor: "gray",
        width: "100%",
        border: "solid blue",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "100%",
      }}
    >
      Pregled proizvoda
      {selectedProizvod ? <Proizvod idProizvoda = {selectedProizvod}/> : <TabelaProizvoda handleProizvodSelection = {handleProizvodSelection}/>}
    </div>
    )
}
export default PregledProizvoda;