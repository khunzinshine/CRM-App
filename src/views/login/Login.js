import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  console.log("credentials", credentials);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log("resxxx", res);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data.details,
          token: {
            token: res.data.token,
            expiredAt: new Date(Date.now() + 60 * 1000),
          },
        },
      });

      navigate("/customer/list");
      // if (res.data.isAdmin) {
      // } else {
      //   dispatch({
      //     type: "LOGIN_FAILURE",
      //     payload: { message: "You are not allowed!" },
      //   });
      // }
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign in</span>
        </div>
        <form>
          <div className="row">
            <i className="fas fa-envelope"></i>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Email address"
              required
              onChange={handleChange}
            ></input>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            ></input>
          </div>
          <div className="row button">
            <input type="submit" value="Login" onClick={handleSubmit}></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
