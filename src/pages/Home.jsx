import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import Layout from "./components/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sells per product",
    },
  },
};

const options2 = {
  responsive: true,
};

const labels = [
  "RadRover 6 Plus High Step",
  "RadRunner 2",
  "RadRunner Plus",
  "RadWagon 4	",
];
const labels2 = ["Cargo & Utility", "City", "Off-Road", "Folding"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 55),
      borderColor: "rgb(255, 166, 0)",
      backgroundColor:
        "linear-gradient(90deg, rgba(255,195,116,1) 0%, rgba(255,166,0,1) 100%);",
    },
  ],
};

// const dataPie = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//       width: "10%",
//     },
//   ],
// };
function Home() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Layout>
          <div className="row">
            <div className="col-6 ">
              <Bar options={options} data={data} />
            </div>
            <div className="col-6 x">
              <Bar options={options} data={data} />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default Home;
