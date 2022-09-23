import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Orders() {
  const token = useSelector((state) => state.token.value);

  const isLogged = useSelector((state) => state.token.value) !== "";
  const [orders, setOrders] = useState(null);

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
        setOrders(response.data);
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
          <div className="table-responsive">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Orders</h2>
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
        </Layout>
      )}
    </>
  );
}

export default Orders;
