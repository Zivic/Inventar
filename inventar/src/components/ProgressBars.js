import React from "react";
import { ProgressBar, Badge } from "react-bootstrap";
const ProgressBars = (props) => {
  const proizvodi = props.entries.sort((a, b) => {
    return b.kolicina_proizvoda - a.kolicina_proizvoda;
  });
  const max = proizvodi[0].kolicina_proizvoda;
  return (
    <div className="w-50">
      {proizvodi.map((proizvod) => {
        return (
          <div className="">
            <Badge bg="warning" text="dark" className="float-left mr-2 rounded-circle">
              !
            </Badge>
            <ProgressBar
              now={(proizvod.kolicina_proizvoda / max) * 100}
              label={proizvod.kolicina_proizvoda}
              className="mb-3 "
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBars;
