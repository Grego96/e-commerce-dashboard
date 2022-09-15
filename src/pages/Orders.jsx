import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./orders.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getOrders() {
      const response = await axios({
        method: "get",
        baseURL: `http://localhost:8000/orders`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
        },
      });
      if (response) {
        setOrders(response.data);
      }
    }
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="table-responsive">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Orders</h1>
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
            {orders && (
              <>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{`${o.user.first_name}  ${o.user.last_name}`}</td>
                    <td>{o.payment_method}</td>
                    <td> </td>
                    <td>{o.status}</td>
                    <td>{o.createdAt}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Orders;
