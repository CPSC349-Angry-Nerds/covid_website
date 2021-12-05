import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const [label, setLabels] = useState([]);
  const [negativeData, setNegativeData] = useState([]);
  const [positiveData, setPostiveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://api.covidtracking.com/v1/us/daily.json`
        );
        const body = await result.json();
        const dateArr = [];
        const negArr = [];
        const posArr = [];
        for (let i = 100; i >= 0; i = i - 10) {
          var a = moment(body[i].date, "YYYYMMDD").format("MMM Do");
          dateArr.push(a);
          negArr.push(body[i].negative);
          posArr.push(body[i].positive);
          // console.log(body[i]);
        }
        setLabels(dateArr);
        setNegativeData(negArr);
        setPostiveData(posArr);
      } catch (err) {}
    };

    fetchData();

    return () => {};
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overall USA Covid Data",
      },
    },
  };

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        label: "Postive",
        data: positiveData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Negative",
        data: negativeData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
