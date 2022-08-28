import React, { useState } from "react";
import "./UpdateCustomer.css";

const UpdateCustomer = ({ handleOpen, handleClose, customer }) => {
  const [info, setInfo] = useState(customer && customer);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <button
        style={{
          border: "none",
          padding: "10px",
          background: "cornflowerblue",
          color: "#fff",
        }}
        onClick={handleOpen}
      >
        Edit
      </button>

      <div id="id01" className="modal">
        {customer && (
          <form className="modal-content animate">
            <div className="container">
              <h2>Update Customer</h2>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={customer?.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="username">Name:</label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                value={customer?.username}
                required
                pattern="[A-Za-z]{3}"
              />

              <label htmlFor="lname">Phone Number:</label>

              <input
                type="text"
                id="phone"
                onChange={handleChange}
                value={customer?.phone}
                required
              />

              <label htmlFor="lname">Birthday:</label>
              <input
                type="date"
                id="birthday"
                onChange={handleChange}
                value={customer?.birthday}
                required
              />
              <button
                className="update-btn"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
              <button type="button" onClick={handleClose} className="cancelbtn">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateCustomer;
