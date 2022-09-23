import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ModalCRUD.css";

function ModalCRUD({
  type,
  element,
  elementToUpdate,
  isOpen,
  closeModal,
  getElements,
}) {
  const token = useSelector((state) => state.token.value);
  const [responseMessage, setResponseMessage] = useState(null);

  const dbState = useSelector((state) => state.db.value);

  useEffect(() => {
    getElements();
  }, [dbState]);

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
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      setCategories(response.data);
    }
  }

  async function createItem(data) {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`image${i + 1}`, data.images[i]);
    }

    for (const x of Object.entries(data)) {
      formData.append(`${x[0]}`, x[1]);
    }

    try {
      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // setResponseMessage(response.data.message);
      console.log(response);
      closeModal();
      getElements();
    } catch (error) {
      console.log(error);
      // setResponseMessage(error.response.data.message);
    }
  }

  async function updateItem(data) {
    try {
      const response = await axios({
        method: "patch",
        baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementToUpdate.id}`,
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setResponseMessage(response.data.message);
      closeModal();
      getElements();
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  }

  async function deleteItem() {
    await axios({
      method: "delete",
      baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementToUpdate.id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    closeModal();
    getElements();
  }

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([a, v]) => v !== "")
    );
    type === "Create" ? createItem(filteredData) : updateItem(filteredData);
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Example Modal"
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
      onAfterOpen={() => {
        setResponseMessage("");
        getCategories();
        reset();
        reset({
          price: elementToUpdate ? elementToUpdate.price : "",
          stock: elementToUpdate ? elementToUpdate.stock : "",
          outstanding: elementToUpdate ? elementToUpdate.outstanding : false,
          categoryId: elementToUpdate ? elementToUpdate.categoryId : "",
        });
      }}
    >
      {type === "delete" ? (
        <div className="delete">
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
        </div>
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
                    {...register("firstname", {
                      required: elementToUpdate ? false : true,
                    })}
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
                    {...register("lastname", {
                      required: elementToUpdate ? false : true,
                    })}
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
                    {...register("email", {
                      required: elementToUpdate ? false : true,
                    })}
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
                    {...register("password", {
                      required: elementToUpdate ? false : true,
                    })}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="placeholder"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap">
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
                <label htmlFor="firstName">Images</label>
                <input
                  type="file"
                  {...register("images")}
                  className="form-control"
                  id="firstName"
                  multiple={true}
                />
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

                <div className=" d-flex justify-content-center align-items-center flex-wrap">
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

                <div className="d-flex justify-content-center align-items-center flex-wrap">
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
                    <p className="text-center m-0">{responseMessage}</p>
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
