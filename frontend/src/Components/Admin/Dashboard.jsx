import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";
import { EmployeeContext } from "./EmployeeContext";
import { LeaveContext } from "../User/LeaveContext"; // ✅ Import LeaveContext
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const { employees } = useContext(EmployeeContext);
    const { leaves } = useContext(LeaveContext); // ✅ Get leaves

    const totalEmployees = employees.length;
    const uniqueDepartments = new Set(employees.map(emp => emp.department)).size;

    const pendingLeaves = leaves.filter(leave => leave.status === "Pending").length; // ✅ Count pending

    return (
        <div className="admin-panel">
            <AdminNavbar />

            <div className="admin-dashboard">
                <div className="admin-dashboard-content">
                    <h1 className="admin-dashboard-title">Welcome to Employee Manager</h1>
                    <div className="admin-dashboard-stats">
                        <div className="admin-dashboard-stat">
                            <p>Total Employees</p>
                            <h2>{totalEmployees}</h2>
                        </div>
                        <div className="admin-dashboard-stat">
                            <p>Total Departments</p>
                            <h2>{uniqueDepartments}</h2>
                        </div>
                    </div>
                    <div className="admin-dashboard-buttons">
                        <button className="admin-btn" onClick={() => navigate("/Admin/AddEmployee")}>
                            Add Employee
                        </button>
                        <button className="admin-btn" onClick={() => navigate("/Admin/EmployeeList")}>
                            View Employees
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

