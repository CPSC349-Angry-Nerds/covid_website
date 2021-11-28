import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button, Modal } from "react-bootstrap";
import allStates from "./data/allstates.json";
import moment from "moment";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = () => {
  const [show, setShow] = useState(false);
  const [stateInfo, setStateInfo] = useState({ title: "" });
  const [label, setLabels] = useState([]);
  const [deathData, setDeathData] = useState([]);
  const [positiveData, setPostiveData] = useState([]);
  const [overallData, setOverallData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = async (state) => {
    setShow(true);
    setStateInfo({ title: state });
    const data = await fetch(
      `https://api.covidtracking.com/v1/states/${state.toLowerCase()}/daily.json`
    ).then((res) => res.json());
    const dateArr = [];
    const deathArr = [];
    const posArr = [];
    const currArr = [];
    for (let i = 100; i >= 0; i = i - 10) {
      var a = moment(data[i].date, "YYYYMMDD").format("MMM Do");
      dateArr.push(a);
      deathArr.push(data[i].death);
      posArr.push(data[i].positive);
      console.log(data[i]);
      if (i === 0) {
        currArr.push(data[i].recovered);
        currArr.push(data[i].positive);
        currArr.push(data[i].negative);
        currArr.push(data[i].hospitalized);
        currArr.push(data[i].death);
      }
    }
    setLabels(dateArr);
    setDeathData(deathArr);
    setPostiveData(posArr);
    setOverallData(currArr);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${stateInfo.title} Data`,
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${stateInfo.title} Overall Data`,
      },
    },
  };

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        label: "Positive",
        data: positiveData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Deaths",
        data: deathData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: ["Recovered", "Positive", "Negative", "Hospitalized", "Death"],
    datasets: [
      {
        data: overallData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <React.Fragment>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                />
              ))}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text
                            y="2"
                            onClick={() => handleShow(cur.id)}
                            className="pointer"
                            fontSize={14}
                            textAnchor="middle"
                          >
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                        >
                          <text
                            x={4}
                            onClick={() => handleShow(cur.id)}
                            className="pointer"
                            fontSize={14}
                            alignmentBaseline="middle"
                          >
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data for {stateInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Line options={options} data={data} />
          <Pie className="mt-5" options={options2} data={data2} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default MapChart;
