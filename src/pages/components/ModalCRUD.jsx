import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./prueba.css";

function ModalCRUD({ type, element, elementToUpdate, isOpen, closeModal }) {
  const [responseMessage, setResponseMessage] = useState(null);

  const [categories, setCategories] = useState(null);
  let endpoint;
  switch (element) {
    case "user":
      endpoint = type === "Create" ? "users/registerAdm" : "users";
      break;
    case "product":
      endpoint = `products`;
      break;
    case "category":
      endpoint = `categories`;
      break;
    default:
      break;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps

  async function createItem(data) {
    try {
      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}`,
        data: data,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
        },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  }

  async function updateItem(data) {
    let d = Object.fromEntries(
      Object.entries(data).filter(([a, v]) => v !== "")
    );

    try {
      const response = await axios({
        method: "patch",
        baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementToUpdate.id}`,
        data: d,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
        },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  }

  async function deleteItem() {
    await axios({
      method: "delete",
      baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementToUpdate.id}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
      },
    });
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    type === "Create" ? createItem(data) : updateItem(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      onAfterOpen={() => {
        getCategories();
        reset({
          price: elementToUpdate ? elementToUpdate.price : "",
          stock: elementToUpdate ? elementToUpdate.stock : "",
          outstanding: elementToUpdate ? elementToUpdate.outstanding : false,
        });
      }}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {type === "delete" ? (
        <>
          <p> Are you sure you want to delete this item?</p>
          <button
            type="submit"
            className={"btn btn-main btn-long me-2"}
            onClick={() => {
              deleteItem();
              closeModal();
            }}
          >
            Delete
          </button>
          <button
            className={"btn btn-long btn-dark "}
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {element === "user" && (
            <>
              <h3 className="mb-3">{type} admin</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <input
                    {...register("firstname", { required: false })}
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.first_name : " "
                    }`}
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <input
                    {...register("lastname", { required: false })}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.last_name : " "
                    }`}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <input
                    {...register("email", { required: false })}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.email : " "
                    }`}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    {...register("password", { required: false })}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="placeholder"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button type="submit" className={"btn btn-main me-2"}>
                      {type}
                    </button>
                    <button
                      className={"btn btn-long btn-dark "}
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                  </div>
                  <p>{responseMessage}</p>
                </div>
              </form>
            </>
          )}
          {element === "product" && (
            <>
              <div className="border-bottom mb-3">
                <h3>{type} product</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <input
                    {...register("name", {
                      required: elementToUpdate ? false : true,
                    })}
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.name : " "
                    }`}
                  />
                  <label htmlFor="productName">Name</label>
                </div>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <textarea
                    {...register("description", {
                      required: elementToUpdate ? false : true,
                    })}
                    className="form-control"
                    id="floatingTextarea"
                    rows={5}
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.description : " "
                    }`}
                    style={{ resize: "none", height: "100%" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
                <div className="mb-3">
                  <div className={`form-floating mb-3`}>
                    <select
                      {...register("categoryId", {
                        required: elementToUpdate ? false : true,
                      })}
                      className="form-select"
                      id="floatingSelectGrid"
                      aria-label="Floating label select example"
                      defaultValue={
                        elementToUpdate ? elementToUpdate.category.id : ""
                      }
                    >
                      <option disabled value="">
                        Select a category
                      </option>
                      {categories && (
                        <>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <label htmlFor="floatingSelectGrid">Category</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-xl-2">
                    <div
                      className={`${
                        elementToUpdate ? "customFloat" : "form-floating"
                      } mb-3`}
                    >
                      <input
                        {...register("price", {
                          required: elementToUpdate ? false : true,
                        })}
                        type="number"
                        className="form-control"
                        id="productPrice"
                        min={0}
                      />
                      <label htmlFor="productStock">Price</label>
                    </div>
                  </div>
                  <div className="col-6 col-xl-2">
                    <div
                      className={`${
                        elementToUpdate ? "customFloat" : "form-floating"
                      } mb-3`}
                    >
                      <input
                        {...register("stock", {
                          required: elementToUpdate ? false : true,
                        })}
                        type="number"
                        className="form-control"
                        id="productStock"
                        min={0}
                      />
                      <label htmlFor="productStock">Stock</label>
                    </div>
                  </div>
                </div>

                <div className={`mb-3`}>
                  <div className="form-check">
                    <input
                      {...register("outstanding")}
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Outstanding
                    </label>
                  </div>
                </div>

                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button type="submit" className={"btn btn-main me-2"}>
                      {type}
                    </button>
                    <button
                      className={"btn btn-long btn-dark "}
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                  </div>
                  <p>{responseMessage}</p>
                </div>
              </form>
            </>
          )}
          {element === "category" && (
            <>
              <h3>{type} category</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`${
                    elementToUpdate ? "customFloat" : "form-floating"
                  } mb-3`}
                >
                  <input
                    {...register("name", {
                      required: elementToUpdate ? false : true,
                    })}
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder={`${
                      elementToUpdate ? elementToUpdate.name : " "
                    }`}
                  />
                  <label htmlFor="categoryName">Name</label>
                </div>

                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button
                      type="submit"
                      className={"btn btn-long btn-main me-2"}
                    >
                      {type}
                    </button>
                    <button
                      className={"btn btn-long btn-dark "}
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </Modal>
  );
}

export default ModalCRUD;
