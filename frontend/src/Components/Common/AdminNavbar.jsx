import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa";
import { LeaveContext } from "../User/LeaveContext";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { leaves } = useContext(LeaveContext);
  const pendingLeaves = leaves.filter(leave => leave.status === "Pending").length;

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo" onClick={() => navigate("/")}>
        <span className="admin-logo-icon">💙</span> Employee Tracker
      </div>
      <ul className="admin-navbar-menu">
        <Link to="/Dashboard" className="admin-active">Dashboard</Link>
        <Link to="/Admin/EmployeeList">Employee List</Link>
        <Link to="/Admin/ManageLeave">Manage Leaves</Link>
      </ul>
      <div className="admin-navbar-icons">
        <div className="notification-wrapper" onClick={() => navigate("/Admin/ManageLeave")}>
          <FaBell className="admin-icon" />
          {pendingLeaves > 0 && (
            <span className="notification-badge">{pendingLeaves}</span>
          )}
        </div>
        <FaCog className="admin-icon" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
