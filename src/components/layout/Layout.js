import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Layout.css";

const Layout = ({ children }) => {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.logout();
  };

  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <a className="s-sidebar__trigger" href="#0">
          <i className="fa fa-bars"></i>
        </a>

        <nav className="s-sidebar__nav">
          <div className="s-header">CRM App</div>
          <div className="s-navigation">NAVIGATION</div>
          <ul>
            <li>
              <Link className="s-sidebar__nav-link" to="/customer/list">
                <i className="fas fa-users"></i>
                <em>Customers</em>
              </Link>
            </li>
            <li>
              <Link className="s-sidebar__nav-link" to="/customer/new">
                <i className="fas fa-plus-circle"></i>
                <em>Add New Customer</em>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="s-sidebar__nav-link"
                to="/"
              >
                <i className="fas fa-user-circle"></i>
                <em>Logout</em>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="s-layout__content">{children}</main>
    </div>
  );
};

export default Layout;
