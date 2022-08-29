import React, { useContext } from "react";
import Login from "./views/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerList from "./views/customer-list/CustomerList";
import { AuthContext } from "./context/authContext";
import NewCustomer from "./views/new-customer/NewCustomer";
import "./App.css";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer">
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewCustomer />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
