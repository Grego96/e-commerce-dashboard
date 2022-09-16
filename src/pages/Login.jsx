import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeToken } from "../redux/tokenActions";
import { storeUser } from "../redux/userActions";
import { Navigate } from "react-router";

function Login() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.token.value) != "";
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    login(data);
  };
  const [loginMessage, setLoginMessage] = useState("");

  async function login(formData) {
    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_BASE}/login`,
        headers: {
          "Content-type": "application/json",
        },
        data: formData,
      });
      console.log(response);
      dispatch(storeToken(response.data.token));
      dispatch(storeUser(response.data.user));
    } catch (error) {
      // console.log(error);
      setLoginMessage(error.response.data.message);
    }
  }

  return (
    <>
      {console.log(isLogged)}
      {isLogged && <Navigate to="/dashboard" replace={true} />}
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
        <h1 className="mb-3">RADPOWERBIKES</h1>
        <div className=" shadow p-4">
          <h3>Dashboard Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`form-floating mb-3`}>
              <input
                {...register("email", {
                  required: true,
                })}
                type="email"
                className="form-control"
                id="email"
                placeholder="placeholder"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={`form-floating mb-3`}>
              <input
                {...register("password", {
                  required: true,
                })}
                type="Password"
                className="form-control"
                id="password"
                placeholder="placeholder"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className={"btn w-100 btn-main me-2"}>
              Login
            </button>
            <div className="mt-3">{loginMessage}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
