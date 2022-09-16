import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import Modal from "./components/ModalCRUD";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Categories() {
  const [categories, setCategories] = useState(null);
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

  async function getCategories() {
    const response = await axios({
      method: "get",
      baseURL: `${process.env.REACT_APP_API_BASE}/categories`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
      },
    });
    if (response) {
      setCategories(response.data);
    }
  }
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      {!isLogged ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Layout>
          <div className="table-responsive">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Categories</h1>
              <div>
                <button
                  className="btn ps-4 pe-4"
                  onClick={() => openModal("Create")}
                >
                  +
                </button>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories && (
                  <>
                    {categories.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td width={"1%"}>
                          <div className="d-flex justify-content-around action-buttons">
                            <button
                              className="btn "
                              onClick={() => openModal("Update", u)}
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
                              onClick={() => openModal("delete", u)}
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
                )}
              </tbody>
            </table>
          </div>
          <Modal
            type={modalType}
            element={"category"}
            elementToUpdate={modalElement}
            isOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </Layout>
      )}
    </>
  );
}

export default Categories;
