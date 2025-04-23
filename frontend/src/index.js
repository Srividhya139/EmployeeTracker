import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EmployeeProvider from "./Components/Admin/EmployeeContext";
import LeaveProvider from "./Components/User/LeaveContext";

import LandingPage from "./Components/Common/LandingPage";
import AddEmployee from "./Components/Admin/AddEmployee";
import Dashboard from "./Components/Admin/Dashboard";
import EditEmployee from "./Components/Admin/EditEmployee";
import EmployeeList from "./Components/Admin/EmployeeList";
import Login from "./Components/Auth/login"; // Corrected case to match Login.js
import Signup from "./Components/Auth/SignUp"; // Ensure case matches Signup.js

import EmployeeDirectory from "./Components/User/EmployeeDirectory";
import EmployeeProfile from "./Components/User/EmployeeProfile";
import SearchEmployee from "./Components/User/SearchEmployee";
import UserDashboard from "./Components/User/UserDashboard";
import ApplyLeave from "./Components/User/ApplyLeave";
import ViewLeaves from "./Components/User/ViewLeaves";
import ManageLeave from "./Components/Admin/ManageLeaves";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EmployeeProvider>
      <LeaveProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} /> {/* Default to Login */}
            <Route path="/Admin/Dashboard" element={<Dashboard />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/Admin/EmployeeList" element={<EmployeeList />} />
            <Route path="/Admin/AddEmployee" element={<AddEmployee />} />
            <Route path="/Admin/EditEmployee" element={<EditEmployee />} />
            <Route path="/User/EmployeeDirectory" element={<EmployeeDirectory />} />
            <Route path="/User/EmployeeProfile/:id" element={<EmployeeProfile />} />
            <Route path="/User/SearchEmployee" element={<SearchEmployee />} />
            <Route path="/User/ApplyLeave" element={<ApplyLeave />} />
            <Route path="/User/ViewLeaves" element={<ViewLeaves />} />
            <Route path="/Admin/ManageLeave" element={<ManageLeave />} />
          </Routes>
        </Router>
      </LeaveProvider>
    </EmployeeProvider>
  </React.StrictMode>
);