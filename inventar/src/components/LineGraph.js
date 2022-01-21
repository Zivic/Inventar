import React from "react";
import "chartjs-adapter-moment";
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeSeriesScale,
} from "chart.js";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../features/korisnik/korisnikSlice";
import axios from "axios";

import { niceColors } from "../Utils";
import { startSession } from "mongoose";

const LineGraph = (props) => {
  const { vrednosti, raspon } = props;

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    TimeSeriesScale
  );

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  const labels = months({ count: 12 });

  var initialTime = null;
  switch (raspon) {
    case "hour":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 1);
      break;

    case "day":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 7);
      break;

    case "month":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 31);
      break;

    default:
      initialTime = new Date(Date.now());
      break;
  }
  //var initialTime = new Date ("2021-06-18T00:00:00.462Z");
  //const initialTime = new Date(Date.now()); //(new Date(Date.now()).toISOString());
  let labelArray = [];
  // switch(raspon){
  //   case "hour":
labelArray.push(initialTime)
labelArray.push(new Date(Date.now()))

  // let tempTime = initialTime;
  // tempTime.setDate(tempTime.getDate() - 1);
  // for (let i = 0; i < 2; i++) {
  //   tempTime.setHours(tempTime.getHours() + 1);
  //   console.log(tempTime.getHours());
  //   let formattedTempTime = tempTime.toISOString();
  //   console.log(formattedTempTime);
  //   labelArray.push(tempTime);
  //   // if (i < 10)
  //   //   labelArray.push(formattedTempTime.replace("T00:00:00", "T0" + i + ":00:00"));
  //   // else labelArray.push(formattedTempTime.replace("T00:00:00", "T" + i + ":00:00"));
  // }
  // break;
  // case "Mesec":
  //   for (let i = 1; i < 32; i++) {
  //     let tempTime = initialTime;
  //     tempTime.setDate(tempTime.getMonth() -1);
  //     let formattedTempTime = tempTime.toISOString();
  //     if (i < 10)
  //       labelArray.push(formattedTempTime.replace("T00:00:00", "T0" + i + ":00:00"));
  //     else labelArray.push(formattedTempTime.replace("T00:00:00", "T" + i + ":00:00"));
  //   }
  //   break;
  // }

  const dataSetovi = [];
  let index = 0;
  //debugger;
  for (var key in vrednosti) {
    let rnd1 = Math.random() * 255;
    debugger;
    let broj = vrednosti[key].length -1;
    let dodatnaTacka = vrednosti[key][broj];
    let novoX = new Date(Date.now()).toISOString();
    dodatnaTacka.x = novoX;
    vrednosti[key].push(dodatnaTacka);
    
    dataSetovi.push({
      label: key,
      data: vrednosti[key],
      fill: false,
      borderColor: niceColors[index],
      tension: 0,
    });
    index++;
  }

  const data = {
    labels: labelArray,
    datasets: dataSetovi,
  };
  const config = {
    type: "line",
    data,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "time",
          time: {
           // min: initialTime,
           // max: new Date(Date.now()),
            unit: raspon || "hour",
          },
        },
      },
    },
  };

  //Begin:

  const canvasRef = React.createRef();
  const korisnikStore = useSelector(selectKorisnik).payload;
  const [podaci, setPodaci] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/api/proizvodi/preduzece/" +
          korisnikStore.id_preduzeca
      )
      .then((res) => {
        console.log(res);
        setPodaci(res.data);

        //debugger;
      })
      .catch((err) => console.error(err));

    //console.log(labelArray);

    let chart = new Chart(document.getElementById("lineGraph"), config);
    return () => chart.destroy();
  }, [props]);

  return (
    <div>
      <canvas id="lineGraph" ref={canvasRef}></canvas>
    </div>
  );
};
export default LineGraph;
