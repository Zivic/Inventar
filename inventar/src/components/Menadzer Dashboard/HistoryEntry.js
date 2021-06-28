import React from "react";
import { Badge } from "react-bootstrap";
const HistoryEntry = (props) => {
  const { podaci } = props;
  console.log(podaci);

  const datumVreme = new Date(podaci.updatedAt);
  return (
    <div className = "p-3">
      <Badge variant="primary">{podaci.imeIPrezime}</Badge>
      <span className="smallFont"> je promenio vrednosti proizvoda </span>
      <Badge variant="warning">{podaci.naziv_proizvoda}</Badge>
      <span className="smallFont">
        {datumVreme.toLocaleDateString() +
          " " +
          datumVreme.toLocaleTimeString()}
      </span>
      <p>Promene:</p>
      <ul>
        {podaci.promene.map((promena) => {
          return (
            <div className="smallFont">
              {promena.izmenjena_stavka == "kolicina" ? (
                <span>
                  <b>{promena.izmenjena_stavka}</b> u skladistu
                  <b>{" " + promena.naziv_skladista + " "}</b>
                  promenjena, prethodno:
                </span>
              ) : (
                <span>
                  <b>{promena.izmenjena_stavka + " "}</b>
                  promenjena, prethodno:
                </span>
              )}
              <span>
                <b>{" " + promena.prethodna_vrednost + " "}</b>
                nakon promene:
              </span>
              <span>
                <b>{" " + promena.nova_vrednost}</b>
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default HistoryEntry;
