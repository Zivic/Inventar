import React from "react";
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  DoughnutController,
  ArcElement,
  Tooltip,
} from "chart.js";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../features/korisnik/korisnikSlice";
import axios from "axios";
import { niceColors } from "../Utils";

const DonutGraph = (props) => {

    const { labels, vrednosti } = props;

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    DoughnutController,
    ArcElement,
    Tooltip

  );
//['red','blue', 'yellow']
//[300,50,100]
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: vrednosti,
        backgroundColor: niceColors,
        hoverOffset: 4
      },
    ],
  };
  const config = {
    type: "doughnut",
    data,
    options: {
      
    },
  };

  //Begin:

  const canvasRef = React.createRef();
  const korisnikStore = useSelector(selectKorisnik).payload;
  const [podaci, setPodaci] = useState(null);

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/api/proizvodi/preduzece/" + korisnikStore.id_preduzeca)
    //   .then((res) => {
    //     console.log(res);
    //     setPodaci(res.data);

    //     debugger;
    //   })
    //   .catch((err) => console.error(err));
    //console.log(props)
    let chart = new Chart(document.getElementById("donutGraph"), config);
    return(() => chart.destroy())
  }, [props]);

  return (
    <div style={{
        width: "150px",
        height: "150px"
    }}>
      <canvas id="donutGraph" ref={canvasRef}></canvas>
    </div>
  );
};
export default DonutGraph;
