import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import DashboardCard from "./components/DashboardCard";
import Layout from "./components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import todaySaleSVG from "../img/chart-646.svg";
import totalSaleSVG from "../img/chart-652.svg";
import todayRevenueSVG from "../img/line-chart-662.svg";
import totalRevenueSVG from "../img/chart-659.svg";
import "./Dashboard.css";

function Dashboard() {
  const isLogged = useSelector((state) => state.token.value) !== "";
  const token = useSelector((state) => state.token.value);
  const [orders, setOrders] = useState(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Worldwide Sales",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "RadRunner Plus",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 195, 116)",
      },
      {
        label: "RadWagon 4",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgb(255, 208, 147, 0.8)",
      },
    ],
  };

  const optionsArea = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales & Revenue",
      },
    },
  };

  const dataArea = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 195, 116)",
        backgroundColor: "rgba(255, 195, 116, 0.5)",
      },
      {
        fill: true,
        label: "Revenue",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 208, 147)",
        backgroundColor: "rgba(255, 208, 147, 0.5)",
      },
    ],
  };

  useEffect(() => {
    async function getOrders() {
      const response = await axios({
        method: "get",
        baseURL: `${process.env.REACT_APP_API_BASE}/orders`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        setOrders(response.data.slice(0, 4));
      }
    }
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLogged ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Layout>
          <div className="row dashboard g-4">
            <DashboardCard
              text={"Today Sale"}
              quantity={1234}
              svg={todaySaleSVG}
            ></DashboardCard>
            <DashboardCard
              text={"Total Sale"}
              quantity={13425}
              svg={totalSaleSVG}
            ></DashboardCard>
            <DashboardCard
              text={"Today Revenue"}
              quantity={1234}
              svg={todayRevenueSVG}
            ></DashboardCard>
            <DashboardCard
              text={"Total Revenue"}
              quantity={1024}
              svg={totalRevenueSVG}
            ></DashboardCard>
            <div className="col-12 col-lg-6 ">
              <Bar options={options} data={data} />
            </div>
            <div className="col-12 col-lg-6 ">
              <Line options={optionsArea} data={dataArea} />
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Recent Orders</h4>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Payment method</th>
                      <th scope="col">Items</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders ? (
                      <>
                        {orders.map((o) => (
                          <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{`${o.user.first_name}  ${o.user.last_name}`}</td>
                            <td>{o.payment_method}</td>
                            <td>
                              {o.product_json.map((p) => (
                                <span key={p.id}>
                                  {p.quantity}x {p.product.name} <br />
                                </span>
                              ))}
                            </td>
                            <td>{o.status}</td>
                            <td>{o.createdAt}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center">
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default Dashboard;
