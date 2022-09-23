import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./products.css";
import axios from "axios";
import Modal from "./components/ModalCRUD";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Products() {
  const token = useSelector((state) => state.token.value);

  const [products, setProducts] = useState(null);
  const isLogged = useSelector((state) => state.token.value) !== "";

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

  async function getProducts() {
    const response = await axios({
      method: "get",
      baseURL: `${process.env.REACT_APP_API_BASE}/products`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    getProducts();
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
              <h2>Products</h2>
              <span className="me-2 create" onClick={() => openModal("Create")}>
                +
              </span>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col" className="d-none d-xl-table-cell">
                    Description
                  </th>
                  <th scope="col">Price</th>
                  <th scope="col">Outstanding</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products ? (
                  <>
                    {products.map((p) => (
                      <tr key={p.id} className="align-middle">
                        <td>
                          <div>
                            <img
                              preload="true"
                              src={`${p.images.image1}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.category.name}</td>
                        <td className="d-none d-xl-table-cell">
                          {p.description}
                        </td>
                        <td>${p.price}</td>
                        <td className="text-center">
                          {p.outstanding && (
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="star"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="rgb(255, 195, 116)"
                                d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
                              ></path>
                            </svg>
                          )}
                        </td>
                        <td>{p.stock}</td>
                        <td width={"1%"}>
                          <div className="d-flex justify-content-around action-buttons">
                            <button
                              className="btn "
                              onClick={() => openModal("Update", p)}
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
                            <button
                              className="btn "
                              onClick={() => openModal("delete", p)}
                            >
                              <svg
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="DeleteIcon"
                              >
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Modal
            type={modalType}
            element={"product"}
            elementToUpdate={modalElement}
            isOpen={modalIsOpen}
            closeModal={closeModal}
            getElements={getProducts}
          />
        </Layout>
      )}
    </>
  );
}

export default Products;
