import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign in</span>
        </div>
        <form action="#">
          <div className="row">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Email address" required></input>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required></input>
          </div>
          <div className="row button">
            <input type="submit" value="Login"></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
