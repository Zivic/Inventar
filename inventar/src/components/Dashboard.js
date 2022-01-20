import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import LineGraph from "./LineGraph";
import DonutGraph from "./DonutGraph";
import {Card} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../features/korisnik/korisnikSlice";
import axios from "axios";
const Dashboard = (props) => {
  const {targetovanProizvod} = props;


  const [podaciProizvoda, setPodaciProizvoda] = useState(null);
  const [podaciSkladista, setPodaciSkladista] = useState(null);
  const [podaciIstorije, setPodaciIstorije] = useState(null);
  const [aktivanIndeks, setAktivanIndeks] = useState(0);
  const [rasponLineCharta, setRasponLineCharta] = useState('hour');
  const korisnikStore = useSelector(selectKorisnik).payload;

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/api/proizvodi/preduzece/" +
          korisnikStore.id_preduzeca
      )
      .then((res) => {
        console.log(res);
        setPodaciProizvoda(res.data);
        console.error(targetovanProizvod);
        res.data.forEach((proizvodObjekat, index) => {
          console.log(proizvodObjekat);
          if (proizvodObjekat._id === targetovanProizvod?._id)
          {
            console.error(index);
          setAktivanIndeks(index);
          }
        })
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:3001/api/skladista/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setPodaciSkladista(() => res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/api/histories/" + korisnikStore.id_preduzeca)
      .then((res) => {
        console.log(res);
        setPodaciIstorije(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    setAktivanIndeks(e.target.value);
  };

  const handleChangeRaspon = (e) => {
    e.preventDefault();
    setRasponLineCharta(e.target.value);
  };

  const getVrednosti = () => {
    var dict = {};
    //debugger;
    podaciIstorije?.map((historyObjekat) => {
      if (podaciProizvoda)
        if (
          podaciProizvoda[aktivanIndeks].naziv == historyObjekat.naziv_proizvoda
        ) {
          historyObjekat.promene.forEach((promenaObjekat) => {
            if (promenaObjekat.izmenjena_stavka == "kolicina") {
              if (!dict[promenaObjekat.naziv_skladista]) {
                dict[promenaObjekat.naziv_skladista] = [];
              }
              dict[promenaObjekat.naziv_skladista].push({
                x: historyObjekat.updatedAt,
                y: promenaObjekat.nova_vrednost,
              });
            }
          });
        }
    });
    console.log(dict);
    return dict;
  };

  const getVrednostiDonut = () => {
    let retVal =  podaciSkladista?.map((skladiste) => {
      if (podaciProizvoda) {
        var retVal = null;
        skladiste.proizvodi.forEach((proizvodUSkladistu) => {
          //debugger;

          if (
            proizvodUSkladistu.id_proizvoda ==
            podaciProizvoda[aktivanIndeks]._id
          ) {
            //console.log("Pronadjen");
            retVal = proizvodUSkladistu.kolicina_proizvoda;
          }
        });
        return retVal;
      } else return null;
    })
    console.log(retVal);
    return retVal;
  }

  return (
    <div className="fullHeight"
      // style={{
      //   margin: ".5rem",
      //   //backgroundColor: "gray",
      //   width: "80%",
      //   border: "solid lightgray",
      //   borderWidth: ".1rem .1rem 0",
      //   borderRadius: "8px 8px 0 0",
      //   //background: 'linear-gradient(to top, #ece9e6, #ffffff)', 
      //   backgroundImage: 'linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)',/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      //   // height: "500px",
      //   padding: "2rem"
      // }}
    >
      <h2>Dashboard</h2>
      <select
        name="proizvodi"
        onChange={(e) => handleChange(e)}
        defaultValue={aktivanIndeks}
        hidden
      >
        {podaciProizvoda?.map((proizvod, index) => {
          return <option value={index}>{proizvod.naziv}</option>;
        })}
      </select>
      <div className = 'myCard col-md-5 mt-2' >
        <h5>Kolicina u skladistima</h5>
      <DonutGraph
        labels={podaciSkladista?.map((skladiste) => {
          return skladiste.naziv;
        })}
        vrednosti={getVrednostiDonut()}
      />
      </div>
      <div className = 'myCard mt-2' >
      <LineGraph vrednosti={getVrednosti()} raspon={rasponLineCharta} />
      <select
        name="raspon"
        onChange={(e) => handleChangeRaspon(e)}
        defaultValue={'hour'}
      >
        <option value='hour'>Dan(hour)</option>
        <option value='day'>Nedelja(day)</option>
        <option value='month'>Godina(month)</option>;
      </select>
      </div>
    </div>
  );
};
export default Dashboard;
