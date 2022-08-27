import React from "react";
import CustomerList from "../../views/customer-list/CustomerList";
import NewCustomer from "../../views/new-customer/NewCustomer";
import Table from "../table/Table";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <a className="s-sidebar__trigger" href="#0">
          <i className="fa fa-bars"></i>
        </a>

        <nav className="s-sidebar__nav">
          <ul>
            <li>
              <a className="s-sidebar__nav-link" href="#0">
                <i className="fas fa-users"></i>
                <em>Customers</em>
              </a>
            </li>
            <li>
              <a className="s-sidebar__nav-link" href="#0">
                <i className="fas fa-plus-circle"></i>
                <em>Add New Customer</em>
              </a>
            </li>
            <li>
              <a className="s-sidebar__nav-link" href="#0">
                <i className="fas fa-user-circle"></i>
                <em>Logout</em>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main className="s-layout__content">
        {/* <NewCustomer /> */}
        <CustomerList />
      </main>
    </div>
  );
};

export default SideBar;
