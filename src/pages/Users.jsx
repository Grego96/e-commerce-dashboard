import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./users.css";
import axios from "axios";
import Modal from "./components/ModalCRUD";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function Users() {
  const [users, setUsers] = useState(null);
  const isLogged = useSelector((state) => state.token.value) != "";

  const [modalType, setModalType] = useState(null);
  const [modalElement, setModalElement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal(type, element) {
    setModalType(type);
    setModalElement(element);
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function getUsers() {
      const response = await axios({
        method: "get",
        baseURL: `${process.env.REACT_APP_API_BASE}/users`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
        },
      });
      if (response) {
        setUsers(response.data);
      }
    }
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLogged ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Layout>
          <>
            <div className="table-responsive">
              <div className="d-flex justify-content-between align-items-center">
                <h1>Users</h1>
                <button
                  className="btn ps-4 pe-4"
                  onClick={() => openModal("Create")}
                >
                  +
                </button>
              </div>
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Address
                    </th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Phone Number
                    </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && (
                    <>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.first_name}</td>
                          <td>{u.last_name}</td>
                          <td>{u.email}</td>
                          {u.isAdmin ? (
                            <>
                              <td>
                                <div className="admin text-center">Admin</div>
                              </td>
                              <td className="d-none d-lg-table-cell emptyRows" />
                              <td className="d-none d-lg-table-cell emptyRows" />

                              <td width={"1%"}>
                                <div className="d-flex justify-content-around action-buttons">
                                  <button
                                    className="btn"
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
                                    className="btn ms-2"
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
                            </>
                          ) : (
                            <>
                              <td>
                                <div className="buyer text-center">Buyer</div>
                              </td>
                              <td className="d-none d-lg-table-cell">
                                {u.address}
                              </td>
                              <td className="d-none d-lg-table-cell">
                                {u.phone_number}
                              </td>
                              <td></td>
                            </>
                          )}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <Modal
              type={modalType}
              element={"user"}
              elementToUpdate={modalElement}
              isOpen={modalIsOpen}
              closeModal={closeModal}
            />
          </>
        </Layout>
      )}
    </>
  );
}

export default Users;
