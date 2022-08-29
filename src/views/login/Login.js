import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_SERVER + "/auth/login",
        credentials
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: res.data.details,
          token: {
            token: res.data.token,
            expiredAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
          },
        },
      });
      navigate("/customer/list");
    } catch (err) {
      alert("Login Failed!");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <h4>Sign in</h4>
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
