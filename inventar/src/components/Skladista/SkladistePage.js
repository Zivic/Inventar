import React from "react";
import ProgressBars from "../ProgressBars";

function SkladistePage(props) {
  const  podaciSkladista  = {...props};
  return (
    <div className="">
      <h2>{props.naziv}</h2>
      {podaciSkladista && <ProgressBars entries={podaciSkladista.proizvodi} />}
    </div>
  );
}

export default SkladistePage;
