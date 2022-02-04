import React from "react";
import { useState, useEffect, useMemo } from "react";
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

  const dataSetovi = [];
  let index = 0;
  function ucitajVrednosti() {
    //var ctx = document.getElementById("lineGraph").getContext("2d");

    for (var key in noveVrednosti) {
      let broj = noveVrednosti[key].length - 1;
      let dodatnaTacka = { ...noveVrednosti[key][broj] };
      let novoX = new Date(Date.now()).toISOString();
      dodatnaTacka.x = novoX;
      noveVrednosti[key].push(dodatnaTacka);

      // ! Re-add this if you figure out a method to get line height:
      // let a = niceColors[index];
      // let b = niceColorsOpacity[index];
      // const gradientBg = ctx.createLinearGradient(0, 0, 0, 500);
      // gradientBg.addColorStop(0, a);
      // gradientBg.addColorStop(0.25, b);

      dataSetovi.push({
        label: key,
        data: noveVrednosti[key],
        fill: '+1',
        borderColor: niceColors[index],
        backgroundColor: niceColorsOpacity[index],
        pointBackgroundColor: niceColors[index],
        tension: 0.1,
      });
      index++;
    }
  }

  const data = {
    labels: labelArray,
    datasets: dataSetovi,
  };

  const options = {
    fill: true,
    animation: true,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: raspon || "hour",
        },
      },
    },
  };

  const config = {
    type: "line",
    data: data,
    options: options,
  };

  //Begin:

  const canvasRef = React.createRef();
  useEffect(() => {
    ucitajVrednosti();
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
