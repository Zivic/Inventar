import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "chartjs-adapter-moment";

import { niceColors, niceColorsOpacity } from "../Utils";
import {
  setKorisnikData,
  selectKorisnik,
} from "../features/korisnik/korisnikSlice";

import {
  Chart,
  Filler,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeSeriesScale,
} from "chart.js";

const LineGraph = (props) => {
  const { vrednosti, raspon } = props;

  Chart.register(
    Filler,
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

  let noveVrednosti = {...vrednosti};

  function promeniRaspon(minTime){
    for(var key in noveVrednosti)
    noveVrednosti[key] = noveVrednosti[key].filter((vr) => {
      const date = new Date(vr.x);
      let res = date > minTime;
      return res;
    })
  }

  var initialTime = null;
  switch (raspon) {
    case "hour":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 1);
      promeniRaspon(initialTime);
      break;

    case "day":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 7);
      promeniRaspon(initialTime);

      break;

    case "month":
      initialTime = new Date(Date.now());
      initialTime.setDate(initialTime.getDate() - 356);
      promeniRaspon(initialTime);

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
  labelArray.push(initialTime);
  labelArray.push(new Date(Date.now()));

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
  function ucitajVrednosti() {
    var ctx = document.getElementById("lineGraph").getContext("2d");



    
    for (var key in noveVrednosti) {
      let rnd1 = Math.random() * 255;
      //debugger;
      let broj = noveVrednosti[key].length - 1;
      let dodatnaTacka = { ...noveVrednosti[key][broj] };
      let novoX = new Date(Date.now()).toISOString();
      dodatnaTacka.x = novoX;
      noveVrednosti[key].push(dodatnaTacka);

      let a = niceColors[index];
      let b = niceColorsOpacity[index];
      const gradientBg = ctx.createLinearGradient(0, 0, 0, 500);
      gradientBg.addColorStop(0, a);
      gradientBg.addColorStop(0.25, b);
      //gradientBg.addColorStop(0.5, '#00000000');


      dataSetovi.push({
        label: key,
        data: noveVrednosti[key],
        fill: true,
        borderColor: niceColors[index],
        backgroundColor: gradientBg,
        pointBackgroundColor: gradientBg,
        //strokeColor: niceColors[index],
        //pointColor: niceColors[index],
        //pointStrokeColor: "#202b33",
        //pointHighlightStroke: "rgba(225,225,225,0.9)",
        tension: 0.1,
      });

      index++;
    }
  }
  //ucitajVrednosti();
  var options = {
    // pointDotRadius : 6,
    // pointDotStrokeWidth : 2,
    // datasetStrokeWidth : 3,
    // scaleShowVerticalLines: false,
    // scaleGridLineWidth : 2,
    // scaleShowGridLines : true,
    // scaleGridLineColor : "rgba(225, 255, 255, 0.02)",
    // scaleOverride: true,
    // scaleSteps: 9,
    // scaleStepWidth: 500,
    // scaleStartValue: 0,
    fill: true,
    animation: true,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: true,
    },
    scales: {
      x: {
        type: "time",
        time: {
           //min: initialTime,
           //max: new Date(Date.now()),
          unit: raspon || "hour",
        },
      },
    },
  };

  const data = {
    labels: labelArray,
    datasets: dataSetovi,
  };
  const config = {
    type: "line",
    data: data,
    options: options,
  };

  //Begin:

  const canvasRef = React.createRef();
  const korisnikStore = useSelector(selectKorisnik).payload;
  const [podaci, setPodaci] = useState(null);
  useEffect(() => {
    ucitajVrednosti();
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

    //let chart = new Chart(document.getElementById("lineGraph"), config);
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
