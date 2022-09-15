import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./prueba.css";

function ModalCRUD({ type, element, elementObject, isOpen, closeModal }) {
  const [responseMessage, setResponseMessage] = useState(null);
  const [elementUpdating, setElementUpdating] = useState(null);

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

  useEffect(() => {
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
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (type === "Update") {
  //     async function getElementUpdating() {
  //       const response = await axios({
  //         method: "get",
  //         baseURL: `http://localhost:8000/${endpoint}/${elementObject.id}`,
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzMDkwMTEzfQ.ij4gMCpahRR096dFgIq4jvSlhQ4i0h3aL3ND9T8vHRw",
  //         },
  //       });
  //       console.log(response);
  //       if (response) {
  //         setElementUpdating(response.data[0]);
  //       }
  //     }
  //     getElementUpdating();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [elementObject.id]);

  async function createItem(data) {
    try {
      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_BASE}${endpoint}`,
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
    try {
      const response = await axios({
        method: "patch",
        baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementObject.id}`,
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

  async function deleteItem() {
    await axios({
      method: "delete",
      baseURL: `${process.env.REACT_APP_API_BASE}/${endpoint}/${elementObject.id}`,
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

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    type === "Create" ? createItem(data) : updateItem(data);
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {type === "delete" ? (
        <>
          <p> Are you sure you want to delete this item?</p>
          <button
            type="submit"
            className={"btn btn-main me-2"}
            onClick={() => {
              deleteItem();
              closeModal();
            }}
          >
            Delete
          </button>
          <button className={"btn btn-dark "} onClick={() => closeModal()}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {element === "user" && (
            <>
              <h3>{type} Admin</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                {elementObject ? (
                  <>
                    <div class="customFloat mb-3">
                      <input
                        {...register("firstname", { required: false })}
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder={elementObject.first_name}
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="customFloat mb-3">
                      <input
                        {...register("lastname", { required: false })}
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder={elementObject.last_name}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="customFloat mb-3">
                      <input
                        {...register("email", { required: false })}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder={elementObject.email}
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
                  </>
                ) : (
                  <>
                    <div className="form-floating mb-3">
                      <input
                        {...register("firstname", { required: true })}
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="placeholder"
                      />
                      <label htmlFor="lastName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        {...register("lastname", { required: true })}
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="placeholder"
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="placeholder"
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="placeholder"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </>
                )}

                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button type="submit" className={"btn btn-main me-2"}>
                      Create
                    </button>
                    <button
                      className={"btn btn-dark "}
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
                {elementObject ? (
                  <>
                    {console.log(elementObject)}
                    <div class="form-floating mb-3">
                      <input
                        {...register("images", { required: true })}
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="placeholder"
                      />
                      <label htmlFor="productName">Image</label>
                    </div>
                    <div class="customFloat mb-3">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder={elementObject.name}
                      />
                      <label htmlFor="productName">Name</label>
                    </div>
                    <div class="customFloat mb-3">
                      <textarea
                        {...register("description", { required: true })}
                        class="form-control"
                        id="floatingTextarea"
                        rows={5}
                        placeholder={elementObject.description}
                        style={{ resize: "none", height: "100%" }}
                      ></textarea>
                      <label for="floatingTextarea">Description</label>
                    </div>
                    <div className="mb-3">
                      <div class="form-floating">
                        <select
                          {...register("category", { required: true })}
                          class="form-select"
                          id="floatingSelectGrid"
                          aria-label="Floating label select example"
                        >
                          <option selected disabled value="">
                            Select a category
                          </option>
                          {categories && (
                            <>
                              {categories.map((c) => (
                                <option value={c.id}>{c.name}</option>
                              ))}
                            </>
                          )}
                        </select>
                        <label for="floatingSelectGrid">Category</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className=" form-floating mb-3">
                          <input
                            {...register("price", { required: true })}
                            type="number"
                            className="form-control"
                            id="productStock"
                            defaultValue={elementObject.price}
                            min={0}
                          />
                          <label htmlFor="productStock">Price</label>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className=" form-floating mb-3">
                          <input
                            {...register("stock", { required: true })}
                            type="number"
                            className="form-control"
                            id="productStock"
                            defaultValue={elementObject.stock}
                            min={0}
                          />
                          <label htmlFor="productStock">Stock</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <div class="form-check">
                        <input
                          {...register("outstanding")}
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Outstanding
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="form-floating mb-3">
                      <input
                        {...register("images", { required: true })}
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="placeholder"
                      />
                      <label htmlFor="productName">Image</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="placeholder"
                      />
                      <label htmlFor="productName"> Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <textarea
                        {...register("description", { required: true })}
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        rows={5}
                        style={{ resize: "none", height: "100%" }}
                      ></textarea>
                      <label for="floatingTextarea">Description</label>
                    </div>
                    <div className="mb-3">
                      <div class="form-floating">
                        <select
                          {...register("category", { required: true })}
                          class="form-select"
                          id="floatingSelectGrid"
                          aria-label="Floating label select example"
                        >
                          <option selected disabled value="">
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
                        <label for="floatingSelectGrid">Category</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className=" form-floating mb-3">
                          <input
                            {...register("price", { required: true })}
                            type="number"
                            className="form-control"
                            id="productStock"
                            placeholder="productStock"
                            min={0}
                          />
                          <label htmlFor="productStock">Price</label>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className=" form-floating mb-3">
                          <input
                            {...register("stock", { required: true })}
                            type="number"
                            className="form-control"
                            id="productStock"
                            placeholder="productStock"
                            min={0}
                          />
                          <label htmlFor="productStock">Stock</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <div class="form-check">
                        <input
                          {...register("outstanding")}
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Outstanding
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button type="submit" className={"btn btn-main me-2"}>
                      Create
                    </button>
                    <button
                      className={"btn btn-dark "}
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
                <div class="form-floating mb-3">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="placeholder"
                  />
                  <label htmlFor="categoryName">Name</label>
                </div>
                <div className="pt-2 d-flex justify-content-between align-items-center">
                  <div className="d-inline-block">
                    <button type="submit" className={"btn btn-main me-2"}>
                      {type}
                    </button>
                    <button
                      className={"btn btn-dark "}
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
