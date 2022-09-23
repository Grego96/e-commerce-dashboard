import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Modal from "./components/ModalCRUD";

function Orders() {
  const isLogged = useSelector((state) => state.token.value) !== "";
  const token = useSelector((state) => state.token.value);
  const [orders, setOrders] = useState(null);

  const [modalType, setModalType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalElement, setModalElement] = useState(null);

  function openModal(type, element) {
    setModalType(type);
    setModalElement(element);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
  useEffect(() => {
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
                  <th scope="col">Actions</th>
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
                        <td width={"1%"}>
                          <div className="d-flex justify-content-around action-buttons">
                            <button
                              className="btn "
                              onClick={() => openModal("Update", o)}
                            >
                              <svg
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="BuildIcon"
                              >
                                <path d="m22.7 19-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
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
          <Modal
            type={modalType}
            element={"order"}
            elementToUpdate={modalElement}
            isOpen={modalIsOpen}
            closeModal={closeModal}
            getElements={getOrders}
          />
        </Layout>
      )}
    </>
  );
}

export default Orders;
