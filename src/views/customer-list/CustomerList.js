import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomerList,
  deleteCustomer,
  getDetailCustomer,
} from "../../features/customer/CustomerAPI";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { ApiEndPoints } from "../../constant/apiEndPoints";
import { htmlToCSV } from "../../utils/common";
import UpdateCustomer from "../update-customer/UpdateCustomer";
import "./CustomerList.css";

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { data },
    detail: { data: detailData },
  } = useSelector((state) => state.customer);
  const [date, setDate] = useState({});

  const urlParams = new URLSearchParams(navigate.location);
  const urlPage = parseInt(urlParams.get("page"), 10) || 1;
  const urlItemsPerPage = parseInt(urlParams.get("itemsPerPage"), 10) || 5;

  const [page, setPage] = useState({
    itemsPerPage: urlItemsPerPage,
    currentPage: urlPage,
    search: "",
  });
  const { itemsPerPage, currentPage, search } = page;

  useEffect(() => {
    dispatch(
      fetchCustomerList({
        url: ApiEndPoints.customerList,
        body: {
          skip: itemsPerPage * (currentPage - 1),
          limit: itemsPerPage,
          startDate: search?.startDate,
          endDate: search?.endDate,
          search: date?.search,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, currentPage, search]);

  const handleChange = (e) => {
    setDate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDataPerPage = (e) => {
    setPage({ itemsPerPage: e.target.value, currentPage: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage({
      ...page,
      search: {
        startDate: date?.startDate,
        endDate: date?.endDate,
        ...e.target.value,
      },
    });
  };

  const handleDelete = (id) => {
    dispatch(
      deleteCustomer({
        url: ApiEndPoints.deleteCustomer,
        body: id,
      })
    );
  };

  const handleRefresh = () => {
    setPage({ ...page, search: {} });
    setDate({});
  };

  const handleExport = () => {
    var html = document.querySelector("table").outerHTML;
    htmlToCSV(html, "customers.csv");
  };

  const handleOpenModal = (id) => {
    dispatch(
      getDetailCustomer({
        url: ApiEndPoints.getDetailCustomer,
        body: id,
      })
    );
    // Get the modal
    var modal = document.getElementById("id01");
    modal.style.display = "block";
  };

  const handleCloseModal = () => {
    var modal = document.getElementById("id01");
    modal.style.display = "none";
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
          Customers
        </h3>

        <div className="row">
          <div className="col-250">
            <input
              type="date"
              id="startDate"
              name="startDate"
              placeholder="Start Date"
              onChange={handleChange}
            />
          </div>
          <div className="col-250">
            <input
              type="date"
              id="endDate"
              name="endDate"
              placeholder="End Date"
              inputMode="false"
              onChange={handleChange}
            />
          </div>
          <div className="col-250">
            <button
              className="action-btn"
              onClick={handleSearch}
              style={{ width: "47%", background: "#7b36d6" }}
            >
              Search
            </button>
            <button
              className="action-btn"
              onClick={handleRefresh}
              style={{
                width: "47%",
                float: "right",
                marginRight: "3%",
                background: "cornflowerblue",
              }}
            >
              Refresh
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handleExport}
            style={{
              padding: "7px",
              border: "none",
              color: "#7b36d6",
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>
        </div>
        <div className="row">
          <div className="col-250">
            <select
              onChange={handleDataPerPage}
              id="itemsPerPage"
              required
              style={{
                background: "none",
                width: "15%",
                padding: "8px",
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>{" "}
            entries per page
          </div>
          <div className="col-750">
            <input
              type="text"
              id="search"
              placeholder="Search"
              onChange={handleChange}
            ></input>
          </div>
        </div>

        {data && (
          <div style={{ overflowX: "auto" }}>
            <table>
              <tbody>
                <tr
                  style={{
                    background: "#f5f5f5",
                    fontSize: "14px",
                    height: "42px",
                  }}
                >
                  <th>PHOTO</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>BIRTHDAY</th>
                  <th>GENDER</th>
                  <th>NRC</th>
                  <th>CREATEDAT</th>
                  <th>ACTION</th>
                </tr>
                {data?.data?.map((d, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        alt="avatar"
                        src={d.img}
                        width="50px"
                        height="50px"
                      ></img>
                    </td>
                    <td>{d.username}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td>{d.birthday}</td>
                    <td>{d.gender}</td>
                    <td>
                      {d?.nrc?.nrcState +
                        "/" +
                        d?.nrc?.nrcTsp +
                        "(" +
                        d?.nrc?.nrcCode +
                        ")" +
                        d?.nrc?.nrcNumber}
                    </td>
                    <td>{moment(d.createdAt).format("YYYY-MM-DD hh:mm")}</td>
                    <td>
                      <UpdateCustomer
                        customer={detailData}
                        handleOpen={() => handleOpenModal(d._id)}
                        handleClose={handleCloseModal}
                      />
                      <button
                        onClick={() => handleDelete(d._id)}
                        style={{
                          border: "none",
                          padding: "10px",
                          background: "#DF2935",
                          margin: "5px",
                          color: "#fff",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "10px", borderTop: "1px solid gainsboro" }}>
              <p>
                Showing {currentPage} to {itemsPerPage} of {data?.total} entries
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomerList;
