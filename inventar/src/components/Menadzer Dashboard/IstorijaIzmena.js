import React from "react";
import MaterialTable from "material-table";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import HistoryEntry from "./HistoryEntry";


const IstorijaIzmena = (props) => {
  const { handleBack, idPreduzeca } = props;

  const [podaci, setPodaci] = useState(null);
  const [podaciKorisnika, setPodaciKorisnika] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/histories/" + idPreduzeca)
      .then((res) => {
        //noviPodaciRadnika.push(res.data);
        //return noviPodaciRadnika;
        console.log(res);
        //setPodaci(res.data);

        return res.data;
      })
      .then((historiesData) => {
        const arrayOfUserIds = [];
        historiesData.forEach((istorijaObjekat) =>
          arrayOfUserIds.push(istorijaObjekat.id_korisnika)
        );
        const setOfUserIds = new Set([...arrayOfUserIds]);

        console.log(setOfUserIds);
        //debugger;

        //TODO:  FIX: Ovo mozda nece da radi kada dodam vise korisnika

        setOfUserIds.forEach((userID, index) => {
          //ovo za index nije sigurno...
          axios
            .get("http://localhost:3001/api/korisnici/" + userID)
            .then((res) => {
              console.log(res);
              //setPodaciKorisnika(res.data);
              historiesData.forEach((historiesObject) => {
                if (historiesObject.id_korisnika == userID)
                  historiesObject.imeIPrezime =
                    res.data.ime + " " + res.data.prezime;
              });
              return historiesData;
            })
            .then((historiesData) => {
              console.log(historiesData);
              setPodaci(historiesData);
            });
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (idProizvoda) => {
    console.log(idProizvoda);
  };

  return (
    <div>
      <h1>Istorija Izmena </h1>
      {
        !podaci ? (
          <p>loading...</p>
        ) : (
          
          <MaterialTable
            columns={[
              { title: "Vreme", field: "updatedAt", type: "datetime" },
              { title: "Radnik", field: "imeIPrezime" },
              { title: "Proizvod", field: "naziv_proizvoda" },
            ]}
            data={[...podaci].reverse()}
            title="Istorija Izmena"
            options={{
              pageSize:10,
         }}
            detailPanel={rowData => {
              return (
                <HistoryEntry podaci={rowData}/>
              )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
          />
        )
        // : <Table>
        //     {console.log(podaci)}
        //     <thead>
        //         <tr>
        //             <th>Radnik</th>
        //             <th>Vreme</th>
        //             <th>Proizvod</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {podaci.map((istorijaObjekat) => {
        //             console.log(istorijaObjekat);
        //             return <tr>
        //                 <td>
        //                     {istorijaObjekat.promene[0].idKorisnika}
        //                 </td>
        //                 <td>
        //                     {istorijaObjekat.updatedAt}
        //                 </td>
        //                 <td>
        //                     {istorijaObjekat.id_proizvoda}
        //                 </td>
        //             </tr>
        //         })}
        //     </tbody>
        // </Table>
      }
    </div>
  );
};
export default IstorijaIzmena;
