import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import "./CustomerList.css";

const CustomerList = () => {
  return (
    <SideBar>
      <div style={{ overflowX: "auto" }}>
        <table>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>NRC</th>
            <th>CreatedAt </th>
            <th>Action</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
          </tr>
        </table>
      </div>
    </SideBar>
  );
};

export default CustomerList;
