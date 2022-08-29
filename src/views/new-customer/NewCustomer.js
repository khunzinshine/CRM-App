import axios from "axios";
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "./NewCustomer.css";

const NewCustomer = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function validateForm() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const file = document.getElementById("file");
    if (!file.value) {
      alert("Please choose file!");
    } else if (password.value !== confirmPassword.value) {
      alert("Password and Confirm Password does not match!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const updatedInfo = Object.assign(info, {
      nrc: {
        nrcState: info.nrcState,
        nrcTsp: info.nrcTsp,
        nrcCode: info.nrcCode,
        nrcNumber: info.nrcNumber,
      },
    });
    delete info.nrcCode;
    delete info.nrcNumber;
    delete info.nrcState;
    delete info.nrcTsp;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "khunzinshine");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/khunzinshine/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...updatedInfo,
        img: url,
      };

      await axios
        .post("/auth/register", newUser)
        .then(() => alert("Customer has been created sucessfully!"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="card-view">
        <h3
          style={{
            paddingBottom: "2%",
            borderBottom: "1px solid gainsboro",
            color: "#514c4c",
          }}
        >
          Add New Customer
        </h3>
        <div className="new-customer-container">
          <form>
            <div className="row">
              <div className="col-25">
                <label htmlFor="file">Photo:</label>
              </div>
              <div className="col-75">
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="email">Email:</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Password:</label>
              </div>
              <div className="col-75">
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*"
                />
                <span>
                  At least 1 upper character, 1 lower character and 1 number
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Confirm Password :</label>
              </div>
              <div className="col-75">
                <input
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                  required
                />
                <span>must match the field above</span>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Name:</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="username"
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z]{3}"
                />
                <span>must be between 3 and 9 characters long</span>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Phone Number:</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="phone"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Birthday:</label>
              </div>
              <div className="col-75">
                <input
                  type="date"
                  id="birthday"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="nrc">Nrc</label>
              </div>
              <div className="col-75">
                <div className="col-25">
                  <select
                    onChange={handleChange}
                    id="nrcState"
                    name="nrcState"
                    required
                    defaultValue="2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="col-25">
                  <select
                    onChange={handleChange}
                    id="nrcTsp"
                    name="nrcTsp"
                    required
                    defaultValue="OUKALA"
                  >
                    <option value="HSAHSANA">HSAHSANA</option>
                    <option value="MATANA">HSAHSANA</option>
                    <option value="OUKALA">OUKALA</option>
                  </select>
                </div>
                <div className="col-25">
                  <select
                    onChange={handleChange}
                    id="nrcCode"
                    name="nrcCode"
                    required
                    defaultValue="C"
                  >
                    <option value="N">N</option>
                    <option value="C">C</option>
                    <option value="P">P</option>
                  </select>
                </div>
                <div className="col-25">
                  <input
                    type="text"
                    id="nrcNumber"
                    onChange={handleChange}
                    defaultValue="000000"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Gender:</label>
              </div>
              <div className="col-75">
                <input
                  onChange={handleChange}
                  type="radio"
                  id="gender"
                  value="male"
                />
                <label htmlFor="male">Male</label>
                <br />
                <input
                  onChange={handleChange}
                  type="radio"
                  id="gender"
                  value="female"
                />
                <label htmlFor="female">Female</label>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-25" />
              <div className="col-75">
                <input onClick={handleSubmit} type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCustomer;
