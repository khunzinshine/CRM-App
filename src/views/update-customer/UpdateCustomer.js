import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApiEndPoints } from "../../constant/apiEndPoints";
import { updateCustomer } from "../../features/customer/CustomerAPI";
import "./UpdateCustomer.css";

const UpdateCustomer = ({ handleOpen, handleClose }) => {
  const dispatch = useDispatch();
  const {
    detail: { data },
  } = useSelector((state) => state.customer);

  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCustomer = {
        ...info,
      };

      await dispatch(
        updateCustomer({
          url: ApiEndPoints.updateCustomer,
          id: info?._id,
          body: updatedCustomer,
        })
      ).then(() => {
        alert("Customer has been updated!");
        handleClose();
      });
    } catch (err) {
      alert("Update Failed!");
    }
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
        <form className="modal-content animate">
          <div className="container">
            <h2>Update info</h2>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={info?.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              value={info?.username}
              required
              pattern="[A-Za-z]{3}"
            />

            <label htmlFor="lname">Phone Number:</label>

            <input
              type="text"
              id="phone"
              onChange={handleChange}
              value={info?.phone}
              required
            />

            <label htmlFor="lname">Birthday:</label>
            <input
              type="date"
              id="birthday"
              onChange={handleChange}
              value={info?.birthday}
              required
            />
            <button className="update-btn" onClick={handleSubmit} type="submit">
              Submit
            </button>
            <button type="button" onClick={handleClose} className="cancelbtn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCustomer;
