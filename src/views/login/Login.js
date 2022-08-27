import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <form>
      <div className="container">
        <input
          type="text"
          placeholder="Email Address"
          name="uname"
          required
        ></input>
        <input
          input
          type="password"
          placeholder="Password"
          name="psw"
          required
        ></input>
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
